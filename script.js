document.addEventListener('DOMContentLoaded', () => {
    // --- YENİDEN KATEGORİZE EDİLMİŞ TARİF VERİTABANI ---
    const recipes = {
        highProteinSnack: [
            { name: 'Süzme Yoğurt ve Yemişli Parfe', diets: ['vegetarian', 'gluten-free'], recipe: '...' },
            { name: 'Haşlanmış Yumurta ve Avokado', diets: ['vegetarian', 'gluten-free'], recipe: '...' },
            { name: 'Tuzlu Edamame', diets: ['vegan', 'vegetarian', 'gluten-free'], recipe: '...' },
            { name: 'Lor Peyniri ve Meyve', diets: ['vegetarian', 'gluten-free'], recipe: '...' },
            { name: 'Ton Balıklı Salatalık Kanepeleri', diets: ['gluten-free'], recipe: '...' },
            { name: 'Protein Smoothie', diets: ['vegetarian', 'gluten-free'], recipe: '...' },
            { name: 'Fırında Nohut Gevreği', diets: ['vegan', 'vegetarian', 'gluten-free'], recipe: '...' },
        ],
        lightSnack: [
            { name: 'Elma Dilimleri ve Fıstık Ezmesi', diets: ['vegan', 'vegetarian', 'gluten-free'], recipe: '...' },
            { name: 'Caprese Çubukları', diets: ['vegetarian', 'gluten-free'], recipe: '...' },
            { name: 'Pirinç Patlağı ve Humus', diets: ['vegan', 'vegetarian', 'gluten-free'], recipe: '...' },
            { name: 'Yoğurtlu Salatalık Dilimleri', diets: ['vegetarian', 'gluten-free'], recipe: '...' },
            { name: 'Bir Avuç Zeytin', diets: ['vegan', 'vegetarian', 'gluten-free'], recipe: '...' },
            { name: 'Karpuz ve Beyaz Peynir Küpleri', diets: ['vegetarian', 'gluten-free'], recipe: '...' },
            { name: 'Sade Türk Kahvesi ve Bir Kare Bitter Çikolata', diets: ['vegan', 'vegetarian', 'gluten-free'], recipe: '...' }
        ],
        regularMeal: [
            { name: 'Klasik Menemen', diets: ['vegetarian', 'gluten-free'], recipe: '...' },
            { name: 'Fırında Peynirli Makarna', diets: ['vegetarian'], recipe: '...' },
            { name: 'Mantarlı Risotto', diets: ['vegetarian'], recipe: '...' },
            { name: 'Zeytinyağlı Biber Dolma', diets: ['vegan', 'vegetarian', 'gluten-free'], recipe: '...' },
            { name: 'Tavuklu ve Sebzeli Sote', diets: ['gluten-free'], recipe: '...' },
            { name: 'Mercimekli Vegan Köfte', diets: ['vegan', 'vegetarian'], recipe: '...' },
            { name: 'Izgara Köfte ve Piyaz', diets: ['gluten-free'], recipe: '...' },
        ],
        lowCalorieMeal: [
            { name: 'Izgara Somon ve Kuşkonmaz', diets: ['gluten-free'], recipe: '...' },
            { name: 'Kinoalı ve Nohutlu Salata', diets: ['vegan', 'vegetarian', 'gluten-free'], recipe: '...' },
            { name: 'Tavuklu Marul Dürüm (Lettuce Wraps)', diets: ['gluten-free'], recipe: '...' },
            { name: 'Bol Sebzeli Mercimek Çorbası', diets: ['vegan', 'vegetarian', 'gluten-free'], recipe: '...' },
            { name: 'Kabak Spagetti (Zoodles) ve Domates Sosu', diets: ['vegan', 'vegetarian', 'gluten-free'], recipe: '...' },
            { name: 'Fırında Limonlu ve Kekikli Tavuk Göğsü', diets: ['gluten-free'], recipe: '...' },
            { name: 'Ispanaklı ve Mantarlı Omlet (Sadece Yumurta Beyazı)', diets: ['vegetarian', 'gluten-free'], recipe: '...' }
        ]
    };
    // Not: Tarif içerikleri ('recipe: "..."') yer kaplamaması için kısa kesilmiştir, önceki versiyondaki gibi doldurulabilir.

    // --- DOM Referansları ---
    const form = document.getElementById('meal-form');
    const resultContainer = document.getElementById('result-container');
    const resultTitle = document.getElementById('result-title');
    const resultContent = document.getElementById('result-content');

    const viewAllBtn = document.getElementById('view-all-recipes-btn');
    const modal = document.getElementById('recipe-modal');
    const closeModalBtn = document.getElementById('modal-close-btn');
    const allRecipesListDiv = document.getElementById('all-recipes-list');


    // --- Form Gönderme Olayı ---
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const diet = document.getElementById('dietary-restriction').value;
        const ingredientsAvailable = document.querySelector('input[name="ingredients"]:checked');
        const timeAvailable = document.getElementById('time-available').value;
        const nutritionGoal = document.querySelector('input[name="goal"]:checked');

        if (!ingredientsAvailable || !timeAvailable || !nutritionGoal) {
            showError("Lütfen tüm zorunlu alanları doldurun.");
            return; 
        }

        if (ingredientsAvailable.value === 'no') {
            generateShoppingList(diet);
            return;
        }

        const timeIsShort = parseInt(timeAvailable, 10) <= 30;
        
        let suggestionCategory;
        if (timeIsShort) {
            suggestionCategory = nutritionGoal.value === 'high-protein' ? 'highProteinSnack' : 'lightSnack';
        } else {
            suggestionCategory = nutritionGoal.value === 'low-calorie' ? 'lowCalorieMeal' : 'regularMeal';
        }
        
        suggestRecipe(suggestionCategory, diet);
    });
    
    // --- TARİF ÖNERİ FONKSİYONLARI ---
    function suggestRecipe(category, diet) {
        const potentialRecipes = recipes[category];
        let filteredRecipes = potentialRecipes.filter(recipe => diet === 'none' || recipe.diets.includes(diet));
        
        if (filteredRecipes.length === 0) {
            showError(`Maalesef, seçtiğiniz diyet (${diet}) için bu kategoride uygun bir tarif bulunamadı.`);
            return;
        }
        
        const randomRecipe = filteredRecipes[Math.floor(Math.random() * filteredRecipes.length)];
        const recipeHTML = `<h3>Tarif:</h3><p>${randomRecipe.name} için basit bir tarif...</p><em>(Gerçek tarifler önceki versiyondaki gibi eklenebilir)</em>`;
        showResult(`İşte size bir öneri: ${randomRecipe.name}`, recipeHTML, 'success');
    }

    function generateShoppingList(diet) {
        const content = `<p>Malzemeleriniz olmadığı için önce alışveriş yapmalısınız. Örnek bir liste:</p><ul><li>Soğan, Sarımsak</li><li>Mevsim Yeşillikleri</li><li>Seçtiğiniz bir protein kaynağı</li></ul>`;
        showResult('Alışveriş Listesi Oluşturuldu', content, 'info');
    }
    
    // --- GÖSTERİM FONKSİYONLARI ---
    function showResult(title, contentHTML, type) {
        resultContainer.className = 'visible'; // Sadece 'visible' ekle
        resultTitle.textContent = title;
        resultContent.innerHTML = contentHTML;
    }
    
    function showError(message) {
        showResult('Hata!', `<p>${message}</p>`, 'error');
    }

    // --- MODAL FONKSİYONLARI ---
    function openModal() {
        populateAllRecipes();
        modal.classList.remove('hidden');
    }

    function closeModal() {
        modal.classList.add('hidden');
    }

    function populateAllRecipes() {
        allRecipesListDiv.innerHTML = ''; // Listeyi temizle
        const categoryTitles = {
            highProteinSnack: 'Yüksek Proteinli Atıştırmalıklar',
            lightSnack: 'Hafif Atıştırmalıklar',
            regularMeal: 'Normal Öğünler',
            lowCalorieMeal: 'Düşük Kalorili Öğünler'
        };

        for (const category in recipes) {
            const title = document.createElement('h3');
            title.textContent = categoryTitles[category];
            allRecipesListDiv.appendChild(title);
            
            recipes[category].forEach(recipe => {
                const recipeEl = document.createElement('p');
                recipeEl.textContent = recipe.name;
                // Tıklama özelliği eklenebilir
                allRecipesListDiv.appendChild(recipeEl);
            });
        }
    }
    
    // --- OLAY DİNLEYİCİLERİ ---
    viewAllBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        // Modal'ın dışına tıklandığında kapat
        if (e.target === modal) {
            closeModal();
        }
    });

});
