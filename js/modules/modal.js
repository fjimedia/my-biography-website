const ModalManager = {
    socialModal: null,
    expandedBackground: null,
    expandedCardContainer: null,
    expandedCardBackground: null,
    expandedCardContent: null,
    backButton: null,
    expandedItem: null,

    init: function() {
        this.socialModal = document.getElementById('social-modal');
        this.expandedBackground = document.getElementById('expanded-background');
        this.expandedCardContainer = document.getElementById('expanded-card-container');
        this.expandedCardBackground = document.getElementById('expanded-card-background');
        this.expandedCardContent = document.getElementById('expanded-card-content');
        this.backButton = document.getElementById('back-button');

        this.bindEvents();
    },

    bindEvents: function() {
        // Social modal events
        const closeSocialModal = document.getElementById('close-social-modal');
        const showSocialButtons = document.querySelectorAll('.show-social');

        showSocialButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showSocialModal();
            });
        });

        closeSocialModal.addEventListener('click', () => {
            this.hideSocialModal();
        });

        this.socialModal.addEventListener('click', (e) => {
            if (e.target === this.socialModal) {
                this.hideSocialModal();
            }
        });

        // Expanded card events
        this.backButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.collapseItem();
        });

        this.expandedBackground.addEventListener('click', () => {
            if (this.expandedItem) {
                this.collapseItem();
            }
        });

        // CV download buttons
        const downloadCvButtons = document.querySelectorAll('.download-cv');
        downloadCvButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showCVModal();
            });
        });
    },

    showSocialModal: function() {
        this.socialModal.classList.add('active');
    },

    hideSocialModal: function() {
        this.socialModal.classList.remove('active');
    },

    expandItem: function(item) {
        if (this.expandedItem) return;
        
        this.expandedItem = item;
        const backgroundImage = item.querySelector('.info-item-background, .city-category-background').style.backgroundImage;
        const detailContent = item.querySelector('.detail-content');
        
        detailContent.style.display = 'block';
        this.expandedCardBackground.style.backgroundImage = backgroundImage;
        this.expandedCardContent.innerHTML = detailContent.innerHTML;
        this.expandedBackground.style.display = 'block';
        this.expandedCardContainer.style.display = 'block';
        
        setTimeout(() => {
            this.expandedCardContainer.classList.add('active');
            this.backButton.classList.add('visible');
            this.initExpandedCardContent();
        }, 10);
        
        document.body.style.overflow = 'hidden';
    },

    collapseItem: function() {
        if (!this.expandedItem) return;
        
        // Pause all videos in expanded card
        document.querySelectorAll('.video-player video').forEach(video => {
            video.pause();
        });
        
        this.expandedCardContainer.classList.remove('active');
        this.expandedBackground.style.display = 'none';
        this.backButton.classList.remove('visible');
        
        setTimeout(() => {
            this.expandedCardContainer.style.display = 'none';
            this.expandedItem = null;
            document.body.style.overflow = '';
        }, 300);
    },

    initExpandedCardContent: function() {
        this.animateCardContent();
        this.bindExpandedCardEvents();
        VideoPlayer.init(); // Reinitialize video players in expanded card
    },

    animateCardContent: function() {
        const elements = this.expandedCardContent.querySelectorAll('.detail-title, .detail-text, .detail-features, .gallery, .interactive-element, .card-buttons, .fact-bubble, .timeline');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            setTimeout(() => {
                element.style.transition = 'all 0.5s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });
    },

    bindExpandedCardEvents: function() {
        // Social buttons in expanded card
        const socialBtns = this.expandedCardContent.querySelectorAll('.show-social');
        socialBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showSocialModal();
            });
        });

        // CV buttons in expanded card
        const cvBtns = this.expandedCardContent.querySelectorAll('.download-cv');
        cvBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showCVModal();
            });
        });

        // Interactive elements
        const interactiveElements = this.expandedCardContent.querySelectorAll('.interactive-element');
        interactiveElements.forEach(element => {
            element.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('active');
            });
        });
    },

    showCVModal: function() {
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
};