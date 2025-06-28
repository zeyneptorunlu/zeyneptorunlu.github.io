document.addEventListener('DOMContentLoaded', () => {
    // --- STATE & DOM ELEMENTS ---
    const dom = {
        body: document.body,
        form: document.getElementById('meal-form'),
        resultContainer: document.getElementById('result-container'),
        weeklyGrid: document.getElementById('weekly-grid'),
        themeToggle: document.getElementById('theme-toggle'),
        viewAllBtn: document.getElementById('view-all-recipes-btn'),
        modal: document.getElementById('recipe-modal'),
        closeModalBtn: document.getElementById('modal-close-btn'),
        searchInput: document.getElementById('recipe-search-input'),
        allRecipesListDiv: document.getElementById('all-recipes-list'),
        favoritesListDiv: document.getElementById('favorites-list'),
        modalTabs: document.querySelector('.modal-tabs')
    };

    let state = {
        favorites: [],
        weeklyPlan: {}
    };

    // --- FİNAL TARİF VERİTABANI (DOĞRU KATEGORİLER VE GERÇEK GÖRSELLERLE) ---
    const recipes = {
        highProteinSnack: [
            { name: 'Ton Balıklı Salatalık Kanepeleri', diets: ['gluten-free'], tags: ['high-protein', 'low-calorie'], imageUrl: 'https://images.pexels.com/photos/806361/pexels-photo-806361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', recipe: '<h3>Tarif:</h3><p>Bir salatalığı kalın dilimler halinde kesin. Bir kapta konserve ton balığını az miktarda mayonez veya yoğurtla karıştırın. Karışımı salatalık dilimlerinin üzerine paylaştırın.</p>' },
            { name: 'Süzme Yoğurt ve Yemişli Parfe', diets: ['vegetarian', 'gluten-free'], tags: ['high-protein'], imageUrl: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', recipe: '<h3>Tarif:</h3><p>Bir kaseye süzme yoğurt koyun. Üzerine bir avuç badem, ceviz ve taze yaban mersini ekleyin. İsteğe bağlı olarak bir çay kaşığı bal gezdirin.</p>' },
            { name: 'Haşlanmış Yumurta ve Avokado', diets: ['vegetarian', 'gluten-free'], tags: ['high-protein', 'low-calorie'], imageUrl: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', recipe: '<h3>Tarif:</h3><p>2 adet katı haşlanmış yumurtayı dilimleyin. Yanında çeyrek avokado dilimleri ve üzerine serpilmiş karabiber ile servis yapın.</p>' },
        ],
        lightSnack: [
            { name: 'Elma Dilimleri ve Fıstık Ezmesi', diets: ['vegan', 'vegetarian', 'gluten-free'], tags: [], imageUrl: 'https://images.pexels.com/photos/6517133/pexels-photo-6517133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', recipe: '<h3>Tarif:</h3><p>Bir elmayı dilimleyin. Yanında 1-2 yemek kaşığı şekersiz fıstık ezmesi ile servis yapın.</p>' },
            { name: 'Caprese Çubukları', diets: ['vegetarian', 'gluten-free'], tags: ['low-calorie'], imageUrl: 'https://images.pexels.com/photos/1483863/pexels-photo-1483863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', recipe: '<h3>Tarif:</h3><p>Çeri domatesleri, küçük mozzarella toplarını ve taze fesleğen yapraklarını küçük çubuklara sırayla dizin. Üzerine zeytinyağı ve balzamik sirke gezdirin.</p>' },
            { name: 'Pirinç Patlağı ve Humus', diets: ['vegan', 'vegetarian', 'gluten-free'], tags: [], imageUrl: 'https://images.pexels.com/photos/5924765/pexels-photo-5924765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', recipe: '<h3>Tarif:</h3><p>2 adet tam tahıllı pirinç patlağının üzerine bolca humus sürün. Üzerine salatalık dilimleri ekleyebilirsiniz.</p>' },
        ],
        quickMeal: [
            { name: 'Tavuklu Quesadilla', diets: [], tags: ['high-protein'], imageUrl: 'https://images.pexels.com/photos/5639433/pexels-photo-5639433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', recipe: '<h3>Tarif:</h3><p>Haşlanmış veya tavada pişirilmiş tavuk göğsünü didikleyin. Bir lavaşın yarısına tavukları, rendelenmiş peyniri ve mısır tanelerini yayın. Lavaşın diğer yarısını üzerine kapatıp tost makinesinde veya tavada peynir eriyene kadar pişirin.</p>' },
            { name: 'Klasik Menemen', diets: ['vegetarian', 'gluten-free'], tags: ['high-protein'], imageUrl: 'https://images.pexels.com/photos/8319692/pexels-photo-8319692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', recipe: '<h3>Tarif:</h3><p>Soğanı ve biberleri zeytinyağında kavurun. Rendelenmiş domatesleri ekleyip suyunu çekene kadar pişirin. Son olarak yumurtaları kırın ve karıştırarak pişirin. Üzerine maydanoz serpin.</p>' },
            { name: 'Kremalı Mantarlı Tavuk', diets: ['gluten-free'], tags: ['high-protein'], imageUrl: 'https://images.pexels.com/photos/14737754/pexels-photo-14737754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', recipe: '<h3>Tarif:</h3><p>Tavuk filetoları tavada mühürleyin. Aynı tavada mantarları soteleyin, krema ve baharatları ekleyin. Tavukları geri tavaya koyup sosla birlikte birkaç dakika daha pişirin.</p>' },
            { name: 'Sarımsaklı ve Zeytinyağlı Spagetti', diets: ['vegan', 'vegetarian'], tags: [], imageUrl: 'https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', recipe: '<h3>Tarif:</h3><p>Spagettiyi haşlayın. Ayrı bir tavada bol zeytinyağında ince dilimlenmiş sarımsakları ve pul biberi hafifçe yakın. Haşlanmış makarnayı bu sosa ekleyip karıştırın ve taze maydanozla servis edin.</p>' }
        ],
        regularMeal: [
            { name: 'Izgara Köfte ve Piyaz', diets: ['gluten-free'], tags: ['high-protein'], imageUrl: 'https://images.pexels.com/photos/1860195/pexels-photo-1860195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', recipe: '<h3>Tarif:</h3><p>Kıymayı rendelenmiş soğan ve baharatlarla yoğurup köfte şekli verin. Izgarada veya döküm tavada pişirin. Yanında haşlanmış fasulye, soğan ve domatesle hazırlanan piyazla servis yapın.</p>' },
            { name: 'Fırında Beşamel Soslu Tavuk', diets: [], tags: [], imageUrl: 'https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', recipe: '<h3>Tarif:</h3><p>Tavuk butlarını fırın tepsisine dizin. Üzerine beşamel sos dökün ve rendelenmiş kaşar peyniri serpin. 200°C fırında 45-50 dakika, üzeri kızarana kadar pişirin.</p>' },
            { name: 'Zeytinyağlı Biber Dolma', diets: ['vegan', 'vegetarian', 'gluten-free'], tags: [], imageUrl: 'https://images.pexels.com/photos/7969069/pexels-photo-7969069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', recipe: '<h3>Tarif:</h3><p>İç harcı için pirinç, soğan, kuş üzümü, fıstık, nane ve tuzu karıştırın. Biberlerin içini doldurun ve tencereye dizin. Üzerine zeytinyağı ve sıcak su gezdirip kısık ateşte pirinçler yumuşayana kadar pişirin.</p>' },
        ],
        lowCalorieMeal: [
            { name: 'Fırında Sebzeli Somon', diets: ['gluten-free'], tags: ['low-calorie', 'high-protein'], imageUrl: 'https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', recipe: '<h3>Tarif:</h3><p>Bir fırın kağıdının üzerine somon filetoyu, brokoli, havuç ve kuşkonmazı yerleştirin. Üzerine zeytinyağı, limon dilimleri ve dereotu ekleyip kağıdı paket şeklinde kapatın. 200°C fırında 25-30 dakika pişirin.</p>' },
            { name: 'Bol Sebzeli Mercimek Çorbası', diets: ['vegan', 'vegetarian', 'gluten-free'], tags: ['low-calorie'], imageUrl: 'https://images.pexels.com/photos/248444/pexels-photo-248444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', recipe: '<h3>Tarif:</h3><p>Soğan, havuç ve kerevizi doğrayıp tencerede soteleyin. Kırmızı mercimek, sebze suyu ve domates salçası ekleyip mercimekler yumuşayana kadar pişirin. Blenderdan geçirin ve üzerine nane gezdirin.</p>' },
            { name: 'Kinoalı Tavuk Salatası', diets: ['gluten-free'], tags: ['low-calorie', 'high-protein'], imageUrl: 'https://images.pexels.com/photos/1152359/pexels-photo-1152359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', recipe: '<h3>Tarif:</h3><p>Haşlanmış kinoa, haşlanmış ve didiklenmiş tavuk göğsü, bol yeşillik, çeri domates ve salatalığı karıştırın. Sosu için zeytinyağı, limon suyu ve hardalı karıştırıp üzerine gezdirin.</p>' },
        ]
    };
    
    // ----- UYGULAMANIN GERİ KALAN TÜM KODLARI ÖNCEKİ VERSİYON İLE AYNIDIR -----
    // (Aşağıdaki kodlarda bir değişiklik yok, sadece yukarıdaki recipes nesnesi güncellendi)

    function applyTheme(theme) {
        dom.body.classList.toggle('dark-theme', theme === 'dark');
        dom.themeToggle.checked = theme === 'dark';
    }
    // ... [Önceki yanıttaki tüm diğer fonksiyonları (handleThemeToggle, loadFavorites, ... init vs.) buraya yapıştırın]
    function handleThemeToggle() {
        const newTheme = dom.themeToggle.checked ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    }

    function loadFavorites() {
        state.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    }

    function saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
    }

    function toggleFavorite(recipeName) {
        if (state.favorites.includes(recipeName)) {
            state.favorites = state.favorites.filter(fav => fav !== recipeName);
        } else {
            state.favorites.push(recipeName);
        }
        saveFavorites();
        const favButton = dom.resultContainer.querySelector('.fav-btn');
        if (favButton && favButton.dataset.recipeName === recipeName) {
            updateFavoriteButtonUI(favButton, recipeName);
        }
    }
    
    function updateFavoriteButtonUI(button, recipeName) {
        if (state.favorites.includes(recipeName)) {
            button.textContent = 'Favorilerden Çıkar ❤️';
        } else {
            button.textContent = 'Favorilere Ekle ♡';
        }
    }

    function loadWeeklyPlan() {
        state.weeklyPlan = JSON.parse(localStorage.getItem('weeklyPlan')) || {
            monday: null, tuesday: null, wednesday: null, thursday: null, friday: null, saturday: null, sunday: null
        };
    }

    function saveWeeklyPlan() {
        localStorage.setItem('weeklyPlan', JSON.stringify(state.weeklyPlan));
    }

    function addToPlan(day, recipeName) {
        state.weeklyPlan[day] = recipeName;
        saveWeeklyPlan();
        renderWeeklyPlan();
    }
    
    function removeFromPlan(day) {
        state.weeklyPlan[day] = null;
        saveWeeklyPlan();
        renderWeeklyPlan();
    }

    function renderWeeklyPlan() {
        for (const day in state.weeklyPlan) {
            const dayCard = dom.weeklyGrid.querySelector(`.day-card[data-day="${day}"]`);
            const mealSlot = dayCard.querySelector('.meal-slot');
            const recipeName = state.weeklyPlan[day];
            mealSlot.innerHTML = '';
            if (recipeName) {
                const mealDiv = document.createElement('div');
                mealDiv.className = 'planned-meal';
                mealDiv.textContent = recipeName;
                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-meal-btn';
                removeBtn.innerHTML = '&times;';
                removeBtn.onclick = () => removeFromPlan(day);
                mealDiv.appendChild(removeBtn);
                mealSlot.appendChild(mealDiv);
            }
        }
    }

    function findRecipeByName(name) {
        for (const category in recipes) {
            const found = recipes[category].find(r => r.name === name);
            if (found) return found;
        }
        return null;
    }

    function showResult(recipe) {
        dom.resultContainer.classList.add('visible');
        dom.resultContainer.innerHTML = `
            <img src="${recipe.imageUrl || 'https://placehold.co/600x400/cccccc/ffffff?text=Resim+Yok'}" alt="${recipe.name}">
            <h2>${recipe.name}</h2>
            <div>${recipe.recipe
