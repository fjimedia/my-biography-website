const LanguageManager = {
    currentLang: 'en',

    init: function() {
        this.loadSavedLanguage();
        this.bindEvents();
    },

    loadSavedLanguage: function() {
        const savedLang = localStorage.getItem('selectedLang');
        if (savedLang) {
            this.switchLanguage(savedLang);
        }
    },

    bindEvents: function() {
        document.querySelectorAll('.lang-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });
    },

    switchLanguage: function(lang) {
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
    },

    updateTexts: function(lang) {
        document.querySelectorAll('[data-en][data-ru]').forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });
    },

    updateActiveLanguageButton: function(lang) {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
    },

    getCurrentLanguage: function() {
        return this.currentLang;
    }
};