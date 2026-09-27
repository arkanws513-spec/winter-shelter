extends Control

var scene_index := -1
var scene_images := [
    "res://art/cover.svg",
    "res://art/rain.svg",
    "res://art/snow.svg",
    "res://art/walk.svg",
    "res://art/shelter.svg"
]

var image_view: TextureRect
var caption: Label
var next_button: Button

func _ready() -> void:
    _build_opening()
    _show_scene(-1)

func _build_opening() -> void:
    var background := ColorRect.new()
    background.color = Color("#080d14")
    background.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
    add_child(background)

    image_view = TextureRect.new()
    image_view.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
    image_view.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
    image_view.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_COVERED
    add_child(image_view)

    var shade := ColorRect.new()
    shade.color = Color(0, 0, 0, 0.18)
    shade.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
    add_child(shade)

    caption = Label.new()
    caption.position = Vector2(35, 70)
    caption.size = Vector2(650, 170)
    caption.add_theme_font_size_override("font_size", 30)
    caption.add_theme_color_override("font_color", Color("#f2f6f8"))
    caption.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
    caption.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    caption.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
    caption.text_direction = Control.TEXT_DIRECTION_RTL
    add_child(caption)

    next_button = Button.new()
    next_button.text = "ابدأ"
    next_button.position = Vector2(190, 1080)
    next_button.size = Vector2(340, 90)
    next_button.add_theme_font_size_override("font_size", 28)
    next_button.pressed.connect(_next_scene)
    add_child(next_button)

func _show_scene(index: int) -> void:
    scene_index = index
    image_view.texture = load(scene_images[index + 1])
    if index == -1:
        caption.text = "دفء\nحين يشتد البرد... يبدأ البحث عن الأمان"
        next_button.text = "ابدأ القصة"
    elif index == 0:
        caption.text = "المطر لا يتوقف...\nامرأة تجلس وحيدة في شارع بارد."
        next_button.text = "تابع"
    elif index == 1:
        caption.text = "ثم تغيّر كل شيء.\nبدأ الثلج يتساقط، وانخفضت الحرارة."
        next_button.text = "تابع"
    elif index == 2:
        caption.text = "لم يعد الانتظار خيارًا.\nنهضت وبدأت تبحث عن مكان يحميها."
        next_button.text = "تابع"
    elif index == 3:
        caption.text = "بعد مسير طويل...\nظهر أمامها مأوى مهجور."
        next_button.text = "ادخل المأوى"
    else:
        caption.text = "وجدت مكانًا مؤقتًا.\nلكن البقاء هنا لن يكون سهلًا..."
        next_button.text = "ابدأ اللعب"

func _next_scene() -> void:
    if scene_index < scene_images.size() - 1:
        _show_scene(scene_index + 1)
    else:
        _start_game()

func _start_game() -> void:
    caption.text = "بداية اللعبة"
    next_button.text = "قريبًا: أول مرحلة لعب"
    next_button.disabled = true
