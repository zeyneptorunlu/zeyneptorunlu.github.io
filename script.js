document.addEventListener('DOMContentLoaded', () => {
    // --- TARİF VERİTABANI ---
    const recipes = {
        highProteinSnack: [
            {
                name: 'Süzme Yoğurt ve Yemişli Parfe',
                diets: ['vegetarian', 'gluten-free'],
                recipe: '<h3>Tarif:</h3><p>Bir kaseye süzme yoğurt koyun. Üzerine bir avuç badem, ceviz ve taze yaban mersini ekleyin. İsteğe bağlı olarak bir çay kaşığı bal gezdirin.</p>'
            },
            {
                name: 'Fırında Nohut Gevreği (Falafel Tadında)',
                diets: ['vegan', 'vegetarian', 'gluten-free'],
                recipe: '<h3>Tarif:</h3><p>Haşlanmış bir kutu nohutu kurulayın. Üzerine zeytinyağı, kimyon, kırmızı biber ve tuz ekleyip karıştırın. 200°C fırında 20-25 dakika çıtır olana kadar pişirin.</p>'
            }
        ],
        lightSnack: [
            {
                name: 'Avokado Tost',
                diets: ['vegan', 'vegetarian'],
                recipe: '<h3>Tarif:</h3><p>Kızarmış bir dilim tam buğday ekmeğinin üzerine yarım avokadoyu ezin. Üzerine tuz, karabiber ve pul biber serpin. İsteğe bağlı olarak üzerine limon sıkabilirsiniz.</p>'
            },
            {
                name: 'Caprese Çubukları',
                diets: ['vegetarian', 'gluten-free'],
                recipe: '<h3>Tarif:</h3><p>Çeri domatesleri, küçük mozzarella toplarını ve taze fesleğen yapraklarını küçük çubuklara sırayla dizin. Üzerine zeytinyağı ve balzamik sirke gezdirin.</p>'
            }
        ],
        regularMeal: [
            {
                name: 'Tavuklu ve Sebzeli Sote',
                diets: ['gluten-free'],
                recipe: '<h3>Tarif:</h3><p>Kuşbaşı doğranmış tavuk göğsünü tavada soteleyin. Biber, kabak ve brokoli gibi sevdiğiniz sebzeleri ekleyip pişirmeye devam edin. Soya sosu ve baharatlarla tatlandırıp sıcak servis yapın.</p>'
            },
            {
                name: 'Mercimekli Vegan Köfte',
                diets: ['vegan', 'vegetarian'],
                recipe: '<h3>Tarif:</h3><p>1 su bardağı kırmızı mercimeği haşlayıp süzün. İnce doğranmış soğan, maydanoz, galeta unu (veya yulaf), kimyon ve tuzu ekleyip yoğurun. Köfte şekli verip az yağda veya fırında pişirin.</p>'
            }
        ],
        lowCalorieMeal: [
            {
                name: 'Izgara Somon ve Kuşkonmaz',
                diets: ['gluten-free'],
                recipe: '<h3>Tarif:</h3><p>Somon filetoyu ve kuşkonmazları zeytinyağı, tuz, karabiber ve bir dilim limon ile fırın tepsisine dizin. 200°C fırında 15 dakika kadar pişirin.</p>'
            },
            {
                name: 'Kinoalı ve Nohutlu Salata',
                diets: ['vegan', 'vegetarian', 'gluten-free'],
                recipe: '<h3>Tarif:</h3><p>Haşlanmış kinoa, haşlanmış nohut, doğranmış salatalık, domates ve taze naneyi bir kapta karıştırın. Sosu için zeytinyağı, limon suyu ve tuzu karıştırıp üzerine gezdirin.</p>'
            }
        ]
    };

    // --- DOM Referansları ---
    const form = document.getElementById('meal-form');
    const resultContainer = document.getElementById('result-container');
    const resultTitle = document.getElementById('result-title');
    const resultContent = document.getElementById('result-content');

    // --- Form Gönderme Olayı ---
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const diet = document.getElementById('dietary-restriction').value;
        const ingredientsAvailable = document.querySelector('input[name="ingredients"]:checked');
        const timeAvailable = document.getElementById('time-available').value;
        const nutritionGoal = document.querySelector('input[name="goal"]:checked');

        if (!ingredientsAvailable || !timeAvailable || !nutritionGoal) {
            showError("Lütfen tüm zorunlu alanları (Malzeme, Zaman ve Hedef) doldurun.");
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
    
    /**
     * Verilen kategori ve diyete uygun bir tarif önerir.
     * @param {string} category - Tarif kategorisi (örn: 'highProteinSnack')
     * @param {string} diet - Seçilen diyet (örn: 'vegan')
     */
    function suggestRecipe(category, diet) {
        const potentialRecipes = recipes[category];
        
        // Önce diyete uygun tarifleri filtrele
        let filteredRecipes = potentialRecipes.filter(recipe => diet === 'none' || recipe.diets.includes(diet));
        
        // Eğer diyete uygun tarif bulunamazsa, o kategorideki tüm tarifleri kullan
        if (filteredRecipes.length === 0) {
            filteredRecipes = potentialRecipes;
        }
        
        // Rastgele bir tarif seç
        const randomRecipe = filteredRecipes[Math.floor(Math.random() * filteredRecipes.length)];
        
        showResult(
            `İşte size bir öneri: ${randomRecipe.name}`,
            randomRecipe.recipe,
            'success'
        );
    }

    /**
     * Alışveriş listesi oluşturur.
     */
    function generateShoppingList(diet) {
        // Akıllı öneri: Vegan seçiliyse vegan bir tarifin alışveriş listesini öner
        const recipeToSuggest = diet === 'vegan' 
            ? recipes.lowCalorieMeal.find(r => r.diets.includes('vegan')) 
            : recipes.regularMeal[0];
            
        const content = `
            <p>Malzemeleriniz olmadığı için önce alışveriş yapmalısınız. İşte "${recipeToSuggest.name}" için örnek bir liste:</p>
            <ul>
                <li>Soğan, Sarımsak</li>
                <li>Domates, Salatalık, Biber</li>
                <li>Seçtiğiniz bir protein kaynağı (Tavuk, Balık, Nohut, Mercimek)</li>
                <li>Zeytinyağı ve Baharatlar</li>
            </ul>
        `;
        showResult('Alışveriş Listesi Oluşturuldu', content, 'info');
    }

    /**
     * Sonucu ekranda gösterir.
     * @param {string} title - Sonuç başlığı
     * @param {string} contentHTML - HTML formatında sonuç içeriği
     * @param {string} type - 'success', 'error', or 'info'
     */
    function showResult(title, contentHTML, type) {
        resultContainer.className = '';
        resultContainer.classList.add(type);

        resultTitle.textContent = title;
        resultContent.innerHTML = contentHTML;
        
        resultContainer.classList.remove('hidden');
    }
    
    /**
     * Hata mesajı gösterir.
     * @param {string} message - Gösterilecek hata mesajı.
     */
    function showError(message) {
        showResult('Hata!', `<p>${message}</p>`, 'error');
    }
});
