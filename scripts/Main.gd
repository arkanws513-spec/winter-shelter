extends Control

const SCENE_IMAGES := [
    preload("res://art/cover.svg"),
    preload("res://art/rain.svg"),
    preload("res://art/snow.svg"),
    preload("res://art/walk.svg"),
    preload("res://art/shelter.svg")
]

const SCENE_DURATION := [3.5, 4.5, 4.5, 4.5, 5.0]

var scene_index := -1
var image_view: TextureRect
var caption: Label
var fade_layer: ColorRect
var timer: Timer

func _ready() -> void:
    _build_opening()
    _show_scene(-1)

func _build_opening() -> void:
    set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)

    var background := ColorRect.new()
    background.color = Color("#080d14")
    background.mouse_filter = Control.MOUSE_FILTER_IGNORE
    background.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
    add_child(background)

    image_view = TextureRect.new()
    image_view.mouse_filter = Control.MOUSE_FILTER_IGNORE
    image_view.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
    image_view.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
    image_view.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_COVERED
    add_child(image_view)

    var shade := ColorRect.new()
    shade.color = Color(0, 0, 0, 0.16)
    shade.mouse_filter = Control.MOUSE_FILTER_IGNORE
    shade.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
    add_child(shade)

    caption = Label.new()
    caption.anchor_left = 0.08
    caption.anchor_top = 0.07
    caption.anchor_right = 0.92
    caption.anchor_bottom = 0.24
    caption.add_theme_font_size_override("font_size", 30)
    caption.add_theme_color_override("font_color", Color("#f2f6f8"))
    caption.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
    caption.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    caption.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
    caption.text_direction = Control.TEXT_DIRECTION_RTL
    caption.mouse_filter = Control.MOUSE_FILTER_IGNORE
    add_child(caption)

    fade_layer = ColorRect.new()
    fade_layer.color = Color(0, 0, 0, 1)
    fade_layer.mouse_filter = Control.MOUSE_FILTER_IGNORE
    fade_layer.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
    add_child(fade_layer)

    timer = Timer.new()
    timer.one_shot = true
    timer.timeout.connect(_next_scene)
    add_child(timer)

func _show_scene(index: int) -> void:
    scene_index = index
    var texture_index := index + 1
    if texture_index < 0 or texture_index >= SCENE_IMAGES.size():
        return

    image_view.texture = SCENE_IMAGES[texture_index]

    match index:
        -1:
            caption.text = "دفء\nحين يشتد البرد... يبدأ البحث عن الأمان"
        0:
            caption.text = "المطر لا يتوقف...\nامرأة تجلس وحيدة في شارع بارد."
        1:
            caption.text = "ثم تغيّر كل شيء.\nبدأ الثلج يتساقط، وانخفضت الحرارة."
        2:
            caption.text = "لم يعد الانتظار خيارًا.\nنهضت وبدأت تبحث عن مكان يحميها."
        3:
            caption.text = "بعد مسير طويل...\nظهر أمامها مأوى مهجور."
        4:
            caption.text = "وجدت مكانًا مؤقتًا.\nلكن البقاء هنا لن يكون سهلًا..."

    var fade_in := create_tween()
    fade_in.tween_property(fade_layer, "color:a", 0.0, 0.7)
    timer.start(SCENE_DURATION[texture_index])

func _next_scene() -> void:
    if scene_index < SCENE_IMAGES.size() - 1:
        var fade_out := create_tween()
        fade_out.tween_property(fade_layer, "color:a", 1.0, 0.55)
        await fade_out.finished
        _show_scene(scene_index + 1)
    else:
        _start_game()

func _start_game() -> void:
    caption.text = "الليلة الأولى"
    var fade_out := create_tween()
    fade_out.tween_property(fade_layer, "color:a", 1.0, 0.6)
    await fade_out.finished
    image_view.texture = SCENE_IMAGES[4]
    caption.text = "المأوى بارد...\nابحثي عن وسيلة للتدفئة قبل أن يشتد الليل."
    var fade_in := create_tween()
    fade_in.tween_property(fade_layer, "color:a", 0.0, 0.7)
