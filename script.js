document.addEventListener('DOMContentLoaded', () => {
    // --- YENİ ZAMAN SKALASINA VE MANTIĞA GÖRE DÜZENLENMİŞ TARİF VERİTABANI ---
    const recipes = {
        // < 20 DAKİKA
        highProteinSnack: [
            { name: 'Ton Balıklı Salatalık Kanepeleri', diets: ['gluten-free'], recipe: '<h3>Tarif:</h3><p>Bir salatalığı kalın dilimler halinde kesin. Bir kapta konserve ton balığını az miktarda mayonez veya yoğurtla karıştırın. Karışımı salatalık dilimlerinin üzerine paylaştırın.</p>' },
            { name: 'Süzme Yoğurt ve Yemişli Parfe', diets: ['vegetarian', 'gluten-free'], recipe: '<h3>Tarif:</h3><p>Bir kaseye süzme yoğurt koyun. Üzerine bir avuç badem, ceviz ve taze yaban mersini ekleyin. İsteğe bağlı olarak bir çay kaşığı bal gezdirin.</p>' },
            { name: 'Haşlanmış Yumurta ve Avokado', diets: ['vegetarian', 'gluten-free'], recipe: '<h3>Tarif:</h3><p>2 adet katı haşlanmış yumurtayı dilimleyin. Yanında çeyrek avokado dilimleri ve üzerine serpilmiş karabiber ile servis yapın.</p>' },
        ],
        lightSnack: [
            { name: 'Elma Dilimleri ve Fıstık Ezmesi', diets: ['vegan', 'vegetarian', 'gluten-free'], recipe: '<h3>Tarif:</h3><p>Bir elmayı dilimleyin. Yanında 1-2 yemek kaşığı şekersiz fıstık ezmesi ile servis yapın.</p>' },
            { name: 'Caprese Çubukları', diets: ['vegetarian', 'gluten-free'], recipe: '<h3>Tarif:</h3><p>Çeri domatesleri, küçük mozzarella toplarını ve taze fesleğen yapraklarını küçük çubuklara sırayla dizin. Üzerine zeytinyağı ve balzamik sirke gezdirin.</p>' },
            { name: 'Pirinç Patlağı ve Humus', diets: ['vegan', 'vegetarian', 'gluten-free'], recipe: '<h3>Tarif:</h3><p>2 adet tam tahıllı pirinç patlağının üzerine bolca humus sürün. Üzerine salatalık dilimleri ekleyebilirsiniz.</p>' },
        ],
        // 20-45 DAKİKA ARASI
        quickMeal: [
            { name: 'Tavuklu Quesadilla', diets: [], recipe: '<h3>Tarif:</h3><p>Haşlanmış veya tavada pişirilmiş tavuk göğsünü didikleyin. Bir lavaşın yarısına tavukları, rendelenmiş peyniri ve mısır tanelerini yayın. Lavaşın diğer yarısını üzerine kapatıp tost makinesinde veya tavada peynir eriyene kadar pişirin.</p>' },
            { name: 'Klasik Menemen', diets: ['vegetarian', 'gluten-free'], recipe: '<h3>Tarif:</h3><p>Soğanı ve biberleri zeytinyağında kavurun. Rendelenmiş domatesleri ekleyip suyunu çekene kadar pişirin. Son olarak yumurtaları kırın ve karıştırarak pişirin. Üzerine maydanoz serpin.</p>' },
            { name: 'Kremalı Mantarlı Tavuk', diets: ['gluten-free'], recipe: '<h3>Tarif:</h3><p>Tavuk filetoları tavada mühürleyin. Aynı tavada mantarları soteleyin, krema ve baharatları ekleyin. Tavukları geri tavaya koyup sosla birlikte birkaç dakika daha pişirin.</p>' },
            { name: 'Sarımsaklı ve Zeytinyağlı Spagetti (Aglio e Olio)', diets: ['vegan', 'vegetarian'], recipe: '<h3>Tarif:</h3><p>Spagettiyi haşlayın. Ayrı bir tavada bol zeytinyağında ince dilimlenmiş sarımsakları ve pul biberi hafifçe yakın. Haşlanmış makarnayı bu sosa ekleyip karıştırın ve taze maydanozla servis edin.</p>' }
        ],
        // > 45 DAKİKA
        regularMeal: [
            { name: 'Izgara Köfte ve Piyaz', diets: ['gluten-free'], recipe: '<h3>Tarif:</h3><p>Kıymayı rendelenmiş soğan ve baharatlarla yoğurup köfte şekli verin. Izgarada veya döküm tavada pişirin. Yanında haşlanmış fasulye, soğan ve domatesle hazırlanan piyazla servis yapın.</p>' },
            { name: 'Fırında Beşamel Soslu Tavuk', diets: [], recipe: '<h3>Tarif:</h3><p>Tavuk butlarını fırın tepsisine dizin. Üzerine beşamel sos dökün ve rendelenmiş kaşar peyniri serpin. 200°C fırında 45-50 dakika, üzeri kızarana kadar pişirin.</p>' },
            { name: 'Zeytinyağlı Biber Dolma', diets: ['vegan', 'vegetarian', 'gluten-free'], recipe: '<h3>Tarif:</h3><p>İç harcı için pirinç, soğan, kuş üzümü, fıstık, nane ve tuzu karıştırın. Biberlerin içini doldurun ve tencereye dizin. Üzerine zeytinyağı ve sıcak su gezdirip kısık ateşte pirinçler yumuşayana kadar pişirin.</p>' },
        ],
        lowCalorieMeal: [
            { name: 'Fırında Sebzeli Somon', diets: ['gluten-free'], recipe: '<h3>Tarif:</h3><p>Bir fırın kağıdının üzerine somon filetoyu, brokoli, havuç ve kuşkonmazı yerleştirin. Üzerine zeytinyağı, limon dilimleri ve dereotu ekleyip kağıdı paket şeklinde kapatın. 200°C fırında 25-30 dakika pişirin.</p>' },
            { name: 'Bol Sebzeli Mercimek Çorbası', diets: ['vegan', 'vegetarian', 'gluten-free'], recipe: '<h3>Tarif:</h3><p>Soğan, havuç ve kerevizi doğrayıp tencerede soteleyin. Kırmızı mercimek, sebze suyu ve domates salçası ekleyip mercimekler yumuşayana kadar pişirin. Blenderdan geçirin ve üzerine nane gezdirin.</p>' },
            { name: 'Kinoalı Tavuk Salatası', diets: ['gluten-free'], recipe: '<h3>Tarif:</h3><p>Haşlanmış kinoa, haşlanmış ve didiklenmiş tavuk göğsü, bol yeşillik, çeri domates ve salatalığı karıştırın. Sosu için zeytinyağı, limon suyu ve hardalı karıştırıp üzerine gezdirin.</p>' },
        ]
    };

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
        const timeSelection = document.querySelector('input[name="time"]:checked'); // ZAMAN SEÇİMİNİ ALMA (GÜNCELLENDİ)
        const nutritionGoal = document.querySelector('input[name="goal"]:checked');

        if (!ingredientsAvailable || !timeSelection || !nutritionGoal) { // KONTROL GÜNCELLENDİ
            showError("Lütfen tüm zorunlu alanları doldurun.");
            return; 
        }

        if (ingredientsAvailable.value === 'no') {
            generateShoppingList();
            return;
        }

        // YENİ ZAMAN MANTIĞI (GÜNCELLENDİ)
        const timeValue = timeSelection.value;
        let suggestionCategory;

        if (timeValue === 'short') { // < 20 dk
            suggestionCategory = nutritionGoal.value === 'high-protein' ? 'highProteinSnack' : 'lightSnack';
        } else if (timeValue === 'medium') { // 20-45 dk
            suggestionCategory = 'quickMeal';
        } else { // 'long', yani > 45 dk
            suggestionCategory = nutritionGoal.value === 'low-calorie' ? 'lowCalorieMeal' : 'regularMeal';
        }
        
        suggestRecipe(suggestionCategory, diet, nutritionGoal.value);
    });
    
    // --- TARİF ÖNERİ FONKSİYONLARI ---
    function suggestRecipe(category, diet, goal) {
        const potentialRecipes = recipes[category];
        let filteredRecipes;

        if (diet === 'none') {
            if(goal === 'none' || goal === 'high-protein'){
                const nonVegRecipes = potentialRecipes.filter(recipe => !recipe.diets.includes('vegan') && !recipe.diets.includes('vegetarian'));
                filteredRecipes = nonVegRecipes.length > 0 ? nonVegRecipes : potentialRecipes;
            } else {
                filteredRecipes = potentialRecipes;
            }
        } else {
            filteredRecipes = potentialRecipes.filter(recipe => recipe.diets.includes(diet));
        }
        
        if (filteredRecipes.length === 0) {
            showError(`Maalesef, aradığınız kriterlere (${category} / ${diet}) uygun bir tarif bulunamadı.`);
            return;
        }
        
        const randomRecipe = filteredRecipes[Math.floor(Math.random() * filteredRecipes.length)];
        showResult(`İşte size bir öneri: ${randomRecipe.name}`, randomRecipe.recipe);
    }

    function generateShoppingList() {
        const content = `<p>Malzemeleriniz olmadığı için önce alışveriş yapmalısınız. Örnek bir liste:</p><ul><li>Soğan, Sarımsak</li><li>Mevsim Yeşillikleri</li><li>Seçtiğiniz bir protein kaynağı</li></ul>`;
        showResult('Alışveriş Listesi Oluşturuldu', content);
    }
    
    // --- GÖSTERİM FONKSİYONLARI ---
    function showResult(title, contentHTML) {
        resultContainer.className = 'visible';
        resultTitle.textContent = title;
        resultContent.innerHTML = contentHTML;
    }
    
    function showError(message) {
        resultContainer.className = 'visible error-style';
        resultTitle.textContent = 'Bir sorun oluştu!';
        resultContent.innerHTML = `<p>${message}</p>`;
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
        allRecipesListDiv.innerHTML = ''; 
        const categoryTitles = {
            highProteinSnack: '(< 20 dk) Yüksek Proteinli Atıştırmalıklar',
            lightSnack: '(< 20 dk) Hafif Atıştırmalıklar',
            quickMeal: '(20-45 dk) Pratik Öğünler',
            regularMeal: '(> 45 dk) Doyurucu Öğünler',
            lowCalorieMeal: '(> 45 dk) Düşük Kalorili Öğünler'
        };

        for (const category in recipes) {
            const title = document.createElement('h3');
            title.textContent = categoryTitles[category];
            allRecipesListDiv.appendChild(title);
            
            recipes[category].forEach(recipe => {
                const recipeEl = document.createElement('p');
                recipeEl.textContent = recipe.name;
                recipeEl.addEventListener('click', () => {
                    closeModal();
                    setTimeout(() => {
                        showResult(`Seçtiğiniz Tarif: ${recipe.name}`, recipe.recipe);
                    }, 400);
                });
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
        if (e.target === modal) {
            closeModal();
        }
    });
});
