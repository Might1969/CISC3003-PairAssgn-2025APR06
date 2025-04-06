document.addEventListener('DOMContentLoaded', () => {
    // 元素缓存
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const grid = document.querySelector('.project-grid');

    // 初始化过滤器
    const initFilters = () => {
        // 设置初始激活按钮
        setActiveButton(document.querySelector('.filter-btn.active'));
        // 强制初始布局
        grid.style.display = 'grid';
        void grid.offsetHeight;
    };

    // 设置激活按钮
    const setActiveButton = (activeButton) => {
        filterButtons.forEach(btn => {
            const isActive = btn === activeButton;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });
    };

    // 核心过滤函数
    const filterProjects = (filter) => {
        projectCards.forEach(card => {
            const category = card.querySelector('.project-link').dataset.category;
            const shouldShow = filter === 'all' || category === filter;
            
            // 使用动画帧优化性能
            requestAnimationFrame(() => {
                card.classList.toggle('hidden', !shouldShow);
                card.style.gridColumn = shouldShow ? 'auto' : 'span 0';
            });
        });

        // 布局优化
        optimizeSingleCardLayout();
        forceGridReflow();
    };

    // 单项目布局优化
    const optimizeSingleCardLayout = () => {
        const visibleCards = [...projectCards].filter(card => !card.classList.contains('hidden'));
        visibleCards.forEach(card => card.classList.toggle('single-card', visibleCards.length === 1));
    };

    // 强制网格重排
    const forceGridReflow = () => {
        grid.style.display = 'grid';
        void grid.offsetHeight;
    };

    // 事件处理
    const handleFilterClick = (e) => {
        const button = e.currentTarget;
        const filter = button.dataset.filter;
        
        setActiveButton(button);
        filterProjects(filter);
        
        // 无障碍反馈
        announceFilterChange(filter);
    };

    // 无障碍公告
    const announceFilterChange = (filter) => {
        const liveRegion = document.getElementById('a11y-live') || createLiveRegion();
        liveRegion.textContent = `Now showing ${filter === 'all' ? 'all projects' : filter + ' projects'}`;
    };

    // 创建无障碍实时区域
    const createLiveRegion = () => {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'a11y-live';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-9999px';
        document.body.appendChild(liveRegion);
        return liveRegion;
    };

    

    // 初始化
    const init = () => {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', handleFilterClick);
        });
        
        initFilters();
        optimizeMobileInteraction();
    };

    // 启动初始化
    init();
});