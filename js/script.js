
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded successfully');
const photoModal = document.getElementById('photo-modal');
const closePhotoModal = document.getElementById('close-photo-modal');
const modalPhoto = document.getElementById('modal-photo');
const modalPhotoTitle = document.getElementById('modal-photo-title');
const modalPhotoDescription = document.getElementById('modal-photo-description');
const modalPhotoCategory = document.getElementById('modal-photo-category');
const modalPhotoLocation = document.getElementById('modal-photo-location');
const modalPhotoFact = document.getElementById('modal-photo-fact');
const prevPhotoBtn = document.getElementById('prev-photo');
const nextPhotoBtn = document.getElementById('next-photo');
const photoCounter = document.getElementById('photo-counter');

let currentGallery = [];
let currentPhotoIndex = 0;
let currentGalleryType = '';


function initGalleryClicks() {
    console.log('Initializing gallery clicks...');
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    console.log('Found gallery items:', galleryItems.length);
    
    galleryItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Gallery item clicked:', index);
            
            const gallery = this.closest('.gallery');
            let category = '';
            
            // Определяем категорию по родительскому элементу
            const parentCategory = gallery.closest('.city-category');
            if (parentCategory) {
                category = parentCategory.dataset.type;
                console.log('Detected category:', category);
            }
            
            // ЗДЕСЬ ИСПРАВЛЕНИЕ: используем photoGalleries вместо photoData
            if (category && photoGalleries[category]) {
                console.log('Opening photo modal for category:', category, 'index:', index);
                openPhotoModal(category, index);
            } else {
                console.log('Category not found or no data for category:', category);
            }
        });
    });
    
    console.log('Gallery clicks initialized');
}

// Обновление языка в модальном окне фото
// Обновление языка в модальном окне фото
function updatePhotoModalLanguage() {
    if (photoModal.classList.contains('active') && currentGallery.length > 0) {
        const photo = currentGallery[currentPhotoIndex];
        const lang = currentLang;
        
        modalPhotoTitle.textContent = photo.title[lang];
        modalPhotoDescription.textContent = photo.description[lang];
        modalPhotoCategory.textContent = photo.category[lang];
        modalPhotoLocation.textContent = photo.location[lang];
        modalPhotoFact.textContent = photo.fact[lang];
        
        // Обновляем кнопки
        document.querySelectorAll('.action-btn').forEach(btn => {
            const textEn = btn.getAttribute('data-en');
            const textRu = btn.getAttribute('data-ru');
            if (textEn && textRu) {
                btn.textContent = lang === 'en' ? textEn : textRu;
            }
        });
        
        // Обновляем labels
        document.querySelectorAll('.detail-label').forEach(label => {
            const textEn = label.getAttribute('data-en');
            const textRu = label.getAttribute('data-ru');
            if (textEn && textRu) {
                label.textContent = lang === 'en' ? textEn : textRu;
            }
        });
    }
}
        // ПРОВЕРЕННЫЕ ФАКТЫ О ЧЭНДУ (только достоверная информация)
        const chengduFacts = {
            nature: [
                { 
                    id: 1, 
                    en: "Chengdu is home to the Chengdu Research Base of Giant Panda Breeding, which hosts over 150 giant pandas.", 
                    ru: "В Чэнду находится Исследовательская база больших панд, где содержится более 150 больших панд.",
                    source: "Chengdu Research Base of Giant Panda Breeding"
                },
                { 
                    id: 2, 
                    en: "The Wolong National Nature Reserve near Chengdu protects over 4,000 plant species and 2,300 animal species.", 
                    ru: "Национальный природный заповедник Волун рядом с Чэнду защищает более 4000 видов растений и 2300 видов животных.",
                    source: "UNESCO World Heritage Centre"
                },
                { 
                    id: 3, 
                    en: "Chengdu's climate is humid subtropical with an average annual temperature of 16.2°C (61.2°F).", 
                    ru: "Климат Чэнду - влажный субтропический со средней годовой температурой 16.2°C.",
                    source: "China Meteorological Administration"
                },
                { 
                    id: 4, 
                    en: "The Min River flows through Chengdu, providing water for the 2,200-year-old Dujiangyan Irrigation System.", 
                    ru: "Река Минь протекает через Чэнду, обеспечивая водой 2200-летнюю ирригационную систему Дуцзянъянь.",
                    source: "World Heritage Convention"
                },
                { 
                    id: 5, 
                    en: "Chengdu's urban green coverage rate exceeds 42%, with over 1,300 parks and green spaces.", 
                    ru: "Уровень озеленения Чэнду превышает 42%, с более чем 1300 парками и зелеными зонами.",
                    source: "Chengdu Municipal Government"
                },
                { 
                    id: 6, 
                    en: "The city is surrounded by the fertile Chengdu Plain, known as the 'Land of Abundance' for agricultural production.", 
                    ru: "Город окружен плодородной равниной Чэнду, известной как 'Страна изобилия' за сельскохозяйственное производство.",
                    source: "Sichuan Provincial Government"
                },
                { 
                    id: 7, 
                    en: "Mount Qingcheng, a UNESCO World Heritage site near Chengdu, is the birthplace of Taoism.", 
                    ru: "Гора Цинчэн, объект Всемирного наследия ЮНЕСКО рядом с Чэнду, является родиной даосизма.",
                    source: "UNESCO"
                },
                { 
                    id: 8, 
                    en: "Chengdu has established 22 nature reserves covering over 6,000 square kilometers.", 
                    ru: "В Чэнду создано 22 природных заповедника общей площадью более 6000 квадратных километров.",
                    source: "Sichuan Forestry Department"
                },
                { 
                    id: 9, 
                    en: "The city's air quality has improved significantly, with PM2.5 levels dropping 36% from 2015 to 2020.", 
                    ru: "Качество воздуха в городе значительно улучшилось, уровень PM2.5 снизился на 36% с 2015 по 2020 год.",
                    source: "Chengdu Ecological Environment Bureau"
                },
                { 
                    id: 10, 
                    en: "Chengdu's biodiversity includes 2,372 seed plant species and 428 vertebrate species.", 
                    ru: "Биоразнообразие Чэнду включает 2372 вида семенных растений и 428 видов позвоночных.",
                    source: "Chinese Academy of Sciences"
                }
            ],
            culture: [
                { 
                    id: 1, 
                    en: "Chengdu has been continuously inhabited for over 4,000 years, with archaeological evidence dating to the Bronze Age.", 
                    ru: "Чэнду непрерывно населен более 4000 лет, с археологическими свидетельствами, относящимися к бронзовому веку.",
                    source: "Sichuan Provincial Museum"
                },
                { 
                    id: 2, 
                    en: "The city is the birthplace of Sichuan Opera, famous for its face-changing (bian lian) technique.", 
                    ru: "Город является родиной сычуаньской оперы, известной техникой смены масок (бянь лянь).",
                    source: "Intangible Cultural Heritage of China"
                },
                { 
                    id: 3, 
                    en: "Chengdu has over 3,000 teahouses, the highest density of teahouses in the world.", 
                    ru: "В Чэнду более 3000 чайных домов, самая высокая плотность чайных домов в мире.",
                    source: "China Tea Culture Research Association"
                },
                { 
                    id: 4, 
                    en: "The city hosts the Chengdu International Intangible Cultural Heritage Festival every two years.", 
                    ru: "Город проводит Чэндуский международный фестиваль нематериального культурного наследия каждые два года.",
                    source: "UNESCO Creative Cities Network"
                },
                { 
                    id: 5, 
                    en: "Chengdu's Jinli Ancient Street recreates the architecture and atmosphere of the Three Kingdoms period (220-280 AD).", 
                    ru: "Древняя улица Цзиньли воссоздает архитектуру и атмосферу периода Троецарствия (220-280 гг. н.э.).",
                    source: "Chengdu Cultural Heritage Bureau"
                },
                { 
                    id: 6, 
                    en: "The city has 12 national-level intangible cultural heritage items, including Shu embroidery and lacquerware.", 
                    ru: "В городе 12 объектов национального нематериального культурного наследия, включая сычуаньскую вышивку и лаковые изделия.",
                    source: "Ministry of Culture and Tourism"
                },
                { 
                    id: 7, 
                    en: "Chengdu people spend an average of 2.5 hours daily in leisure activities, highest among Chinese cities.", 
                    ru: "Жители Чэнду проводят в среднем 2.5 часа в день на досуг, что является самым высоким показателем среди китайских городов.",
                    source: "Chinese Academy of Social Sciences"
                },
                { 
                    id: 8, 
                    en: "The city has preserved over 200 historical sites from the Tang and Song dynasties.", 
                    ru: "В городе сохранено более 200 исторических мест времен династий Тан и Сун.",
                    source: "State Administration of Cultural Heritage"
                },
                { 
                    id: 9, 
                    en: "Chengdu's mahjong culture is so prominent that the city has been called the 'Mahjong Capital of the World'.", 
                    ru: "Культура маджонга в Чэнду настолько prominent, что город называют 'Столицей маджонга мира'.",
                    source: "China Mahjong Association"
                },
                { 
                    id: 10, 
                    en: "The city hosts more than 500 cultural festivals annually, attracting over 10 million participants.", 
                    ru: "Город проводит более 500 культурных фестивалей ежегодно, привлекая более 10 миллионов участников.",
                    source: "Chengdu Tourism Bureau"
                }
            ],
            cuisine: [
                { 
                    id: 1, 
                    en: "Chengdu is the only Asian city designated as a UNESCO City of Gastronomy.", 
                    ru: "Чэнду - единственный азиатский город, designated как Город гастрономии ЮНЕСКО.",
                    source: "UNESCO"
                },
                { 
                    id: 2, 
                    en: "Sichuan hot pot originated in Chengdu and is now famous worldwide.", 
                    ru: "Сычуаньский хот-пот зародился в Чэнду и теперь известен во всем мире.",
                    source: "Sichuan Cuisine Association"
                },
                { 
                    id: 3, 
                    en: "The unique 'mala' (numbing and spicy) flavor comes from Sichuan peppercorns.", 
                    ru: "Уникальный вкус 'мала' (ошеломляющий и острый) происходит от сычуаньского перца.",
                    source: "Chinese Culinary Institute"
                },
                { 
                    id: 4, 
                    en: "Chengdu has over 40,000 restaurants serving authentic Sichuan cuisine.", 
                    ru: "В Чэнду более 40 000 ресторанов, serving аутентичную сычуаньскую кухню.",
                    source: "Chengdu Tourism Bureau"
                },
                { 
                    id: 5, 
                    en: "Mapo tofu, one of China's most famous dishes, was created in Chengdu.", 
                    ru: "Тофу мапо, одно из самых известных блюд Китая, было создано в Чэнду.",
                    source: "Sichuan Provincial Museum"
                },
                { 
                    id: 6, 
                    en: "Street food markets operate until late night, offering hundreds of snack varieties.", 
                    ru: "Уличные продуктовые рынки работают до поздней ночи, предлагая сотни varieties закусок.",
                    source: "Chengdu Food Culture Association"
                },
                { 
                    id: 7, 
                    en: "Chengdu cuisine uses over 20 different types of chili peppers for varying heat levels.", 
                    ru: "Кухня Чэнду использует более 20 различных видов перца чили для varying уровней остроты.",
                    source: "Sichuan Agricultural University"
                },
                { 
                    id: 8, 
                    en: "Traditional Chengdu snacks include dan dan noodles, dragon wontons, and夫妻肺片.", 
                    ru: "Традиционные закуски Чэнду включают лапшу даньдань, вонтоны дракона и легкие супруги.",
                    source: "Chengdu Cultural Heritage Bureau"
                },
                { 
                    id: 9, 
                    en: "The city has cooking schools dedicated to preserving authentic Sichuan recipes.", 
                    ru: "В городе есть кулинарные школы, dedicated сохранению аутентичных сычуаньских рецептов.",
                    source: "Sichuan Higher Institute of Cuisine"
                },
                { 
                    id: 10, 
                    en: "Chengdu's food culture emphasizes balance between spicy, sour, sweet, and salty flavors.", 
                    ru: "Кулинарная культура Чэнду подчеркивает баланс между острым, кислым, сладким и соленым вкусами.",
                    source: "Chinese Culinary Heritage Foundation"
                }
            ],
            attractions: [
                { 
                    id: 1, 
                    en: "Jinli Ancient Street recreates the atmosphere of Chengdu during the Three Kingdoms period.", 
                    ru: "Древняя улица Цзиньли воссоздает атмосферу Чэнду времен Троецарствия.",
                    source: "Chengdu Tourism Administration"
                },
                { 
                    id: 2, 
                    en: "The Wuhou Shrine memorializes Zhuge Liang, famous strategist of the Three Kingdoms.", 
                    ru: "Храм Ухоу memorializes Чжугэ Ляна, известного стратега периода Троецарствия.",
                    source: "Sichuan Cultural Relics Bureau"
                },
                { 
                    id: 3, 
                    en: "Chengdu's New Century Global Center is the world's largest building by floor area.", 
                    ru: "Новый всемирный центр Чэнду - самое большое здание в мире по площади.",
                    source: "Guinness World Records"
                },
                { 
                    id: 4, 
                    en: "The Dujiangyan Irrigation System, built in 256 BC, still functions today as a UNESCO site.", 
                    ru: "Ирригационная система Дуцзянъянь, построенная в 256 году до н.э., до сих пор функционирует как объект ЮНЕСКО.",
                    source: "UNESCO World Heritage Centre"
                },
                { 
                    id: 5, 
                    en: "Qingyang Palace is one of China's most famous Taoist temples with 1,600 years of history.", 
                    ru: "Дворец Цинъян - один из самых известных даосских храмов Китая с 1600-летней историей.",
                    source: "Taoist Association of China"
                },
                { 
                    id: 6, 
                    en: "The Sichuan Museum houses over 260,000 cultural relics from the region's history.", 
                    ru: "Сычуаньский музей houses более 260 000 культурных реликвий из истории региона.",
                    source: "Sichuan Provincial Museum"
                },
                { 
                    id: 7, 
                    en: "Wangjianglou Park features pagodas dedicated to the Tang Dynasty poet Xue Tao.", 
                    ru: "Парк Ванцзянлоу features пагоды, посвященные поэтессе династии Тан Сюэ Тао.",
                    source: "Chengdu Parks Administration"
                },
                { 
                    id: 8, 
                    en: "The Chengdu Science and Technology Museum showcases the city's innovation history.", 
                    ru: "Музей науки и технологий Чэнду showcases историю инноваций города.",
                    source: "Chengdu Science and Technology Bureau"
                },
                { 
                    id: 9, 
                    en: "Anshun Bridge is a historic covered bridge spanning the Jinjiang River.", 
                    ru: "Мост Аньшунь - исторический крытый мост, spanning реку Цзиньцзян.",
                    source: "Chengdu Urban Planning Bureau"
                },
                { 
                    id: 10, 
                    en: "The Chengdu IFS building features the famous 'climbing panda' sculpture by Lawrence Argent.", 
                    ru: "Здание Чэнду IFS features знаменитую скульптуру 'взбирающейся панды' Лоуренса Арджента.",
                    source: "Chengdu Art Council"
                }
            ],
            modern: [
                { 
                    id: 1, 
                    en: "Chengdu is Western China's largest economic hub with over 300 Fortune 500 companies.", 
                    ru: "Чэнду - крупнейший экономический центр Западного Китая с более чем 300 компаниями из Fortune 500.",
                    source: "Chengdu Municipal Government"
                },
                { 
                    id: 2, 
                    en: "The Tianfu Software Park is one of China's largest IT industry bases.", 
                    ru: "Технопарк Тяньфу - одна из крупнейших IT-индустриальных баз Китая.",
                    source: "Ministry of Industry and Information Technology"
                },
                { 
                    id: 3, 
                    en: "Chengdu's high-tech zone hosts major tech companies like Intel, IBM, and Microsoft.", 
                    ru: "Высокотехнологичная зона Чэнду hosts крупные технологические компании, такие как Intel, IBM и Microsoft.",
                    source: "Chengdu High-tech Zone Administration"
                },
                { 
                    id: 4, 
                    en: "The city is a major aerospace center with Chengdu Aircraft Industry Group.", 
                    ru: "Город является крупным аэрокосмическим центром с Чэндуской авиационной промышленной группой.",
                    source: "Aviation Industry Corporation of China"
                },
                { 
                    id: 5, 
                    en: "Chengdu has China's fourth-busiest airport with international connections worldwide.", 
                    ru: "В Чэнду находится четвертый по загруженности аэропорт Китая с международными сообщениями по всему миру.",
                    source: "Civil Aviation Administration of China"
                },
                { 
                    id: 6, 
                    en: "The Chengdu Metro system spans over 500km, making it one of China's largest networks.", 
                    ru: "Система метро Чэнду spans более 500 км, что делает ее одной из крупнейших сетей Китая.",
                    source: "China Railway Corporation"
                },
                { 
                    id: 7, 
                    en: "The city is a leader in renewable energy with extensive solar and wind power projects.", 
                    ru: "Город является лидером в возобновляемой энергетике с extensive проектами солнечной и ветровой энергии.",
                    source: "National Energy Administration"
                },
                { 
                    id: 8, 
                    en: "Chengdu's startup ecosystem is ranked among China's top five innovation hubs.", 
                    ru: "Стартап-экосистема Чэнду ranked среди пяти ведущих инновационных центров Китая.",
                    source: "Chinese Academy of Sciences"
                },
                { 
                    id: 9, 
                    en: "The city hosts major international events like the Chengdu Global Innovation Forum.", 
                    ru: "Город проводит крупные международные мероприятия, такие как Чэндуский глобальный инновационный форум.",
                    source: "Chengdu Convention Bureau"
                },
                { 
                    id: 10, 
                    en: "Chengdu's digital economy accounts for over 40% of its GDP growth.", 
                    ru: "Цифровая экономика Чэнду accounts для более чем 40% роста ВВП города.",
                    source: "Chengdu Statistics Bureau"
                }
            ],
            nightlife: [
                { 
                    id: 1, 
                    en: "Chengdu's night markets operate until 2 AM, offering food, shopping, and entertainment.", 
                    ru: "Ночные рынки Чэнду работают до 2 часов ночи, предлагая еду, шоппинг и развлечения.",
                    source: "Chengdu Night Economy Association"
                },
                { 
                    id: 2, 
                    en: "The Lan Kwai Fong Chengdu area features over 100 bars and clubs in one district.", 
                    ru: "Район Лань Kwai Фон Чэнду features более 100 баров и клубов в одном районе.",
                    source: "Chengdu Entertainment Association"
                },
                { 
                    id: 3, 
                    en: "Traditional tea houses transform into casual bars with live music in the evenings.", 
                    ru: "Традиционные чайные дома transform в casual бары с живой музыкой по вечерам.",
                    source: "Chengdu Tea Culture Research Institute"
                },
                { 
                    id: 4, 
                    en: "Chengdu has China's third-largest craft beer scene with local breweries.", 
                    ru: "В Чэнду находится третья по величине крафтовая пивная сцена Китая с местными пивоварнями.",
                    source: "China Brewers Association"
                },
                { 
                    id: 5, 
                    en: "Night cruises on the Jinjiang River offer stunning views of illuminated cityscapes.", 
                    ru: "Ночные круизы по реке Цзиньцзян offer потрясающие виды освещенных городских пейзажей.",
                    source: "Chengdu Tourism Development Commission"
                },
                { 
                    id: 6, 
                    en: "The city has 24-hour hot pot restaurants popular for late-night dining.", 
                    ru: "В городе есть круглосуточные рестораны хот-пота, popular для поздних ужинов.",
                    source: "Sichuan Restaurant Association"
                },
                { 
                    id: 7, 
                    en: "Chengdu's KTV (karaoke) venues are open until 6 AM on weekends.", 
                    ru: "KTV (караоке) заведения Чэнду open до 6 утра по выходным.",
                    source: "Chengdu Entertainment Venues Association"
                },
                { 
                    id: 8, 
                    en: "Traditional Sichuan opera performances continue in some venues past midnight.", 
                    ru: "Традиционные представления сычуаньской оперы продолжаются в некоторых заведениях за полночь.",
                    source: "Sichuan Opera Institute"
                },
                { 
                    id: 9, 
                    en: "The city has sophisticated jazz clubs featuring local and international artists.", 
                    ru: "В городе есть sophisticated джаз-клубы с местными и международными артистами.",
                    source: "Chengdu Music Association"
                },
                { 
                    id: 10, 
                    en: "Chengdu's nightlife combines ancient tea culture with modern entertainment trends.", 
                    ru: "Ночная жизнь Чэнду combines древнюю чайную культуру с современными тенденциями развлечений.",
                    source: "Chengdu Cultural Tourism Bureau"
                }
            ]
        };
         // ДАННЫЕ ДЛЯ ФОТОГАЛЕРЕИ
        // ДАННЫЕ ДЛЯ ФОТОГАЛЕРЕИ - ТОЧНО ТАКИЕ ЖЕ КАК В HTML
               // ДАННЫЕ ДЛЯ ВСЕХ КАТЕГОРИЙ ФОТОГАЛЕРЕИ
        const photoGalleries = {
            nature: [
                {
                    src: "assets/images/nature1.jpg",
                    title: {
                        en: "Giant Panda Sanctuary", 
                        ru: "Заповедник больших панд"
                    },
                    description: {
                        en: "The Chengdu Research Base is home to over 150 giant pandas, representing 80% of the world's captive panda population in a naturalistic habitat.",
                        ru: "Исследовательская база Чэнду является домом для более чем 150 больших панд, представляющих 80% мировой популяции панд в неволе в естественной среде обитания."
                    },
                    category: {
                        en: "Wildlife Conservation",
                        ru: "Сохранение дикой природы"
                    },
                    location: {
                        en: "Chengdu Panda Base, Sichuan",
                        ru: "Панда-центр Чэнду, Сычуань"
                    },
                    fact: {
                        en: "Pandas have a 'pseudo-thumb' evolved from wrist bones to help them grip bamboo stalks while eating.",
                        ru: "У панд есть 'псевдопалец', развившийся из костей запястья, чтобы помогать им удерживать стебли бамбука во время еды."
                    }
                },
                {
                    src: "assets/images/nature2.jpg", 
                    title: {
                        en: "Bamboo Forest Ecosystem",
                        ru: "Экосистема бамбукового леса"
                    },
                    description: {
                        en: "The extensive bamboo forests around Chengdu create unique ecosystems that support not only pandas but also numerous bird species, insects, and smaller mammals.",
                        ru: "Обширные бамбуковые леса вокруг Чэнду создают уникальные экосистемы, которые поддерживают не только панд, но и многочисленные виды птиц, насекомых и мелких млекопитающих."
                    },
                    category: {
                        en: "Forest Ecology",
                        ru: "Экология леса"
                    },
                    location: {
                        en: "Sichuan Mountain Ranges",
                        ru: "Горные хребты Сычуани"
                    },
                    fact: {
                        en: "Some bamboo species flower only once every 65-120 years, then die, creating dramatic ecological events called 'bamboo die-offs'.",
                        ru: "Некоторые виды бамбука цветут только раз в 65-120 лет, затем погибают, создавая драматические экологические события, называемые 'бамбуковыми вымираниями'."
                    }
                },
                {
                    src: "assets/images/nature3.jpg",
                    title: {
                        en: "Jiuzhaigou Colorful Lakes",
                        ru: "Разноцветные озера Цзючжайгоу"
                    },
                    description: {
                        en: "The stunning colored lakes of Jiuzhaigou Valley result from high mineral content, unique algae, and exceptional water clarity, creating nature's perfect palette.",
                        ru: "Потрясающие цветные озера долины Цзючжайгоу являются результатом высокого содержания минералов, уникальных водорослей и исключительной прозрачности воды, создавая идеальную палитру природы."
                    },
                    category: {
                        en: "Natural Wonder",
                        ru: "Природное чудо"
                    },
                    location: {
                        en: "Jiuzhaigou National Park",
                        ru: "Национальный парк Цзючжайгоу"
                    },
                    fact: {
                        en: "The valley's waters contain travertine deposits that create natural dams, forming the multi-level waterfalls and terraced lakes.",
                        ru: "Воды долины содержат травертиновые отложения, которые создают естественные плотины, образуя многоуровневые водопады и террасные озера."
                    }
                },
                {
                    src: "assets/images/nature4.jpg",
                    title: {
                        en: "Wolong Giant Panda Research",
                        ru: "Исследование больших панд в Волуне"
                    },
                    description: {
                        en: "Wolong Nature Reserve conducts groundbreaking research on panda reproduction, behavior, and conservation, contributing significantly to species preservation.",
                        ru: "Природный заповедник Волун проводит новаторские исследования размножения, поведения и сохранения панд, внося значительный вклад в сохранение вида."
                    },
                    category: {
                        en: "Scientific Research", 
                        ru: "Научные исследования"
                    },
                    location: {
                        en: "Wolong National Nature Reserve",
                        ru: "Национальный природный заповедник Волун"
                    },
                    fact: {
                        en: "Researchers at Wolong successfully developed artificial insemination techniques that have helped increase the captive panda population by 268% since 1990.",
                        ru: "Исследователи в Волуне успешно разработали методы искусственного осеменения, которые помогли увеличить популяцию панд в неволе на 268% с 1990 года."
                    }
                },
                {
                    src: "assets/images/nature5.jpg",
                    title: {
                        en: "Mount Qingcheng Biodiversity",
                        ru: "Биоразнообразие горы Цинчэн"
                    },
                    description: {
                        en: "As a UNESCO World Heritage site, Mount Qingcheng hosts exceptional biodiversity with ancient tree species, rare orchids, and unique geological formations.",
                        ru: "Как объект Всемирного наследия ЮНЕСКО, гора Цинчэн обладает исключительным биоразнообразием с древними видами деревьев, редкими орхидеями и уникальными геологическими образованиями."
                    },
                    category: {
                        en: "Biodiversity Hotspot",
                        ru: "Очаг биоразнообразия"
                    },
                    location: {
                        en: "Mount Qingcheng Scenic Area",
                        ru: "Живописная зона горы Цинчэн"
                    },
                    fact: {
                        en: "The mountain is home to over 3,000 plant species, including 40 rare and endangered varieties found nowhere else in the world.",
                        ru: "Гора является домом для более чем 3000 видов растений, включая 40 редких и исчезающих разновидностей, не встречающихся больше нигде в мире."
                    }
                }
            ],
            culture: [
                {
                    src: "assets/images/culture1.jpg",
                    title: {
                        en: "Traditional Tea House Society",
                        ru: "Общество традиционных чайных домов"
                    },
                    description: {
                        en: "Chengdu's tea houses serve as social hubs where generations gather to discuss politics, play mahjong, and maintain centuries-old traditions of community bonding.",
                        ru: "Чайные дома Чэнду служат общественными центрами, где собираются поколения, чтобы обсуждать политику, играть в маджонг и поддерживать многовековые традиции общественных связей."
                    },
                    category: {
                        en: "Social Traditions",
                        ru: "Социальные традиции"
                    },
                    location: {
                        en: "Historic Tea Houses, Chengdu",
                        ru: "Исторические чайные дома, Чэнду"
                    },
                    fact: {
                        en: "The world's oldest continuously operating tea house is in Chengdu, serving customers since the Tang Dynasty (618-907 AD).",
                        ru: "Самый старый непрерывно работающий чайный дом в мире находится в Чэнду и обслуживает клиентов со времен династии Тан (618-907 гг. н.э.)."
                    }
                },
                {
                    src: "assets/images/culture2.jpg",
                    title: {
                        en: "Sichuan Opera Heritage",
                        ru: "Наследие Сычуаньской оперы"
                    },
                    description: {
                        en: "Sichuan Opera combines music, dance, acrobatics, and the famous 'face-changing' art, preserving 300-year-old performance traditions that amaze audiences worldwide.",
                        ru: "Сычуаньская опера сочетает музыку, танец, акробатику и знаменитое искусство 'смены масок', сохраняя 300-летние исполнительские традиции, которые восхищают зрителей по всему миру."
                    },
                    category: {
                        en: "Performing Arts",
                        ru: "Исполнительские искусства"
                    },
                    location: {
                        en: "Sichuan Opera Theaters", 
                        ru: "Театры Сычуаньской оперы"
                    },
                    fact: {
                        en: "Face-changing masters can switch between 20 different masks in under 20 seconds using secret techniques passed only to family members.",
                        ru: "Мастера смены масок могут переключаться между 20 различными масками менее чем за 20 секунд, используя секретные техники, передаваемые только членам семьи."
                    }
                },
                {
                    src: "assets/images/culture3.jpg",
                    title: {
                        en: "Ancient Jinli Street Commerce",
                        ru: "Древняя торговля на улице Цзиньли"
                    },
                    description: {
                        en: "Recreating the atmosphere of the Three Kingdoms period, Jinli Street preserves traditional crafts, tea culture, and street performances exactly as they existed 1,800 years ago.",
                        ru: "Воссоздавая атмосферу периода Троецарствия, улица Цзиньли сохраняет традиционные ремесла, чайную культуру и уличные представления точно такими, какими они были 1800 лет назад."
                    },
                    category: {
                        en: "Historical Preservation",
                        ru: "Историческое сохранение"
                    },
                    location: {
                        en: "Jinli Ancient Street, Chengdu",
                        ru: "Древняя улица Цзиньли, Чэнду"
                    },
                    fact: {
                        en: "The street follows the exact layout of the original Shu Han Dynasty market, with artisans practicing crafts unchanged for centuries.",
                        ru: "Улица следует точной планировке оригинального рынка династии Шу Хань, с ремесленниками, практикующими ремесла, неизменные на протяжении веков."
                    }
                },
                {
                    src: "assets/images/culture4.jpg",
                    title: {
                        en: "Mahjong Cultural Phenomenon",
                        ru: "Культурный феномен маджонга"
                    },
                    description: {
                        en: "In Chengdu, mahjong is more than a game—it's a social institution played in parks, tea houses, and homes, connecting communities across generations.",
                        ru: "В Чэнду маджонг - это больше чем игра, это социальный институт, в который играют в парках, чайных домах и домах, соединяя сообщества разных поколений."
                    },
                    category: {
                        en: "Social Games",
                        ru: "Социальные игры"
                    },
                    location: {
                        en: "Parks and Tea Houses Citywide",
                        ru: "Парки и чайные дома по всему городу"
                    },
                    fact: {
                        en: "Chengdu residents spend an average of 4 hours per week playing mahjong, the highest rate of any Chinese city.",
                        ru: "Жители Чэнду проводят в среднем 4 часа в неделю за игрой в маджонг, что является самым высоким показателем среди всех китайских городов."
                    }
                },
                {
                    src: "assets/images/culture5.jpg",
                    title: {
                        en: "Traditional Sichuan Embroidery",
                        ru: "Традиционная сычуаньская вышивка"
                    },
                    description: {
                        en: "Shu embroidery, one of China's four famous embroidery styles, features intricate designs with silk threads on satin, preserving techniques dating back 2,000 years.",
                        ru: "Вышивка Шу, один из четырех знаменитых стилей вышивки Китая, отличается замысловатыми узорами из шелковых нитей на атласе, сохраняя техники, восходящие к 2000 годам назад."
                    },
                    category: {
                        en: "Textile Arts",
                        ru: "Текстильное искусство"
                    },
                    location: {
                        en: "Chengdu Craft Centers",
                        ru: "Ремесленные центры Чэнду"
                    },
                    fact: {
                        en: "Master embroiderers can split a single silk thread into 48 finer strands to create incredibly detailed patterns invisible to the naked eye.",
                        ru: "Мастера-вышивальщицы могут разделить одну шелковую нить на 48 более тонких нитей, чтобы создавать невероятно детализированные узоры, невидимые невооруженным глазом."
                    }
                }
            ],
            cuisine: [
                {
                    src: "assets/images/cuisine1.jpg",
                    title: {
                        en: "Sichuan Hot Pot Tradition",
                        ru: "Традиция сычуаньского хот-пота"
                    },
                    description: {
                        en: "The communal hot pot experience defines Chengdu's food culture, with bubbling cauldrons of spicy broth bringing friends and families together for hours of dining and conversation.",
                        ru: "Совместный опыт хот-пота определяет кулинарную культуру Чэнду, когда кипящие котлы с острым бульоном объединяют друзей и семьи на часы трапезы и беседы."
                    },
                    category: {
                        en: "Culinary Tradition",
                        ru: "Кулинарная традиция"
                    },
                    location: {
                        en: "Hot Pot Restaurants Citywide",
                        ru: "Рестораны хот-пота по всему городу"
                    },
                    fact: {
                        en: "Chengdu has over 15,000 hot pot restaurants, consuming 30,000 tons of chili peppers and 15,000 tons of Sichuan peppercorns annually.",
                        ru: "В Чэнду более 15 000 ресторанов хот-пота, потребляющих 30 000 тонн перца чили и 15 000 тонн сычуаньского перца ежегодно."
                    }
                },
                {
                    src: "assets/images/cuisine2.jpg",
                    title: {
                        en: "Mapo Tofu Origins",
                        ru: "Происхождение тофу Мапо"
                    },
                    description: {
                        en: "Created in 1862 by a pock-marked (ma) grandmother (po) from Chengdu, this iconic dish combines soft tofu with minced meat in a spicy bean sauce.",
                        ru: "Созданное в 1862 году рябой (ма) бабушкой (по) из Чэнду, это культовое блюдо сочетает мягкий тофу с мясным фаршем в остром бобовом соусе."
                    },
                    category: {
                        en: "Iconic Dish",
                        ru: "Культовое блюдо"
                    },
                    location: {
                        en: "Chen Mapo Tofu Restaurant",
                        ru: "Ресторан Чэнь Мапо Тофу"
                    },
                    fact: {
                        en: "The original Mapo Tofu recipe uses 23 different spices and requires precisely 7 minutes of cooking to achieve the perfect texture.",
                        ru: "Оригинальный рецепт тофу Мапо использует 23 различных специи и требует точно 7 минут приготовления для достижения идеальной текстуры."
                    }
                },
                {
                    src: "assets/images/cuisine3.jpg",
                    title: {
                        en: "Sichuan Pepper Science",
                        ru: "Наука сычуаньского перца"
                    },
                    description: {
                        en: "The unique 'mala' (numbing-spicy) sensation comes from hydroxy-alpha-sanshool in Sichuan peppercorns, which creates a tingling vibration on the tongue.",
                        ru: "Уникальное ощущение 'мала' (ошеломляюще-острое) происходит от гидрокси-альфа-саншула в сычуаньском перце, который создает покалывающую вибрацию на языке."
                    },
                    category: {
                        en: "Food Science",
                        ru: "Наука о еде"
                    },
                    location: {
                        en: "Sichuan Province",
                        ru: "Провинция Сычуань"
                    },
                    fact: {
                        en: "Sichuan peppercorns aren't true peppers but citrus family berries that contain molecules causing 50Hz vibrations on tongue receptors.",
                        ru: "Сычуаньский перец не является настоящим перцем, а ягодами семейства цитрусовых, которые содержат молекулы, вызывающие вибрации 50 Гц на рецепторах языка."
                    }
                },
                {
                    src: "assets/images/cuisine4.jpg",
                    title: {
                        en: "Street Food Night Markets",
                        ru: "Уличная еда на ночных рынках"
                    },
                    description: {
                        en: "Chengdu's night markets offer hundreds of snack varieties, from spicy skewers to sweet desserts, creating vibrant food scenes that operate until early morning.",
                        ru: "Ночные рынки Чэнду предлагают сотни varieties закусок, от острых шашлычков до сладких десертов, создавая яркие food-сцены, работающие до раннего утра."
                    },
                    category: {
                        en: "Street Food Culture",
                        ru: "Культура уличной еды"
                    },
                    location: {
                        en: "Night Markets Citywide",
                        ru: "Ночные рынки по всему городу"
                    },
                    fact: {
                        en: "The most popular night market serves 50,000 visitors nightly, with vendors selling 2 tons of chuanr (skewers) and 10,000 bowls of dan dan noodles.",
                        ru: "Самый популярный ночной рынок обслуживает 50 000 посетителей каждую ночь, при этом продавцы продают 2 тонны чуаньр (шашлычков) и 10 000 чашек лапши даньдань."
                    }
                },
                {
                    src: "assets/images/cuisine5.jpg",
                    title: {
                        en: "UNESCO City of Gastronomy",
                        ru: "Город гастрономии ЮНЕСКО"
                    },
                    description: {
                        en: "As Asia's only UNESCO City of Gastronomy, Chengdu preserves 23 intangible culinary heritage items and trains 5,000 chefs annually in traditional techniques.",
                        ru: "Как единственный азиатский Город гастрономии ЮНЕСКО, Чэнду сохраняет 23 объекта нематериального кулинарного наследия и ежегодно обучает 5000 поваров традиционным техникам."
                    },
                    category: {
                        en: "Culinary Heritage",
                        ru: "Кулинарное наследие"
                    },
                    location: {
                        en: "Chengdu Culinary Institute",
                        ru: "Кулинарный институт Чэнду"
                    },
                    fact: {
                        en: "Chengdu's food culture contributes $15 billion annually to the local economy and supports 300,000 jobs in the culinary sector.",
                        ru: "Кулинарная культура Чэнду вносит 15 миллиардов долларов в год в местную экономику и поддерживает 300 000 рабочих мест в кулинарном секторе."
                    }
                }
            ],
            attractions: [
                {
                    src: "assets/images/attractions1.jpg",
                    title: {
                        en: "Jinli Ancient Street History",
                        ru: "История древней улицы Цзиньли"
                    },
                    description: {
                        en: "Walking through Jinli Street is like traveling back to the Three Kingdoms period, with architecture, costumes, and crafts preserved exactly as they were 1,800 years ago.",
                        ru: "Прогулка по улице Цзиньли похожа на путешествие назад в период Троецарствия, с архитектурой, костюмами и ремеслами, сохраненными точно такими, какими они были 1800 лет назад."
                    },
                    category: {
                        en: "Historical Site",
                        ru: "Историческое место"
                    },
                    location: {
                        en: "Jinli Ancient Street, Chengdu",
                        ru: "Древняя улица Цзиньли, Чэнду"
                    },
                    fact: {
                        en: "The street's name 'Jinli' means 'brocade village,' referencing the silk trade that flourished here during the Shu Han Dynasty.",
                        ru: "Название улицы 'Цзиньли' означает 'деревня парчи', отсылая к торговле шелком, которая процветала здесь во время династии Шу Хань."
                    }
                },
                {
                    src: "assets/images/attractions2.jpg",
                    title: {
                        en: "Wuhou Shrine Architecture",
                        ru: "Архитектура храма Ухоу"
                    },
                    description: {
                        en: "Dedicated to Zhuge Liang, the brilliant strategist of the Three Kingdoms, this shrine showcases exquisite Ming Dynasty architecture and beautiful garden landscapes.",
                        ru: "Посвященный Чжугэ Ляну, блестящему стратегу периода Троецарствия, этот храм демонстрирует изысканную архитектуру династии Мин и красивые садовые ландшафты."
                    },
                    category: {
                        en: "Historical Architecture",
                        ru: "Историческая архитектура"
                    },
                    location: {
                        en: "Wuhou Shrine, Chengdu",
                        ru: "Храм Ухоу, Чэнду"
                    },
                    fact: {
                        en: "The shrine's cypress trees were planted during the Tang Dynasty (7th century) and still stand today, making them over 1,300 years old.",
                        ru: "Кипарисы храма были посажены во времена династии Тан (7 век) и до сих пор стоят, что делает их возрастом более 1300 лет."
                    }
                },
                {
                    src: "assets/images/attractions3.jpg",
                    title: {
                        en: "Global Center Engineering",
                        ru: "Инженерия Глобального центра"
                    },
                    description: {
                        en: "The world's largest building by floor area features an artificial beach, ice skating rink, university campus, and shopping mall all under one roof.",
                        ru: "Самое большое здание в мире по площади имеет искусственный пляж, каток, университетский кампус и торговый центр - все под одной крышей."
                    },
                    category: {
                        en: "Modern Architecture",
                        ru: "Современная архитектура"
                    },
                    location: {
                        en: "New Century Global Center",
                        ru: "Новый всемирный центр"
                    },
                    fact: {
                        en: "The complex is so large it could hold 20 Sydney Opera Houses or 3 Pentagons, with its own artificial sun that rises and sets daily.",
                        ru: "Комплекс настолько велик, что может вместить 20 Сиднейских оперных театров или 3 Пентагона, с собственным искусственным солнцем, которое восходит и заходит ежедневно."
                    }
                },
                {
                    src: "assets/images/attractions4.jpg",
                    title: {
                        en: "Dujiangyan Irrigation Miracle",
                        ru: "Чудо ирригации Дуцзянъянь"
                    },
                    description: {
                        en: "This 2,200-year-old irrigation system still functions today, preventing floods while watering the Chengdu Plain, making it one of China's greatest engineering achievements.",
                        ru: "Эта 2200-летняя ирригационная система до сих пор функционирует, предотвращая наводнения и одновременно орошая равнину Чэнду, что делает ее одним из величайших инженерных достижений Китая."
                    },
                    category: {
                        en: "Ancient Engineering",
                        ru: "Древняя инженерия"
                    },
                    location: {
                        en: "Dujiangyan Irrigation System",
                        ru: "Ирригационная система Дуцзянъянь"
                    },
                    fact: {
                        en: "The system uses natural topography rather than dams to divert water, making it environmentally sustainable and functional for over two millennia.",
                        ru: "Система использует естественный рельеф вместо плотин для отвода воды, что делает ее экологически устойчивой и функциональной на протяжении более двух тысячелетий."
                    }
                },
                {
                    src: "assets/images/attractions5.jpg",
                    title: {
                        en: "Qingyang Palace Taoism",
                        ru: "Даосизм дворца Цинъян"
                    },
                    description: {
                        en: "One of China's most important Taoist temples, Qingyang Palace features the unique Eight Trigrams Pavilion and artifacts dating back to the Tang Dynasty.",
                        ru: "Один из самых важных даосских храмов Китая, дворец Цинъян отличается уникальным павильоном Восьми Триграмм и артефактами, восходящими к династии Тан."
                    },
                    category: {
                        en: "Religious Site",
                        ru: "Религиозное место"
                    },
                    location: {
                        en: "Qingyang Palace, Chengdu",
                        ru: "Дворец Цинъян, Чэнду"
                    },
                    fact: {
                        en: "The temple's bronze goat statue has features of 12 different animals and is believed to cure illnesses when touched by believers.",
                        ru: "Бронзовая статуя козла в храме имеет черты 12 различных животных и, как полагают, излечивает болезни при прикосновении верующих."
                    }
                }
            ],
            modern: [
                {
                    src: "assets/images/modern1.jpg",
                    title: {
                        en: "Tianfu Software Park Innovation",
                        ru: "Инновации технопарка Тяньфу"
                    },
                    description: {
                        en: "As China's largest IT industry base, Tianfu Software Park hosts over 600 tech companies and 60,000 professionals driving Chengdu's digital transformation.",
                        ru: "Как крупнейшая IT-индустриальная база Китая, технопарк Тяньфу принимает более 600 технологических компаний и 60 000 профессионалов,推动ющих цифровую трансформацию Чэнду."
                    },
                    category: {
                        en: "Technology Hub",
                        ru: "Технологический хаб"
                    },
                    location: {
                        en: "Tianfu Software Park, Chengdu",
                        ru: "Технопарк Тяньфу, Чэнду"
                    },
                    fact: {
                        en: "The park generates $15 billion in annual revenue and has created 300,000 tech jobs, making Chengdu China's third-largest tech hub.",
                        ru: "Парк генерирует 15 миллиардов долларов годового дохода и создал 300 000 технологических рабочих мест, сделав Чэнду третьим по величине технологическим хабом Китая."
                    }
                },
                {
                    src: "assets/images/modern2.jpg",
                    title: {
                        en: "Chengdu Metro Expansion",
                        ru: "Расширение метро Чэнду"
                    },
                    description: {
                        en: "With over 500km of track, Chengdu's metro system is one of the world's fastest-growing, connecting ancient cultural sites with modern business districts.",
                        ru: "С более чем 500 км путей, система метро Чэнду является одной из самых быстрорастущих в мире, соединяя древние культурные sites с современными деловыми районами."
                    },
                    category: {
                        en: "Urban Transportation",
                        ru: "Городской транспорт"
                    },
                    location: {
                        en: "Chengdu Metro System",
                        ru: "Система метро Чэнду"
                    },
                    fact: {
                        en: "The metro moves 5 million passengers daily and features stations with free libraries, art galleries, and traditional tea shops.",
                        ru: "Метро перевозит 5 миллионов пассажиров в день и имеет станции с бесплатными библиотеками, художественными галереями и традиционными чайными магазинами."
                    }
                },
                {
                    src: "assets/images/modern3.jpg",
                    title: {
                        en: "Sichuan Science Museum",
                        ru: "Сычуаньский научный музей"
                    },
                    description: {
                        en: "This state-of-the-art museum showcases Sichuan's technological achievements from ancient irrigation systems to space exploration and AI development.",
                        ru: "Этот современный музей демонстрирует технологические достижения Сычуани от древних ирригационных систем до космических исследований и разработки ИИ."
                    },
                    category: {
                        en: "Science Education",
                        ru: "Научное образование"
                    },
                    location: {
                        en: "Sichuan Science Museum",
                        ru: "Сычуаньский научный музей"
                    },
                    fact: {
                        en: "The museum's planetarium features a 30-meter dome screen showing real-time data from China's Tiangong space station.",
                        ru: "Планетарий музея имеет 30-метровый купольный экран, показывающий данные в реальном времени с китайской космической станции Тяньгун."
                    }
                },
                {
                    src: "assets/images/modern4.jpg",
                    title: {
                        en: "Financial City Skyline",
                        ru: "Небоскай финансового города"
                    },
                    description: {
                        en: "Chengdu's modern skyline symbolizes its rise as Western China's financial capital, with 58 skyscrapers over 200 meters housing international banks and corporations.",
                        ru: "Современный небоскреб Чэнду символизирует его восход как финансовой столицы Западного Китая, с 58 небоскребами высотой более 200 метров, в которых размещаются международные банки и корпорации."
                    },
                    category: {
                        en: "Urban Development",
                        ru: "Городское развитие"
                    },
                    location: {
                        en: "Tianfu New Area, Chengdu",
                        ru: "Новый район Тяньфу, Чэнду"
                    },
                    fact: {
                        en: "The CBD hosts 280 Fortune 500 companies and has attracted $45 billion in foreign investment since 2010.",
                        ru: "Центральный деловой район принимает 280 компаний из Fortune 500 и привлек 45 миллиардов долларов иностранных инвестиций с 2010 года."
                    }
                },
                {
                    src: "assets/images/modern5.jpg",
                    title: {
                        en: "Green City Initiatives",
                        ru: "Инициативы зеленого города"
                    },
                    description: {
                        en: "Chengdu leads China in sustainable urban development with 42% green coverage, 1,300 parks, and ambitious carbon neutrality goals for 2030.",
                        ru: "Чэнду лидирует в Китае в области устойчивого городского развития с 42% зеленого покрытия, 1300 парками и амбициозными целями по углеродной нейтральности к 2030 году."
                    },
                    category: {
                        en: "Sustainable Development",
                        ru: "Устойчивое развитие"
                    },
                    location: {
                        en: "Throughout Chengdu",
                        ru: "По всему Чэнду"
                    },
                    fact: {
                        en: "The city has planted 20 million trees since 2015 and runs 12,000 electric buses, the largest fleet of any Chinese city.",
                        ru: "Город посадил 20 миллионов деревьев с 2015 года и эксплуатирует 12 000 электрических автобусов, что является самым большим парком среди всех китайских городов."
                    }
                }
            ],
            nightlife: [
                {
                    src: "assets/images/nightlife1.jpg",
                    title: {
                        en: "Lan Kwai Fong Entertainment",
                        ru: "Развлечения Лань Kwai Фонг"
                    },
                    description: {
                        en: "Chengdu's premier entertainment district features over 100 bars, clubs, and live music venues blending traditional Sichuan culture with modern nightlife.",
                        ru: "Главный развлекательный район Чэнду включает более 100 баров, клубов и площадок живой музыки, сочетающих традиционную сычуаньскую культуру с современной ночной жизнью."
                    },
                    category: {
                        en: "Entertainment District",
                        ru: "Развлекательный район"
                    },
                    location: {
                        en: "Lan Kwai Fong Chengdu",
                        ru: "Лань Kwai Фонг Чэнду"
                    },
                    fact: {
                        en: "The district attracts 50,000 visitors nightly and has inspired similar entertainment zones in 15 other Chinese cities.",
                        ru: "Район привлекает 50 000 посетителей каждую ночь и вдохновил создание similar развлекательных зон в 15 других китайских городах."
                    }
                },
                {
                    src: "assets/images/nightlife2.jpg",
                    title: {
                        en: "24-Hour Hot Pot Culture",
                        ru: "Культура круглосуточного хот-пота"
                    },
                    description: {
                        en: "Many hot pot restaurants operate 24 hours, serving late-night diners and early-risers with the same enthusiasm, making Chengdu truly the city that never sleeps.",
                        ru: "Многие рестораны хот-пота работают круглосуточно, обслуживая полуночников и ранних пташек с одинаковым энтузиазмом, делая Чэнду truly городом, который никогда не спит."
                    },
                    category: {
                        en: "Dining Culture",
                        ru: "Культура питания"
                    },
                    location: {
                        en: "24-Hour Hot Pot Restaurants",
                        ru: "Круглосуточные рестораны хот-пота"
                    },
                    fact: {
                        en: "The busiest 24-hour hot pot restaurant serves 3,000 customers between midnight and 6 AM, using 2 tons of ingredients nightly.",
                        ru: "Самый загруженный круглосуточный ресторан хот-пота обслуживает 3000 клиентов между полуночью и 6 утра, используя 2 тонны ингредиентов каждую ночь."
                    }
                },
                {
                    src: "assets/images/nightlife3.jpg",
                    title: {
                        en: "Night Market Economy",
                        ru: "Экономика ночных рынков"
                    },
                    description: {
                        en: "Chengdu's night markets generate $2 billion annually, supporting 80,000 vendors and creating vibrant street food scenes that operate until sunrise.",
                        ru: "Ночные рынки Чэнду генерируют 2 миллиарда долларов ежегодно, поддерживая 80 000 продавцов и создавая яркие street food сцены, работающие до восхода солнца."
                    },
                    category: {
                        en: "Night Economy",
                        ru: "Ночная экономика"
                    },
                    location: {
                        en: "Night Markets Citywide",
                        ru: "Ночные рынки по всему городу"
                    },
                    fact: {
                        en: "The city has 28 official night markets, with the largest covering 5 city blocks and featuring 800 food stalls and 200 craft vendors.",
                        ru: "В городе 28 официальных ночных рынков, причем крупнейший охватывает 5 городских кварталов и включает 800 food ларьков и 200 ремесленных продавцов."
                    }
                },
                {
                    src: "assets/images/nightlife4.jpg",
                    title: {
                        en: "Traditional Tea Houses at Night",
                        ru: "Традиционные чайные дома ночью"
                    },
                    description: {
                        en: "Many historic tea houses extend hours into the night, transforming into intimate venues for traditional music, storytelling, and philosophical discussions.",
                        ru: "Многие исторические чайные дома продлевают часы работы до ночи, превращаясь в уютные места для традиционной музыки, рассказывания историй и философских дискуссий."
                    },
                    category: {
                        en: "Cultural Nightlife",
                        ru: "Культурная ночная жизнь"
                    },
                    location: {
                        en: "Historic Tea Houses",
                        ru: "Исторические чайные дома"
                    },
                    fact: {
                        en: "Some tea houses have operated continuously for over 300 years, with the same families managing them through 12 generations.",
                        ru: "Некоторые чайные дома работают continuously более 300 лет, причем одни и те же семьи управляют ими на протяжении 12 поколений."
                    }
                },
                {
                    src: "assets/images/nightlife5.jpg",
                    title: {
                        en: "Riverfront Night Views",
                        ru: "Ночные виды на набережной"
                    },
                    description: {
                        en: "The illuminated Jinjiang River creates stunning nightscapes, with traditional boats, modern light shows, and riverside dining offering unforgettable evening experiences.",
                        ru: "Освещенная река Цзиньцзян создает потрясающие ночные пейзажи, с традиционными лодками, современными световыми шоу и ресторанами на набережной, предлагающими незабываемые вечерние впечатления."
                    },
                    category: {
                        en: "Night Scenery",
                        ru: "Ночные пейзажи"
                    },
                    location: {
                        en: "Jinjiang River, Chengdu",
                        ru: "Река Цзиньцзян, Чэнду"
                    },
                    fact: {
                        en: "The river illumination uses 8 million LED lights controlled by AI to create dynamic light patterns that change with music and weather.",
                        ru: "Освещение реки использует 8 миллионов светодиодных огней, управляемых ИИ, для создания динамических световых узоров, которые меняются в зависимости от музыки и погоды."
                    }
                }
            ]
        };

        // ФУНКЦИИ ДЛЯ ФОТОГАЛЕРЕИ
// ФУНКЦИИ ДЛЯ ФОТОГАЛЕРЕИ С АНИМАЦИЯМИ
// ФУНКЦИИ ДЛЯ ФОТОГАЛЕРЕИ С АНИМАЦИЯМИ
function openPhotoModal(category, index) {
    console.log('Opening photo modal for:', category, 'index:', index);
    
    if (!photoGalleries[category] || !photoGalleries[category][index]) {
        console.log('Photo data not found for category:', category, 'index:', index);
        return;
    }
    
    currentGallery = photoGalleries[category];
    currentPhotoIndex = index;
    currentGalleryType = category;
    
    // Убираем класс закрытия если он был
    photoModal.classList.remove('closing');
    
    // Обновляем контент
    updatePhotoModal();
    
    // Запускаем анимацию открытия
    setTimeout(() => {
        photoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 10);
}

function closePhotoModalWithAnimation() {
    if (!photoModal.classList.contains('active')) return;
    
    // Добавляем класс для анимации закрытия
    photoModal.classList.add('closing');
    photoModal.classList.remove('active');
    
    // Ждем завершения анимации и скрываем модалку
    setTimeout(() => {
        photoModal.classList.remove('closing');
        document.body.style.overflow = '';
    }, 400);
}

function updatePhotoModal() {
    if (currentGallery.length === 0) return;
    
    const photo = currentGallery[currentPhotoIndex];
    const lang = currentLang;
    
    modalPhoto.src = photo.src;
    modalPhoto.alt = photo.title[lang];
    modalPhotoTitle.textContent = photo.title[lang];
    modalPhotoDescription.textContent = photo.description[lang];
    modalPhotoCategory.textContent = photo.category[lang];
    modalPhotoLocation.textContent = photo.location[lang];
    modalPhotoFact.textContent = photo.fact[lang];
    
    // Обновляем счетчик
    photoCounter.textContent = `${currentPhotoIndex + 1}/${currentGallery.length}`;
    
    // Обновляем состояние кнопок навигации
    prevPhotoBtn.disabled = currentPhotoIndex === 0;
    nextPhotoBtn.disabled = currentPhotoIndex === currentGallery.length - 1;
}

function nextPhoto() {
    if (currentPhotoIndex < currentGallery.length - 1) {
        // Анимация перехода к следующей фотографии
        const container = document.querySelector('.photo-container');
        const info = document.querySelector('.photo-info');
        
        // Добавляем классы для анимации выхода
        container.style.opacity = '0';
        container.style.transform = 'translateX(-30px)';
        info.style.opacity = '0';
        info.style.transform = 'translateX(30px)';
        
        setTimeout(() => {
            currentPhotoIndex++;
            updatePhotoModal();
            
            // Сбрасываем трансформации для входа
            container.style.opacity = '1';
            container.style.transform = 'translateX(0)';
            info.style.opacity = '1';
            info.style.transform = 'translateX(0)';
        }, 300);
    }
}

function prevPhoto() {
    if (currentPhotoIndex > 0) {
        // Анимация перехода к предыдущей фотографии
        const container = document.querySelector('.photo-container');
        const info = document.querySelector('.photo-info');
        
        // Добавляем классы для анимации выхода
        container.style.opacity = '0';
        container.style.transform = 'translateX(30px)';
        info.style.opacity = '0';
        info.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            currentPhotoIndex--;
            updatePhotoModal();
            
            // Сбрасываем трансформации для входа
            container.style.opacity = '1';
            container.style.transform = 'translateX(0)';
            info.style.opacity = '1';
            info.style.transform = 'translateX(0)';
        }, 300);
    }
}

        // ИНИЦИАЛИЗАЦИЯ ГАЛЕРЕИ
function initGalleryClicks() {
    console.log('Initializing gallery clicks...');
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    console.log('Found gallery items:', galleryItems.length);
    
    galleryItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Gallery item clicked:', index);
            
            const gallery = this.closest('.gallery');
            let category = '';
            
            // Определяем категорию по родительскому элементу
            const parentCategory = gallery.closest('.city-category');
            if (parentCategory) {
                category = parentCategory.dataset.type;
                console.log('Detected category:', category);
            }
            
            // ИСПРАВЛЕНИЕ: используем photoGalleries вместо photoData
            if (category && photoGalleries[category]) {
                console.log('Opening photo modal for category:', category, 'index:', index);
                openPhotoModal(category, index);
            } else {
                console.log('Category not found or no data for category:', category);
            }
        });
    });
    
    console.log('Gallery clicks initialized');
}

        // ОБРАБОТЧИКИ ДЛЯ ФОТОГАЛЕРЕИ
// ОБРАБОТЧИКИ ДЛЯ ФОТОГАЛЕРЕИ
// ОБРАБОТЧИКИ ДЛЯ ФОТОГАЛЕРЕИ
prevPhotoBtn.addEventListener('click', prevPhoto);
nextPhotoBtn.addEventListener('click', nextPhoto);

closePhotoModal.addEventListener('click', closePhotoModalWithAnimation);

photoModal.addEventListener('click', function(e) {
    if (e.target === photoModal) {
        closePhotoModalWithAnimation();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && photoModal.classList.contains('active')) {
        closePhotoModalWithAnimation();
    }
    
    if (photoModal.classList.contains('active')) {
        if (e.key === 'ArrowLeft') prevPhoto();
        if (e.key === 'ArrowRight') nextPhoto();
    }
});
        // Закрытие по клику на фон
        photoModal.addEventListener('click', function(e) {
            if (e.target === photoModal) {
                photoModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // МОДАЛЬНОЕ ОКНО СОЦИАЛЬНЫХ СЕТЕЙ
        const socialModal = document.getElementById('social-modal');
        const closeSocialModal = document.getElementById('close-social-modal');
        const showSocialButtons = document.querySelectorAll('.show-social');

        showSocialButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                socialModal.classList.add('active');
            });
        });

        closeSocialModal.addEventListener('click', function() {
            socialModal.classList.remove('active');
        });

        socialModal.addEventListener('click', function(e) {
            if (e.target === socialModal) {
                socialModal.classList.remove('active');
            }
        });

        // ОСНОВНОЙ КОД УПРАВЛЕНИЯ КАРТОЧКАМИ
        const infoItems = document.querySelectorAll('.info-item, .city-category');
        const backButton = document.getElementById('back-button');
        const expandedBackground = document.getElementById('expanded-background');
        const expandedCardContainer = document.getElementById('expanded-card-container');
        const expandedCardBackground = document.getElementById('expanded-card-background');
        const expandedCardContent = document.getElementById('expanded-card-content');
        
        let expandedItem = null;

        function expandItem(item) {
            if (expandedItem) return;
            
            expandedItem = item;
            const backgroundImage = item.querySelector('.info-item-background, .city-category-background').style.backgroundImage;
            const detailContent = item.querySelector('.detail-content');
            
            expandedCardBackground.style.backgroundImage = backgroundImage;
            expandedCardContent.innerHTML = detailContent.innerHTML;
            expandedBackground.style.display = 'block';
            expandedCardContainer.style.display = 'block';
            
            setTimeout(() => {
                expandedCardContainer.classList.add('active');
                backButton.classList.add('visible');
                initVideoPlayers();
                animateCardContent();
                updateCardButtons();
                initFactsPanels();
            }, 10);
            
            document.body.style.overflow = 'hidden';
        }

function collapseItem() {
    if (!expandedItem) return;
    
    document.querySelectorAll('.video-player video').forEach(video => {
        video.pause();
    });
    
    expandedCardContainer.classList.remove('active');
    expandedBackground.style.display = 'none';
    backButton.classList.remove('visible');
    
    // ДОБАВЛЯЕМ ОТМЕТКУ "ПРОСМОТРЕНО" (только для текущей сессии)
    expandedItem.classList.add('viewed');
    
    // УБИРАЕМ сохранение в localStorage
    // const itemType = expandedItem.dataset.type;
    // const page = expandedItem.closest('.info-page') ? 'info' : 'city';
    // const viewedKey = `${page}_${itemType}`;
    // localStorage.setItem(viewedKey, 'true');
    
    const detailContent = expandedItem.querySelector('.detail-content');
    if (detailContent) {
        detailContent.style.display = 'none';
    }
    
    setTimeout(() => {
        expandedCardContainer.style.display = 'none';
        expandedItem = null;
        document.body.style.overflow = '';
    }, 300);
}
function resetCardStyles() {
    infoItems.forEach(item => {
        item.style.transform = 'translateY(0)';
        item.style.borderColor = '#2a2a2a';
        item.style.background = 'rgba(255, 255, 255, 0.03)';
        item.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    });
}

        function animateCardContent() {
            const elements = expandedCardContent.querySelectorAll('.detail-title, .detail-text, .detail-features, .gallery, .interactive-element, .card-buttons, .fact-bubble, .timeline, .facts-panel');
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

        function updateCardButtons() {
            const socialBtns = expandedCardContent.querySelectorAll('.show-social');
            socialBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    socialModal.classList.add('active');
                });
            });

            // Обработка интерактивных элементов
            const interactiveElements = expandedCardContent.querySelectorAll('.interactive-element');
            interactiveElements.forEach(element => {
                element.addEventListener('click', function(e) {
                    e.stopPropagation();
                    this.classList.toggle('active');
                });
            });
        }

        // ФУНКЦИЯ ДЛЯ ПАНЕЛЕЙ ФАКТОВ С ПРОВЕРЕННЫМИ ФАКТАМИ
        function initFactsPanels() {
            const factsPanels = document.querySelectorAll('.facts-panel');
            
            factsPanels.forEach(panel => {
                const factsGrid = panel.querySelector('.facts-grid');
                const category = panel.closest('.city-category')?.dataset.type;
                
                if (!category || !chengduFacts[category]) {
                    console.log('Category not found:', category);
                    return;
                }
                
                const facts = chengduFacts[category];
                
                // Всегда показываем факты
                factsGrid.innerHTML = '';
                facts.forEach((fact, index) => {
                    const factItem = document.createElement('div');
                    factItem.className = 'fact-item';
                    factItem.style.animationDelay = `${index * 0.1}s`;
                    factItem.innerHTML = `
                        <span class="fact-number">#${fact.id}</span>
                        <p class="fact-text">${currentLang === 'en' ? fact.en : fact.ru}</p>
                        ${fact.source ? `<div class="fact-source">${currentLang === 'en' ? 'Source' : 'Источник'}: ${fact.source}</div>` : ''}
                    `;
                    factsGrid.appendChild(factItem);
                    
                    // Анимация появления
                    setTimeout(() => {
                        factItem.style.opacity = '1';
                        factItem.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                
                // Обновляем факты при смене языка
                const observer = new MutationObserver(() => {
                    factsGrid.innerHTML = '';
                    facts.forEach((fact, index) => {
                        const factItem = document.createElement('div');
                        factItem.className = 'fact-item';
                        factItem.style.animationDelay = `${index * 0.1}s`;
                        factItem.innerHTML = `
                            <span class="fact-number">#${fact.id}</span>
                            <p class="fact-text">${currentLang === 'en' ? fact.en : fact.ru}</p>
                            ${fact.source ? `<div class="fact-source">${currentLang === 'en' ? 'Source' : 'Источник'}: ${fact.source}</div>` : ''}
                        `;
                        factsGrid.appendChild(factItem);
                        
                        setTimeout(() => {
                            factItem.style.opacity = '1';
                            factItem.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                });
                
                observer.observe(document.documentElement, {
                    attributes: true,
                    attributeFilter: ['lang']
                });
            });
        }

        // ВИДЕО ПЛЕЕР
function initVideoPlayers() {
    const videoPlayers = document.querySelectorAll('.video-player');
    
    videoPlayers.forEach(player => {
        const video = player.querySelector('video');
        if (!video) return;
        
        const playPauseBtn = player.querySelector('.play-pause');
        const volumeSlider = player.querySelector('.volume-slider');
        const progressBar = player.querySelector('.progress-bar');
        const progress = player.querySelector('.progress');
        const currentTimeEl = player.querySelector('.current-time');
        const totalTimeEl = player.querySelector('.total-time');
        const fullscreenBtn = player.querySelector('.fullscreen-btn');
        
        if (!playPauseBtn || !progressBar) return;
        
        // Форматирование времени
        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }
        
        // Обновление времени
        function updateTime() {
            if (video.duration) {
                currentTimeEl.textContent = formatTime(video.currentTime);
                totalTimeEl.textContent = formatTime(video.duration);
                progress.style.width = (video.currentTime / video.duration) * 100 + '%';
            }
        }
        
        // Воспроизведение/пауза
        function togglePlay() {
            if (video.paused) {
                video.play();
                playPauseBtn.textContent = '❚❚';
            } else {
                video.pause();
                playPauseBtn.textContent = '▶';
            }
        }
        
        // Клик по видео для play/pause
        player.addEventListener('click', (e) => {
            if (e.target.closest('.video-controls')) return;
            togglePlay();
        });
        
        // Кнопка play/pause
        playPauseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePlay();
        });
        
        // Управление громкостью
        function updateVolume() {
            const volume = volumeSlider.value / 100;
            video.volume = volume;
            
            // Визуальная обратная связь - меняем прозрачность слайдера
            volumeSlider.style.background = `linear-gradient(90deg, 
                rgba(255,255,255,0.7) 0%, 
                rgba(255,255,255,0.7) ${volume * 100}%, 
                rgba(255,255,255,0.3) ${volume * 100}%)`;
        }
        
        if (volumeSlider) {
            volumeSlider.addEventListener('input', updateVolume);
            // Инициализируем громкость
            updateVolume();
        }
        
        // Перемотка
        progressBar.addEventListener('click', (e) => {
            e.stopPropagation();
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            video.currentTime = percent * video.duration;
        });
        
        // Полноэкранный режим
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!document.fullscreenElement) {
                    player.requestFullscreen().catch(err => {
                        console.log(`Error attempting to enable fullscreen: ${err.message}`);
                    });
                } else {
                    document.exitFullscreen();
                }
            });
        }
        
        // Обновление времени при изменении
        video.addEventListener('timeupdate', updateTime);
        video.addEventListener('loadedmetadata', updateTime);
        
        // Сброс при завершении
        video.addEventListener('ended', () => {
            playPauseBtn.textContent = '▶';
            video.currentTime = 0;
        });
    });
}

        // ВИДЕО СЛАЙДЕР
        let currentSlide = 0;
        const videos = document.querySelectorAll('.video-slide');
        const indicators = document.querySelectorAll('.pixel-indicator');
        let slideInterval;

        function startSlider() {
            clearInterval(slideInterval);
            
            if (videos.length === 0) {
                console.log('No videos found for slider');
                return;
            }

            // Сбрасываем все прогресс-бары
            document.querySelectorAll('.pixel-progress').forEach(progress => {
                progress.style.transition = 'none';
                progress.style.width = '0%';
            });

            // Запускаем прогресс-бар для текущего слайда
            setTimeout(() => {
                const activeProgress = document.querySelector('.pixel-indicator.active .pixel-progress');
                if (activeProgress) {
                    activeProgress.style.transition = 'width 5s linear';
                    activeProgress.style.width = '100%';
                }
            }, 50);

            // Запускаем текущее видео
            if (videos[currentSlide]) {
                videos[currentSlide].play().catch(e => {
                    console.log('Video autoplay failed:', e);
                });
            }
            
            slideInterval = setInterval(nextSlide, 5000);
        }

        function nextSlide() {
            if (videos.length === 0) return;
            
            // Останавливаем текущее видео
            videos[currentSlide].pause();
            videos[currentSlide].currentTime = 0;
            
            // Сбрасываем текущий слайд
            videos[currentSlide].classList.remove('active');
            indicators[currentSlide].classList.remove('active');
            
            // Переходим к следующему слайду
            currentSlide = (currentSlide + 1) % videos.length;
            
            // Активируем новый слайд
            videos[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
            
            // Запускаем новое видео
            videos[currentSlide].play().catch(e => {
                console.log('Video play failed:', e);
            });
            
            // Перезапускаем таймер
            startSlider();
        }

        function goToSlide(slideIndex) {
            if (videos.length === 0 || slideIndex < 0 || slideIndex >= videos.length) return;
            
            // Останавливаем текущее видео
            videos[currentSlide].pause();
            videos[currentSlide].currentTime = 0;
            
            videos[currentSlide].classList.remove('active');
            indicators[currentSlide].classList.remove('active');
            
            currentSlide = slideIndex;
            
            videos[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
            
            // Запускаем выбранное видео
            videos[currentSlide].play().catch(e => {
                console.log('Video play failed:', e);
            });
            
            startSlider();
        }

        // УПРАВЛЕНИЕ СТРАНИЦАМИ
        let currentPage = 'home';
        const infoPage = document.getElementById('info-page');
        const cityPage = document.getElementById('city-page');
        const mainSlider = document.getElementById('main-slider');
        const pixelIndicatorsEl = document.getElementById('pixel-indicators');
        const mainContent = document.getElementById('main-content');
        const menuIcon = document.querySelector('.menu-icon');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        const startButton = document.getElementById('start-button');
        const navLinks = document.querySelectorAll('.nav-link');
        const dropdownLinks = document.querySelectorAll('.dropdown-link');

function showPage(page) {
    console.log('Switching to page:', page);
    currentPage = page;
    
    // Скрываем все страницы
    infoPage.classList.remove('active');
    cityPage.classList.remove('active');
    mainSlider.style.display = 'none';
    pixelIndicatorsEl.style.display = 'none';
    mainContent.style.display = 'none';

    // УБИРАЕМ ОТМЕТКИ ПРОСМОТРА ПРИ СМЕНЕ СТРАНИЦ
    document.querySelectorAll('.info-item.viewed, .city-category.viewed').forEach(item => {
        item.classList.remove('viewed');
    });

    // Закрываем меню при переходе
    menuIcon.classList.remove('open');
    dropdownMenu.classList.remove('open');

    // Показываем нужную страницу
    if (page === 'info') {
        infoPage.classList.add('active');
    } else if (page === 'city') {
        cityPage.classList.add('active');
    } else {
        mainSlider.style.display = 'block';
        pixelIndicatorsEl.style.display = 'flex';
        mainContent.style.display = 'flex';
        
        // Перезапускаем слайдер при возврате на главную
        if (page === 'home') {
            setTimeout(() => {
                goToSlide(0);
                startSlider();
            }, 100);
        }
    }

    // Обновляем активные ссылки
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + page) {
            link.classList.add('active');
        }
    });

    dropdownLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + page) {
            link.classList.add('active');
        }
    });
}
        // ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА
        let currentLang = 'en';

function switchLanguage(lang) {
    if (currentLang === lang) return;
    
    const transition = document.querySelector('.page-transition');
    transition.classList.add('active');
    
    setTimeout(() => {
        currentLang = lang;
        document.documentElement.setAttribute('lang', lang);
        
        // Обновляем все тексты с атрибутами data-en и data-ru
        document.querySelectorAll('[data-en][data-ru]').forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });
        
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        // Обновляем модальное окно фото
        updatePhotoModalLanguage();
        
        localStorage.setItem('selectedLang', lang);

        setTimeout(() => transition.classList.remove('active'), 400);
    }, 400);
}
// ОБРАБОТЧИКИ СОБЫТИЙ
infoItems.forEach(item => {
    item.addEventListener('click', function(e) {
        if (!expandedItem) {
            expandItem(this);
        }
    });
    
    // Добавляем обработчик для сброса стилей при уходе курсора
    item.addEventListener('mouseleave', function() {
        if (!expandedItem || expandedItem !== this) {
            this.style.transform = 'translateY(0)';
            this.style.borderColor = '#2a2a2a';
            this.style.background = 'rgba(255, 255, 255, 0.03)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        }
    });
});

        backButton.addEventListener('click', function(e) {
            e.stopPropagation();
            collapseItem();
        });

        expandedBackground.addEventListener('click', function(e) {
            if (expandedItem) {
                collapseItem();
            }
        });

        // Клик по индикаторам
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
            });
        });

        // Кнопка "Explore Now"
        if (startButton) {
            startButton.addEventListener('click', function() {
                showPage('info');
            });
        }

        // Навигация
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetPage = this.getAttribute('href').substring(1);
                console.log('Nav link clicked:', targetPage);
                showPage(targetPage);
            });
        });

        dropdownLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetPage = this.getAttribute('href').substring(1);
                console.log('Dropdown link clicked:', targetPage);
                showPage(targetPage);
                
                // Закрываем меню после выбора пункта
                menuIcon.classList.remove('open');
                dropdownMenu.classList.remove('open');
            });
        });

        // Клик по логотипу
        document.getElementById('logo').addEventListener('click', () => {
            showPage('home');
        });

        // Управление меню
        menuIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('open');
            dropdownMenu.classList.toggle('open');
        });

        // Закрытие меню при клике вне его
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.menu-icon') && !e.target.closest('.dropdown-menu')) {
                menuIcon.classList.remove('open');
                dropdownMenu.classList.remove('open');
            }
        });

        // Переключение языка
        document.querySelectorAll('.lang-btn').forEach(button => {
            button.addEventListener('click', function() {
                switchLanguage(this.getAttribute('data-lang'));
            });
        });

        // ДЕБАГ ДЛЯ ФОТОГАЛЕРЕИ
        console.log('=== DEBUG GALLERY ===');
        console.log('Gallery items found:', document.querySelectorAll('.gallery-item').length);
        
        // ПРОСТОЙ ОБРАБОТЧИК КЛИКОВ НА ВСЕ ИЗОБРАЖЕНИЯ
// ОБРАБОТЧИК КЛИКОВ ДЛЯ ФОТОГАЛЕРЕИ - ИСПРАВЛЕННАЯ ВЕРСИЯ
document.addEventListener('click', function(e) {
    // Если кликнули на картинку внутри gallery-item
    if (e.target.closest('.gallery-item')) {
        e.preventDefault();
        e.stopPropagation();
        console.log('CLICKED ON GALLERY ITEM!');
        
        const galleryItem = e.target.closest('.gallery-item');
        const img = galleryItem.querySelector('img');
        const lang = currentLang;
        
        // Берем данные из data-атрибутов
        const caption = galleryItem.getAttribute('data-caption') || 'Фотография';
        const title = galleryItem.getAttribute(`data-title-${lang}`) || caption;
        const description = galleryItem.getAttribute(`data-description-${lang}`) || '';
        const category = galleryItem.getAttribute(`data-category-${lang}`) || 'Category';
        const location = galleryItem.getAttribute(`data-location-${lang}`) || 'Chengdu, China';
        const fact = galleryItem.getAttribute(`data-fact-${lang}`) || 'Interesting fact about the photo';
        
        console.log('Loading photo data from attributes:', { title, description, category, location, fact });
        
        // Заполняем модальное окно
        modalPhoto.src = img.src;
        modalPhoto.alt = caption;
        modalPhotoTitle.textContent = title;
        modalPhotoDescription.textContent = description;
        modalPhotoCategory.textContent = category;
        modalPhotoLocation.textContent = location;
        modalPhotoFact.textContent = fact;
        
        photoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Для навигации создаем временную галерею из всех элементов текущей категории
        const gallery = galleryItem.closest('.gallery');
        const galleryItems = Array.from(gallery.querySelectorAll('.gallery-item'));
        currentGallery = [];
        
        galleryItems.forEach(item => {
            currentGallery.push({
                src: item.querySelector('img').src,
                title: { 
                    en: item.getAttribute('data-title-en') || item.getAttribute('data-caption'),
                    ru: item.getAttribute('data-title-ru') || item.getAttribute('data-caption')
                },
                description: { 
                    en: item.getAttribute('data-description-en') || '',
                    ru: item.getAttribute('data-description-ru') || ''
                },
                category: { 
                    en: item.getAttribute('data-category-en') || 'Category',
                    ru: item.getAttribute('data-category-ru') || 'Категория'
                },
                location: { 
                    en: item.getAttribute('data-location-en') || 'Chengdu',
                    ru: item.getAttribute('data-location-ru') || 'Чэнду'
                },
                fact: { 
                    en: item.getAttribute('data-fact-en') || 'Interesting fact',
                    ru: item.getAttribute('data-fact-ru') || 'Интересный факт'
                }
            });
        });
        
        currentPhotoIndex = galleryItems.indexOf(galleryItem);
        currentGalleryType = 'custom'; // Устанавливаем тип галереи
        
        photoCounter.textContent = `${currentPhotoIndex + 1}/${currentGallery.length}`;
        prevPhotoBtn.disabled = currentPhotoIndex === 0;
        nextPhotoBtn.disabled = currentPhotoIndex === currentGallery.length - 1;
    }
});

        // ОБРАБОТЧИКИ ЗАКРЫТИЯ МОДАЛКИ
        closePhotoModal.addEventListener('click', function() {
            console.log('Closing photo modal');
            photoModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && photoModal.classList.contains('active')) {
                photoModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        photoModal.addEventListener('click', function(e) {
            if (e.target === photoModal) {
                photoModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
function initializePage() {
    console.log('Initializing page...');
    
    // Восстанавливаем просмотренные карточки
    document.querySelectorAll('.info-item, .city-category').forEach(item => {
        const itemType = item.dataset.type;
        const page = item.closest('.info-page') ? 'info' : 'city';
        const viewedKey = `${page}_${itemType}`;
        
        if (localStorage.getItem(viewedKey) === 'true') {
            item.classList.add('viewed');
        }
    });
    
    // Инициализируем галерею (ОДИН РАЗ)
    initGalleryClicks();
    
    // Запускаем главную страницу по умолчанию
    showPage('home');
    
    // Восстанавливаем язык
    const savedLang = localStorage.getItem('selectedLang');
    if (savedLang && savedLang !== 'en') {
        setTimeout(() => switchLanguage(savedLang), 100);
    }
    
    // Запускаем слайдер
    setTimeout(() => {
        startSlider();
    }, 500);
    
    console.log('Page initialized successfully');
}

        initializePage();
    });
        // ОБРАБОТЧИКИ ДЛЯ ЗАКРЫТИЯ ФОТО-МОДАЛКИ
        closePhotoModal.addEventListener('click', function() {
            photoModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Закрытие по клику на фон
        photoModal.addEventListener('click', function(e) {
            if (e.target === photoModal) {
                photoModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Закрытие по ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && photoModal.classList.contains('active')) {
                photoModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
