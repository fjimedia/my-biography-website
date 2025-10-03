const VideoSlider = {
    currentSlide: 0,
    videos: [],
    indicators: [],
    slideInterval: null,

    init: function() {
        this.videos = document.querySelectorAll('.video-slide');
        this.indicators = document.querySelectorAll('.pixel-indicator');
        
        if (this.videos.length === 0) return;
        
        this.bindEvents();
        this.startSlider();
    },

    bindEvents: function() {
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });

        // Pause slider when not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseSlider();
            } else {
                this.resumeSlider();
            }
        });
    },

    startSlider: function() {
        clearInterval(this.slideInterval);
        this.resetProgressBars();
        
        setTimeout(() => {
            const activeProgress = document.querySelector('.pixel-indicator.active .pixel-progress');
            if (activeProgress) {
                activeProgress.style.transition = 'width 5s linear';
                activeProgress.style.width = '100%';
            }
        }, 50);

        if (this.videos[this.currentSlide]) {
            this.videos[this.currentSlide].play();
        }
        
        this.slideInterval = setInterval(() => this.nextSlide(), 5000);
    },

    pauseSlider: function() {
        clearInterval(this.slideInterval);
        if (this.videos[this.currentSlide]) {
            this.videos[this.currentSlide].pause();
        }
    },

    resumeSlider: function() {
        this.startSlider();
    },

    nextSlide: function() {
        if (this.videos.length === 0) return;
        
        this.videos[this.currentSlide].pause();
        this.videos[this.currentSlide].currentTime = 0;
        
        this.videos[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        this.currentSlide = (this.currentSlide + 1) % this.videos.length;
        
        this.videos[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
        
        this.videos[this.currentSlide].play();
        this.startSlider();
    },

    goToSlide: function(slideIndex) {
        if (this.videos.length === 0) return;
        
        this.videos[this.currentSlide].pause();
        this.videos[this.currentSlide].currentTime = 0;
        
        this.videos[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        this.currentSlide = slideIndex;
        
        this.videos[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
        
        this.videos[this.currentSlide].play();
        this.startSlider();
    },

    resetProgressBars: function() {
        document.querySelectorAll('.pixel-progress').forEach(progress => {
            progress.style.transition = 'none';
            progress.style.width = '0%';
        });
    },

    destroy: function() {
        clearInterval(this.slideInterval);
        this.videos.forEach(video => {
            video.pause();
            video.currentTime = 0;
        });
    }
};