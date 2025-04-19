// 闪购倒计时功能
function updateFlashSaleTimer() {
    // 设置闪购结束时间（示例：当前时间加上12小时）
    const now = new Date();
    const endTime = new Date(now.getTime() + 12 * 60 * 60 * 1000);
    
    // 更新倒计时
    function updateTimer() {
        const currentTime = new Date();
        const diff = endTime - currentTime;
        
        if (diff <= 0) {
            // 闪购已结束，重置计时器
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        // 计算剩余时间
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // 更新显示
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // 立即更新一次
    updateTimer();
    
    // 每秒更新一次
    setInterval(updateTimer, 1000);
}

// 轮播图自动播放
function setupCarousel() {
    const carousel = new bootstrap.Carousel(document.getElementById('mainCarousel'), {
        interval: 5000,
        wrap: true
    });
}

// 语言切换功能
function setupLanguageSwitch() {
    const languageItems = document.querySelectorAll('#languageDropdown + .dropdown-menu .dropdown-item');
    const languageButton = document.getElementById('languageDropdown');
    
    languageItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const language = this.textContent.trim();
            languageButton.textContent = language;
            // 这里可以添加实际的语言切换逻辑
            console.log(`语言已切换为: ${language}`);
        });
    });
}

// 产品卡片悬停效果
function setupProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化Bootstrap工具提示
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // 初始化各功能
    updateFlashSaleTimer();
    setupCarousel();
    setupLanguageSwitch();
    setupProductCards();
    
    console.log('网站初始化完成');
});

// 模拟会员登录功能
function setupLoginForm() {
    const loginButton = document.querySelector('a.btn-outline-secondary[href="#"]:nth-of-type(1)');
    
    if (loginButton) {
        loginButton.addEventListener('click', function(e) {
            e.preventDefault();
            
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
                                        <button type="submit" class="btn btn-primary">登录</button>
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
                
                // 这里可以添加实际的登录逻辑
                console.log(`登录请求: 用户名=${username}, 密码=${password}`);
                
                // 模拟登录成功
                alert('登录成功！');
                loginModal.hide();
                
                // 移除模态框
                document.getElementById('loginModal').addEventListener('hidden.bs.modal', function() {
                    this.remove();
                });
            });
        });
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化各功能
    updateFlashSaleTimer();
    setupCarousel();
    setupLanguageSwitch();
    setupProductCards();
    setupLoginForm();
    
    console.log('网站初始化完成');
});
