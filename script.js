document.addEventListener('DOMContentLoaded', () => {
    // --- GENİŞLETİLMİŞ TARİF VERİTABANI ---
    const recipes = {
        highProteinSnack: [
            {
                name: 'Süzme Yoğurt ve Yemişli Parfe',
                diets: ['vegetarian', 'gluten-free'],
                recipe: '<h3>Tarif:</h3><p>Bir kaseye süzme yoğurt koyun. Üzerine bir avuç badem, ceviz ve taze yaban mersini ekleyin. İsteğe bağlı olarak bir çay kaşığı bal gezdirin.</p>'
            },
            {
                name: 'Fırında Nohut Gevreği',
                diets: ['vegan', 'vegetarian', 'gluten-free'],
                recipe: '<h3>Tarif:</h3><p>Haşlanmış bir kutu nohutu kurulayın. Üzerine zeytinyağı, kimyon, kırmızı biber ve tuz ekleyip karıştırın. 200°C fırında 20-25 dakika çıtır olana kadar pişirin.</p>'
            },
            {
                name: 'Haşlanmış Yumurta ve Avokado',
                diets: ['vegetarian', 'gluten-free'],
                recipe: '<h3>Tarif:</h3><p>2 adet katı haşlanmış yumurtayı dilimleyin. Yanında çeyrek avokado dilimleri ve üzerine serpilmiş karabiber ile servis yapın.</p>'
            },
            {
                name: 'Tuzlu Edamame',
                diets: ['vegan', 'vegetarian', 'gluten-free'],
                recipe: '<h3>Tarif:</h3><p>Donmuş edamameleri paketin üzerindeki talimatlara göre haşlayın veya buharda pişirin. Üzerine bolca deniz tuzu serpip servis yapın.</p>'
            },
            {
                name: 'Lor Peyniri ve Meyve',
                diets: ['vegetarian', 'gluten-free'],
                recipe: '<h3>Tarif:</h3><p>Bir kaseye yağsız lor peyniri koyun. Üzerini taze çilek, şeftali dilimleri veya sevdiğiniz başka bir meyveyle süsleyin.</p>'
            },
            {
                name: 'Ton Balıklı Salatalık Kanepeleri',
                diets: ['gluten-free'],
                recipe: '<h3>Tarif:</h3><p>Bir salatalığı kalın dilimler halinde kesin. Bir kapta konserve ton balığını az miktarda mayonez veya yoğurtla karıştırın. Karışımı salatalık dilimlerinin üzerine paylaştırın.</p>'
            },
            {
                name: 'Protein Smoothie',
                diets: ['vegetarian', 'gluten-free'],
                recipe: '<h3>Tarif:</h3><p>Blender\'a 1 su bardağı süt (veya badem sütü), 1 ölçek protein tozu, yarım muz ve bir avuç ıspanak ekleyip pürüzsüz olana kadar karıştırın.</p>'
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
            },
            {
                name: 'Elma Dilimleri ve Fıstık Ezmesi',
                diets: ['vegan', 'vegetarian', 'gluten-free'],
                recipe: '<h3>Tarif:</h3><p>Bir elmayı dilimleyin. Yanında 1-2 yemek kaşığı şekersiz fıstık ezmesi ile servis yapın.</p>'
            },
            {
                name: 'Pirinç Patlağı ve Humus',
                diets: ['vegan', 'vegetarian', 'gluten-free'],
                recipe: '<h3>Tarif:</h3><p>2 adet tam tahıllı pirinç patlağının üzerine bolca humus sürün. Üzerine salatalık dilimleri ekleyebilirsiniz.</p>'
            },
            {
                name: 'Kuru Meyve ve Birkaç Kare Bitter Çikolata',
                diets: ['vegan', 'vegetarian', 'gluten-free'],
                recipe: '<h3>Tarif:</h3><p>3-4 adet kuru kayısı veya hurma ile %70 kakao oranlı 2 kare bitter çikolatayı birlikte tüketin.</p>'
            },
            {
                name: 'Yoğurtlu Salatalık Dilimleri',
                diets: ['vegetarian', 'gluten-free'],
                recipe: '<h3>Tarif:</h3><p>Bir kase yoğurdun içine ince kıyılmış dereotu, nane ve biraz tuz ekleyip karıştırın. Salatalık dilimlerini bu sosa batırarak yiyin.</p>'
            },
            {
                name: 'Bir Avuç Zeytin',
                diets: ['vegan', 'vegetarian', 'gluten-free'],
                recipe: '<h3>Tarif:</h3><p>Basit ama tatmin edici. Bir avuç (yaklaşık 10-12 adet) sevdiğiniz türden zeytin. Yanında bir dilim peynir veya birkaç ceviz de olabilir.</p>'
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
            },
            {
                name: 'Klasik Menemen',
                diets: ['vegetarian', 'gluten-free'],
                recipe: '<h3>Tarif:</h3><p>Soğanı ve biberleri zeytinyağında kavurun. Rendelenmiş domatesleri ekleyip suyunu çekene kadar pişirin. Son olarak yumurtaları kırın ve karıştırarak pişirin. Üzerine maydanoz serpin.</p>'
            },
            {
                name: 'Nohutlu ve Ispanaklı Vegan Köri',
                diets: ['vegan', 'vegetarian', 'gluten-free'],
                recipe: '<h3>Tarif:</h3><p>Bir tencerede soğan ve sarımsağı soteleyin. Köri tozu ve zerdeçal ekleyin. Haşlanmış nohut, bir kutu konserve domates ve bir kutu hindistan cevizi sütü ekleyip kaynatın. En son taze ıspanakları ekleyip solana kadar pişirin. Pirinçle servis yapın.</p>'
            },
            {
                name: 'Fırında Peynirli Makarna',
                diets: ['vegetarian'],
                recipe: '<h3>Tarif:</h3><p>Makarnayı haşlayıp süzün. Beşamel sos hazırlayın ve rendelenmiş kaşar peynirinin bir kısmını sosa ekleyin. Makarna ile sosu karıştırıp fırın kabına dökün. Üzerine kalan peyniri serpip 190°C fırında üzeri kızarana kadar pişirin.</p>'
            },
            {
                name: 'Zeytinyağlı Biber Dolma',
                diets: ['vegan', 'vegetarian', 'gluten-free'],
                recipe: '<h3>Tarif:</h3><p>İç harcı için pirinç, soğan, kuş üzümü, fıstık, nane ve tuzu karıştırın. Biberlerin içini doldurun ve tencereye dizin. Üzerine zeytinyağı ve sıcak su gezdirip kısık ateşte pirinçler yumuşayana kadar pişirin.</p>'
            },
            {
                name: 'Mantarlı Risotto',
                diets: ['vegetarian'],
                recipe: '<h3>Tarif:</h3><p>Arborio pirincini soğanla birlikte soteleyin. Yavaş yavaş sıcak sebze suyu ekleyerek ve sürekli karıştırarak pirinci pişirin. Ayrı bir tavada sotelediğiniz mantarları ve en son parmesan peynirini ekleyip karıştırın.</p>'
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
            },
            {
                name: 'Tavuklu Marul Dürüm (Lettuce Wraps)',
                diets: ['gluten-free'],
                recipe: '<h3>Tarif:</h3><p>Kıyılmış tavuk göğsünü soya sosu, zencefil ve sarımsak ile soteleyin. İçine doğranmış su kestanesi ve yeşil soğan ekleyin. Karışımı büyük marul yapraklarının içine doldurarak servis yapın.</p>'
            },
            {
                name: 'Bol Sebzeli Mercimek Çorbası',
                diets: ['vegan', 'vegetarian', 'gluten-free'],
                recipe: '<h3>Tarif:</h3><p>Soğan, havuç ve kerevizi doğrayıp tencerede soteleyin. Kırmızı mercimek, sebze suyu ve domates salçası ekleyip mercimekler yumuşayana kadar pişirin. Blenderdan geçirin ve üzerine nane gezdirin.</p>'
            },
            {
                name: 'Kabak Spagetti (Zoodles) ve Domates Sosu',
                diets: ['vegan', 'vegetarian', 'gluten-free'],
                recipe: '<h3>Tarif:</h3><p>Kabakları spiral doğrayıcı ile spagetti şekline getirin. Ayrı bir yerde sarımsak, domates ve fesleğen ile hafif bir sos hazırlayın. Kabakları 1-2 dakika soteleyin ve sos ile karıştırarak servis yapın.</p>'
            },
            {
                name: 'Fırında Limonlu ve Kekikli Tavuk But',
                diets: ['gluten-free'],
                recipe: '<h3>Tarif:</h3><p>Tavuk butlarının üzerine zeytinyağı, limon suyu, taze kekik, tuz ve karabiber sürün. Fırın tepsisine dizip 200°C fırında yaklaşık 35-40 dakika pişirin. Yanında bol yeşillikli bir salata ile servis edin.</p>'
            },
            {
                name: 'Ispanaklı ve Mantarlı Omlet',
                diets: ['vegetarian', 'gluten-free'],
                recipe: '<h3>Tarif:</h3><p>Bir tavada mantarları ve ıspanakları soteleyin. Ayrı bir kapta 2 yumurta (veya 4 yumurta beyazı) çırpın. Sebzelerin üzerine dökün ve kısık ateşte pişirin. Yarısı piştiğinde üzerine biraz lor peyniri serpip ikiye katlayın.</p>'
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
        
        // Eğer seçilen diyete uygun tarif bulunamazsa, kullanıcıya bir mesaj göster.
        if (filteredRecipes.length === 0) {
            showError(`Maalesef, seçtiğiniz diyet (${diet}) için bu kategoride uygun bir tarif bulunamadı. Lütfen farklı bir diyet seçin veya hedef değiştirin.`);
            return;
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
