document.addEventListener('DOMContentLoaded', () => {
    // --- STATE & DOM ELEMENTS ---
    const dom = { // DOM elemanlarını tek bir nesnede topla
        form: document.getElementById('meal-form'),
        resultContainer: document.getElementById('result-container'),
        weeklyGrid: document.getElementById('weekly-grid'),
        // ... Diğer tüm butonlar, modallar, inputlar buraya eklenecek
        themeToggle: document.getElementById('theme-toggle'),
        viewAllBtn: document.getElementById('view-all-recipes-btn'),
        modal: document.getElementById('recipe-modal'),
        closeModalBtn: document.getElementById('modal-close-btn'),
        searchInput: document.getElementById('recipe-search-input'),
        allRecipesListDiv: document.getElementById('all-recipes-list'),
        favoritesListDiv: document.getElementById('favorites-list'),
        modalTabs: document.querySelector('.modal-tabs')
    };

    let state = { // Uygulamanın durumunu yönet
        favorites: [],
        weeklyPlan: {}
    };

    const recipes = { /* ... Önceki versiyondaki gibi tüm tarifler buraya eklenecek, her birine imageUrl eklenecek ... */ 
        // Örnek bir tarif objesi:
        // quickMeal: [
        //     { name: 'Tavuklu Quesadilla', diets: [], imageUrl: 'https://placehold.co/600x400/E67E22/white?text=Tavuklu+Quesadilla', recipe: '...' },
        // ]
    };


    // --- THEME LOGIC ---
    function applyTheme(theme) {
        document.body.classList.toggle('dark-theme', theme === 'dark');
        dom.themeToggle.checked = theme === 'dark';
    }

    function handleThemeToggle() {
        const newTheme = dom.themeToggle.checked ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    }

    // --- FAVORITES LOGIC ---
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
        // Butonun görünümünü anında güncelle
        const favButton = dom.resultContainer.querySelector('.fav-btn');
        if (favButton && favButton.dataset.recipeName === recipeName) {
            updateFavoriteButtonUI(favButton, recipeName);
        }
    }
    
    function updateFavoriteButtonUI(button, recipeName) {
        if (state.favorites.includes(recipeName)) {
            button.textContent = 'Favorilerden Çıkar ❤️';
            button.classList.add('is-favorite');
        } else {
            button.textContent = 'Favorilere Ekle ♡';
            button.classList.remove('is-favorite');
        }
    }


    // --- WEEKLY PLANNER LOGIC ---
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


    // --- CORE PLANNER & UI LOGIC ---
    function showResult(recipe) {
        dom.resultContainer.classList.add('visible');
        dom.resultContainer.innerHTML = `
            <img src="${recipe.imageUrl}" alt="${recipe.name}">
            <h2>${recipe.name}</h2>
            <div>${recipe.recipe}</div>
            <div class="result-actions">
                <button class="fav-btn" data-recipe-name="${recipe.name}">Favorilere Ekle ♡</button>
                <button class="plan-btn" data-recipe-name="${recipe.name}">Haftalık Plana Ekle</button>
            </div>
            <div class="day-selector hidden">
                ${Object.keys(state.weeklyPlan).map(day => `<button data-day="${day}">${day.charAt(0).toUpperCase() + day.slice(1,3)}</button>`).join('')}
            </div>
        `;
        updateFavoriteButtonUI(dom.resultContainer.querySelector('.fav-btn'), recipe.name);
    }
    
    // ... suggestRecipe, generateShoppingList, showError (önceki versiyondaki gibi)
    
    // Olay dinleyicileri (event listeners) ve başlangıç fonksiyonu (init)
    function init() {
        // 1. Veriyi yükle
        loadFavorites();
        loadWeeklyPlan();
        
        // 2. Arayüzü render et
        renderWeeklyPlan();
        const savedTheme = localStorage.getItem('theme') || 'light';
        applyTheme(savedTheme);

        // 3. Olay dinleyicilerini bağla
        dom.form.addEventListener('submit', handleFormSubmit);
        dom.form.addEventListener('reset', () => dom.resultContainer.classList.remove('visible'));
        dom.themeToggle.addEventListener('change', handleThemeToggle);
        
        // ... Diğer tüm olay dinleyicileri
        dom.viewAllBtn.addEventListener('click', openModal);
        dom.closeModalBtn.addEventListener('click', closeModal);
        dom.modal.addEventListener('click', (e) => e.target === dom.modal && closeModal());
        dom.searchInput.addEventListener('input', handleSearch);
        dom.modalTabs.addEventListener('click', handleTabClick);
        
        dom.resultContainer.addEventListener('click', handleResultActionClick);
    }
    
    // Olayları yöneten fonksiyonlar (handle functions)
    function handleFormSubmit(event) { /* ... */ }
    function handleTabClick(event) { /* ... */ }
    function handleSearch(event) { /* ... */ }
    function handleResultActionClick(event) {
        const target = event.target;
        if (target.classList.contains('fav-btn')) {
            toggleFavorite(target.dataset.recipeName);
        }
        if (target.classList.contains('plan-btn')) {
            const selector = dom.resultContainer.querySelector('.day-selector');
            selector.classList.toggle('hidden');
        }
        if (target.matches('.day-selector button')) {
            const recipeName = dom.resultContainer.querySelector('.plan-btn').dataset.recipeName;
            addToPlan(target.dataset.day, recipeName);
            dom.resultContainer.querySelector('.day-selector').classList.add('hidden');
        }
    }
    
    // Başlangıç
    init();
});
