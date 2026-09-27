extends Control

var title_label: Label
var subtitle_label: Label
var content_title: Label
var content_label: Label
var status_label: Label
var content_box: VBoxContainer

const DESTINATIONS = [
    ["المأوى", "المنزل المؤقت ومصدر الدفء"],
    ["الخرابة", "استكشاف الأماكن المهجورة والعثور على الموارد"],
    ["المخزن", "إدارة الأدوات والمواد التي جمعتها"],
    ["الورشة", "إصلاح الأثاث والأبواب ومصادر التدفئة"],
    ["الخريطة", "معرفة المناطق التي تم اكتشافها"],
    ["المهام", "مهام يومية وقرارات تؤثر في النجاة"],
    ["الحقيبة", "الأدوات والمواد المتاحة"],
    ["الحالة", "الدفء والطاقة والوقت"],
]

var pages := {
    "المأوى": "هذا هو مركز اللعبة. راقب مستوى الدفء، أصلح المكان، وحافظ على الموارد.",
    "الخرابة": "هنا تبدأ عمليات الاستكشاف. ابحث عن الخشب، المعدن، الأدوات، والطعام.",
    "المخزن": "كل ما تجمعه يظهر هنا. استخدم الموارد بحكمة لأن الشتاء لا ينتظر.",
    "الورشة": "حوّل المواد الخام إلى إصلاحات حقيقية تساعد على بقاء المأوى آمنًا ودافئًا.",
    "الخريطة": "ستظهر المناطق المكتشفة هنا تدريجيًا مع تقدمك في اللعبة.",
    "المهام": "اختر المهمة بعد معرفة المخاطر والمكافأة. قراراتك تغيّر مسار اليوم.",
    "الحقيبة": "الأدوات الأساسية التي تحملها أثناء الاستكشاف.",
    "الحالة": "الدفء: 72%    الطاقة: 86%    الوقت المتبقي: 18:42",
}

func _ready() -> void:
    _build_ui()
    _show_page("المأوى")

func _make_label(text_value: String, size: int) -> Label:
    var label := Label.new()
    label.text = text_value
    label.add_theme_font_size_override("font_size", size)
    label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
    label.horizontal_alignment = HORIZONTAL_ALIGNMENT_RIGHT
    label.text_direction = Control.TEXT_DIRECTION_RTL
    return label

func _make_button(text_value: String) -> Button:
    var button := Button.new()
    button.text = text_value
    button.custom_minimum_size = Vector2(0, 70)
    button.add_theme_font_size_override("font_size", 22)
    button.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    button.pressed.connect(func(): _show_page(text_value))
    return button

func _build_ui() -> void:
    var background := ColorRect.new()
    background.color = Color("#101722")
    background.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
    add_child(background)

    var margin := MarginContainer.new()
    margin.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
    margin.add_theme_constant_override("margin_left", 28)
    margin.add_theme_constant_override("margin_right", 28)
    margin.add_theme_constant_override("margin_top", 28)
    margin.add_theme_constant_override("margin_bottom", 28)
    add_child(margin)

    var root := VBoxContainer.new()
    root.add_theme_constant_override("separation", 18)
    margin.add_child(root)

    title_label = _make_label("دفء", 42)
    title_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    root.add_child(title_label)

    subtitle_label = _make_label("البقاء يبدأ من قرار واحد", 19)
    subtitle_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    root.add_child(subtitle_label)

    var status_panel := PanelContainer.new()
    status_panel.custom_minimum_size = Vector2(0, 82)
    root.add_child(status_panel)

    status_label = _make_label("🔥 الدفء 72%     ⚡ الطاقة 86%     ⏱ 18:42", 20)
    status_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    status_panel.add_child(status_label)

    var main_scroll := ScrollContainer.new()
    main_scroll.size_flags_vertical = Control.SIZE_EXPAND_FILL
    root.add_child(main_scroll)

    var columns := HBoxContainer.new()
    columns.add_theme_constant_override("separation", 18)
    columns.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    main_scroll.add_child(columns)

    var nav_panel := VBoxContainer.new()
    nav_panel.custom_minimum_size = Vector2(260, 0)
    nav_panel.add_theme_constant_override("separation", 10)
    columns.add_child(nav_panel)

    var nav_title := _make_label("الأماكن", 24)
    nav_title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    nav_panel.add_child(nav_title)

    for item in DESTINATIONS:
        nav_panel.add_child(_make_button(item[0]))

    content_box = VBoxContainer.new()
    content_box.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    content_box.add_theme_constant_override("separation", 14)
    columns.add_child(content_box)

    content_title = _make_label("", 30)
    content_box.add_child(content_title)

    content_label = _make_label("", 21)
    content_label.custom_minimum_size = Vector2(0, 180)
    content_box.add_child(content_label)

    var tip := _make_label("نصيحة: لا تهدر الموارد. كل قطعة خشب أو أداة قد تكون مهمة لاحقًا.", 18)
    content_box.add_child(tip)

func _show_page(page_name: String) -> void:
    content_title.text = page_name
    content_label.text = pages.get(page_name, "هذه المنطقة قيد التطوير.")
    status_label.text = "🔥 الدفء 72%     ⚡ الطاقة 86%     ⏱ 18:42"
