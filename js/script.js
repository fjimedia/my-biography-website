// Главный класс приложения
class App {
    constructor() {
        this.currentPage = 'home';
        this.currentLang = 'en';
        this.currentSlide = 0;
        this.slideInterval = null;
        this.expandedItem = null;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.initSlides();
        this.initVideoPlayers();
        this.showPage('home');
        this.loadSavedLanguage();
    }

    // ==================== EVENT BINDING ====================
    bindEvents() {
        // Навигация
        this.bindNavigation();
        
        // Кнопки
        this.bindButtons();
        
        // Карточки
        this.bindCards();
        
        // Модальные окна
        this.bindModals();
        
        // Язык
        this.bindLanguage();
        
        // Меню
        this.bindMenu();
    }

    bindNavigation() {
        document.querySelectorAll('.nav-link, .dropdown-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = e.target.getAttribute('href').substring(1);
                this.showPage(targetPage);
            });
        });
    }

    bindButtons() {
        // Кнопка "Explore Now"
        document.getElementById('start-button').addEventListener('click', () => {
            this.showPage('info');
        });

        // Логотип - на главную
        document.getElementById('logo').addEventListener('click', () => {
            this.showPage('home');
        });

        // Кнопка "Назад" в расширенной карточке
        document.getElementById('back-button').addEventListener('click', (e) => {
            e.stopPropagation();
            this.collapseItem();
        });
    }

    bindCards() {
        const infoItems = document.querySelectorAll('.info-item, .city-category');
        
        infoItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (!this.expandedItem) {
                    this.expandItem(item);
                }
            });
        });

        // Клик по фону закрывает карточку
        document.getElementById('expanded-background').addEventListener('click', () => {
            if (this.expandedItem) {
                this.collapseItem();
            }
        });

        // Интерактивные элементы
        document.addEventListener('click', (e) => {
            if (e.target.closest('.interactive-element')) {
                const element = e.target.closest('.interactive-element');
                element.classList.toggle('active');
            }
        });
    }

    bindModals() {
        const socialModal = document.getElementById('social-modal');
        const closeSocialModal = document.getElementById('close-social-modal');

        // Показать социальные сети
        document.addEventListener('click', (e) => {
            if (e.target.closest('.show-social')) {
                e.preventDefault();
                socialModal.classList.add('active');
            }
        });

        // Закрыть модалку
        closeSocialModal.addEventListener('click', () => {
            socialModal.classList.remove('active');
        });

        socialModal.addEventListener('click', (e) => {
            if (e.target === socialModal) {
                socialModal.classList.remove('active');
            }
        });

        // CV кнопки
        document.addEventListener('click', (e) => {
            if (e.target.closest('.download-cv')) {
                e.preventDefault();
                this.showCVModal();
            }
        });
    }

    bindLanguage() {
        document.querySelectorAll('.lang-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });
    }

    bindMenu() {
        const menuIcon = document.querySelector('.menu-icon');
        const dropdownMenu = document.querySelector('.dropdown-menu');

        menuIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            menuIcon.classList.toggle('open');
            dropdownMenu.classList.toggle('open');
        });

        // Закрытие меню при клике вне его
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.menu-icon') && !e.target.closest('.dropdown-menu')) {
                menuIcon.classList.remove('open');
                dropdownMenu.classList.remove('open');
            }
        });
    }

    // ==================== PAGE MANAGEMENT ====================
    showPage(page) {
        this.currentPage = page;
        
        // Скрыть все страницы
        this.hideAllPages();
        
        // Закрыть меню
        this.closeMenu();
        
        // Показать нужную страницу
        if (page === 'info') {
            this.showInfoPage();
        } else if (page === 'city') {
            this.showCityPage();
        } else {
            this.showHomePage();
        }

        // Обновить активные ссылки
        this.updateActiveNavLinks(page);
    }

    hideAllPages() {
        const pages = {
            info: document.getElementById('info-page'),
            city: document.getElementById('city-page'),
            slider: document.getElementById('main-slider'),
            indicators: document.getElementById('pixel-indicators'),
            content: document.getElementById('main-content')
        };

        pages.info.classList.remove('active');
        pages.city.classList.remove('active');
        pages.slider.style.display = 'none';
        pages.indicators.style.display = 'none';
        pages.content.style.display = 'none';
    }

    showHomePage() {
        const slider = document.getElementById('main-slider');
        const indicators = document.getElementById('pixel-indicators');
        const content = document.getElementById('main-content');

        slider.style.display = 'block';
        indicators.style.display = 'flex';
        content.style.display = 'flex';
        
        // Перезапустить слайдер
        setTimeout(() => {
            this.goToSlide(0);
            this.startSlider();
        }, 100);
    }

    showInfoPage() {
        document.getElementById('info-page').classList.add('active');
        this.pauseSlider();
    }

    showCityPage() {
        document.getElementById('city-page').classList.add('active');
        this.pauseSlider();
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

    // ==================== SLIDER ====================
    initSlides() {
        const indicators = document.querySelectorAll('.pixel-indicator');
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });

        // Пауза при скрытии страницы
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseSlider();
            } else if (this.currentPage === 'home') {
                this.startSlider();
            }
        });
    }

    startSlider() {
        clearInterval(this.slideInterval);
        this.resetProgressBars();
        
        setTimeout(() => {
            const activeProgress = document.querySelector('.pixel-indicator.active .pixel-progress');
            if (activeProgress) {
                activeProgress.style.transition = 'width 5s linear';
                activeProgress.style.width = '100%';
            }
        }, 50);

        const videos = document.querySelectorAll('.video-slide');
        if (videos[this.currentSlide]) {
            videos[this.currentSlide].play();
        }
        
        this.slideInterval = setInterval(() => this.nextSlide(), 5000);
    }

    pauseSlider() {
        clearInterval(this.slideInterval);
        const videos = document.querySelectorAll('.video-slide');
        if (videos[this.currentSlide]) {
            videos[this.currentSlide].pause();
        }
    }

    nextSlide() {
        const videos = document.querySelectorAll('.video-slide');
        const indicators = document.querySelectorAll('.pixel-indicator');
        
        if (videos.length === 0) return;
        
        videos[this.currentSlide].pause();
        videos[this.currentSlide].currentTime = 0;
        
        videos[this.currentSlide].classList.remove('active');
        indicators[this.currentSlide].classList.remove('active');
        
        this.currentSlide = (this.currentSlide + 1) % videos.length;
        
        videos[this.currentSlide].classList.add('active');
        indicators[this.currentSlide].classList.add('active');
        
        videos[this.currentSlide].play();
        this.startSlider();
    }

    goToSlide(slideIndex) {
        const videos = document.querySelectorAll('.video-slide');
        const indicators = document.querySelectorAll('.pixel-indicator');
        
        if (videos.length === 0) return;
        
        videos[this.currentSlide].pause();
        videos[this.currentSlide].currentTime = 0;
        
        videos[this.currentSlide].classList.remove('active');
        indicators[this.currentSlide].classList.remove('active');
        
        this.currentSlide = slideIndex;
        
        videos[this.currentSlide].classList.add('active');
        indicators[this.currentSlide].classList.add('active');
        
        videos[this.currentSlide].play();
        this.startSlider();
    }

    resetProgressBars() {
        document.querySelectorAll('.pixel-progress').forEach(progress => {
            progress.style.transition = 'none';
            progress.style.width = '0%';
        });
    }

    // ==================== CARDS ====================
    expandItem(item) {
        if (this.expandedItem) return;
        
        this.expandedItem = item;
        const backgroundImage = item.querySelector('.info-item-background, .city-category-background').style.backgroundImage;
        const detailContent = item.querySelector('.detail-content');
        
        detailContent.style.display = 'block';
        document.getElementById('expanded-card-background').style.backgroundImage = backgroundImage;
        document.getElementById('expanded-card-content').innerHTML = detailContent.innerHTML;
        document.getElementById('expanded-background').style.display = 'block';
        document.getElementById('expanded-card-container').style.display = 'block';
        
        setTimeout(() => {
            document.getElementById('expanded-card-container').classList.add('active');
            document.getElementById('back-button').classList.add('visible');
            this.initExpandedCard();
        }, 10);
        
        document.body.style.overflow = 'hidden';
    }

    collapseItem() {
        if (!this.expandedItem) return;
        
        // Остановить все видео в карточке
        document.querySelectorAll('.video-player video').forEach(video => {
            video.pause();
        });
        
        document.getElementById('expanded-card-container').classList.remove('active');
        document.getElementById('expanded-background').style.display = 'none';
        document.getElementById('back-button').classList.remove('visible');
        
        setTimeout(() => {
            document.getElementById('expanded-card-container').style.display = 'none';
            this.expandedItem = null;
            document.body.style.overflow = '';
        }, 300);
    }

    initExpandedCard() {
        this.animateCardContent();
        this.initVideoPlayers(); // Переинициализировать видео плееры
        this.bindExpandedCardEvents();
    }

    animateCardContent() {
        const elements = document.getElementById('expanded-card-content').querySelectorAll(
            '.detail-title, .detail-text, .detail-features, .gallery, .interactive-element, .card-buttons, .fact-bubble, .timeline'
        );
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            setTimeout(() => {
                element.style.transition = 'all 0.5s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });
    }

    bindExpandedCardEvents() {
        const expandedContent = document.getElementById('expanded-card-content');
        
        // Социальные кнопки
        expandedContent.querySelectorAll('.show-social').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('social-modal').classList.add('active');
            });
        });

        // CV кнопки
        expandedContent.querySelectorAll('.download-cv').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showCVModal();
            });
        });

        // Интерактивные элементы
        expandedContent.querySelectorAll('.interactive-element').forEach(element => {
            element.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('active');
            });
        });
    }

    // ==================== VIDEO PLAYERS ====================
    initVideoPlayers() {
        const videoPlayers = document.querySelectorAll('.video-player');
        
        videoPlayers.forEach(player => {
            this.setupVideoPlayer(player);
        });
    }

    setupVideoPlayer(player) {
        const video = player.querySelector('video');
        const playPauseBtn = player.querySelector('.play-pause');
        const volumeBtn = player.querySelector('.volume-btn');
        const progressBar = player.querySelector('.progress-bar');
        const progress = player.querySelector('.progress');
        const currentTimeEl = player.querySelector('.current-time');
        const totalTimeEl = player.querySelector('.total-time');
        const fullscreenBtn = player.querySelector('.fullscreen-btn');
        
        const formatTime = (seconds) => {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        };
        
        const updateTime = () => {
            currentTimeEl.textContent = formatTime(video.currentTime);
            totalTimeEl.textContent = formatTime(video.duration);
            progress.style.width = (video.currentTime / video.duration) * 100 + '%';
        };
        
        // Play/Pause
        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playPauseBtn.textContent = '❚❚';
            } else {
                video.pause();
                playPauseBtn.textContent = '▶';
            }
        });
        
        // Volume
        volumeBtn.addEventListener('click', () => {
            if (video.muted) {
                video.muted = false;
                volumeBtn.textContent = '🔊';
            } else {
                video.muted = true;
                volumeBtn.textContent = '🔇';
            }
        });
        
        // Progress bar
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            video.currentTime = percent * video.duration;
        });
        
        // Fullscreen
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                player.requestFullscreen().catch(err => {
                    console.log(`Fullscreen error: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        });
        
        // Events
        video.addEventListener('timeupdate', updateTime);
        video.addEventListener('loadedmetadata', updateTime);
        video.addEventListener('ended', () => {
            playPauseBtn.textContent = '▶';
            video.currentTime = 0;
        });
        
        // Auto-hide controls
        let controlsTimeout;
        player.addEventListener('mousemove', () => {
            player.querySelector('.video-controls').style.opacity = '1';
            clearTimeout(controlsTimeout);
            controlsTimeout = setTimeout(() => {
                player.querySelector('.video-controls').style.opacity = '0';
            }, 3000);
        });
    }

    // ==================== LANGUAGE ====================
    loadSavedLanguage() {
        const savedLang = localStorage.getItem('selectedLang');
        if (savedLang) {
            this.switchLanguage(savedLang);
        }
    }

    switchLanguage(lang) {
        if (this.currentLang === lang) return;
        
        const transition = document.querySelector('.page-transition');
        transition.classList.add('active');
        
        setTimeout(() => {
            this.currentLang = lang;
            document.documentElement.setAttribute('lang', lang);
            this.updateTexts(lang);
            this.updateActiveLanguageButton(lang);
            localStorage.setItem('selectedLang', lang);
            
            setTimeout(() => transition.classList.remove('active'), 400);
        }, 400);
    }

    updateTexts(lang) {
        document.querySelectorAll('[data-en][data-ru]').forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });
    }

    updateActiveLanguageButton(lang) {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
    }

    // ==================== MODALS ====================
    showCVModal() {
        const cvModal = document.createElement('div');
        cvModal.className = 'social-modal active';
        cvModal.innerHTML = `
            <div class="social-modal-content">
                <button class="close-modal">×</button>
                <h3 data-en="My Creative Journey" data-ru="Мое творческое путешествие">My Creative Journey</h3>
                <div class="social-links">
                    <a href="https://read.cv/fji" class="social-link" target="_blank">
                        <span class="social-icon">📄</span>
                        <span>Interactive CV</span>
                    </a>
                    <a href="https://github.com/fjimedia" class="social-link" target="_blank">
                        <span class="social-icon">💻</span>
                        <span>GitHub Portfolio</span>
                    </a>
                    <a href="https://www.behance.net/fjimedia" class="social-link" target="_blank">
                        <span class="social-icon">🎨</span>
                        <span>Design Projects</span>
                    </a>
                </div>
                <p style="margin-top: 20px; color: #888; font-size: 14px;">
                    <span data-en="Explore my digital footprint across various platforms" data-ru="Исследуйте мой цифровой след на различных платформах">Explore my digital footprint across various platforms</span>
                </p>
            </div>
        `;
        
        document.body.appendChild(cvModal);
        
        cvModal.querySelector('.close-modal').addEventListener('click', () => {
            cvModal.remove();
        });
        
        cvModal.addEventListener('click', (e) => {
            if (e.target === cvModal) {
                cvModal.remove();
            }
        });
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});

// Вспомогательные функции
const Helpers = {
    formatTime: (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    },
    
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};
