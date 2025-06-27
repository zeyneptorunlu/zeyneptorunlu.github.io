document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('meal-form');
    const resultContainer = document.getElementById('result-container');
    const resultTitle = document.getElementById('result-title');
    const resultDescription = document.getElementById('result-description');
    const resultList = document.getElementById('result-list');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const dietaryRestriction = document.getElementById('dietary-restriction').value.trim();
        const ingredientsAvailable = document.querySelector('input[name="ingredients"]:checked');
        const timeAvailable = document.getElementById('time-available').value;
        const nutritionGoal = document.querySelector('input[name="goal"]:checked');

        if (!ingredientsAvailable || !timeAvailable || !nutritionGoal) {
            showError("Please fill out all required fields (Ingredients, Time, and Goal).");
            return; 
        }

        if (ingredientsAvailable.value === 'no') {
            generateShoppingList(dietaryRestriction);
            return;
        }

        const A = true;
        const T = parseInt(timeAvailable, 10) <= 30;
        const P = nutritionGoal.value === 'high-protein';
        const C = nutritionGoal.value !== 'low-calorie'; 

        if (T) { 
            if (P) {
                suggestHighProteinSnack(dietaryRestriction);
            } 
            else {
                suggestLightSnack(dietaryRestriction);
            }
        } else {
            if (C) {
                suggestRegularMeal(dietaryRestriction);
            }
            else {
                suggestLowCalorieMeal(dietaryRestriction);
            }
        }
    });

    function showResult(title, description, listItems = [], type = 'success') {
        resultContainer.className = '';
        resultContainer.classList.add(type);

        resultTitle.textContent = title;
        resultDescription.textContent = description;
        
        resultList.innerHTML = '';
        if (listItems.length > 0) {
            listItems.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                resultList.appendChild(li);
            });
        }
        
        resultContainer.classList.remove('hidden');
    }

    function showError(message) {
        showResult('Error', message, [], 'error');
    }

    function generateShoppingList(diet) {
        const dietPrefix = diet ? `${diet} ` : '';
        showResult(
            'Generate Shopping List',
            `You don't have the ingredients. Here is a sample shopping list for a simple ${dietPrefix}meal:`,
            [`${dietPrefix}Pasta`, 'Cherry Tomatoes', 'Basil', 'Garlic', 'Olive Oil'],
            'info'
        );
    }

    function suggestHighProteinSnack(diet) {
        const dietPrefix = diet ? `(${diet}) ` : '';
        showResult(
            'High-Protein Snack Suggestion',
            `With limited time, a high-protein snack is a great choice. Try this ${dietPrefix}option:`,
            ['Yogurt Parfait with Nuts & Berries', 'A handful of Almonds', 'Falafel with Hummus']
        );
    }

    function suggestLightSnack(diet) {
        const dietPrefix = diet ? `(${diet}) ` : '';
        showResult(
            'Light Snack Suggestion',
            `You have a short amount of time, so here is a quick and light ${dietPrefix}snack idea:`,
            ['Avocado Toast', 'Apple Slices with Peanut Butter', 'Rice Cakes with Cottage Cheese']
        );
    }

    function suggestRegularMeal(diet) {
        const dietPrefix = diet ? `(${diet}) ` : '';
        showResult(
            'Regular Meal Recipe',
            `You have enough time and no strict calorie limits. Here is a satisfying ${dietPrefix}meal:`,
            ['Fried Chicken and Veggies', 'Beef Stir-fry with Rice', 'Classic Lasagna']
        );
    }
    
    function suggestLowCalorieMeal(diet) {
        const dietPrefix = diet ? `(${diet}) ` : '';
        showResult(
            'Low-Calorie Recipe',
            `Since you're mindful of calories, here is a healthy and delicious ${dietPrefix}meal suggestion:`,
            ['Grilled Zucchini Salad with Lemon-Herb Vinaigrette', 'Baked Salmon with Asparagus', 'Quinoa Bowl with Roasted Vegetables']
        );
    }
});
