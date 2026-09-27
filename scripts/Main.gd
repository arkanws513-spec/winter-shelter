extends Control

const SCENE_IMAGES := [
    preload("res://art/cover.svg"),
    preload("res://art/rain.svg"),
    preload("res://art/snow.svg"),
    preload("res://art/walk.svg"),
    preload("res://art/shelter.svg")
]

var scene_index := -1
var image_view: TextureRect
var caption: Label
var next_button: Button

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
    shade.color = Color(0, 0, 0, 0.22)
    shade.mouse_filter = Control.MOUSE_FILTER_IGNORE
    shade.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
    add_child(shade)

    caption = Label.new()
    caption.anchor_left = 0.08
    caption.anchor_top = 0.06
    caption.anchor_right = 0.92
    caption.anchor_bottom = 0.22
    caption.add_theme_font_size_override("font_size", 30)
    caption.add_theme_color_override("font_color", Color("#f2f6f8"))
    caption.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
    caption.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    caption.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
    caption.text_direction = Control.TEXT_DIRECTION_RTL
    caption.mouse_filter = Control.MOUSE_FILTER_IGNORE
    add_child(caption)

    next_button = Button.new()
    next_button.anchor_left = 0.18
    next_button.anchor_top = 0.84
    next_button.anchor_right = 0.82
    next_button.anchor_bottom = 0.94
    next_button.add_theme_font_size_override("font_size", 28)
    next_button.pressed.connect(_next_scene)
    add_child(next_button)

func _show_scene(index: int) -> void:
    scene_index = index
    var texture_index := index + 1

    if texture_index < 0 or texture_index >= SCENE_IMAGES.size():
        return

    image_view.texture = SCENE_IMAGES[texture_index]

    match index:
        -1:
            caption.text = "دفء\nحين يشتد البرد... يبدأ البحث عن الأمان"
            next_button.text = "ابدأ القصة"
        0:
            caption.text = "المطر لا يتوقف...\nامرأة تجلس وحيدة في شارع بارد."
            next_button.text = "تابع"
        1:
            caption.text = "ثم تغيّر كل شيء.\nبدأ الثلج يتساقط، وانخفضت الحرارة."
            next_button.text = "تابع"
        2:
            caption.text = "لم يعد الانتظار خيارًا.\nنهضت وبدأت تبحث عن مكان يحميها."
            next_button.text = "تابع"
        3:
            caption.text = "بعد مسير طويل...\nظهر أمامها مأوى مهجور."
            next_button.text = "ادخل المأوى"
        4:
            caption.text = "وجدت مكانًا مؤقتًا.\nلكن البقاء هنا لن يكون سهلًا..."
            next_button.text = "ابدأ اللعب"

func _next_scene() -> void:
    if scene_index < SCENE_IMAGES.size() - 1:
        _show_scene(scene_index + 1)
    else:
        _start_game()

func _start_game() -> void:
    caption.text = "بداية اللعبة"
    next_button.text = "جارٍ تجهيز أول مرحلة..."
    next_button.disabled = true
