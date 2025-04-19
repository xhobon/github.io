// 多语言支持系统
class MultiLanguageSystem {
    constructor() {
        this.currentLanguage = 'zh'; // 默认语言：中文
        this.availableLanguages = ['zh', 'en', 'id']; // 支持的语言：中文、英文、印尼文
        this.translations = {}; // 翻译数据
        
        // 初始化
        this.init();
    }
    
    // 初始化
    init() {
        // 加载翻译数据
        this.loadTranslations();
        
        // 检测用户首选语言
        this.detectUserLanguage();
        
        // 应用当前语言
        this.applyLanguage(this.currentLanguage);
        
        // 初始化语言切换事件
        this.initLanguageSwitchEvents();
    }
    
    // 加载翻译数据
    loadTranslations() {
        // 中文翻译（基础语言，作为键值）
        this.translations.zh = {
            // 通用
            'site_name': 'Xhobon官方网站',
            'home': '首页',
            'products': '产品',
            'about': '关于我们',
            'contact': '联系我们',
            'search': '搜索',
            'login': '登录',
            'register': '注册',
            'cart': '购物车',
            'account': '我的账户',
            'logout': '退出登录',
            'language': '语言',
            
            // 导航菜单
            'nav_phone': '手机',
            'nav_tv': '电视',
            'nav_appliance': '家电',
            'nav_smart_device': '智能硬件',
            'nav_all_phones': '全部手机',
            'nav_new_arrival': '新品',
            'nav_bestseller': '热销机型',
            'nav_all_tvs': '全部电视',
            'nav_smart_tv': '智能电视',
            'nav_projector': '激光投影',
            'nav_all_appliances': '全部家电',
            'nav_air_conditioner': '空调',
            'nav_air_purifier': '净化器',
            'nav_all_smart_devices': '全部智能硬件',
            'nav_wearable': '穿戴设备',
            'nav_smart_home': '智能家居',
            
            // 首页
            'banner_title': '创新科技，改变生活',
            'banner_subtitle': '探索Xhobon最新产品系列',
            'banner_button': '立即购买',
            'featured_products': '精选产品',
            'new_arrivals': '新品上市',
            'bestsellers': '热销产品',
            'view_all': '查看全部',
            'flash_sale': '限时特惠',
            'ends_in': '结束倒计时',
            'days': '天',
            'hours': '小时',
            'minutes': '分钟',
            'seconds': '秒',
            'original_price': '原价',
            'current_price': '现价',
            'save': '节省',
            'add_to_cart': '加入购物车',
            'buy_now': '立即购买',
            'learn_more': '了解更多',
            
            // 产品页面
            'product_details': '产品详情',
            'specifications': '规格参数',
            'customer_reviews': '用户评价',
            'related_products': '相关产品',
            'description': '描述',
            'features': '特点',
            'in_the_box': '包装清单',
            'select_color': '选择颜色',
            'select_storage': '选择存储容量',
            'select_version': '选择版本',
            'quantity': '数量',
            'stock': '库存',
            'in_stock': '有货',
            'out_of_stock': '缺货',
            'shipping': '配送',
            'free_shipping': '免费配送',
            'estimated_delivery': '预计送达',
            'return_policy': '退换政策',
            'warranty': '保修',
            'share': '分享',
            
            // 购物车
            'shopping_cart': '购物车',
            'cart_empty': '购物车还是空的',
            'start_shopping': '去购物',
            'product_info': '商品信息',
            'unit_price': '单价',
            'subtotal': '小计',
            'select_all': '全选',
            'delete': '删除',
            'clear_cart': '清空购物车',
            'batch_delete': '批量删除',
            'selected_items': '已选择',
            'items': '件商品',
            'total': '合计',
            'checkout': '去结算',
            'continue_shopping': '继续购物',
            'you_may_also_like': '猜你喜欢',
            
            // 结算页面
            'checkout_title': '结算',
            'confirm_order': '确认订单',
            'payment': '支付',
            'complete': '完成',
            'shipping_address': '收货地址',
            'add_new_address': '添加新地址',
            'order_summary': '订单摘要',
            'items_total': '商品总价',
            'shipping_fee': '运费',
            'order_total': '应付总额',
            'payment_method': '支付方式',
            'shipping_method': '配送方式',
            'invoice_info': '发票信息',
            'no_invoice': '不开发票',
            'personal_invoice': '个人发票',
            'company_invoice': '公司发票',
            'submit_order': '提交订单',
            'agreement_text': '提交订单表示您同意',
            'user_agreement': '《用户协议》',
            'privacy_policy': '《隐私政策》',
            
            // 支付方式
            'alipay': '支付宝',
            'wechat_pay': '微信支付',
            'paypal': 'PayPal',
            'credit_card': '信用卡',
            'bank_transfer': '银行转账',
            'ovo': 'OVO',
            'gopay': 'GoPay',
            'dana': 'DANA',
            'confirm_payment': '确认支付',
            'cancel': '取消',
            
            // 物流跟踪
            'tracking_title': '物流跟踪',
            'enter_tracking_number': '请输入运单号',
            'track': '查询',
            'tracking_support_text': '支持顺丰、京东物流、DHL、FedEx、JNE、J&T Express、SiCepat等物流公司的运单号查询',
            'tracking_info': '物流信息',
            'logistics_company': '物流公司',
            'tracking_number': '运单号',
            'status': '状态',
            'faq': '常见问题',
            
            // 关于我们
            'about_us': '关于我们',
            'our_story': '我们的故事',
            'our_mission': '我们的使命',
            'our_vision': '我们的愿景',
            'our_values': '我们的价值观',
            'our_team': '我们的团队',
            'our_history': '发展历程',
            'join_us': '加入我们',
            'global_presence': '全球业务',
            'social_responsibility': '社会责任',
            
            // 会员系统
            'member_center': '会员中心',
            'my_orders': '我的订单',
            'my_points': '我的积分',
            'my_coupons': '我的优惠券',
            'my_favorites': '我的收藏',
            'my_reviews': '我的评价',
            'account_settings': '账户设置',
            'points_rule': '积分规则',
            'points_history': '积分记录',
            'points_exchange': '积分兑换',
            
            // 页脚
            'shopping_guide': '购物指南',
            'shopping_process': '购物流程',
            'member_introduction': '会员介绍',
            'common_questions': '常见问题',
            'delivery_methods': '配送方式',
            'delivery_range': '配送范围',
            'delivery_time': '配送时间',
            'delivery_fee': '配送费用',
            'payment_methods': '支付方式',
            'company_introduction': '公司介绍',
            'contact_us': '联系我们',
            'join_us_footer': '加入我们',
            'copyright': '版权所有',
            
            // 错误和提示
            'error': '错误',
            'success': '成功',
            'warning': '警告',
            'info': '提示',
            'loading': '加载中',
            'please_wait': '请稍候',
            'operation_success': '操作成功',
            'operation_failed': '操作失败',
            'confirm': '确认',
            'cancel_action': '取消',
            'yes': '是',
            'no': '否',
            'back': '返回',
            'next': '下一步',
            'previous': '上一步',
            'submit': '提交',
            'save': '保存',
            'edit': '编辑',
            'delete_confirm': '确定要删除吗？',
            'required_field': '必填字段',
            'invalid_input': '输入无效'
        };
        
        // 英文翻译
        this.translations.en = {
            // 通用
            'site_name': 'Xhobon Official Website',
            'home': 'Home',
            'products': 'Products',
            'about': 'About Us',
            'contact': 'Contact',
            'search': 'Search',
            'login': 'Login',
            'register': 'Register',
            'cart': 'Cart',
            'account': 'My Account',
            'logout': 'Logout',
            'language': 'Language',
            
            // 导航菜单
            'nav_phone': 'Phones',
            'nav_tv': 'TVs',
            'nav_appliance': 'Appliances',
            'nav_smart_device': 'Smart Devices',
            'nav_all_phones': 'All Phones',
            'nav_new_arrival': 'New Arrivals',
            'nav_bestseller': 'Bestsellers',
            'nav_all_tvs': 'All TVs',
            'nav_smart_tv': 'Smart TVs',
            'nav_projector': 'Laser Projectors',
            'nav_all_appliances': 'All Appliances',
            'nav_air_conditioner': 'Air Conditioners',
            'nav_air_purifier': 'Air Purifiers',
            'nav_all_smart_devices': 'All Smart Devices',
            'nav_wearable': 'Wearables',
            'nav_smart_home': 'Smart Home',
            
            // 首页
            'banner_title': 'Innovative Technology, Changing Lives',
            'banner_subtitle': 'Explore the latest Xhobon product lineup',
            'banner_button': 'Shop Now',
            'featured_products': 'Featured Products',
            'new_arrivals': 'New Arrivals',
            'bestsellers': 'Bestsellers',
            'view_all': 'View All',
            'flash_sale': 'Flash Sale',
            'ends_in': 'Ends in',
            'days': 'days',
            'hours': 'hours',
            'minutes': 'min',
            'seconds': 'sec',
            'original_price': 'Original Price',
            'current_price': 'Current Price',
            'save': 'Save',
            'add_to_cart': 'Add to Cart',
            'buy_now': 'Buy Now',
            'learn_more': 'Learn More',
            
            // 产品页面
            'product_details': 'Product Details',
            'specifications': 'Specifications',
            'customer_reviews': 'Customer Reviews',
            'related_products': 'Related Products',
            'description': 'Description',
            'features': 'Features',
            'in_the_box': 'In the Box',
            'select_color': 'Select Color',
            'select_storage': 'Select Storage',
            'select_version': 'Select Version',
            'quantity': 'Quantity',
            'stock': 'Stock',
            'in_stock': 'In Stock',
            'out_of_stock': 'Out of Stock',
            'shipping': 'Shipping',
            'free_shipping': 'Free Shipping',
            'estimated_delivery': 'Estimated Delivery',
            'return_policy': 'Return Policy',
            'warranty': 'Warranty',
            'share': 'Share',
            
            // 购物车
            'shopping_cart': 'Shopping Cart',
            'cart_empty': 'Your cart is empty',
            'start_shopping': 'Start Shopping',
            'product_info': 'Product Info',
            'unit_price': 'Unit Price',
            'subtotal': 'Subtotal',
            'select_all': 'Select All',
            'delete': 'Delete',
            'clear_cart': 'Clear Cart',
            'batch_delete': 'Batch Delete',
            'selected_items': 'Selected',
            'items': 'items',
            'total': 'Total',
            'checkout': 'Checkout',
            'continue_shopping': 'Continue Shopping',
            'you_may_also_like': 'You May Also Like',
            
            // 结算页面
            'checkout_title': 'Checkout',
            'confirm_order': 'Confirm Order',
            'payment': 'Payment',
            'complete': 'Complete',
            'shipping_address': 'Shipping Address',
            'add_new_address': 'Add New Address',
            'order_summary': 'Order Summary',
            'items_total': 'Items Total',
            'shipping_fee': 'Shipping Fee',
            'order_total': 'Order Total',
            'payment_method': 'Payment Method',
            'shipping_method': 'Shipping Method',
            'invoice_info': 'Invoice Information',
            'no_invoice': 'No Invoice',
            'personal_invoice': 'Personal Invoice',
            'company_invoice': 'Company Invoice',
            'submit_order': 'Submit Order',
            'agreement_text': 'By submitting your order, you agree to our',
            'user_agreement': 'User Agreement',
            'privacy_policy': 'Privacy Policy',
            
            // 支付方式
            'alipay': 'Alipay',
            'wechat_pay': 'WeChat Pay',
            'paypal': 'PayPal',
            'credit_card': 'Credit Card',
            'bank_transfer': 'Bank Transfer',
            'ovo': 'OVO',
            'gopay': 'GoPay',
            'dana': 'DANA',
            'confirm_payment': 'Confirm Payment',
            'cancel': 'Cancel',
            
            // 物流跟踪
            'tracking_title': 'Order Tracking',
            'enter_tracking_number': 'Enter tracking number',
            'track': 'Track',
            'tracking_support_text': 'Support tracking for SF Express, JD Logistics, DHL, FedEx, JNE, J&T Express, SiCepat, etc.',
            'tracking_info': 'Tracking Information',
            'logistics_company': 'Logistics Company',
            'tracking_number': 'Tracking Number',
            'status': 'Status',
            'faq': 'FAQ',
            
            // 关于我们
            'about_us': 'About Us',
            'our_story': 'Our Story',
            'our_mission': 'Our Mission',
            'our_vision': 'Our Vision',
            'our_values': 'Our Values',
            'our_team': 'Our Team',
            'our_history': 'Our History',
            'join_us': 'Join Us',
            'global_presence': 'Global Presence',
            'social_responsibility': 'Social Responsibility',
            
            // 会员系统
            'member_center': 'Member Center',
            'my_orders': 'My Orders',
            'my_points': 'My Points',
            'my_coupons': 'My Coupons',
            'my_favorites': 'My Favorites',
            'my_reviews': 'My Reviews',
            'account_settings': 'Account Settings',
            'points_rule': 'Points Rules',
            'points_history': 'Points History',
            'points_exchange': 'Points Exchange',
            
            // 页脚
            'shopping_guide': 'Shopping Guide',
            'shopping_process': 'Shopping Process',
            'member_introduction': 'Member Introduction',
            'common_questions': 'Common Questions',
            'delivery_methods': 'Delivery Methods',
            'delivery_range': 'Delivery Range',
            'delivery_time': 'Delivery Time',
            'delivery_fee': 'Delivery Fee',
            'payment_methods': 'Payment Methods',
            'company_introduction': 'Company Introduction',
            'contact_us': 'Contact Us',
            'join_us_footer': 'Join Us',
            'copyright': 'Copyright',
            
            // 错误和提示
            'error': 'Error',
            'success': 'Success',
            'warning': 'Warning',
            'info': 'Information',
            'loading': 'Loading',
            'please_wait': 'Please wait',
            'operation_success': 'Operation successful',
            'operation_failed': 'Operation failed',
            'confirm': 'Confirm',
            'cancel_action': 'Cancel',
            'yes': 'Yes',
            'no': 'No',
            'back': 'Back',
            'next': 'Next',
            'previous': 'Previous',
            'submit': 'Submit',
            'save': 'Save',
            'edit': 'Edit',
            'delete_confirm': 'Are you sure you want to delete?',
            'required_field': 'Required field',
            'invalid_input': 'Invalid input'
        };
        
        // 印尼文翻译
        this.translations.id = {
            // 通用
            'site_name': 'Situs Resmi Xhobon',
            'home': 'Beranda',
            'products': 'Produk',
            'about': 'Tentang Kami',
            'contact': 'Kontak',
            'search': 'Cari',
            'login': 'Masuk',
            'register': 'Daftar',
            'cart': 'Keranjang',
            'account': 'Akun Saya',
            'logout': 'Keluar',
            'language': 'Bahasa',
            
            // 导航菜单
            'nav_phone': 'Ponsel',
            'nav_tv': 'TV',
            'nav_appliance': 'Peralatan Rumah',
            'nav_smart_device': 'Perangkat Pintar',
            'nav_all_phones': 'Semua Ponsel',
            'nav_new_arrival': 'Produk Baru',
            'nav_bestseller': 'Terlaris',
            'nav_all_tvs': 'Semua TV',
            'nav_smart_tv': 'Smart TV',
            'nav_projector': 'Proyektor Laser',
            'nav_all_appliances': 'Semua Peralatan',
            'nav_air_conditioner': 'AC',
            'nav_air_purifier': 'Pembersih Udara',
            'nav_all_smart_devices': 'Semua Perangkat Pintar',
            'nav_wearable': 'Wearable',
            'nav_smart_home': 'Rumah Pintar',
            
            // 首页
            'banner_title': 'Teknologi Inovatif, Mengubah Kehidupan',
            'banner_subtitle': 'Jelajahi lini produk terbaru Xhobon',
            'banner_button': 'Beli Sekarang',
            'featured_products': 'Produk Unggulan',
            'new_arrivals': 'Produk Baru',
            'bestsellers': 'Produk Terlaris',
            'view_all': 'Lihat Semua',
            'flash_sale': 'Flash Sale',
            'ends_in': 'Berakhir dalam',
            'days': 'hari',
            'hours': 'jam',
            'minutes': 'menit',
            'seconds': 'detik',
            'original_price': 'Harga Asli',
            'current_price': 'Harga Sekarang',
            'save': 'Hemat',
            'add_to_cart': 'Tambah ke Keranjang',
            'buy_now': 'Beli Sekarang',
            'learn_more': 'Pelajari Lebih Lanjut',
            
            // 产品页面
            'product_details': 'Detail Produk',
            'specifications': 'Spesifikasi',
            'customer_reviews': 'Ulasan Pelanggan',
            'related_products': 'Produk Terkait',
            'description': 'Deskripsi',
            'features': 'Fitur',
            'in_the_box': 'Dalam Kotak',
            'select_color': 'Pilih Warna',
            'select_storage': 'Pilih Penyimpanan',
            'select_version': 'Pilih Versi',
            'quantity': 'Jumlah',
            'stock': 'Stok',
            'in_stock': 'Tersedia',
            'out_of_stock': 'Habis',
            'shipping': 'Pengiriman',
            'free_shipping': 'Gratis Ongkir',
            'estimated_delivery': 'Perkiraan Pengiriman',
            'return_policy': 'Kebijakan Pengembalian',
            'warranty': 'Garansi',
            'share': 'Bagikan',
            
            // 购物车
            'shopping_cart': 'Keranjang Belanja',
            'cart_empty': 'Keranjang Anda kosong',
            'start_shopping': 'Mulai Belanja',
            'product_info': 'Info Produk',
            'unit_price': 'Harga Satuan',
            'subtotal': 'Subtotal',
            'select_all': 'Pilih Semua',
            'delete': 'Hapus',
            'clear_cart': 'Kosongkan Keranjang',
            'batch_delete': 'Hapus Massal',
            'selected_items': 'Dipilih',
            'items': 'item',
            'total': 'Total',
            'checkout': 'Checkout',
            'continue_shopping': 'Lanjutkan Belanja',
            'you_may_also_like': 'Mungkin Anda Juga Suka',
            
            // 结算页面
            'checkout_title': 'Checkout',
            'confirm_order': 'Konfirmasi Pesanan',
            'payment': 'Pembayaran',
            'complete': 'Selesai',
            'shipping_address': 'Alamat Pengiriman',
            'add_new_address': 'Tambah Alamat Baru',
            'order_summary': 'Ringkasan Pesanan',
            'items_total': 'Total Barang',
            'shipping_fee': 'Biaya Pengiriman',
            'order_total': 'Total Pesanan',
            'payment_method': 'Metode Pembayaran',
            'shipping_method': 'Metode Pengiriman',
            'invoice_info': 'Informasi Faktur',
            'no_invoice': 'Tanpa Faktur',
            'personal_invoice': 'Faktur Pribadi',
            'company_invoice': 'Faktur Perusahaan',
            'submit_order': 'Kirim Pesanan',
            'agreement_text': 'Dengan mengirimkan pesanan, Anda menyetujui',
            'user_agreement': 'Perjanjian Pengguna',
            'privacy_policy': 'Kebijakan Privasi',
            
            // 支付方式
            'alipay': 'Alipay',
            'wechat_pay': 'WeChat Pay',
            'paypal': 'PayPal',
            'credit_card': 'Kartu Kredit',
            'bank_transfer': 'Transfer Bank',
            'ovo': 'OVO',
            'gopay': 'GoPay',
            'dana': 'DANA',
            'confirm_payment': 'Konfirmasi Pembayaran',
            'cancel': 'Batal',
            
            // 物流跟踪
            'tracking_title': 'Lacak Pesanan',
            'enter_tracking_number': 'Masukkan nomor pelacakan',
            'track': 'Lacak',
            'tracking_support_text': 'Mendukung pelacakan untuk SF Express, JD Logistics, DHL, FedEx, JNE, J&T Express, SiCepat, dll.',
            'tracking_info': 'Informasi Pelacakan',
            'logistics_company': 'Perusahaan Logistik',
            'tracking_number': 'Nomor Pelacakan',
            'status': 'Status',
            'faq': 'FAQ',
            
            // 关于我们
            'about_us': 'Tentang Kami',
            'our_story': 'Cerita Kami',
            'our_mission': 'Misi Kami',
            'our_vision': 'Visi Kami',
            'our_values': 'Nilai-Nilai Kami',
            'our_team': 'Tim Kami',
            'our_history': 'Sejarah Kami',
            'join_us': 'Bergabung dengan Kami',
            'global_presence': 'Kehadiran Global',
            'social_responsibility': 'Tanggung Jawab Sosial',
            
            // 会员系统
            'member_center': 'Pusat Anggota',
            'my_orders': 'Pesanan Saya',
            'my_points': 'Poin Saya',
            'my_coupons': 'Kupon Saya',
            'my_favorites': 'Favorit Saya',
            'my_reviews': 'Ulasan Saya',
            'account_settings': 'Pengaturan Akun',
            'points_rule': 'Aturan Poin',
            'points_history': 'Riwayat Poin',
            'points_exchange': 'Penukaran Poin',
            
            // 页脚
            'shopping_guide': 'Panduan Belanja',
            'shopping_process': 'Proses Belanja',
            'member_introduction': 'Pengenalan Anggota',
            'common_questions': 'Pertanyaan Umum',
            'delivery_methods': 'Metode Pengiriman',
            'delivery_range': 'Jangkauan Pengiriman',
            'delivery_time': 'Waktu Pengiriman',
            'delivery_fee': 'Biaya Pengiriman',
            'payment_methods': 'Metode Pembayaran',
            'company_introduction': 'Pengenalan Perusahaan',
            'contact_us': 'Hubungi Kami',
            'join_us_footer': 'Bergabung dengan Kami',
            'copyright': 'Hak Cipta',
            
            // 错误和提示
            'error': 'Kesalahan',
            'success': 'Berhasil',
            'warning': 'Peringatan',
            'info': 'Informasi',
            'loading': 'Memuat',
            'please_wait': 'Mohon tunggu',
            'operation_success': 'Operasi berhasil',
            'operation_failed': 'Operasi gagal',
            'confirm': 'Konfirmasi',
            'cancel_action': 'Batal',
            'yes': 'Ya',
            'no': 'Tidak',
            'back': 'Kembali',
            'next': 'Selanjutnya',
            'previous': 'Sebelumnya',
            'submit': 'Kirim',
            'save': 'Simpan',
            'edit': 'Edit',
            'delete_confirm': 'Apakah Anda yakin ingin menghapus?',
            'required_field': 'Bidang wajib diisi',
            'invalid_input': 'Input tidak valid'
        };
    }
    
    // 检测用户首选语言
    detectUserLanguage() {
        // 首先检查URL参数
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        
        if (langParam && this.availableLanguages.includes(langParam)) {
            this.currentLanguage = langParam;
            return;
        }
        
        // 然后检查localStorage
        const savedLang = localStorage.getItem('xhobon_language');
        
        if (savedLang && this.availableLanguages.includes(savedLang)) {
            this.currentLanguage = savedLang;
            return;
        }
        
        // 最后检查浏览器语言
        const browserLang = navigator.language.split('-')[0];
        
        if (this.availableLanguages.includes(browserLang)) {
            this.currentLanguage = browserLang;
            return;
        }
        
        // 默认使用中文
        this.currentLanguage = 'zh';
    }
    
    // 应用语言
    applyLanguage(lang) {
        if (!this.availableLanguages.includes(lang)) {
            console.error(`不支持的语言: ${lang}`);
            return;
        }
        
        // 保存当前语言
        this.currentLanguage = lang;
        localStorage.setItem('xhobon_language', lang);
        
        // 更新页面上的所有带有data-i18n属性的元素
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (this.translations[lang][key]) {
                element.textContent = this.translations[lang][key];
            }
        });
        
        // 更新页面上的所有带有data-i18n-placeholder属性的元素
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (this.translations[lang][key]) {
                element.placeholder = this.translations[lang][key];
            }
        });
        
        // 更新页面上的所有带有data-i18n-title属性的元素
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            if (this.translations[lang][key]) {
                element.title = this.translations[lang][key];
            }
        });
        
        // 更新页面标题
        const titleElement = document.querySelector('title');
        if (titleElement && titleElement.getAttribute('data-i18n')) {
            const key = titleElement.getAttribute('data-i18n');
            if (this.translations[lang][key]) {
                titleElement.textContent = this.translations[lang][key];
            }
        }
        
        // 更新语言选择器
        const languageDropdown = document.getElementById('languageDropdown');
        if (languageDropdown) {
            const langText = lang === 'zh' ? '中文' : (lang === 'en' ? 'English' : 'Bahasa Indonesia');
            languageDropdown.textContent = langText;
        }
        
        // 触发语言变更事件
        const event = new CustomEvent('languageChanged', { detail: { language: lang } });
        document.dispatchEvent(event);
    }
    
    // 初始化语言切换事件
    initLanguageSwitchEvents() {
        // 语言切换按钮点击事件
        document.querySelectorAll('.language-switch').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = button.getAttribute('data-lang');
                if (lang && this.availableLanguages.includes(lang)) {
                    this.applyLanguage(lang);
                }
            });
        });
        
        // 语言下拉菜单项点击事件
        document.querySelectorAll('.dropdown-item[data-lang]').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = item.getAttribute('data-lang');
                if (lang && this.availableLanguages.includes(lang)) {
                    this.applyLanguage(lang);
                }
            });
        });
    }
    
    // 获取翻译文本
    translate(key, lang = null) {
        const targetLang = lang || this.currentLanguage;
        
        if (!this.translations[targetLang] || !this.translations[targetLang][key]) {
            // 如果找不到翻译，返回键名或中文翻译
            return this.translations.zh[key] || key;
        }
        
        return this.translations[targetLang][key];
    }
    
    // 动态添加翻译
    addTranslation(key, translations) {
        for (const lang in translations) {
            if (this.availableLanguages.includes(lang) && this.translations[lang]) {
                this.translations[lang][key] = translations[lang];
            }
        }
    }
    
    // 获取当前语言
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    // 获取所有支持的语言
    getAvailableLanguages() {
        return this.availableLanguages;
    }
    
    // 获取语言名称
    getLanguageName(lang) {
        const names = {
            'zh': '中文',
            'en': 'English',
            'id': 'Bahasa Indonesia'
        };
        
        return names[lang] || lang;
    }
}

// 导出系统
window.XhobonSystems = window.XhobonSystems || {};
window.XhobonSystems.language = new MultiLanguageSystem();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('多语言系统已初始化');
});
