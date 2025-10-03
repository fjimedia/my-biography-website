const CardsManager = {
    infoItems: [],
    cityCategories: [],

    init: function() {
        this.infoItems = document.querySelectorAll('.info-item');
        this.cityCategories = document.querySelectorAll('.city-category');
        
        this.bindEvents();
    },

    bindEvents: function() {
        // Info items click events
        this.infoItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (!ModalManager.expandedItem) {
                    ModalManager.expandItem(item);
                }
            });
        });

        // City categories click events
        this.cityCategories.forEach(category => {
            category.addEventListener('click', (e) => {
                if (!ModalManager.expandedItem) {
                    ModalManager.expandItem(category);
                }
            });
        });
    },

    getCardData: function(type, cardType) {
        // This function can be used to fetch card data from an API or JSON file
        const cards = {
            'info': {
                'name': {
                    title: 'About Me',
                    content: 'My name is Nikita, I am a passionate developer...',
                    features: [
                        { title: 'Age', value: '24' },
                        { title: 'Location', value: 'Russia/China' },
                        { title: 'Specialization', value: 'Web Development' }
                    ]
                },
                // Add other info cards data
            },
            'city': {
                'nature': {
                    title: 'Nature of Chengdu',
                    content: 'Chengdu is home to 80% of the world\'s giant pandas...',
                    // Add other city cards data
                }
                // Add other city categories
            }
        };

        return cards[type]?.[cardType] || null;
    },

    createCardElement: function(data, type) {
        // Function to dynamically create card elements
        const card = document.createElement('div');
        card.className = type === 'info' ? 'info-item' : 'city-category';
        card.setAttribute('data-type', data.type);
        
        card.innerHTML = `
            <div class="${type === 'info' ? 'info-item-background' : 'city-category-background'}" 
                 style="background-image: url('${data.backgroundImage}')"></div>
            <div class="${type === 'info' ? 'info-label' : 'city-category-label'}" 
                 data-en="${data.label.en}" data-ru="${data.label.ru}">${data.label.en}</div>
            <div class="${type === 'info' ? 'info-value' : 'city-category-value'}" 
                 data-en="${data.value.en}" data-ru="${data.value.ru}">${data.value.en}</div>
            <div class="detail-content" style="display: none;">
                <!-- Detailed content would be generated here -->
            </div>
        `;
        
        return card;
    },

    updateCardContent: function(cardElement, newData) {
        // Function to update card content dynamically
        const label = cardElement.querySelector('.info-label, .city-category-label');
        const value = cardElement.querySelector('.info-value, .city-category-value');
        
        if (label && newData.label) {
            label.setAttribute('data-en', newData.label.en);
            label.setAttribute('data-ru', newData.label.ru);
            label.textContent = newData.label[LanguageManager.getCurrentLanguage()];
        }
        
        if (value && newData.value) {
            value.setAttribute('data-en', newData.value.en);
            value.setAttribute('data-ru', newData.value.ru);
            value.textContent = newData.value[LanguageManager.getCurrentLanguage()];
        }
    }
};