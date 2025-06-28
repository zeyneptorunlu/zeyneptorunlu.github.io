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

    // --- ETİKETLERLE ZENGİNLEŞTİRİLMİŞ TARİF VERİTABANI ---
    const recipes = {
        highProteinSnack: [
            { name: 'Ton Balıklı Salatalık Kanepeleri', diets: ['gluten-free'], tags: ['high-protein', 'low-calorie'], imageUrl: '...', recipe: '...' },
            { name: 'Süzme Yoğurt ve Yemişli Parfe', diets: ['vegetarian', 'gluten-free'], tags: ['high-protein'], imageUrl: '...', recipe: '...' },
            { name: 'Haşlanmış Yumurta ve Avokado', diets: ['vegetarian', 'gluten-free'], tags: ['high-protein', 'low-calorie'], imageUrl: '...', recipe: '...' },
        ],
        lightSnack: [
            { name: 'Elma Dilimleri ve Fıstık Ezmesi', diets: ['vegan', 'vegetarian', 'gluten-free'], tags: [], imageUrl: '...', recipe: '...' },
            { name: 'Caprese Çubukları', diets: ['vegetarian', 'gluten-free'], tags: ['low-calorie'], imageUrl: '...', recipe: '...' },
            { name: 'Pirinç Patlağı ve Humus', diets: ['vegan', 'vegetarian', 'gluten-free'], tags: [], imageUrl: '...', recipe: '...' },
        ],
        quickMeal: [
            { name: 'Tavuklu Quesadilla', diets: [], tags: ['high-protein'], imageUrl: '...', recipe: '...' },
            { name: 'Klasik Menemen', diets: ['vegetarian', 'gluten-free'], tags: ['high-protein'], imageUrl: '...', recipe: '...' },
            { name: 'Kremalı Mantarlı Tavuk', diets: ['gluten-free'], tags: ['high-protein'], imageUrl: '...', recipe: '...' },
            { name: 'Sarımsaklı ve Zeytinyağlı Spagetti', diets: ['vegan', 'vegetarian'], tags: [], imageUrl: '...', recipe: '...' },
            { name: 'Kinoalı ve Lor Peynirli Salata', diets: ['vegetarian', 'gluten-free'], tags: ['low-calorie', 'high-protein'], imageUrl: '...', recipe: '<h3>Tarif:</h3><p>Haşlanmış kinoayı, bir kaseye alın. Üzerine bolca yeşillik, çeri domates ve salatalık ekleyin. En üste lor peyniri serpiştirin. Sosu için zeytinyağı ve limon suyu kullanın.</p>' }
        ],
        regularMeal: [
            { name: 'Izgara Köfte ve Piyaz', diets: ['gluten-free'], tags: ['high-protein'], imageUrl: '...', recipe: '...' },
            { name: 'Fırında Beşamel Soslu Tavuk', diets: [], tags: [], imageUrl: '...', recipe: '...' },
            { name: 'Zeytinyağlı Biber Dolma', diets: ['vegan', 'vegetarian'], tags: [], imageUrl: '...', recipe: '...' },
        ],
        lowCalorieMeal: [
            { name: 'Fırında Sebzeli Somon', diets: ['gluten-free'], tags: ['low-calorie', 'high-protein'], imageUrl: '...', recipe: '...' },
            { name: 'Bol Sebzeli Mercimek Çorbası', diets: ['vegan', 'vegetarian', 'gluten-free'], tags: ['low-calorie'], imageUrl: '...', recipe: '...' },
            { name: 'Kinoalı Tavuk Salatası', diets: ['gluten-free'], tags: ['low-calorie', 'high-protein'], imageUrl: '...', recipe: '...' },
        ]
    };
    // Not: imageUrl ve recipe alanları önceki gibi doldurulmalıdır. Örnek olarak bir tarif eklendi.

    // --- YENİ VE AKILLI suggestRecipe FONKSİYONU ---
    function suggestRecipe(category, diet, goal) {
        const potentialRecipes = recipes[category];
        let filteredByDiet = [];

        // Adım 1: Diyete göre filtrele
        if (diet === 'none') {
            if (goal === 'none' || goal === 'high-protein') {
                const nonVegRecipes = potentialRecipes.filter(r => !r.diets.includes('vegan') && !r.diets.includes('vegetarian'));
                filteredByDiet = nonVegRecipes.length > 0 ? nonVegRecipes : potentialRecipes;
            } else {
                filteredByDiet = potentialRecipes;
            }
        } else {
            filteredByDiet = potentialRecipes.filter(r => r.diets.includes(diet));
        }

        if (filteredByDiet.length === 0) {
            showError(`Maalesef, aradığınız diyet (${diet}) için bu kategoride uygun bir tarif bulunamadı.`);
            return;
        }

        let finalSuggestions = [];

        // Adım 2: Beslenme hedefine göre önceliklendir (eğer hedef 'none' değilse)
        if (goal === 'low-calorie' || goal === 'high-protein') {
            const taggedRecipes = filteredByDiet.filter(r => r.tags && r.tags.includes(goal));
            if (taggedRecipes.length > 0) {
                finalSuggestions = taggedRecipes; // Hedefe uygun etiketli tarifler bulundu, sadece onları kullan
            } else {
                finalSuggestions = filteredByDiet; // Etiketli tarif yoksa, diyete uyan herhangi birini kullan
            }
        } else {
            finalSuggestions = filteredByDiet; // Hedef 'none' ise, diyete uyan herhangi birini kullan
        }

        if (finalSuggestions.length === 0) { // Bu pek olası değil ama bir güvenlik kontrolü
            showError(`Maalesef, aradığınız kriterlere uygun bir tarif bulunamadı.`);
            return;
        }
        
        const randomRecipe = finalSuggestions[Math.floor(Math.random() * finalSuggestions.length)];
        showResult(randomRecipe);
    }

    // ----- UYGULAMANIN GERİ KALAN TÜM KODLARI AYNEN DEVAM EDİYOR -----
    // (Aşağıdaki kodlarda bir değişiklik yok, sadece suggestRecipe fonksiyonu güncellendi)

    function handleFormSubmit(event) {
        event.preventDefault();
        const diet = document.getElementById('dietary-restriction').value;
        const ingredientsAvailable = dom.form.querySelector('input[name="ingredients"]:checked');
        const timeSelection = dom.form.querySelector('input[name="time"]:checked');
        const nutritionGoal = dom.form.querySelector('input[name="goal"]:checked');
        if (!ingredientsAvailable || !timeSelection || !nutritionGoal) {
            showError("Lütfen tüm zorunlu alanları doldurun.");
            return;
        }
        if (ingredientsAvailable.value === 'no') {
            generateShoppingList();
            return;
        }
        const timeValue = timeSelection.value;
        let suggestionCategory;
        if (timeValue === 'short') {
            suggestionCategory = 'highProteinSnack'; // Atıştırmalıklar için iki kategori var, bunu basitleştirelim.
            if(nutritionGoal.value !== 'high-protein') suggestionCategory = 'lightSnack';
        } else if (timeValue === 'medium') {
            suggestionCategory = 'quickMeal';
        } else {
            suggestionCategory = 'regularMeal';
            if(nutritionGoal.value === 'low-calorie') suggestionCategory = 'lowCalorieMeal';
        }
        suggestRecipe(suggestionCategory, diet, nutritionGoal.value);
    }

    // Diğer tüm fonksiyonlar (showResult, showError, modal yönetimi, tema, favoriler, haftalık plan vs.) öncekiyle aynı kalacak...
    // ...
    // ... [Önceki yanıttaki diğer tüm fonksiyonları buraya kopyalayın]
    // ...
    function applyTheme(theme) {
        dom.body.classList.toggle('dark-theme', theme === 'dark');
        dom.themeToggle.checked = theme === 'dark';
    }

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
            <div>${recipe.recipe}</div>
            <div class="result-actions">
                <button class="fav-btn" data-recipe-name="${recipe.name}">Favorilere Ekle ♡</button>
                <button class="plan-btn" data-recipe-name="${recipe.name}">Haftalık Plana Ekle</button>
            </div>
            <div class="day-selector" style="display: none;">
                ${Object.keys(state.weeklyPlan).map(day => `<button data-day="${day}">${day.charAt(0).toUpperCase() + day.slice(1,3)}</button>`).join('')}
            </div>
        `;
        updateFavoriteButtonUI(dom.resultContainer.querySelector('.fav-btn'), recipe.name);
    }
    
    function generateShoppingList() {
        const content = `<p>Malzemeleriniz olmadığı için önce alışveriş yapmalısınız. Örnek bir liste:</p><ul><li>Soğan, Sarımsak</li><li>Mevsim Yeşillikleri</li><li>Seçtiğiniz bir protein kaynağı</li></ul>`;
        dom.resultContainer.classList.add('visible');
        dom.resultContainer.innerHTML = `<h2>Alışveriş Listesi Oluşturuldu</h2>${content}`;
    }
    
    function showError(message) {
        dom.resultContainer.classList.add('visible');
        dom.resultContainer.innerHTML = `<h2>Bir sorun oluştu!</h2><p>${message}</p>`;
    }

    function openModal() {
        populateAllRecipes();
        populateFavorites();
        dom.modal.classList.remove('hidden');
    }

    function closeModal() {
        dom.modal.classList.add('hidden');
    }

    function populateAllRecipes() {
        dom.allRecipesListDiv.innerHTML = ''; 
        for (const category in recipes) {
            recipes[category].forEach(recipe => {
                const p = document.createElement('p');
                p.textContent = recipe.name;
                p.dataset.recipeName = recipe.name;
                dom.allRecipesListDiv.appendChild(p);
            });
        }
    }

    function populateFavorites() {
        dom.favoritesListDiv.innerHTML = '';
        if (state.favorites.length === 0) {
            dom.favoritesListDiv.innerHTML = '<p>Henüz favori tarifiniz yok.</p>';
            return;
        }
        state.favorites.forEach(recipeName => {
            const p = document.createElement('p');
            p.textContent = recipeName;
            p.dataset.recipeName = recipeName;
            dom.favoritesListDiv.appendChild(p);
        });
    }

    function handleResultActionClick(event) {
        const target = event.target;
        if (target.classList.contains('fav-btn')) {
            toggleFavorite(target.dataset.recipeName);
        } else if (target.classList.contains('plan-btn')) {
            const selector = dom.resultContainer.querySelector('.day-selector');
            selector.style.display = selector.style.display === 'flex' ? 'none' : 'flex';
        } else if (target.matches('.day-selector button')) {
            const recipeName = dom.resultContainer.querySelector('.plan-btn').dataset.recipeName;
            addToPlan(target.dataset.day, recipeName);
            dom.resultContainer.querySelector('.day-selector').style.display = 'none';
        }
    }

    function handleTabClick(event) {
        if (!event.target.classList.contains('tab-btn')) return;
        dom.modal.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        dom.modal.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        event.target.classList.add('active');
        const tabName = event.target.dataset.tab;
        dom.modal.querySelector(`#${tabName}-list`).classList.add('active');
    }
    
    function handleSearch() {
        const searchTerm = dom.searchInput.value.toLowerCase();
        dom.allRecipesListDiv.querySelectorAll('p').forEach(p => {
            const isVisible = p.textContent.toLowerCase().includes(searchTerm);
            p.style.display = isVisible ? 'block' : 'none';
        });
    }

    function init() {
        loadFavorites();
        loadWeeklyPlan();
        renderWeeklyPlan();
        const savedTheme = localStorage.getItem('theme') || 'light';
        applyTheme(savedTheme);

        dom.form.addEventListener('submit', handleFormSubmit);
        dom.form.addEventListener('reset', () => dom.resultContainer.classList.remove('visible'));
        dom.themeToggle.addEventListener('change', handleThemeToggle);
        dom.viewAllBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
        dom.closeModalBtn.addEventListener('click', closeModal);
        dom.modal.addEventListener('click', (e) => e.target === dom.modal && closeModal());
        dom.searchInput.addEventListener('input', handleSearch);
        dom.modalTabs.addEventListener('click', handleTabClick);
        dom.resultContainer.addEventListener('click', handleResultActionClick);
        
        [dom.allRecipesListDiv, dom.favoritesListDiv].forEach(list => {
            list.addEventListener('click', (e) => {
                if(e.target.tagName === 'P' && e.target.dataset.recipeName) {
                    const recipe = findRecipeByName(e.target.dataset.recipeName);
                    if(recipe) {
                        closeModal();
                        setTimeout(() => showResult(recipe), 300);
                    }
                }
            });
        });
    }

    init();
});
