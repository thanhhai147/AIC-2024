const objectLabels = [
    "tortoise_con rùa_0",
    "container_thùng chứa_1",
    "magpie_chim ác là_2",
    "sea turtle_rùa biển_3",
    "football_bóng đá_4",
    "ambulance_xe cứu thương_5",
    "ladder_thang_6",
    "toothbrush_bàn chải đánh răng_7",
    "syringe_ống tiêm_8",
    "sink_bồn rửa_9",
    "toy_đồ chơi_10",
    "organ_cơ quan_11",
    "cassette deck_máy phát băng_12",
    "apple_quả táo_13",
    "human eye_mắt người_14",
    "cosmetics_mỹ phẩm_15",
    "paddle_mái chèo_16",
    "snowman_người tuyết_17",
    "beer_bia_18",
    "chopsticks_đũa_19",
    "human beard_râu người_20",
    "bird_chim_21",
    "parking meter_đồng hồ phạt đỗ xe_22",
    "traffic light_đèn giao thông_23",
    "croissant_bánh sừng bò_24",
    "cucumber_quả dưa chuột_25",
    "radish_củ cải_26",
    "towel_cái khăn lau_27",
    "doll_búp bê_28",
    "skull_hộp sọ_29",
    "washing machine_máy giặt_30",
    "glove_găng tay_31",
    "tick_đánh dấu_32",
    "belt_thắt lưng_33",
    "sunglasses_kính râm_34",
    "banjo_đàn banjo_35",
    "cart_xe đẩy_36",
    "ball_quả bóng_37",
    "backpack_balo_38",
    "bicycle_xe đạp_39",
    "home appliance_thiết bị gia dụng_40",
    "centipede_con rết_41",
    "boat_thuyền_42",
    "surfboard_ván lướt sóng_43",
    "boot_đôi ủng_44",
    "headphones_tai nghe_45",
    "hot dog_xúc xích_46",
    "shorts_quần short_47",
    "fast food_thức ăn nhanh_48",
    "bus_xe buýt_49",
    "boy_con trai_50",
    "screwdriver_tuốc nơ vít_51",
    "bicycle wheel_bánh xe đạp_52",
    "barge_xà lan_53",
    "laptop_máy tính xách tay_54",
    "miniskirt_váy ngắn_55",
    "drill_máy khoan_56",
    "dress_đầm_57",
    "bear_con gấu_58",
    "waffle_bánh quế_59",
    "pancake_bánh kếp_60",
    "brown bear_gấu nâu_61",
    "woodpecker_chim gõ kiến_62",
    "blue jay_chim giẻ cùi xanh_63",
    "pretzel_bánh quy xoắn_64",
    "bagel_bánh mì tròn_65",
    "tower_tháp_66",
    "teapot_ấm trà_67",
    "person_người_68",
    "bow and arrow_cung và mũi tên_69",
    "swimwear_đồ bơi_70",
    "beehive_tổ ong_71",
    "brassiere_áo ngực_72",
    "bee_con ong_73",
    "bat_dơi_74",
    "starfish_sao biển_75",
    "popcorn_bỏng ngô_76",
    "burrito_bánh cuộn burrito_77",
    "chainsaw_máy cưa_78",
    "balloon_bóng bay_79",
    "wrench_cờ lê_80",
    "tent_lều_81",
    "vehicle registration plate_biển số xe_82",
    "lantern_đèn lồng_83",
    "toaster_máy nướng bánh mì_84",
    "flashlight_đèn pin_85",
    "billboard_bảng quảng cáo_86",
    "tiara_vương miện_87",
    "limousine_xe limousine_88",
    "necklace_vòng cổ_89",
    "carnivore_động vật ăn thịt_90",
    "scissors_kéo_91",
    "stairs_cầu thang_92",
    "computer keyboard_bàn phím máy tính_93",
    "printer_máy in_94",
    "traffic sign_biển báo giao thông_95",
    "chair_cái ghế_96",
    "shirt_áo sơ mi_97",
    "poster_áp phích_98",
    "cheese_phô mai_99",
    "sock_tất_100",
    "fire hydrant_vòi chữa cháy_101",
    "land vehicle_xe đất_102",
    "earrings_bông tai_103",
    "tie_cà vạt_104",
    "watercraft_tàu thủy_105",
    "cabinetry_tủ đựng đồ_106",
    "suitcase_va li_107",
    "muffin_bánh nướng xốp_108",
    "bidet_chậu vệ sinh_109",
    "snack_đồ ăn vặt_110",
    "snowmobile_xe trượt tuyết_111",
    "clock_cái đồng hồ_112",
    "medical equipment_thiết bị y tế_113",
    "cattle_gia súc_114",
    "cello_đàn cello_115",
    "jet ski_mô tô nước_116",
    "camel_con lạc đà_117",
    "coat_áo choàng_118",
    "suit_bộ đồ_119",
    "desk_bàn làm việc_120",
    "cat_con mèo_121",
    "bronze sculpture_điêu khắc bằng đồng_122",
    "juice_nước ép_123",
    "gondola_thuyền gondola_124",
    "beetle_bọ cánh cứng_125",
    "cannon_pháo_126",
    "computer mouse_chuột máy tính_127",
    "cookie_bánh quy_128",
    "office building_tòa nhà văn phòng_129",
    "fountain_đài phun nước_130",
    "coin_đồng xu_131",
    "calculator_máy tính_132",
    "cocktail_cocktail_133",
    "computer monitor_màn hình máy tính_134",
    "box_hộp_135",
    "stapler_cái bấm ghim_136",
    "christmas tree_cây giáng sinh_137",
    "cowboy hat_mũ cao bồi_138",
    "hiking equipment_thiết bị đi bộ đường dài_139",
    "studio couch_ghế sofa dài_140",
    "drum_cái trống_141",
    "dessert_món tráng miệng_142",
    "wine rack_giá đựng rượu_143",
    "drink_uống_144",
    "zucchini_bí xanh_145",
    "ladle_cái muôi_146",
    "human mouth_miệng con người_147",
    "dairy_sữa_148",
    "dice_xúc xắc_149",
    "oven_lò vi sóng_150",
    "dinosaur_khủng long_151",
    "ratchet_cờ lê_152",
    "couch_đi văng_153",
    "cricket ball_quả bóng cricket_154",
    "winter melon_bí đao_155",
    "spatula_thìa trộn_156",
    "whiteboard_bảng trắng_157",
    "pencil sharpener_gọt bút chì_158",
    "door_cửa_159",
    "hat_mũ_160",
    "shower_vòi sen_161",
    "eraser_cục tẩy_162",
    "fedora_mũ phớt_163",
    "guacamole_món bơ guacamole_164",
    "dagger_dao găm_165",
    "scarf_khăn quàng cổ_166",
    "dolphin_cá heo_167",
    "sombrero_mũ rộng vành_168",
    "tin can_lon thiếc_169",
    "mug_cốc_170",
    "tap_vòi nước_171",
    "harbor seal_con dấu bến cảng_172",
    "stretcher_cáng_173",
    "can opener_cái mở hộp_174",
    "goggles_kính bảo hộ_175",
    "human body_cơ thể con người_176",
    "roller skates_giày trượt patin_177",
    "coffee cup_tách cà phê_178",
    "cutting board_thớt_179",
    "blender_máy xay sinh tố_180",
    "plumbing fixture_đầu nối ống nước_181",
    "stop sign_biển báo dừng_182",
    "office supplies_văn phòng phẩm_183",
    "volleyball_bóng chuyền_184",
    "vase_lọ cắm hoa_185",
    "slow cooker_nồi nấu chậm_186",
    "wardrobe_tủ quần áo_187",
    "coffee_cà phê_188",
    "whisk_dụng cụ đánh trứng_189",
    "paper towel_khăn giấy_190",
    "personal care_dung dịch chăm sóc cá nhân_191",
    "food_đồ ăn_192",
    "sun hat_mũ chống nắng_193",
    "tree house_nhà trên cây_194",
    "flying disc_đĩa bay_195",
    "skirt_váy ngắn_196",
    "gas stove_bếp gas_197",
    "salt and pepper shakers_máy lắc muối và hạt tiêu_198",
    "mechanical fan_quạt cơ khí_199",
    "face powder_phấn phủ_200",
    "fax_fax_201",
    "fruit_hoa quả_202",
    "french fries_khoai tây chiên_203",
    "nightstand_tủ đầu giường_204",
    "barrel_thùng_205",
    "kite_diều_206",
    "tart_bánh tart_207",
    "treadmill_máy chạy bộ_208",
    "fox_cáo_209",
    "flag_lá cờ_210",
    "horn_sừng_211",
    "window blind_rèm cửa sổ_212",
    "human foot_chân người_213",
    "golf cart_xe golf_214",
    "jacket_áo khoác_215",
    "egg_trứng_216",
    "street light_đèn đường_217",
    "guitar_đàn ghi-ta_218",
    "pillow_cái gối_219",
    "human leg_chân người_220",
    "isopod_động vật bộ chân đều_221",
    "grape_quả nho_222",
    "human ear_tai người_223",
    "power plugs and sockets_phích cắm và ổ cắm điện_224",
    "panda_gấu trúc_225",
    "giraffe_hươu cao cổ_226",
    "woman_đàn bà_227",
    "door handle_tay nắm cửa_228",
    "rhinoceros_tê giác_229",
    "bathtub_bồn tắm_230",
    "goldfish_cá vàng_231",
    "houseplant_cây cảnh_232",
    "goat_con dê_233",
    "baseball bat_gậy bóng chày_234",
    "baseball glove_găng tay bóng chày_235",
    "mixing bowl_bát trộn_236",
    "marine invertebrates_động vật biển không xương sống_237",
    "kitchen utensil_dụng cụ nhà bếp_238",
    "light switch_công tắc đèn_239",
    "house_căn nhà_240",
    "horse_ngựa_241",
    "stationary bicycle_máy tập xe đạp_242",
    "hammer_cái búa_243",
    "ceiling fan_quạt trần_244",
    "sofa bed_giường sofa_245",
    "adhesive tape_băng dính_246",
    "harp_đàn hạc_247",
    "sandal_dép xăng đan_248",
    "bicycle helmet_mũ bảo hiểm xe đạp_249",
    "saucer_cái đĩa_250",
    "harpsichord_đàn harpsichord_251",
    "human hair_tóc con người_252",
    "heater_lò sưởi_253",
    "harmonica_kèn harmonica_254",
    "hamster_chuột đồng hamster_255",
    "curtain_tấm màn_256",
    "bed_giường_257",
    "kettle_ấm đun nước_258",
    "fireplace_lò sưởi_259",
    "scale_cái cân_260",
    "drinking straw_ống hút_261",
    "insect_côn trùng_262",
    "hair dryer_máy sấy tóc_263",
    "kitchenware_đồ dùng nhà bếp_264",
    "indoor rower_máy tập kéo cáp_265",
    "invertebrate_động vật không xương sống_266",
    "food processor_máy xay thực phẩm_267",
    "bookcase_tủ sách_268",
    "refrigerator_tủ lạnh_269",
    "wood-burning stove_bếp đốt củi_270",
    "punching bag_túi đấm_271",
    "common fig_quả sung_272",
    "cocktail shaker_bình lắc cocktail_273",
    "jaguar_báo đốm_274",
    "golf ball_quả bóng golf_275",
    "fashion accessory_phụ kiện thời trang_276",
    "alarm clock_đồng hồ báo thức_277",
    "filing cabinet_tủ hồ sơ_278",
    "artichoke_bông atiso_279",
    "table_bàn_280",
    "tableware_bộ đồ ăn_281",
    "kangaroo_chuột túi_282",
    "koala_koala_283",
    "knife_dao_284",
    "bottle_cái chai_285",
    "bottle opener_cái mở chai_286",
    "lynx_linh miêu_287",
    "lavender_hoa oải hương_288",
    "lighthouse_ngọn hải đăng_289",
    "dumbbell_tạ đơn_290",
    "human head_đầu người_291",
    "bowl_cái bát_292",
    "humidifier_máy tạo độ ẩm_293",
    "porch_hiên nhà_294",
    "lizard_thằn lằn_295",
    "billiard table_bàn bida_296",
    "mammal_động vật có vú_297",
    "mouse_chuột_298",
    "motorcycle_xe gắn máy_299",
    "musical instrument_nhạc cụ_300",
    "swim cap_mũ bơi_301",
    "frying pan_chảo rán_302",
    "snowplow_đồ dọn tuyết_303",
    "bathroom cabinet_tủ phòng tắm_304",
    "missile_tên lửa_305",
    "bust_tượng bán thân_306",
    "man_người đàn ông_307",
    "waffle iron_chảo điện làm bánh quế_308",
    "milk_sữa_309",
    "ring binder_bìa kẹp hồ sơ lò xo_310",
    "plate_đĩa_311",
    "mobile phone_điện thoại di động_312",
    "baked goods_đồ nướng_313",
    "mushroom_nấm_314",
    "crutch_cái nạng_315",
    "pitcher_cái bình_316",
    "mirror_gương_317",
    "lifejacket_áo phao_318",
    "table tennis racket_vợt bóng bàn_319",
    "pencil case_hộp bút chì_320",
    "musical keyboard_bàn phím âm nhạc_321",
    "scoreboard_bảng điểm_322",
    "briefcase_cặp đựng tài liệu / vali_323",
    "kitchen knife_con dao làm bếp_324",
    "nail_móng tay_325",
    "tennis ball_quả bóng tennis_326",
    "plastic bag_túi nhựa_327",
    "oboe_kèn ô-boa_328",
    "chest of drawers_tủ ngăn kéo_329",
    "ostrich_đà điểu_330",
    "piano_đàn piano_331",
    "girl_con gái_332",
    "plant_thực vật_333",
    "potato_khoai tây_334",
    "hair spray_keo xịt tóc_335",
    "sports equipment_thiết bị thể thao_336",
    "pasta_mì ống_337",
    "penguin_chim cánh cụt_338",
    "pumpkin_bí ngô_339",
    "pear_quả lê_340",
    "infant bed_giường trẻ sơ sinh_341",
    "polar bear_gấu bắc cực_342",
    "mixer_máy trộn_343",
    "cupboard_cái tủ_344",
    "jacuzzi_bể sục_345",
    "pizza_pizza_346",
    "digital clock_đồng hồ kỹ thuật số_347",
    "pig_con lợn_348",
    "reptile_loài bò sát_349",
    "rifle_súng trường_350",
    "lipstick_cây son_351",
    "skateboard_ván trượt_352",
    "raven_con quạ_353",
    "high heels_giày cao gót_354",
    "red panda_gấu trúc đỏ_355",
    "rose_hoa hồng_356",
    "rabbit_con thỏ_357",
    "sculpture_điêu khắc_358",
    "saxophone_saxophone_359",
    "shotgun_súng bắn đạn ghém_360",
    "seafood_hải sản_361",
    "submarine sandwich_bánh mì dài kẹp thịt_362",
    "snowboard_ván trượt tuyết_363",
    "sword_gươm_364",
    "picture frame_khung tranh_365",
    "sushi_sushi_366",
    "loveseat_ghế yêu_367",
    "ski_trượt tuyết_368",
    "squirrel_con sóc_369",
    "tripod_chân máy_370",
    "stethoscope_ống nghe_371",
    "submarine_tàu ngầm_372",
    "scorpion_bọ cạp_373",
    "segway_xe segway (xe điện 2 bánh)_374",
    "training bench_ghế tập đa năng_375",
    "snake_rắn_376",
    "coffee table_bàn cà phê_377",
    "skyscraper_tòa nhà chọc trời_378",
    "sheep_con cừu_379",
    "television_tivi_380",
    "trombone_kèn trombone_381",
    "tea_trà_382",
    "tank_xe tăng_383",
    "taco_taco_384",
    "telephone_điện thoại_385",
    "torch_ngọn đuốc_386",
    "tiger_con hổ_387",
    "strawberry_quả dâu_388",
    "trumpet_kèn_389",
    "tree_cây_390",
    "tomato_cà chua_391",
    "train_xe lửa_392",
    "tool_dụng cụ_393",
    "picnic basket_giỏ dã ngoại_394",
    "cooking spray_bình xịt nấu ăn_395",
    "trousers_quần dài_396",
    "bowling equipment_thiết bị chơi bowling_397",
    "football helmet_mũ bảo hiểm bóng đá_398",
    "truck_xe tải_399",
    "measuring cup_cốc đong_400",
    "coffeemaker_máy pha cà phê_401",
    "violin_violin_402",
    "vehicle_phương tiện giao thông_403",
    "handbag_túi xách_404",
    "paper cutter_máy cắt giấy_405",
    "wine_rượu _406",
    "weapon_vũ khí_407",
    "wheel_bánh xe_408",
    "worm_sâu_409",
    "wok_chảo lòng sâu_410",
    "whale_cá voi_411",
    "zebra_ngựa vằn_412",
    "auto part_phụ tùng ô tô_413",
    "jug_cái bình_414",
    "pizza cutter_máy cắt bánh pizza_415",
    "cream_kem_416",
    "monkey_con khỉ_417",
    "lion_con sư tử_418",
    "bread_bánh mỳ_419",
    "platter_khay/đĩa lớn/mâm_420",
    "chicken_thịt gà_421",
    "eagle_chim ưng_422",
    "helicopter_trực thăng_423",
    "owl_con cú_424",
    "duck_con vịt_425",
    "turtle_con rùa_426",
    "hippopotamus_hà mã_427",
    "crocodile_cá sấu_428",
    "toilet_nhà vệ sinh_429",
    "toilet paper_giấy vệ sinh_430",
    "squid_mực_431",
    "clothing_quần áo_432",
    "footwear_giày dép_433",
    "lemon_chanh vàng_434",
    "spider_nhện_435",
    "deer_con nai_436",
    "frog_con ếch_437",
    "banana_chuối_438",
    "rocket_tên lửa_439",
    "wine glass_ly rượu_440",
    "countertop_mặt bàn_441",
    "tablet computer_máy tính bảng_442",
    "waste container_thùng chứa chất thải_443",
    "swimming pool_bể bơi_444",
    "dog_chó_445",
    "book_sách_446",
    "elephant_con voi_447",
    "shark_cá mập_448",
    "candle_nến_449",
    "leopard_báo đốm/ báo hoa mai_450",
    "axe_rìu_451",
    "hand dryer_máy sấy tay_452",
    "soap dispenser_hộp đựng xà phòng_453",
    "porcupine_con nhím_454",
    "flower_hoa_455",
    "canary_chim hoàng yến_456",
    "cheetah_báo săn mồi_457",
    "palm tree_cây cọ_458",
    "hamburger_bánh hamburger_459",
    "maple_cây phong_460",
    "building_xây dựng_461",
    "fish_cá_462",
    "lobster_tôm_463",
    "asparagus_măng tây_464",
    "furniture_nội thất_465",
    "hedgehog_con nhím_466",
    "airplane_máy bay_467",
    "spoon_thìa_468",
    "otter_rái cá_469",
    "bull_con bò đực_470",
    "oyster_hàu_471",
    "horizontal bar_thanh ngang_472",
    "convenience store_cửa hàng tiện lợi_473",
    "bomb_bom_474",
    "bench_băng ghế dự bị_475",
    "ice cream_kem_476",
    "caterpillar_sâu bướm_477",
    "butterfly_bươm bướm_478",
    "parachute_dù nhảy_479",
    "orange_quả cam_480",
    "antelope_linh dương_481",
    "beaker_cốc thủy tinh_482",
    "moths and butterflies_bướm đêm và bướm_483",
    "window_cửa sổ_484",
    "closet_phòng chứa đồ_485",
    "castle_lâu đài _486",
    "jellyfish_sứa_487",
    "goose_ngỗng_488",
    "mule_con la_489",
    "swan_thiên nga_490",
    "peach_quả đào_491",
    "coconut_dừa_492",
    "seat belt_dây an toàn_493",
    "raccoon_gấu mèo_494",
    "chisel_cái đục_495",
    "fork_cái nĩa_496",
    "lamp_đèn_497",
    "camera_máy ảnh_498",
    "squash_bí ngô_499",
    "racket_vợt_500",
    "human face_khuôn mặt con người_501",
    "human arm_cánh tay con người_502",
    "vegetable_rau quả_503",
    "diaper_tã lót_504",
    "unicycle_xe đạp một bánh_505",
    "falcon_chim ưng_506",
    "chime_bộ chuông_507",
    "snail_ốc sên_508",
    "shellfish_động vật có vỏ_509",
    "cabbage_bắp cải_510",
    "carrot_cà rốt_511",
    "mango_quả xoài_512",
    "jeans_quần jean_513",
    "flowerpot_lọ hoa_514",
    "pineapple_quả dứa_515",
    "drawer_ngăn kéo_516",
    "stool_ghế đẩu_517",
    "envelope_phong bì_518",
    "cake_bánh ngọt_519",
    "dragonfly_chuồn chuồn_520",
    "sunflower_hoa hướng dương_521",
    "microwave oven_lò vi sóng_522",
    "honeycomb_tổ ong_523",
    "marine mammal_động vật có vú biển_524",
    "sea lion_sư tử biển_525",
    "ladybug_bọ rùa_526",
    "shelf_cái kệ_527",
    "watch_đồng hồ _528",
    "candy_kẹo_529",
    "salad_xa lát_530",
    "parrot_con vẹt_531",
    "handgun_súng ngắn_532",
    "sparrow_chim sẻ_533",
    "van_xe tải_534",
    "grinder_máy xay / máy nghiền_535",
    "spice rack_giá đựng gia vị_536",
    "light bulb_bóng đèn_537",
    "corded phone_điện thoại có dây_538",
    "sports uniform_đồng phục thể thao_539",
    "tennis racket_vợt tennis_540",
    "wall clock_đồng hồ treo tường_541",
    "serving tray_khay phục vụ_542",
    "kitchen & dining room table_bàn bếp và phòng ăn_543",
    "dog bed_giường cho chó_544",
    "cake stand_quầy bánh_545",
    "cat furniture_đồ nội thất cho mèo_546",
    "bathroom accessory_vật dụng nhà tắm_547",
    "facial tissue holder_hộp đựng khăn giấy_548",
    "pressure cooker_nồi áp suất_549",
    "kitchen appliance_thiết bị nhà bếp_550",
    "tire_lốp xe_551",
    "ruler_cái thước kẻ_552",
    "luggage and bags_hành lý và túi xách_553",
    "microphone_micro_554",
    "broccoli_bông cải xanh_555",
    "umbrella_chiếc ô_556",
    "pastry_bánh ngọt_557",
    "grapefruit_bưởi_558",
    "band-aid_băng dán cá nhân_559",
    "animal_động vật_560",
    "bell pepper_ớt chuông_561",
    "turkey_gà tây_562",
    "lily_hoa huệ_563",
    "pomegranate_quả lựu_564",
    "doughnut_bánh rán_565",
    "glasses_kính_566",
    "human nose_mũi người_567",
    "pen_cái bút_568",
    "ant_kiến_569",
    "car_xe hơi_570",
    "aircraft_phi cơ_571",
    "human hand_bàn tay con người_572",
    "skunk_chồn hôi_573",
    "teddy bear_gấu bông_574",
    "watermelon_dưa hấu_575",
    "cantaloupe_dưa gang_576",
    "dishwasher_máy rửa chén_577",
    "flute_sáo_578",
    "balance beam_cầu thăng bằng_579",
    "sandwich_sandwich_580",
    "shrimp_con tôm_581",
    "sewing machine_máy may_582",
    "binoculars_ống nhòm_583",
    "rays and skates_cá đuối_584",
    "ipod_máy nghe nhạc_585",
    "accordion_đàn accordion / đàn xếp_586",
    "willow_cây liễu_587",
    "crab_cua_588",
    "crown_vương miện_589",
    "seahorse_cá ngựa_590",
    "perfume_nước hoa_591",
    "alpaca_lạc đà alpaca_592",
    "taxi_taxi_593",
    "canoe_ca nô_594",
    "remote control_điều khiển từ xa_595",
    "wheelchair_xe lăn_596",
    "rugby ball_bóng bầu dục_597",
    "armadillo_họ thú có mai_598",
    "maracas_cái lắc maracas_599",
    "helmet_mũ bảo hiểm_600"
]

const colorList = [
    "red_rgb(255, 0, 0)_rgba(255, 0, 0, 0.5)",
    "orange_rgb(255, 165, 0)_rgba(255, 165, 0, 0.5)",
    "yellow_rgb(255, 255, 0)_rgba(255, 255, 0, 0.5)",
    "chartreuse green_rgb(223, 255, 0)_rgba(223, 255, 0, 0.5)",
    "green_rgb(0, 255, 0)_rgba(0, 255, 0, 0.5)",
    "spring green_rgb(0, 255, 127)_rgba(0, 255, 127, 0.5)",
    "CYAN_rgb(0, 255, 255)_rgba(0, 255, 255, 0.5)",
    "Azure_rgb(0, 127, 255)_rgba(0, 127, 255, 0.5)",
    "blue_rgb(0, 0, 255)_rgba(0, 0, 255, 0.5)",
    "violet_rgb(127, 0, 255)_rgba(127, 0, 255, 0.5)",
    "magenta_rgb(255, 0, 255)_rgba(255, 0, 255, 0.5)",
    "rose_rgb(255, 0, 127)_rgba(255, 0, 127, 0.5)",
    "black_rgb(0, 0, 0)_rgba(0, 0, 0, 0.3)",
    "white_rgb(255, 255, 255)_rgba(255, 255, 255, 0.5)",
    "gray_rgb(128, 128, 128)_rgba(128, 128, 128, 0.5)"
]

let filterObjectLabels = objectLabels
let chosenLabels = {}

let checkIconPath = ['../assets/icon/unchecked.png', '../assets/icon/check.png'] 

let objFilter = document.getElementById('obj-filter')
let objFilterList = document.getElementById('obj-filter-list')
let objFilterColor = document.getElementById('obj-filter-color')
let objFilterColorCancel = document.getElementById('obj-filter-color-cancel-icon')
let colorWrapper = document.getElementById("obj-filter-color-wrapper")
let multipleResultContainer = document.getElementById("multiple-results")
let toolbar = document.getElementById('tool-bar')

objFilterColorCancel.addEventListener("click", e => {
    objFilterColor.style.display = "none"
    while(colorWrapper.firstChild) colorWrapper.removeChild(colorWrapper.firstChild)
    multipleResultContainer.style.filter = 'none'
})

const handleInputChange = (e, type, idx) => {
    if(type === 'LQ') {
        chosenLabels[idx]["quantity"]["lower"] = e.target.value === "" ? null : e.target.value
    }

    if(type === 'UQ') {
        chosenLabels[idx]["quantity"]["upper"] = e.target.value === "" ? null : e.target.value
    }

    if(type === 'LP') {
        chosenLabels[idx]["proportion"]["lower"] = e.target.value === "" ? null : e.target.value
    }

    if(type === 'UP') {
        chosenLabels[idx]["proportion"]["upper"] = e.target.value === "" ? null : e.target.value
    }
}

const showColorInput = (colorShowDocument, idx) => {
    if (colorShowDocument.style.display === "none") colorShowDocument.style.display = "block"
    multipleResultContainer.style.filter = 'blur(4px)'

    colorList.forEach(colorItem => {
        const [colorLabel, colorRGB, colorRGBA] = colorItem.split("_")
        const colorItemDocument = document.createElement('div')
        colorItemDocument.id = `color-item-${colorLabel.toLowerCase().replace(/ /g, "_")}`
        colorItemDocument.className = "color-item"
        colorItemDocument.style.backgroundColor = chosenLabels[idx].color.has(colorLabel) ? colorRGBA : colorRGB
        colorItemDocument.style.border = chosenLabels[idx].color.has(colorLabel) ? "2px solid var(--primary-color-2)" : "none"
        colorItemDocument.addEventListener("click", e => {
            if(colorItemDocument.style.backgroundColor == colorRGB) {
                colorItemDocument.style.backgroundColor = colorRGBA
                colorItemDocument.style.border = "2px solid var(--primary-color-2)"
                chosenLabels[idx].color.add(colorLabel)
            } else {
                colorItemDocument.style.backgroundColor = colorRGB
                colorItemDocument.style.border = "none"
                chosenLabels[idx].color.delete(colorLabel)
            }
        })
        colorWrapper.appendChild(colorItemDocument)
   })

}

const showInput = (parentDocument, iconDocument, idx, label) => {
    parentDocument.removeChild(iconDocument)

    if (!(idx.toString() in chosenLabels)) {
        chosenLabels[idx] = {
            "label": label,
            "quantity": {
                "lower": null,
                "upper": null
            },
            "proportion": {
                "lower": null,
                "upper": null
            },
            "color": new Set()
        }
    }
    
    let lowerQuantity = document.createElement("input")
    lowerQuantity.setAttribute("type", "number")
    lowerQuantity.setAttribute("id", `obj-filter-LQ-${idx}`)
    lowerQuantity.setAttribute("class", "filter-item-input")
    lowerQuantity.setAttribute("min", 0)
    lowerQuantity.setAttribute("placeholder", "[LQ")
    lowerQuantity.value = chosenLabels[idx]['quantity']['lower']
    lowerQuantity.addEventListener('change', e => handleInputChange(e, 'LQ', idx))

    let upperQuantity = document.createElement("input")
    upperQuantity.setAttribute("type", "number")
    upperQuantity.setAttribute("id", `obj-filter-UQ-${idx}`)
    upperQuantity.setAttribute("class", "filter-item-input")
    upperQuantity.setAttribute("min", 0)
    upperQuantity.setAttribute("placeholder", "UQ]")
    upperQuantity.value = chosenLabels[idx]['quantity']['upper']
    upperQuantity.addEventListener('change', e => handleInputChange(e, 'UQ', idx))

    let lowerProportion = document.createElement("input")
    lowerProportion.setAttribute("type", "number")
    lowerProportion.setAttribute("id", `obj-filter-LP-${idx}`)
    lowerProportion.setAttribute("class", "filter-item-input")
    lowerProportion.setAttribute("min", 0)
    lowerProportion.setAttribute("max", 100)
    lowerProportion.setAttribute("placeholder", "[LP")
    lowerProportion.value = chosenLabels[idx]['proportion']['lower']
    lowerProportion.addEventListener('change', e => handleInputChange(e, 'LP', idx))

    let upperProportion = document.createElement("input")
    upperProportion.setAttribute("type", "number")
    upperProportion.setAttribute("id", `obj-filter-UP-${idx}`)
    upperProportion.setAttribute("class", "filter-item-input")
    upperProportion.setAttribute("min", 0)
    upperProportion.setAttribute("max", 100)
    upperProportion.setAttribute("placeholder", "UP]")
    upperProportion.value = chosenLabels[idx]['proportion']['upper']
    upperProportion.addEventListener('change', e => handleInputChange(e, 'UP', idx))

    let color = document.createElement("div")
    color.setAttribute("type", "color")
    color.setAttribute("id", `obj-filter-color-${idx}`)
    color.setAttribute("class", "filter-item-input filter-item-input-color")
    color.innerHTML = "Color"
    color.addEventListener('change', e => handleInputChange(e, 'color', idx))
    color.addEventListener('click', e => showColorInput(objFilterColor, idx))

    parentDocument.appendChild(lowerQuantity)
    parentDocument.appendChild(upperQuantity)
    parentDocument.appendChild(lowerProportion)
    parentDocument.appendChild(upperProportion)
    parentDocument.appendChild(color)

    let checkIcon = document.createElement("img")
    checkIcon.setAttribute("class", "filter-check-icon")
    checkIcon.setAttribute("src", checkIconPath[1])
    checkIcon.addEventListener('click', e => handleCheck(e, parentDocument, checkIcon, idx, label))

    parentDocument.appendChild(checkIcon)
}

const handleCheck = (e, parentDocument, iconDocument, idx, label) => {
    if(iconDocument.getAttribute("src") === checkIconPath[1]) {
        delete chosenLabels[idx]
        
        parentDocument.removeChild(document.getElementById(`obj-filter-LQ-${idx}`))
        parentDocument.removeChild(document.getElementById(`obj-filter-UQ-${idx}`))
        parentDocument.removeChild(document.getElementById(`obj-filter-LP-${idx}`))
        parentDocument.removeChild(document.getElementById(`obj-filter-UP-${idx}`))
        parentDocument.removeChild(document.getElementById(`obj-filter-color-${idx}`))

        iconDocument.setAttribute("src", checkIconPath[0])
    } else {
        showInput(parentDocument, iconDocument, idx, label)
    }
}

const showFilterItem = (labelList) => {
    
    while(objFilterList.lastChild) {
        objFilterList.removeChild(objFilterList.lastChild)
    }

    labelList.forEach(categoryLabel => {
        let [engLabel, vietLabel, objIdx] = categoryLabel.split("_")

        let objItem = document.createElement("span")
        objItem.setAttribute("class", "object-filter-item")
        objItem.innerHTML = engLabel.charAt(0).toUpperCase() + engLabel.slice(1) + " (" + vietLabel.charAt(0).toUpperCase() + vietLabel.slice(1) + ")"

        let checkIcon = document.createElement("img")
        checkIcon.setAttribute("class", "filter-check-icon")
        checkIcon.setAttribute("src", objIdx.toString() in chosenLabels ? checkIconPath[1] : checkIconPath[0])
        checkIcon.addEventListener('click', e => handleCheck(e, objItem, checkIcon, objIdx, engLabel))

        objItem.appendChild(checkIcon)
        objFilterList.appendChild(objItem)

        if(objIdx.toString() in chosenLabels) showInput(objItem, checkIcon, objIdx, engLabel)
    })
}

const search = (value) => {
    return objectLabels.filter((o) =>
        String(o).toLowerCase().includes(value.toLowerCase())
    )
}

showFilterItem(filterObjectLabels)

objFilter.addEventListener('input', e => {
    filterObjectLabels = search(objFilter.value)
    showFilterItem(filterObjectLabels)
})

let ObjFilterOnly = document.getElementById("obj-filter-only")
let checkOnly = false
ObjFilterOnly.addEventListener("click", e => {
    if (!checkOnly) showFilterItem(Object.keys(chosenLabels).map(idx => objectLabels[idx]))
    else showFilterItem(filterObjectLabels)
    checkOnly = !checkOnly
})

let ObjFilterClear = document.getElementById("obj-filter-clear")
ObjFilterClear.addEventListener("click", e => {
    for (let item in chosenLabels) delete chosenLabels[item]
    showFilterItem(filterObjectLabels)
})

export default chosenLabels