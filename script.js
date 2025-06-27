{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 document.addEventListener('DOMContentLoaded', () => \{\
    // DOM Element References\
    const form = document.getElementById('meal-form');\
    const resultContainer = document.getElementById('result-container');\
    const resultTitle = document.getElementById('result-title');\
    const resultDescription = document.getElementById('result-description');\
    const resultList = document.getElementById('result-list');\
\
    // Listen for form submission\
    form.addEventListener('submit', (event) => \{\
        // Prevent default form behavior (page reload)\
        event.preventDefault();\
        \
        // --- Get User Inputs ---\
        const dietaryRestriction = document.getElementById('dietary-restriction').value.trim();\
        const ingredientsAvailable = document.querySelector('input[name="ingredients"]:checked');\
        const timeAvailable = document.getElementById('time-available').value;\
        const nutritionGoal = document.querySelector('input[name="goal"]:checked');\
\
        // --- Input Validation ---\
        if (!ingredientsAvailable || !timeAvailable || !nutritionGoal) \{\
            showError("Please fill out all required fields (Ingredients, Time, and Goal).");\
            // EXPECTED USER INTERACTION: If user does Z \uc0\u8594  System shows error message\
            return; \
        \}\
\
        // --- Flowchart & Logical Statement Implementation ---\
        \
        // Logical Statement 1: \'acA \uc0\u8594  S\
        // Flowchart Branch: Ingredients Available? -- No --> Generate Shopping List\
        if (ingredientsAvailable.value === 'no') \{\
            generateShoppingList(dietaryRestriction);\
            return;\
        \}\
\
        // At this point, ingredients are available (A is true)\
        const A = true;\
        const T = parseInt(timeAvailable, 10) <= 30;\
        const P = nutritionGoal.value === 'high-protein';\
        // 'C' is true if the user is NOT on a low-calorie goal.\
        const C = nutritionGoal.value !== 'low-calorie'; \
\
        if (T) \{ // Time is short (<= 30 min)\
            // Logical Statement 2: A \uc0\u8743  T \u8743  P \u8594  SH\
            // Flowchart Branch: Time <= 30? -- Yes --> High-protein goal? -- Yes --> Suggest high-protein snack\
            if (P) \{\
                suggestHighProteinSnack(dietaryRestriction);\
            \} \
            // Logical Statement 3: A \uc0\u8743  T \u8743  \'acP \u8594  SL\
            // Flowchart Branch: Time <= 30? -- Yes --> High-protein goal? -- No --> Suggest light snack\
            else \{\
                suggestLightSnack(dietaryRestriction);\
            \}\
        \} else \{ // Time is ample (> 30 min)\
            // Logical Statement 4: A \uc0\u8743  \'acT \u8743  C \u8594  M\
            // Flowchart Branch: Time <= 30? -- No --> Within calorie budget? -- Yes --> Suggest regular meal\
            if (C) \{\
                suggestRegularMeal(dietaryRestriction);\
            \}\
            // Logical Statement 5: A \uc0\u8743  \'acT \u8743  \'acC \u8594  L\
            // Flowchart Branch: Time <= 30? -- No --> Within calorie budget? -- No --> Suggest low-calorie recipe\
            else \{\
                suggestLowCalorieMeal(dietaryRestriction);\
            \}\
        \}\
    \});\
\
    /**\
     * Displays a suggestion in the result container.\
     * @param \{string\} title - The title of the suggestion.\
     * @param \{string\} description - The descriptive text.\
     * @param \{string[]\} listItems - Optional list of items (for shopping list).\
     * @param \{string\} type - 'success', 'error', or 'info'.\
     */\
    function showResult(title, description, listItems = [], type = 'success') \{\
        resultContainer.className = ''; // Reset classes\
        resultContainer.classList.add(type);\
\
        resultTitle.textContent = title;\
        resultDescription.textContent = description;\
        \
        // Clear previous list items\
        resultList.innerHTML = '';\
        if (listItems.length > 0) \{\
            listItems.forEach(item => \{\
                const li = document.createElement('li');\
                li.textContent = item;\
                resultList.appendChild(li);\
            \});\
        \}\
        \
        // Visual Feedback: Show the hidden result container\
        resultContainer.classList.remove('hidden');\
    \}\
\
    /**\
     * Displays an error message.\
     * @param \{string\} message - The error message to display.\
     */\
    function showError(message) \{\
        showResult('Error', message, [], 'error');\
    \}\
\
    // --- Suggestion Functions Aligned with Flowchart ---\
\
    function generateShoppingList(diet) \{\
        const dietPrefix = diet ? `$\{diet\} ` : '';\
        showResult(\
            'Generate Shopping List',\
            `You don't have the ingredients. Here is a sample shopping list for a simple $\{dietPrefix\}meal:`,\
            [`$\{dietPrefix\}Pasta`, 'Cherry Tomatoes', 'Basil', 'Garlic', 'Olive Oil'],\
            'info'\
        );\
    \}\
\
    function suggestHighProteinSnack(diet) \{\
        const dietPrefix = diet ? `($\{diet\}) ` : '';\
        showResult(\
            'High-Protein Snack Suggestion',\
            `With limited time, a high-protein snack is a great choice. Try this $\{dietPrefix\}option:`,\
            ['Yogurt Parfait with Nuts & Berries', 'A handful of Almonds', 'Falafel with Hummus']\
        );\
    \}\
\
    function suggestLightSnack(diet) \{\
        const dietPrefix = diet ? `($\{diet\}) ` : '';\
        showResult(\
            'Light Snack Suggestion',\
            `You have a short amount of time, so here is a quick and light $\{dietPrefix\}snack idea:`,\
            ['Avocado Toast', 'Apple Slices with Peanut Butter', 'Rice Cakes with Cottage Cheese']\
        );\
    \}\
\
    function suggestRegularMeal(diet) \{\
        const dietPrefix = diet ? `($\{diet\}) ` : '';\
        showResult(\
            'Regular Meal Recipe',\
            `You have enough time and no strict calorie limits. Here is a satisfying $\{dietPrefix\}meal:`,\
            ['Fried Chicken and Veggies', 'Beef Stir-fry with Rice', 'Classic Lasagna']\
        );\
    \}\
    \
    function suggestLowCalorieMeal(diet) \{\
        const dietPrefix = diet ? `($\{diet\}) ` : '';\
        showResult(\
            'Low-Calorie Recipe',\
            `Since you're mindful of calories, here is a healthy and delicious $\{dietPrefix\}meal suggestion:`,\
            ['Grilled Zucchini Salad with Lemon-Herb Vinaigrette', 'Baked Salmon with Asparagus', 'Quinoa Bowl with Roasted Vegetables']\
        );\
    \}\
\});}