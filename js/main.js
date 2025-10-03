// Main application controller
class App {
    constructor() {
        this.currentPage = 'home';
        this.modules = {};
        this.init();
    }

    init() {
        this.initializeModules();
        this.bindGlobalEvents();
        this.showPage('home');
    }

    initializeModules() {
        // Initialize all modules
        this.modules.language = LanguageManager;
        this.modules.slider = VideoSlider;
        this.modules.modal = ModalManager;
        this.modules.videoPlayer = VideoPlayer;
        this.modules.cards = CardsManager;

        // Call init methods
        this.modules.language.init();
        this.modules.slider.init();
        this.modules.modal.init();
        this.modules.videoPlayer.init();
        this.modules.cards.init();
    }

    bindGlobalEvents() {
        // Navigation events
        this.bindNavigationEvents();
        
        // Menu events
        this.bindMenuEvents();
        
        // Start button event
        this.bindStartButtonEvent();
        
        // Logo click event
        this.bindLogoEvent();
    }

    bindNavigationEvents() {
        document.querySelectorAll('.nav-link, .dropdown-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = e.target.getAttribute('href').substring(1);
                this.showPage(targetPage);
            });
        });
    }

    bindMenuEvents() {
        const menuIcon = document.querySelector('.menu-icon');
        const dropdownMenu = document.querySelector('.dropdown-menu');

        menuIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            menuIcon.classList.toggle('open');
            dropdownMenu.classList.toggle('open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.menu-icon') && !e.target.closest('.dropdown-menu')) {
                menuIcon.classList.remove('open');
                dropdownMenu.classList.remove('open');
            }
        });
    }

    bindStartButtonEvent() {
        const startButton = document.getElementById('start-button');
        startButton.addEventListener('click', () => {
            this.showPage('info');
        });
    }

    bindLogoEvent() {
        const logo = document.getElementById('logo');
        logo.addEventListener('click', () => {
            this.showPage('home');
        });
    }

    showPage(page) {
        this.currentPage = page;
        
        // Hide all pages
        this.hideAllPages();
        
        // Close menu
        this.closeMenu();
        
        // Show the requested page
        if (page === 'info') {
            this.showInfoPage();
        } else if (page === 'city') {
            this.showCityPage();
        } else {
            this.showHomePage();
        }

        // Update active navigation links
        this.updateActiveNavLinks(page);
    }

    hideAllPages() {
        const infoPage = document.getElementById('info-page');
        const cityPage = document.getElementById('city-page');
        const mainSlider = document.getElementById('main-slider');
        const pixelIndicators = document.getElementById('pixel-indicators');
        const mainContent = document.getElementById('main-content');

        infoPage.classList.remove('active');
        cityPage.classList.remove('active');
        mainSlider.style.display = 'none';
        pixelIndicators.style.display = 'none';
        mainContent.style.display = 'none';
    }

    showHomePage() {
        const mainSlider = document.getElementById('main-slider');
        const pixelIndicators = document.getElementById('pixel-indicators');
        const mainContent = document.getElementById('main-content');

        mainSlider.style.display = 'block';
        pixelIndicators.style.display = 'flex';
        mainContent.style.display = 'flex';
        
        // Restart slider when returning to home page
        setTimeout(() => {
            this.modules.slider.goToSlide(0);
            this.modules.slider.startSlider();
        }, 100);
    }

    showInfoPage() {
        const infoPage = document.getElementById('info-page');
        infoPage.classList.add('active');
    }

    showCityPage() {
        const cityPage = document.getElementById('city-page');
        cityPage.classList.add('active');
    }

    closeMenu() {
        const menuIcon = document.querySelector('.menu-icon');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        
        menuIcon.classList.remove('open');
        dropdownMenu.classList.remove('open');
    }

    updateActiveNavLinks(page) {
        document.querySelectorAll('.nav-link, .dropdown-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + page) {
                link.classList.add('active');
            }
        });
    }

    // Public method to get current page
    getCurrentPage() {
        return this.currentPage;
    }

    // Public method to refresh content based on language
    refreshContent() {
        if (this.currentPage === 'info' || this.currentPage === 'city') {
            // Refresh card content with current language
            this.modules.cards.infoItems.forEach(item => {
                const type = item.getAttribute('data-type');
                const cardData = this.modules.cards.getCardData('info', type);
                if (cardData) {
                    this.modules.cards.updateCardContent(item, cardData);
                }
            });
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause videos and slider
        if (window.app && window.app.modules) {
            window.app.modules.videoPlayer.pauseAllVideos();
            window.app.modules.slider.pauseSlider();
        }
    } else {
        // Page is visible, resume videos and slider
        if (window.app && window.app.modules) {
            if (window.app.getCurrentPage() === 'home') {
                window.app.modules.slider.resumeSlider();
            }
        }
    }
});