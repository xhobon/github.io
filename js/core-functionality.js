// 会员积分系统功能
class MemberPointsSystem {
    constructor() {
        this.points = 0;
        this.level = 1;
        this.isLoggedIn = false;
        this.username = '';
        this.transactions = [];
        
        // 从本地存储加载会员数据
        this.loadFromLocalStorage();
    }
    
    // 加载会员数据
    loadFromLocalStorage() {
        const userData = localStorage.getItem('xhobon_user_data');
        if (userData) {
            const parsedData = JSON.parse(userData);
            this.points = parsedData.points || 0;
            this.level = parsedData.level || 1;
            this.isLoggedIn = parsedData.isLoggedIn || false;
            this.username = parsedData.username || '';
            this.transactions = parsedData.transactions || [];
        }
    }
    
    // 保存会员数据
    saveToLocalStorage() {
        const userData = {
            points: this.points,
            level: this.level,
            isLoggedIn: this.isLoggedIn,
            username: this.username,
            transactions: this.transactions
        };
        localStorage.setItem('xhobon_user_data', JSON.stringify(userData));
    }
    
    // 登录
    login(username, password) {
        // 模拟登录验证
        // 实际项目中应该通过API请求验证用户凭据
        if (username && password) {
            this.isLoggedIn = true;
            this.username = username;
            
            // 模拟从服务器获取会员数据
            if (!localStorage.getItem('xhobon_user_data')) {
                this.points = 100; // 新用户赠送积分
                this.level = 1;
                this.addTransaction('注册奖励', 100);
            }
            
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }
    
    // 登出
    logout() {
        this.isLoggedIn = false;
        this.saveToLocalStorage();
    }
    
    // 添加积分
    addPoints(amount, reason) {
        if (!this.isLoggedIn) return false;
        
        this.points += amount;
        this.updateLevel();
        this.addTransaction(reason, amount);
        this.saveToLocalStorage();
        return true;
    }
    
    // 使用积分
    usePoints(amount, reason) {
        if (!this.isLoggedIn || this.points < amount) return false;
        
        this.points -= amount;
        this.updateLevel();
        this.addTransaction(reason, -amount);
        this.saveToLocalStorage();
        return true;
    }
    
    // 更新会员等级
    updateLevel() {
        // 根据积分确定会员等级
        if (this.points >= 10000) {
            this.level = 5; // 钻石会员
        } else if (this.points >= 5000) {
            this.level = 4; // 铂金会员
        } else if (this.points >= 2000) {
            this.level = 3; // 金牌会员
        } else if (this.points >= 500) {
            this.level = 2; // 银牌会员
        } else {
            this.level = 1; // 普通会员
        }
    }
    
    // 获取会员等级名称
    getLevelName() {
        const levelNames = [
            '普通会员',
            '银牌会员',
            '金牌会员',
            '铂金会员',
            '钻石会员'
        ];
        return levelNames[this.level - 1];
    }
    
    // 添加交易记录
    addTransaction(reason, points) {
        this.transactions.push({
            date: new Date().toISOString(),
            reason: reason,
            points: points
        });
        
        // 只保留最近20条记录
        if (this.transactions.length > 20) {
            this.transactions = this.transactions.slice(-20);
        }
    }
    
    // 获取积分历史
    getTransactionHistory() {
        return this.transactions;
    }
    
    // 检查是否已登录
    checkLogin() {
        return this.isLoggedIn;
    }
    
    // 获取用户信息
    getUserInfo() {
        if (!this.isLoggedIn) return null;
        
        return {
            username: this.username,
            points: this.points,
            level: this.level,
            levelName: this.getLevelName()
        };
    }
}

// 产品评论和评分系统
class ProductReviewSystem {
    constructor() {
        this.reviews = {};
        
        // 从本地存储加载评论数据
        this.loadFromLocalStorage();
    }
    
    // 加载评论数据
    loadFromLocalStorage() {
        const reviewsData = localStorage.getItem('xhobon_product_reviews');
        if (reviewsData) {
            this.reviews = JSON.parse(reviewsData);
        }
    }
    
    // 保存评论数据
    saveToLocalStorage() {
        localStorage.setItem('xhobon_product_reviews', JSON.stringify(this.reviews));
    }
    
    // 添加评论
    addReview(productId, username, rating, comment, images = []) {
        if (!productId || !username || !rating) return false;
        
        if (!this.reviews[productId]) {
            this.reviews[productId] = [];
        }
        
        const review = {
            id: Date.now().toString(),
            username: username,
            rating: rating,
            comment: comment,
            images: images,
            date: new Date().toISOString(),
            likes: 0,
            dislikes: 0
        };
        
        this.reviews[productId].push(review);
        this.saveToLocalStorage();
        return true;
    }
    
    // 获取产品评论
    getProductReviews(productId) {
        return this.reviews[productId] || [];
    }
    
    // 获取产品平均评分
    getProductAverageRating(productId) {
        const reviews = this.getProductReviews(productId);
        if (reviews.length === 0) return 0;
        
        const sum = reviews.reduce((total, review) => total + review.rating, 0);
        return (sum / reviews.length).toFixed(1);
    }
    
    // 获取评分分布
    getRatingDistribution(productId) {
        const reviews = this.getProductReviews(productId);
        const distribution = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
        
        reviews.forEach(review => {
            distribution[review.rating]++;
        });
        
        return distribution;
    }
    
    // 点赞评论
    likeReview(productId, reviewId) {
        const reviews = this.getProductReviews(productId);
        const review = reviews.find(r => r.id === reviewId);
        
        if (review) {
            review.likes++;
            this.saveToLocalStorage();
            return true;
        }
        
        return false;
    }
    
    // 踩评论
    dislikeReview(productId, reviewId) {
        const reviews = this.getProductReviews(productId);
        const review = reviews.find(r => r.id === reviewId);
        
        if (review) {
            review.dislikes++;
            this.saveToLocalStorage();
            return true;
        }
        
        return false;
    }
    
    // 删除评论
    deleteReview(productId, reviewId) {
        const reviews = this.getProductReviews(productId);
        const index = reviews.findIndex(r => r.id === reviewId);
        
        if (index !== -1) {
            reviews.splice(index, 1);
            this.saveToLocalStorage();
            return true;
        }
        
        return false;
    }
}

// 闪购/限时优惠系统
class FlashSaleSystem {
    constructor() {
        this.flashSales = [];
        
        // 从本地存储加载闪购数据
        this.loadFromLocalStorage();
    }
    
    // 加载闪购数据
    loadFromLocalStorage() {
        const flashSalesData = localStorage.getItem('xhobon_flash_sales');
        if (flashSalesData) {
            this.flashSales = JSON.parse(flashSalesData);
        } else {
            // 初始化一些示例闪购数据
            this.initSampleFlashSales();
        }
    }
    
    // 初始化示例闪购数据
    initSampleFlashSales() {
        const now = new Date();
        
        // 添加一些示例闪购
        this.flashSales = [
            {
                id: '1',
                title: '智能手机闪购',
                startTime: new Date(now.getTime() + 1000 * 60 * 60).toISOString(), // 1小时后开始
                endTime: new Date(now.getTime() + 1000 * 60 * 60 * 5).toISOString(), // 5小时后结束
                products: [
                    {
                        id: 'p1',
                        name: '智能手机 Pro',
                        originalPrice: 3299,
                        salePrice: 2999,
                        discount: '9.1折',
                        stock: 100,
                        sold: 0,
                        image: 'images/product1.jpg'
                    },
                    {
                        id: 'p2',
                        name: '智能手表',
                        originalPrice: 999,
                        salePrice: 899,
                        discount: '9折',
                        stock: 50,
                        sold: 0,
                        image: 'images/product2.jpg'
                    }
                ]
            },
            {
                id: '2',
                title: '智能家居大促',
                startTime: new Date(now.getTime() - 1000 * 60 * 60).toISOString(), // 1小时前开始
                endTime: new Date(now.getTime() + 1000 * 60 * 60 * 23).toISOString(), // 23小时后结束
                products: [
                    {
                        id: 'p3',
                        name: '智能音箱',
                        originalPrice: 249,
                        salePrice: 199,
                        discount: '8折',
                        stock: 200,
                        sold: 50,
                        image: 'images/product3.jpg'
                    },
                    {
                        id: 'p4',
                        name: '智能灯泡套装',
                        originalPrice: 399,
                        salePrice: 299,
                        discount: '7.5折',
                        stock: 150,
                        sold: 30,
                        image: 'images/product4.jpg'
                    }
                ]
            }
        ];
        
        this.saveToLocalStorage();
    }
    
    // 保存闪购数据
    saveToLocalStorage() {
        localStorage.setItem('xhobon_flash_sales', JSON.stringify(this.flashSales));
    }
    
    // 获取所有闪购活动
    getAllFlashSales() {
        return this.flashSales;
    }
    
    // 获取当前进行中的闪购活动
    getCurrentFlashSales() {
        const now = new Date().toISOString();
        return this.flashSales.filter(sale => {
            return sale.startTime <= now && sale.endTime >= now;
        });
    }
    
    // 获取即将开始的闪购活动
    getUpcomingFlashSales() {
        const now = new Date().toISOString();
        return this.flashSales.filter(sale => {
            return sale.startTime > now;
        });
    }
    
    // 获取已结束的闪购活动
    getPastFlashSales() {
        const now = new Date().toISOString();
        return this.flashSales.filter(sale => {
            return sale.endTime < now;
        });
    }
    
    // 获取特定闪购活动
    getFlashSale(saleId) {
        return this.flashSales.find(sale => sale.id === saleId);
    }
    
    // 添加闪购活动
    addFlashSale(title, startTime, endTime, products) {
        const newSale = {
            id: Date.now().toString(),
            title: title,
            startTime: startTime,
            endTime: endTime,
            products: products
        };
        
        this.flashSales.push(newSale);
        this.saveToLocalStorage();
        return newSale.id;
    }
    
    // 更新闪购活动
    updateFlashSale(saleId, updatedData) {
        const index = this.flashSales.findIndex(sale => sale.id === saleId);
        
        if (index !== -1) {
            this.flashSales[index] = {...this.flashSales[index], ...updatedData};
            this.saveToLocalStorage();
            return true;
        }
        
        return false;
    }
    
    // 删除闪购活动
    deleteFlashSale(saleId) {
        const index = this.flashSales.findIndex(sale => sale.id === saleId);
        
        if (index !== -1) {
            this.flashSales.splice(index, 1);
            this.saveToLocalStorage();
            return true;
        }
        
        return false;
    }
    
    // 购买闪购产品
    purchaseProduct(saleId, productId, quantity = 1) {
        const sale = this.getFlashSale(saleId);
        if (!sale) return false;
        
        const now = new Date().toISOString();
        if (sale.startTime > now || sale.endTime < now) {
            return false; // 闪购未开始或已结束
        }
        
        const product = sale.products.find(p => p.id === productId);
        if (!product || product.stock < quantity) {
            return false; // 产品不存在或库存不足
        }
        
        // 更新库存和销量
        product.stock -= quantity;
        product.sold += quantity;
        
        this.saveToLocalStorage();
        return true;
    }
    
    // 获取闪购倒计时信息
    getFlashSaleCountdown(saleId) {
        const sale = this.getFlashSale(saleId);
        if (!sale) return null;
        
        const now = new Date();
        const startTime = new Date(sale.startTime);
        const endTime = new Date(sale.endTime);
        
        if (now < startTime) {
            // 闪购未开始
            return {
                status: 'upcoming',
                message: '即将开始',
                timeLeft: startTime - now
            };
        } else if (now > endTime) {
            // 闪购已结束
            return {
                status: 'ended',
                message: '已结束',
                timeLeft: 0
            };
        } else {
            // 闪购进行中
            return {
                status: 'active',
                message: '正在进行',
                timeLeft: endTime - now
            };
        }
    }
}

// 预订/预售系统
class PreOrderSystem {
    constructor() {
        this.preOrders = [];
        this.userPreOrders = {};
        
        // 从本地存储加载预订数据
        this.loadFromLocalStorage();
    }
    
    // 加载预订数据
    loadFromLocalStorage() {
        const preOrdersData = localStorage.getItem('xhobon_pre_orders');
        if (preOrdersData) {
            this.preOrders = JSON.parse(preOrdersData);
        } else {
            // 初始化一些示例预订数据
            this.initSamplePreOrders();
        }
        
        const userPreOrdersData = localStorage.getItem('xhobon_user_pre_orders');
        if (userPreOrdersData) {
            this.userPreOrders = JSON.parse(userPreOrdersData);
        }
    }
    
    // 初始化示例预订数据
    initSamplePreOrders() {
        const now = new Date();
        
        // 添加一些示例预订
        this.preOrders = [
            {
                id: 'po1',
                productName: '新一代旗舰智能手机',
                description: '全新一代处理器，超强性能体验',
                image: 'images/preorder1.jpg',
                startTime: new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString(), // 1天前开始
                endTime: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7).toISOString(), // 7天后结束
                releaseTime: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 30).toISOString(), // 30天后发布
                price: 4999,
                depositAmount: 499,
                maxQuantity: 2,
                totalStock: 1000,
                reservedCount: 0
            },
            {
                id: 'po2',
                productName: '智能家居控制中心',
                description: '一键控制全屋智能设备，支持语音控制',
                image: 'images/preorder2.jpg',
                startTime: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 3).toISOString(), // 3天后开始
                endTime: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 10).toISOString(), // 10天后结束
                releaseTime: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 45).toISOString(), // 45天后发布
                price: 1999,
                depositAmount: 199,
                maxQuantity: 3,
                totalStock: 500,
                reservedCount: 0
            }
        ];
        
        this.saveToLocalStorage();
    }
    
    // 保存预订数据
    saveToLocalStorage() {
        localStorage.setItem('xhobon_pre_orders', JSON.stringify(this.preOrders));
        localStorage.setItem('xhobon_user_pre_orders', JSON.stringify(this.userPreOrders));
    }
    
    // 获取所有预订产品
    getAllPreOrders() {
        return this.preOrders;
    }
    
    // 获取当前可预订的产品
    getCurrentPreOrders() {
        const now = new Date().toISOString();
        return this.preOrders.filter(order => {
            return order.startTime <= now && order.endTime >= now;
        });
    }
    
    // 获取即将开始预订的产品
    getUpcomingPreOrders() {
        const now = new Date().toISOString();
        return this.preOrders.filter(order => {
            return order.startTime > now;
        });
    }
    
    // 获取已结束预订的产品
    getPastPreOrders() {
        const now = new Date().toISOString();
        return this.preOrders.filter(order => {
            return order.endTime < now;
        });
    }
    
    // 获取特定预订产品
    getPreOrder(orderId) {
        return this.preOrders.find(order => order.id === orderId);
    }
    
    // 添加预订产品
    addPreOrder(productData) {
        const newOrder = {
            id: 'po' + Date.now().toString(),
            ...productData,
            reservedCount: 0
        };
        
        this.preOrders.push(newOrder);
        this.saveToLocalStorage();
        return newOrder.id;
    }
    
    // 更新预订产品
    updatePreOrder(orderId, updatedData) {
        const index = this.preOrders.findIndex(order => order.id === orderId);
        
        if (index !== -1) {
            this.preOrders[index] = {...this.preOrders[index], ...updatedData};
            this.saveToLocalStorage();
            return true;
        }
        
        return false;
    }
    
    // 删除预订产品
    deletePreOrder(orderId) {
        const index = this.preOrders.findIndex(order => order.id === orderId);
        
        if (index !== -1) {
            this.preOrders.splice(index, 1);
            this.saveToLocalStorage();
            return true;
        }
        
        return false;
    }
    
    // 用户预订产品
    placePreOrder(username, orderId, quantity = 1) {
        if (!username || !orderId) return false;
        
        const order = this.getPreOrder(orderId);
        if (!order) return false;
        
        const now = new Date().toISOString();
        if (order.startTime > now || order.endTime < now) {
            return false; // 预订未开始或已结束
        }
        
        if (order.reservedCount + quantity > order.totalStock) {
            return false; // 库存不足
        }
        
        if (quantity > order.maxQuantity) {
            return false; // 超过最大预订数量
        }
        
        // 检查用户是否已经预订过该产品
        if (!this.userPreOrders[username]) {
            this.userPreOrders[username] = [];
        }
        
        const existingOrder = this.userPreOrders[username].find(o => o.orderId === orderId);
        if (existingOrder) {
            if (existingOrder.quantity + quantity > order.maxQuantity) {
                return false; // 超过最大预订数量
            }
            existingOrder.quantity += quantity;
        } else {
            this.userPreOrders[username].push({
                orderId: orderId,
                quantity: quantity,
                orderTime: now,
                depositPaid: false
            });
        }
        
        // 更新预订数量
        order.reservedCount += quantity;
        
        this.saveToLocalStorage();
        return true;
    }
    
    // 支付预订定金
    payPreOrderDeposit(username, orderId) {
        if (!username || !orderId) return false;
        
        if (!this.userPreOrders[username]) return false;
        
        const userOrder = this.userPreOrders[username].find(o => o.orderId === orderId);
        if (!userOrder) return false;
        
        userOrder.depositPaid = true;
        this.saveToLocalStorage();
        return true;
    }
    
    // 获取用户的预订
    getUserPreOrders(username) {
        if (!username || !this.userPreOrders[username]) return [];
        
        return this.userPreOrders[username].map(userOrder => {
            const orderDetails = this.getPreOrder(userOrder.orderId);
            return {
                ...userOrder,
                productDetails: orderDetails
            };
        });
    }
    
    // 取消预订
    cancelPreOrder(username, orderId) {
        if (!username || !orderId) return false;
        
        if (!this.userPreOrders[username]) return false;
        
        const index = this.userPreOrders[username].findIndex(o => o.orderId === orderId);
        if (index === -1) return false;
        
        const userOrder = this.userPreOrders[username][index];
        const order = this.getPreOrder(orderId);
        
        if (order) {
            order.reservedCount -= userOrder.quantity;
        }
        
        this.userPreOrders[username].splice(index, 1);
        this.saveToLocalStorage();
        return true;
    }
}

// 社交媒体集成
class SocialMediaIntegration {
    constructor() {
        this.platforms = [
            {id: 'facebook', name: 'Facebook', icon: 'facebook.png'},
            {id: 'twitter', name: 'Twitter', icon: 'twitter.png'},
            {id: 'instagram', name: 'Instagram', icon: 'instagram.png'},
            {id: 'weibo', name: '微博', icon: 'weibo.png'},
            {id: 'wechat', name: '微信', icon: 'wechat.png'}
        ];
    }
    
    // 获取所有支持的社交媒体平台
    getAllPlatforms() {
        return this.platforms;
    }
    
    // 分享到社交媒体
    shareToSocialMedia(platform, data) {
        // 实际项目中，这里应该调用各平台的分享API
        // 这里只是模拟分享功能
        console.log(`分享到 ${platform}:`, data);
        
        // 构建分享URL
        let shareUrl = '';
        const encodedUrl = encodeURIComponent(data.url || window.location.href);
        const encodedTitle = encodeURIComponent(data.title || document.title);
        const encodedDesc = encodeURIComponent(data.description || '');
        const encodedImage = encodeURIComponent(data.image || '');
        
        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
                break;
            case 'weibo':
                shareUrl = `http://service.weibo.com/share/share.php?url=${encodedUrl}&title=${encodedTitle}&pic=${encodedImage}`;
                break;
            // 其他平台...
        }
        
        // 打开分享窗口
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
            return true;
        }
        
        return false;
    }
    
    // 生成社交分享按钮HTML
    generateShareButtons(data) {
        let html = '<div class="social-share-buttons">';
        
        this.platforms.forEach(platform => {
            html += `
                <button class="btn btn-sm social-share-btn" data-platform="${platform.id}">
                    <img src="images/${platform.icon}" alt="${platform.name}" width="20">
                    ${platform.name}
                </button>
            `;
        });
        
        html += '</div>';
        return html;
    }
    
    // 初始化社交分享按钮事件
    initShareButtons(container, data) {
        const buttons = container.querySelectorAll('.social-share-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const platform = button.getAttribute('data-platform');
                this.shareToSocialMedia(platform, data);
            });
        });
    }
    
    // 获取社交媒体评论插件HTML
    getSocialCommentPlugin(platform, config) {
        // 实际项目中，这里应该返回各平台的评论插件代码
        // 这里只是返回一个示例HTML
        return `<div class="social-comment-plugin" data-platform="${platform}">
            <div class="plugin-header">${platform} 评论</div>
            <div class="plugin-content">
                <!-- 这里是评论插件内容 -->
                <div class="comment-placeholder">评论加载中...</div>
            </div>
        </div>`;
    }
}

// 导出所有系统
window.XhobonSystems = {
    memberPoints: new MemberPointsSystem(),
    productReview: new ProductReviewSystem(),
    flashSale: new FlashSaleSystem(),
    preOrder: new PreOrderSystem(),
    socialMedia: new SocialMediaIntegration()
};

// 页面加载完成后初始化系统
document.addEventListener('DOMContentLoaded', function() {
    console.log('核心功能系统已初始化');
    
    // 初始化闪购倒计时
    const flashSaleTimer = document.querySelector('.flash-sale-timer');
    if (flashSaleTimer) {
        updateFlashSaleTimer();
    }
    
    // 初始化登录按钮事件
    const loginButton = document.querySelector('a.btn-outline-secondary[href="#"]:nth-of-type(1)');
    if (loginButton) {
        loginButton.addEventListener('click', function(e) {
            e.preventDefault();
            showLoginModal();
        });
    }
});

// 显示登录模态框
function showLoginModal() {
    // 创建模态框
    const modalHTML = `
        <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="loginModalLabel">会员登录</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="loginForm">
                            <div class="mb-3">
                                <label for="username" class="form-label">用户名/邮箱/手机号</label>
                                <input type="text" class="form-control" id="username" required>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">密码</label>
                                <input type="password" class="form-control" id="password" required>
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="rememberMe">
                                <label class="form-check-label" for="rememberMe">记住我</label>
                            </div>
                            <div class="d-flex justify-content-between">
                                <button type="submit" class="btn btn-xiaomi">登录</button>
                                <a href="#" class="text-decoration-none">忘记密码?</a>
                            </div>
                        </form>
                        <hr>
                        <div class="text-center">
                            <p>使用社交账号登录</p>
                            <div class="d-flex justify-content-center gap-3">
                                <button class="btn btn-outline-secondary">微信</button>
                                <button class="btn btn-outline-secondary">QQ</button>
                                <button class="btn btn-outline-secondary">微博</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 添加到页面
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // 显示模态框
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
    
    // 处理表单提交
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // 使用会员积分系统登录
        const success = window.XhobonSystems.memberPoints.login(username, password);
        
        if (success) {
            // 登录成功
            alert('登录成功！');
            loginModal.hide();
            
            // 更新页面显示
            updateUserInfoDisplay();
        } else {
            // 登录失败
            alert('用户名或密码错误！');
        }
    });
    
    // 移除模态框
    document.getElementById('loginModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// 更新用户信息显示
function updateUserInfoDisplay() {
    const userInfo = window.XhobonSystems.memberPoints.getUserInfo();
    
    if (userInfo) {
        // 用户已登录，更新显示
        const loginButton = document.querySelector('a.btn-outline-secondary[href="#"]:nth-of-type(1)');
        const registerButton = document.querySelector('a.btn-outline-secondary[href="#"]:nth-of-type(2)');
        
        if (loginButton) {
            loginButton.textContent = userInfo.username;
            loginButton.href = '#user-center';
            loginButton.onclick = function(e) {
                e.preventDefault();
                showUserCenter();
            };
        }
        
        if (registerButton) {
            registerButton.textContent = '退出';
            registerButton.href = '#logout';
            registerButton.onclick = function(e) {
                e.preventDefault();
                window.XhobonSystems.memberPoints.logout();
                location.reload();
            };
        }
    }
}

// 显示用户中心
function showUserCenter() {
    const userInfo = window.XhobonSystems.memberPoints.getUserInfo();
    
    if (!userInfo) return;
    
    // 创建模态框
    const modalHTML = `
        <div class="modal fade" id="userCenterModal" tabindex="-1" aria-labelledby="userCenterModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="userCenterModalLabel">用户中心</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <div class="mb-3">
                                            <img src="images/user-avatar.png" alt="用户头像" class="rounded-circle" width="80">
                                        </div>
                                        <h5>${userInfo.username}</h5>
                                        <p class="text-muted">${userInfo.levelName}</p>
                                        <div class="member-points">
                                            <div class="points-value">${userInfo.points}</div>
                                            <div class="points-label">积分</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="list-group mt-3">
                                    <a href="#" class="list-group-item list-group-item-action active" data-tab="orders">我的订单</a>
                                    <a href="#" class="list-group-item list-group-item-action" data-tab="points">积分明细</a>
                                    <a href="#" class="list-group-item list-group-item-action" data-tab="preorders">我的预订</a>
                                    <a href="#" class="list-group-item list-group-item-action" data-tab="favorites">我的收藏</a>
                                    <a href="#" class="list-group-item list-group-item-action" data-tab="address">收货地址</a>
                                    <a href="#" class="list-group-item list-group-item-action" data-tab="settings">账户设置</a>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="tab-content">
                                    <div class="tab-pane active" id="orders">
                                        <h4>我的订单</h4>
                                        <p>您暂无订单记录</p>
                                    </div>
                                    <div class="tab-pane" id="points">
                                        <h4>积分明细</h4>
                                        <div class="table-responsive">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th>日期</th>
                                                        <th>描述</th>
                                                        <th>积分变动</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="pointsHistoryTable">
                                                    <!-- 积分历史记录将在这里动态添加 -->
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="preorders">
                                        <h4>我的预订</h4>
                                        <div id="userPreOrdersList">
                                            <!-- 用户预订记录将在这里动态添加 -->
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="favorites">
                                        <h4>我的收藏</h4>
                                        <p>您暂无收藏商品</p>
                                    </div>
                                    <div class="tab-pane" id="address">
                                        <h4>收货地址</h4>
                                        <p>您暂无收货地址</p>
                                        <button class="btn btn-xiaomi">添加新地址</button>
                                    </div>
                                    <div class="tab-pane" id="settings">
                                        <h4>账户设置</h4>
                                        <form>
                                            <div class="mb-3">
                                                <label class="form-label">用户名</label>
                                                <input type="text" class="form-control" value="${userInfo.username}" readonly>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">邮箱</label>
                                                <input type="email" class="form-control" value="user@example.com">
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">手机号</label>
                                                <input type="tel" class="form-control" value="13800138000">
                                            </div>
                                            <button type="submit" class="btn btn-xiaomi">保存修改</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 添加到页面
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // 显示模态框
    const userCenterModal = new bootstrap.Modal(document.getElementById('userCenterModal'));
    userCenterModal.show();
    
    // 加载积分历史
    loadPointsHistory();
    
    // 加载用户预订
    loadUserPreOrders();
    
    // 处理标签页切换
    const tabLinks = document.querySelectorAll('.list-group-item[data-tab]');
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有活动状态
            tabLinks.forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
            
            // 设置当前活动标签
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // 移除模态框
    document.getElementById('userCenterModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// 加载积分历史
function loadPointsHistory() {
    const history = window.XhobonSystems.memberPoints.getTransactionHistory();
    const tableBody = document.getElementById('pointsHistoryTable');
    
    if (!tableBody || !history.length) return;
    
    let html = '';
    
    history.forEach(transaction => {
        const date = new Date(transaction.date);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        
        html += `
            <tr>
                <td>${formattedDate}</td>
                <td>${transaction.reason}</td>
                <td class="${transaction.points > 0 ? 'text-success' : 'text-danger'}">${transaction.points > 0 ? '+' : ''}${transaction.points}</td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = html;
}

// 加载用户预订
function loadUserPreOrders() {
    const userInfo = window.XhobonSystems.memberPoints.getUserInfo();
    if (!userInfo) return;
    
    const preOrders = window.XhobonSystems.preOrder.getUserPreOrders(userInfo.username);
    const preOrdersList = document.getElementById('userPreOrdersList');
    
    if (!preOrdersList) return;
    
    if (!preOrders.length) {
        preOrdersList.innerHTML = '<p>您暂无预订商品</p>';
        return;
    }
    
    let html = '';
    
    preOrders.forEach(order => {
        const product = order.productDetails;
        if (!product) return;
        
        const releaseDate = new Date(product.releaseTime);
        const formattedReleaseDate = `${releaseDate.getFullYear()}-${(releaseDate.getMonth() + 1).toString().padStart(2, '0')}-${releaseDate.getDate().toString().padStart(2, '0')}`;
        
        html += `
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img src="${product.image || 'images/product-placeholder.jpg'}" alt="${product.productName}" class="img-fluid">
                        </div>
                        <div class="col-md-9">
                            <h5>${product.productName}</h5>
                            <p>${product.description}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <p class="mb-1">预订数量: ${order.quantity}</p>
                                    <p class="mb-1">预计发布: ${formattedReleaseDate}</p>
                                    <p class="mb-1">定金状态: ${order.depositPaid ? '<span class="text-success">已支付</span>' : '<span class="text-danger">未支付</span>'}</p>
                                </div>
                                <div>
                                    <p class="fw-bold mb-1">价格: ¥${product.price}</p>
                                    <p class="mb-1">定金: ¥${product.depositAmount}</p>
                                    ${!order.depositPaid ? `<button class="btn btn-xiaomi btn-sm pay-deposit-btn" data-order-id="${product.id}">支付定金</button>` : ''}
                                    <button class="btn btn-outline-danger btn-sm cancel-preorder-btn" data-order-id="${product.id}">取消预订</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    preOrdersList.innerHTML = html;
    
    // 添加支付定金按钮事件
    const payButtons = document.querySelectorAll('.pay-deposit-btn');
    payButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.getAttribute('data-order-id');
            const userInfo = window.XhobonSystems.memberPoints.getUserInfo();
            
            if (userInfo) {
                const success = window.XhobonSystems.preOrder.payPreOrderDeposit(userInfo.username, orderId);
                if (success) {
                    alert('定金支付成功！');
                    loadUserPreOrders(); // 重新加载预订列表
                } else {
                    alert('定金支付失败！');
                }
            }
        });
    });
    
    // 添加取消预订按钮事件
    const cancelButtons = document.querySelectorAll('.cancel-preorder-btn');
    cancelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.getAttribute('data-order-id');
            const userInfo = window.XhobonSystems.memberPoints.getUserInfo();
            
            if (userInfo && confirm('确定要取消此预订吗？')) {
                const success = window.XhobonSystems.preOrder.cancelPreOrder(userInfo.username, orderId);
                if (success) {
                    alert('预订已取消！');
                    loadUserPreOrders(); // 重新加载预订列表
                } else {
                    alert('取消预订失败！');
                }
            }
        });
    });
}

// 更新闪购倒计时
function updateFlashSaleTimer() {
    // 获取当前进行中的闪购
    const currentSales = window.XhobonSystems.flashSale.getCurrentFlashSales();
    
    if (currentSales.length === 0) {
        // 没有进行中的闪购，显示下一场
        const upcomingSales = window.XhobonSystems.flashSale.getUpcomingFlashSales();
        
        if (upcomingSales.length > 0) {
            const nextSale = upcomingSales[0];
            const countdown = window.XhobonSystems.flashSale.getFlashSaleCountdown(nextSale.id);
            
            if (countdown) {
                updateTimerDisplay(countdown.timeLeft, '即将开始');
            }
        } else {
            // 没有即将开始的闪购
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    } else {
        // 显示当前进行中的第一个闪购倒计时
        const currentSale = currentSales[0];
        const countdown = window.XhobonSystems.flashSale.getFlashSaleCountdown(currentSale.id);
        
        if (countdown) {
            updateTimerDisplay(countdown.timeLeft, '距结束');
        }
    }
    
    // 每秒更新一次
    setTimeout(updateFlashSaleTimer, 1000);
}

// 更新倒计时显示
function updateTimerDisplay(timeLeft, prefix) {
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    // 更新前缀文本
    const timerElement = document.querySelector('.flash-sale-timer');
    if (timerElement && timerElement.previousElementSibling) {
        timerElement.previousElementSibling.textContent = prefix + ': ';
    }
}
