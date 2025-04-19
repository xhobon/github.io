// 支付和物流系统集成
class PaymentSystem {
    constructor() {
        this.availablePaymentMethods = [];
        this.initPaymentMethods();
    }
    
    // 初始化支付方式
    initPaymentMethods() {
        this.availablePaymentMethods = [
            {
                id: 'alipay',
                name: '支付宝',
                icon: 'alipay.png',
                description: '中国领先的移动支付平台',
                available: true,
                countries: ['CN', 'ID', 'MY', 'SG', 'TH'],
                fee: '0%',
                processingTime: '实时'
            },
            {
                id: 'wechat',
                name: '微信支付',
                icon: 'wechat.png',
                description: '中国流行的社交支付平台',
                available: true,
                countries: ['CN', 'ID', 'MY', 'SG', 'TH'],
                fee: '0%',
                processingTime: '实时'
            },
            {
                id: 'paypal',
                name: 'PayPal',
                icon: 'paypal.png',
                description: '全球知名的在线支付平台',
                available: true,
                countries: ['*'],
                fee: '3.9% + $0.30',
                processingTime: '实时'
            },
            {
                id: 'creditcard',
                name: '信用卡',
                icon: 'creditcard.png',
                description: '支持Visa、Mastercard、American Express等',
                available: true,
                countries: ['*'],
                fee: '2.5%',
                processingTime: '实时'
            },
            {
                id: 'ovo',
                name: 'OVO',
                icon: 'ovo.png',
                description: '印尼领先的数字支付平台',
                available: true,
                countries: ['ID'],
                fee: '1%',
                processingTime: '实时'
            },
            {
                id: 'gopay',
                name: 'GoPay',
                icon: 'gopay.png',
                description: '印尼流行的电子钱包',
                available: true,
                countries: ['ID'],
                fee: '1%',
                processingTime: '实时'
            },
            {
                id: 'dana',
                name: 'DANA',
                icon: 'dana.png',
                description: '印尼知名的数字支付服务',
                available: true,
                countries: ['ID'],
                fee: '1%',
                processingTime: '实时'
            },
            {
                id: 'banktransfer',
                name: '银行转账',
                icon: 'banktransfer.png',
                description: '支持多家银行',
                available: true,
                countries: ['*'],
                fee: '固定费用',
                processingTime: '1-3个工作日'
            }
        ];
    }
    
    // 获取所有可用的支付方式
    getAllPaymentMethods() {
        return this.availablePaymentMethods;
    }
    
    // 根据国家/地区获取可用的支付方式
    getPaymentMethodsByCountry(countryCode) {
        return this.availablePaymentMethods.filter(method => {
            return method.available && (method.countries.includes('*') || method.countries.includes(countryCode));
        });
    }
    
    // 获取特定支付方式的详细信息
    getPaymentMethodDetails(methodId) {
        return this.availablePaymentMethods.find(method => method.id === methodId);
    }
    
    // 处理支付
    processPayment(methodId, amount, currency, orderInfo) {
        // 在实际项目中，这里应该调用相应的支付API
        // 这里只是模拟支付过程
        console.log(`使用 ${methodId} 支付 ${amount} ${currency}`);
        console.log('订单信息:', orderInfo);
        
        // 模拟支付结果
        const success = Math.random() > 0.1; // 90%的概率支付成功
        
        if (success) {
            return {
                success: true,
                transactionId: 'TRX' + Date.now(),
                message: '支付成功',
                paymentTime: new Date().toISOString()
            };
        } else {
            return {
                success: false,
                message: '支付失败，请重试',
                errorCode: 'PAYMENT_FAILED'
            };
        }
    }
    
    // 生成支付表单HTML
    generatePaymentForm(methodId, amount, currency, orderInfo) {
        const method = this.getPaymentMethodDetails(methodId);
        if (!method) return '';
        
        let formHtml = `
            <div class="payment-form" id="payment-form-${methodId}">
                <h4>${method.name}支付</h4>
                <p class="text-muted">${method.description}</p>
                <div class="payment-amount mb-3">
                    <h5>支付金额: ${amount} ${currency}</h5>
                </div>
        `;
        
        // 根据不同的支付方式生成不同的表单
        switch (methodId) {
            case 'alipay':
                formHtml += `
                    <div class="alipay-qrcode text-center mb-3">
                        <div class="bg-light p-4 d-inline-block">
                            <p class="mb-0">支付宝二维码</p>
                        </div>
                        <p class="mt-2">请使用支付宝扫描二维码完成支付</p>
                    </div>
                `;
                break;
                
            case 'wechat':
                formHtml += `
                    <div class="wechat-qrcode text-center mb-3">
                        <div class="bg-light p-4 d-inline-block">
                            <p class="mb-0">微信支付二维码</p>
                        </div>
                        <p class="mt-2">请使用微信扫描二维码完成支付</p>
                    </div>
                `;
                break;
                
            case 'paypal':
                formHtml += `
                    <div class="paypal-button text-center mb-3">
                        <button class="btn btn-primary paypal-btn">使用PayPal支付</button>
                        <p class="mt-2">点击按钮将跳转到PayPal支付页面</p>
                    </div>
                `;
                break;
                
            case 'creditcard':
                formHtml += `
                    <div class="credit-card-form mb-3">
                        <div class="mb-3">
                            <label for="card-number" class="form-label">卡号</label>
                            <input type="text" class="form-control" id="card-number" placeholder="1234 5678 9012 3456">
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="card-expiry" class="form-label">有效期</label>
                                <input type="text" class="form-control" id="card-expiry" placeholder="MM/YY">
                            </div>
                            <div class="col-md-6">
                                <label for="card-cvv" class="form-label">CVV</label>
                                <input type="text" class="form-control" id="card-cvv" placeholder="123">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="card-name" class="form-label">持卡人姓名</label>
                            <input type="text" class="form-control" id="card-name" placeholder="John Doe">
                        </div>
                    </div>
                `;
                break;
                
            case 'ovo':
            case 'gopay':
            case 'dana':
                formHtml += `
                    <div class="ewallet-form mb-3">
                        <div class="mb-3">
                            <label for="${methodId}-phone" class="form-label">手机号码</label>
                            <input type="text" class="form-control" id="${methodId}-phone" placeholder="例如: 08123456789">
                        </div>
                    </div>
                `;
                break;
                
            case 'banktransfer':
                formHtml += `
                    <div class="bank-transfer-info mb-3">
                        <p>请使用以下银行账户信息进行转账：</p>
                        <div class="card">
                            <div class="card-body">
                                <p class="mb-1"><strong>银行名称:</strong> 示例银行</p>
                                <p class="mb-1"><strong>账户名称:</strong> Xhobon科技有限公司</p>
                                <p class="mb-1"><strong>账号:</strong> 1234 5678 9012 3456</p>
                                <p class="mb-1"><strong>转账金额:</strong> ${amount} ${currency}</p>
                                <p class="mb-0"><strong>转账备注:</strong> ${orderInfo.orderNumber}</p>
                            </div>
                        </div>
                        <p class="mt-2">完成转账后，请上传转账凭证：</p>
                        <div class="mb-3">
                            <input type="file" class="form-control" id="transfer-receipt">
                        </div>
                    </div>
                `;
                break;
        }
        
        formHtml += `
                <div class="payment-actions">
                    <button class="btn btn-xiaomi submit-payment-btn" data-method="${methodId}">确认支付</button>
                    <button class="btn btn-outline-secondary cancel-payment-btn">取消</button>
                </div>
            </div>
        `;
        
        return formHtml;
    }
    
    // 初始化支付表单事件
    initPaymentFormEvents() {
        // 提交支付按钮
        document.querySelectorAll('.submit-payment-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const methodId = btn.getAttribute('data-method');
                
                // 在实际项目中，这里应该获取表单数据并验证
                // 这里只是模拟支付过程
                const amount = document.querySelector('.payment-amount h5').textContent.split(' ')[1];
                const currency = document.querySelector('.payment-amount h5').textContent.split(' ')[2];
                const orderInfo = {
                    orderNumber: 'ORD' + Date.now(),
                    items: JSON.parse(localStorage.getItem('cart_items') || '[]')
                };
                
                const result = this.processPayment(methodId, amount, currency, orderInfo);
                
                if (result.success) {
                    alert('支付成功！订单号: ' + orderInfo.orderNumber);
                    // 在实际项目中，这里应该跳转到支付成功页面
                    window.location.href = 'payment-success.html?order=' + orderInfo.orderNumber;
                } else {
                    alert('支付失败: ' + result.message);
                }
            });
        });
        
        // 取消支付按钮
        document.querySelectorAll('.cancel-payment-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                // 在实际项目中，这里应该返回到结算页面
                window.location.href = 'checkout.html';
            });
        });
    }
}

class LogisticsSystem {
    constructor() {
        this.availableLogistics = [];
        this.initLogistics();
    }
    
    // 初始化物流服务
    initLogistics() {
        this.availableLogistics = [
            {
                id: 'sf',
                name: '顺丰速运',
                icon: 'sf.png',
                description: '中国领先的快递服务提供商',
                available: true,
                countries: ['CN'],
                services: [
                    { id: 'sf_standard', name: '标准快递', price: 15, estimatedDays: '1-3天' },
                    { id: 'sf_express', name: '特快专递', price: 25, estimatedDays: '1天' }
                ]
            },
            {
                id: 'jd',
                name: '京东物流',
                icon: 'jd.png',
                description: '京东自营物流服务',
                available: true,
                countries: ['CN'],
                services: [
                    { id: 'jd_standard', name: '标准快递', price: 12, estimatedDays: '2-4天' },
                    { id: 'jd_express', name: '211限时达', price: 20, estimatedDays: '1天' }
                ]
            },
            {
                id: 'dhl',
                name: 'DHL',
                icon: 'dhl.png',
                description: '全球知名的国际物流服务提供商',
                available: true,
                countries: ['*'],
                services: [
                    { id: 'dhl_standard', name: '标准快递', price: 80, estimatedDays: '3-7天' },
                    { id: 'dhl_express', name: '国际特快', price: 150, estimatedDays: '1-3天' }
                ]
            },
            {
                id: 'fedex',
                name: 'FedEx',
                icon: 'fedex.png',
                description: '全球领先的国际快递服务',
                available: true,
                countries: ['*'],
                services: [
                    { id: 'fedex_standard', name: '标准快递', price: 85, estimatedDays: '3-7天' },
                    { id: 'fedex_express', name: '国际特快', price: 160, estimatedDays: '1-3天' }
                ]
            },
            {
                id: 'jne',
                name: 'JNE',
                icon: 'jne.png',
                description: '印尼领先的物流服务提供商',
                available: true,
                countries: ['ID'],
                services: [
                    { id: 'jne_reg', name: '普通快递', price: 10, estimatedDays: '2-3天' },
                    { id: 'jne_yes', name: '次日达', price: 18, estimatedDays: '1天' }
                ]
            },
            {
                id: 'jnt',
                name: 'J&T Express',
                icon: 'jnt.png',
                description: '印尼知名的快递服务',
                available: true,
                countries: ['ID', 'MY', 'SG', 'TH', 'VN', 'PH'],
                services: [
                    { id: 'jnt_standard', name: '标准快递', price: 9, estimatedDays: '2-4天' },
                    { id: 'jnt_express', name: '特快专递', price: 16, estimatedDays: '1-2天' }
                ]
            },
            {
                id: 'sicepat',
                name: 'SiCepat',
                icon: 'sicepat.png',
                description: '印尼快速可靠的物流服务',
                available: true,
                countries: ['ID'],
                services: [
                    { id: 'sicepat_reg', name: '普通快递', price: 8, estimatedDays: '2-3天' },
                    { id: 'sicepat_best', name: '次日达', price: 15, estimatedDays: '1天' }
                ]
            }
        ];
    }
    
    // 获取所有可用的物流服务
    getAllLogistics() {
        return this.availableLogistics;
    }
    
    // 根据国家/地区获取可用的物流服务
    getLogisticsByCountry(countryCode) {
        return this.availableLogistics.filter(logistics => {
            return logistics.available && (logistics.countries.includes('*') || logistics.countries.includes(countryCode));
        });
    }
    
    // 获取特定物流服务的详细信息
    getLogisticsDetails(logisticsId) {
        return this.availableLogistics.find(logistics => logistics.id === logisticsId);
    }
    
    // 计算运费
    calculateShippingFee(logisticsId, serviceId, weight, fromCountry, toCountry) {
        const logistics = this.getLogisticsDetails(logisticsId);
        if (!logistics) return null;
        
        const service = logistics.services.find(s => s.id === serviceId);
        if (!service) return null;
        
        // 在实际项目中，这里应该根据重量、距离等因素计算运费
        // 这里只是使用服务的基础价格
        let fee = service.price;
        
        // 如果是国际物流，增加费用
        if (fromCountry !== toCountry) {
            fee *= 2;
        }
        
        // 根据重量调整费用
        fee += weight > 1 ? (weight - 1) * 5 : 0;
        
        return {
            logistics: logistics.name,
            service: service.name,
            fee: fee,
            currency: fromCountry === 'CN' ? 'CNY' : (toCountry === 'ID' ? 'IDR' : 'USD'),
            estimatedDays: service.estimatedDays
        };
    }
    
    // 跟踪物流
    trackShipment(trackingNumber) {
        // 在实际项目中，这里应该调用物流API查询物流状态
        // 这里只是模拟物流跟踪
        console.log(`跟踪物流: ${trackingNumber}`);
        
        // 模拟物流状态
        const statuses = [
            { status: 'pending', description: '等待揽收', time: '2025-04-15 10:00:00' },
            { status: 'collected', description: '已揽收', time: '2025-04-15 14:30:00' },
            { status: 'in_transit', description: '运输中', time: '2025-04-16 09:15:00' },
            { status: 'arrived', description: '已到达目的地', time: '2025-04-17 11:20:00' },
            { status: 'delivered', description: '已签收', time: '2025-04-17 16:45:00' }
        ];
        
        // 随机选择一个状态
        const randomIndex = Math.floor(Math.random() * statuses.length);
        const currentStatus = statuses.slice(0, randomIndex + 1);
        
        return {
            trackingNumber: trackingNumber,
            logistics: '示例物流',
            status: currentStatus[currentStatus.length - 1].status,
            statusDescription: currentStatus[currentStatus.length - 1].description,
            timeline: currentStatus
        };
    }
    
    // 生成物流选择HTML
    generateLogisticsOptions(countryCode) {
        const logistics = this.getLogisticsByCountry(countryCode);
        if (logistics.length === 0) return '<p>当前地区暂无可用的物流服务</p>';
        
        let optionsHtml = '<div class="logistics-options">';
        
        logistics.forEach(l => {
            optionsHtml += `
                <div class="logistics-option mb-3">
                    <div class="form-check">
                        <input class="form-check-input logistics-radio" type="radio" name="logistics" id="${l.id}" value="${l.id}">
                        <label class="form-check-label" for="${l.id}">
                            <div class="d-flex align-items-center">
                                <div class="logistics-icon me-2">
                                    <img src="images/${l.icon}" alt="${l.name}" width="40">
                                </div>
                                <div>
                                    <div class="logistics-name">${l.name}</div>
                                    <div class="logistics-desc text-muted">${l.description}</div>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div class="logistics-services ms-4 mt-2 d-none" id="services-${l.id}">
            `;
            
            l.services.forEach(s => {
                optionsHtml += `
                    <div class="form-check mb-2">
                        <input class="form-check-input service-radio" type="radio" name="service-${l.id}" id="${s.id}" value="${s.id}" data-price="${s.price}" data-days="${s.estimatedDays}">
                        <label class="form-check-label" for="${s.id}">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <div class="service-name">${s.name}</div>
                                    <div class="service-days text-muted">预计 ${s.estimatedDays}</div>
                                </div>
                                <div class="service-price">¥${s.price}</div>
                            </div>
                        </label>
                    </div>
                `;
            });
            
            optionsHtml += `
                    </div>
                </div>
            `;
        });
        
        optionsHtml += '</div>';
        
        return optionsHtml;
    }
    
    // 初始化物流选择事件
    initLogisticsEvents() {
        // 物流服务选择
        document.querySelectorAll('.logistics-radio').forEach(radio => {
            radio.addEventListener('change', function() {
                // 隐藏所有服务选项
                document.querySelectorAll('.logistics-services').forEach(el => {
                    el.classList.add('d-none');
                });
                
                // 显示选中物流的服务选项
                const servicesEl = document.getElementById('services-' + this.value);
                if (servicesEl) {
                    servicesEl.classList.remove('d-none');
                    
                    // 默认选中第一个服务
                    const firstService = servicesEl.querySelector('.service-radio');
                    if (firstService) {
                        firstService.checked = true;
                        
                        // 触发服务选择事件
                        const event = new Event('change');
                        firstService.dispatchEvent(event);
                    }
                }
            });
        });
        
        // 服务选择
        document.querySelectorAll('.service-radio').forEach(radio => {
            radio.addEventListener('change', function() {
                const price = this.getAttribute('data-price');
                const days = this.getAttribute('data-days');
                
                // 更新运费显示
                const shippingFeeEl = document.getElementById('shipping-fee');
                if (shippingFeeEl) {
                    shippingFeeEl.textContent = '¥' + price;
                }
                
                // 更新预计送达时间
                const estimatedDaysEl = document.getElementById('estimated-days');
                if (estimatedDaysEl) {
                    estimatedDaysEl.textContent = days;
                }
                
                // 更新订单总金额
                updateOrderTotal();
            });
        });
        
        // 更新订单总金额
        function updateOrderTotal() {
            const subtotalEl = document.getElementById('order-subtotal');
            const shippingFeeEl = document.getElementById('shipping-fee');
            
            if (subtotalEl && shippingFeeEl) {
                const subtotal = parseFloat(subtotalEl.textContent.replace('¥', ''));
                const shippingFee = parseFloat(shippingFeeEl.textContent.replace('¥', ''));
                
                const totalEl = document.getElementById('order-total');
                if (totalEl) {
                    totalEl.textContent = '¥' + (subtotal + shippingFee).toFixed(2);
                }
            }
        }
        
        // 默认选中第一个物流
        const firstLogistics = document.querySelector('.logistics-radio');
        if (firstLogistics) {
            firstLogistics.checked = true;
            
            // 触发物流选择事件
            const event = new Event('change');
            firstLogistics.dispatchEvent(event);
        }
    }
    
    // 生成物流跟踪HTML
    generateTrackingHTML(trackingInfo) {
        if (!trackingInfo) return '<p>未找到物流信息</p>';
        
        let trackingHtml = `
            <div class="tracking-info">
                <div class="tracking-header mb-4">
                    <h4>物流跟踪</h4>
                    <div class="d-flex justify-content-between">
                        <div>
                            <p class="mb-1"><strong>物流公司:</strong> ${trackingInfo.logistics}</p>
                            <p class="mb-0"><strong>运单号:</strong> ${trackingInfo.trackingNumber}</p>
                        </div>
                        <div>
                            <span class="badge bg-${getStatusBadgeColor(trackingInfo.status)}">${trackingInfo.statusDescription}</span>
                        </div>
                    </div>
                </div>
                
                <div class="tracking-timeline">
        `;
        
        trackingInfo.timeline.forEach((item, index) => {
            trackingHtml += `
                <div class="tracking-item ${index === trackingInfo.timeline.length - 1 ? 'active' : ''}">
                    <div class="tracking-dot"></div>
                    <div class="tracking-content">
                        <div class="tracking-time">${item.time}</div>
                        <div class="tracking-desc">${item.description}</div>
                    </div>
                </div>
            `;
        });
        
        trackingHtml += `
                </div>
            </div>
        `;
        
        return trackingHtml;
        
        // 获取状态对应的徽章颜色
        function getStatusBadgeColor(status) {
            switch (status) {
                case 'pending':
                    return 'secondary';
                case 'collected':
                    return 'info';
                case 'in_transit':
                    return 'primary';
                case 'arrived':
                    return 'warning';
                case 'delivered':
                    return 'success';
                default:
                    return 'secondary';
            }
        }
    }
}

// 结算页面功能
class CheckoutSystem {
    constructor() {
        this.paymentSystem = new PaymentSystem();
        this.logisticsSystem = new LogisticsSystem();
        this.cartItems = [];
        this.userInfo = {};
        this.addressInfo = {};
        this.selectedPaymentMethod = '';
        this.selectedLogistics = '';
        this.selectedService = '';
    }
    
    // 初始化结算页面
    initCheckoutPage() {
        // 加载购物车商品
        this.loadCartItems();
        
        // 加载用户信息
        this.loadUserInfo();
        
        // 加载地址信息
        this.loadAddressInfo();
        
        // 加载支付方式
        this.loadPaymentMethods();
        
        // 加载物流选项
        this.loadLogisticsOptions();
        
        // 初始化事件
        this.initEvents();
    }
    
    // 加载购物车商品
    loadCartItems() {
        // 在实际项目中，这里应该从服务器获取购物车数据
        // 这里从localStorage模拟获取
        const cartItemsStr = localStorage.getItem('cart_items');
        this.cartItems = cartItemsStr ? JSON.parse(cartItemsStr) : [];
        
        const cartListEl = document.getElementById('checkout-cart-list');
        if (!cartListEl) return;
        
        if (this.cartItems.length === 0) {
            cartListEl.innerHTML = '<p>购物车为空</p>';
            return;
        }
        
        let cartHtml = '';
        let subtotal = 0;
        
        this.cartItems.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            cartHtml += `
                <div class="checkout-item mb-3">
                    <div class="row align-items-center">
                        <div class="col-2">
                            <div class="checkout-item-image">
                                <div class="bg-light" style="width: 60px; height: 60px;"></div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="checkout-item-info">
                                <h6 class="checkout-item-title mb-1">${item.name}</h6>
                                <p class="checkout-item-desc text-muted mb-0">${item.options}</p>
                            </div>
                        </div>
                        <div class="col-2 text-center">
                            <div class="checkout-item-quantity">x${item.quantity}</div>
                        </div>
                        <div class="col-2 text-end">
                            <div class="checkout-item-price">¥${itemTotal.toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        cartListEl.innerHTML = cartHtml;
        
        // 更新小计
        const subtotalEl = document.getElementById('order-subtotal');
        if (subtotalEl) {
            subtotalEl.textContent = '¥' + subtotal.toFixed(2);
        }
    }
    
    // 加载用户信息
    loadUserInfo() {
        // 在实际项目中，这里应该从服务器获取用户数据
        // 这里模拟用户数据
        this.userInfo = {
            id: 'user123',
            name: '张三',
            email: 'zhangsan@example.com',
            phone: '13800138000'
        };
        
        // 显示用户信息
        const userNameEl = document.getElementById('user-name');
        if (userNameEl) {
            userNameEl.textContent = this.userInfo.name;
        }
        
        const userEmailEl = document.getElementById('user-email');
        if (userEmailEl) {
            userEmailEl.textContent = this.userInfo.email;
        }
        
        const userPhoneEl = document.getElementById('user-phone');
        if (userPhoneEl) {
            userPhoneEl.textContent = this.userInfo.phone;
        }
    }
    
    // 加载地址信息
    loadAddressInfo() {
        // 在实际项目中，这里应该从服务器获取地址数据
        // 这里模拟地址数据
        this.addressInfo = {
            id: 'addr123',
            name: '张三',
            phone: '13800138000',
            province: '广东省',
            city: '深圳市',
            district: '南山区',
            address: '科技园南区高新南四道W1栋',
            zipcode: '518057',
            isDefault: true
        };
        
        // 显示地址信息
        const addressNameEl = document.getElementById('address-name');
        if (addressNameEl) {
            addressNameEl.textContent = this.addressInfo.name;
        }
        
        const addressPhoneEl = document.getElementById('address-phone');
        if (addressPhoneEl) {
            addressPhoneEl.textContent = this.addressInfo.phone;
        }
        
        const addressDetailEl = document.getElementById('address-detail');
        if (addressDetailEl) {
            addressDetailEl.textContent = `${this.addressInfo.province} ${this.addressInfo.city} ${this.addressInfo.district} ${this.addressInfo.address} ${this.addressInfo.zipcode}`;
        }
    }
    
    // 加载支付方式
    loadPaymentMethods() {
        const paymentMethodsEl = document.getElementById('payment-methods');
        if (!paymentMethodsEl) return;
        
        const methods = this.paymentSystem.getAllPaymentMethods();
        
        let methodsHtml = '';
        
        methods.forEach(method => {
            methodsHtml += `
                <div class="payment-method-item mb-3">
                    <div class="form-check">
                        <input class="form-check-input payment-method-radio" type="radio" name="paymentMethod" id="${method.id}" value="${method.id}">
                        <label class="form-check-label" for="${method.id}">
                            <div class="d-flex align-items-center">
                                <div class="payment-icon me-2">
                                    <img src="images/${method.icon}" alt="${method.name}" width="40">
                                </div>
                                <div>
                                    <div class="payment-name">${method.name}</div>
                                    <div class="payment-desc text-muted">${method.description}</div>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
            `;
        });
        
        paymentMethodsEl.innerHTML = methodsHtml;
    }
    
    // 加载物流选项
    loadLogisticsOptions() {
        const logisticsOptionsEl = document.getElementById('logistics-options');
        if (!logisticsOptionsEl) return;
        
        // 根据收货地址国家/地区获取物流选项
        // 这里假设是中国
        const countryCode = 'CN';
        
        const logisticsHtml = this.logisticsSystem.generateLogisticsOptions(countryCode);
        logisticsOptionsEl.innerHTML = logisticsHtml;
        
        // 初始化物流选择事件
        this.logisticsSystem.initLogisticsEvents();
    }
    
    // 初始化事件
    initEvents() {
        // 支付方式选择
        document.querySelectorAll('.payment-method-radio').forEach(radio => {
            radio.addEventListener('change', () => {
                this.selectedPaymentMethod = radio.value;
            });
        });
        
        // 提交订单按钮
        const submitOrderBtn = document.getElementById('submit-order-btn');
        if (submitOrderBtn) {
            submitOrderBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.submitOrder();
            });
        }
    }
    
    // 提交订单
    submitOrder() {
        // 验证必要信息
        if (!this.validateOrderInfo()) {
            return;
        }
        
        // 获取订单信息
        const orderInfo = this.getOrderInfo();
        
        // 在实际项目中，这里应该将订单信息提交到服务器
        // 这里只是模拟提交过程
        console.log('提交订单:', orderInfo);
        
        // 显示支付表单
        this.showPaymentForm(orderInfo);
    }
    
    // 验证订单信息
    validateOrderInfo() {
        // 验证购物车
        if (this.cartItems.length === 0) {
            alert('购物车为空，请先添加商品');
            return false;
        }
        
        // 验证地址
        if (!this.addressInfo.id) {
            alert('请选择收货地址');
            return false;
        }
        
        // 验证支付方式
        if (!this.selectedPaymentMethod) {
            alert('请选择支付方式');
            return false;
        }
        
        // 验证物流
        const selectedLogistics = document.querySelector('.logistics-radio:checked');
        if (!selectedLogistics) {
            alert('请选择物流方式');
            return false;
        }
        this.selectedLogistics = selectedLogistics.value;
        
        const selectedService = document.querySelector(`.service-radio[name="service-${this.selectedLogistics}"]:checked`);
        if (!selectedService) {
            alert('请选择物流服务');
            return false;
        }
        this.selectedService = selectedService.value;
        
        return true;
    }
    
    // 获取订单信息
    getOrderInfo() {
        // 计算订单金额
        let subtotal = 0;
        this.cartItems.forEach(item => {
            subtotal += item.price * item.quantity;
        });
        
        // 获取运费
        const shippingFeeEl = document.getElementById('shipping-fee');
        const shippingFee = shippingFeeEl ? parseFloat(shippingFeeEl.textContent.replace('¥', '')) : 0;
        
        // 计算总金额
        const total = subtotal + shippingFee;
        
        return {
            orderNumber: 'ORD' + Date.now(),
            userId: this.userInfo.id,
            items: this.cartItems,
            address: this.addressInfo,
            logistics: {
                id: this.selectedLogistics,
                service: this.selectedService
            },
            payment: {
                method: this.selectedPaymentMethod
            },
            amount: {
                subtotal: subtotal,
                shipping: shippingFee,
                total: total
            },
            currency: 'CNY',
            createTime: new Date().toISOString()
        };
    }
    
    // 显示支付表单
    showPaymentForm(orderInfo) {
        const paymentFormEl = document.getElementById('payment-form-container');
        if (!paymentFormEl) return;
        
        // 生成支付表单
        const formHtml = this.paymentSystem.generatePaymentForm(
            this.selectedPaymentMethod,
            orderInfo.amount.total.toFixed(2),
            orderInfo.currency,
            orderInfo
        );
        
        paymentFormEl.innerHTML = formHtml;
        
        // 显示支付表单
        document.getElementById('checkout-container').classList.add('d-none');
        paymentFormEl.classList.remove('d-none');
        
        // 初始化支付表单事件
        this.paymentSystem.initPaymentFormEvents();
    }
}

// 导出系统
window.XhobonSystems = window.XhobonSystems || {};
window.XhobonSystems.payment = new PaymentSystem();
window.XhobonSystems.logistics = new LogisticsSystem();
window.XhobonSystems.checkout = new CheckoutSystem();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('支付和物流系统已初始化');
    
    // 如果是结算页面，初始化结算系统
    if (document.getElementById('checkout-container')) {
        window.XhobonSystems.checkout.initCheckoutPage();
    }
    
    // 如果是物流跟踪页面，初始化物流跟踪
    if (document.getElementById('tracking-container')) {
        const trackingNumberInput = document.getElementById('tracking-number');
        const trackingSearchBtn = document.getElementById('tracking-search-btn');
        const trackingResultEl = document.getElementById('tracking-result');
        
        if (trackingSearchBtn && trackingNumberInput && trackingResultEl) {
            trackingSearchBtn.addEventListener('click', function() {
                const trackingNumber = trackingNumberInput.value.trim();
                if (!trackingNumber) {
                    alert('请输入运单号');
                    return;
                }
                
                const trackingInfo = window.XhobonSystems.logistics.trackShipment(trackingNumber);
                const trackingHtml = window.XhobonSystems.logistics.generateTrackingHTML(trackingInfo);
                trackingResultEl.innerHTML = trackingHtml;
                trackingResultEl.classList.remove('d-none');
            });
        }
    }
});
