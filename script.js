{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // Smart Meal Planner JavaScript\
\
// Initialize Lucide icons\
lucide.createIcons();\
\
// DOM Elements\
const form = document.getElementById('mealPlannerForm');\
const loadingSection = document.getElementById('loadingSection');\
const suggestionSection = document.getElementById('suggestionSection');\
const suggestionContent = document.getElementById('suggestionContent');\
const calorieBudgetSection = document.getElementById('calorieBudgetSection');\
const timeInput = document.getElementById('timeInput');\
const ingredientsRadios = document.querySelectorAll('input[name="ingredientsAvailable"]');\
const planButton = document.getElementById('planButton');\
const recentMealsGrid = document.getElementById('recentMealsGrid');\
const messageModal = document.getElementById('messageModal');\
const modalTitle = document.getElementById('modalTitle');\
const modalMessage = document.getElementById('modalMessage');\
const modalCloseBtn = document.getElementById('modalCloseBtn');\
\
// API Base URL\
const API_BASE = '';\
\
// Sample meals data (fallback for recent meals)\
const sampleMeals = [\
    \{\
        id: 1,\
        name: "Mediterranean Bowl",\
        cookingTime: 25,\
        imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",\
        lastMade: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()\
    \},\
    \{\
        id: 2,\
        name: "Protein Smoothie",\
        cookingTime: 5,\
        imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",\
        lastMade: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()\
    \},\
    \{\
        id: 3,\
        name: "Avocado Toast",\
        cookingTime: 10,\
        imageUrl: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",\
        lastMade: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000).toISOString()\
    \}\
];\
\
// Utility Functions\
function formatTime(minutes) \{\
    if (minutes < 60) \{\
        return `$\{minutes\} min`;\
    \} else \{\
        const hours = Math.floor(minutes / 60);\
        const remainingMinutes = minutes % 60;\
        if (remainingMinutes === 0) \{\
            return `$\{hours\}h`;\
        \}\
        return `$\{hours\}h $\{remainingMinutes\}m`;\
    \}\
\}\
\
function formatCalories(calories) \{\
    return `$\{calories\} cal`;\
\}\
\
function formatProtein(protein) \{\
    return `$\{protein\}g protein`;\
\}\
\
function getDifficultyColor(difficulty) \{\
    switch (difficulty.toLowerCase()) \{\
        case 'easy':\
            return 'background: #dcfce7; color: #16a34a;';\
        case 'medium':\
            return 'background: #fef3c7; color: #ca8a04;';\
        case 'hard':\
            return 'background: #fee2e2; color: #dc2626;';\
        default:\
            return 'background: #f3f4f6; color: #6b7280;';\
    \}\
\}\
\
function getCategoryEmoji(category) \{\
    switch (category.toLowerCase()) \{\
        case 'breakfast':\
            return '\uc0\u55356 \u57203 ';\
        case 'lunch':\
            return '\uc0\u55358 \u56663 ';\
        case 'dinner':\
            return '\uc0\u55356 \u57213 \u65039 ';\
        case 'snack':\
            return '\uc0\u55356 \u57166 ';\
        default:\
            return '\uc0\u55356 \u57213 \u65039 ';\
    \}\
\}\
\
// Show/Hide Modal\
function showModal(title, message) \{\
    modalTitle.textContent = title;\
    modalMessage.textContent = message;\
    messageModal.classList.add('active');\
\}\
\
function hideModal() \{\
    messageModal.classList.remove('active');\
\}\
\
// Update calorie budget visibility\
function updateCalorieBudgetVisibility() \{\
    const ingredientsAvailable = document.querySelector('input[name="ingredientsAvailable"]:checked').value === 'true';\
    const timeValue = parseInt(timeInput.value) || 0;\
    \
    if (ingredientsAvailable && timeValue > 30) \{\
        calorieBudgetSection.style.display = 'block';\
        calorieBudgetSection.classList.add('slide-in-up');\
    \} else \{\
        calorieBudgetSection.style.display = 'none';\
        // Reset to default value when hidden\
        document.querySelector('input[name="calorieBudget"][value="full"]').checked = true;\
    \}\
\}\
\
// Create meal suggestion card\
function createMealSuggestionCard(meal) \{\
    return `\
        <div class="meal-suggestion-card fade-in">\
            <div class="meal-image">\
                <img src="$\{meal.imageUrl || 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400'\}" \
                     alt="$\{meal.name\}" \
                     onerror="this.src='https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400'">\
                <div class="meal-overlay"></div>\
                <div class="meal-tags">\
                    <span class="meal-tag">$\{formatTime(meal.cookingTime)\}</span>\
                    <span class="meal-tag" style="$\{getDifficultyColor(meal.difficulty)\}">$\{meal.difficulty\}</span>\
                    <span class="meal-tag">$\{meal.servings || 1\} servings</span>\
                </div>\
            </div>\
            <div class="meal-content">\
                <h3 class="meal-title">$\{getCategoryEmoji(meal.category)\} $\{meal.name\}</h3>\
                <p class="meal-description">$\{meal.description\}</p>\
                <div class="meal-stats">\
                    <div class="meal-stat">\
                        <i data-lucide="clock"></i>\
                        <span>$\{formatTime(meal.cookingTime)\}</span>\
                    </div>\
                    <div class="meal-stat">\
                        <i data-lucide="zap"></i>\
                        <span>$\{formatCalories(meal.calories)\}</span>\
                    </div>\
                    <div class="meal-stat">\
                        <i data-lucide="target"></i>\
                        <span>$\{formatProtein(meal.protein)\}</span>\
                    </div>\
                </div>\
                <div class="meal-actions">\
                    <button class="meal-btn meal-btn-primary" onclick="viewRecipe($\{meal.id\})">\
                        <i data-lucide="book-open"></i>\
                        View Recipe\
                    </button>\
                    <button class="meal-btn meal-btn-secondary" onclick="startCooking($\{meal.id\})">\
                        <i data-lucide="play"></i>\
                        Start Cooking\
                    </button>\
                </div>\
            </div>\
        </div>\
    `;\
\}\
\
// Create shopping list card\
function createShoppingListCard(message, items) \{\
    const itemsHtml = items.map(item => `\
        <div class="shopping-item">\
            <i data-lucide="package"></i>\
            <span>$\{item\}</span>\
        </div>\
    `).join('');\
\
    return `\
        <div class="shopping-list-card fade-in">\
            <div class="shopping-header">\
                <i data-lucide="shopping-cart" class="shopping-icon"></i>\
            </div>\
            <div class="shopping-content">\
                <h3 class="shopping-title">Shopping List</h3>\
                <p class="shopping-description">$\{message\}</p>\
                <div class="shopping-items">\
                    $\{itemsHtml\}\
                </div>\
                <button class="shopping-btn" onclick="goShopping()">\
                    <i data-lucide="shopping-cart"></i>\
                    Go Shopping\
                </button>\
            </div>\
        </div>\
    `;\
\}\
\
// Create no match card\
function createNoMatchCard(message) \{\
    return `\
        <div class="meal-suggestion-card fade-in">\
            <div class="meal-image" style="background: linear-gradient(45deg, #6b7280, #4b5563);">\
                <div class="meal-overlay"></div>\
                <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 1;">\
                    <i data-lucide="search-x" style="width: 4rem; height: 4rem; color: white;"></i>\
                </div>\
            </div>\
            <div class="meal-content">\
                <h3 class="meal-title">No Matches Found</h3>\
                <p class="meal-description">$\{message\}</p>\
                <div class="meal-actions">\
                    <button class="meal-btn meal-btn-primary" onclick="resetForm()">\
                        <i data-lucide="rotate-ccw"></i>\
                        Try Again\
                    </button>\
                </div>\
            </div>\
        </div>\
    `;\
\}\
\
// Load recent meals\
async function loadRecentMeals() \{\
    try \{\
        const response = await fetch(`$\{API_BASE\}/api/meals/recent`);\
        if (response.ok) \{\
            const meals = await response.json();\
            displayRecentMeals(meals);\
        \} else \{\
            // Use sample data as fallback\
            displayRecentMeals(sampleMeals);\
        \}\
    \} catch (error) \{\
        console.log('Using sample data for recent meals');\
        displayRecentMeals(sampleMeals);\
    \}\
\}\
\
// Display recent meals\
function displayRecentMeals(meals) \{\
    const mealsHtml = meals.map(meal => `\
        <div class="recent-card" onclick="selectRecentMeal($\{meal.id\})">\
            <div class="recent-image">\
                <img src="$\{meal.imageUrl\}" alt="$\{meal.name\}" \
                     onerror="this.src='https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200'">\
            </div>\
            <div class="recent-info">\
                <h4 class="recent-name">$\{meal.name\}</h4>\
                <p class="recent-date">$\{new Date(meal.lastMade).toLocaleDateString()\}</p>\
                <div class="recent-footer">\
                    <span class="recent-time">$\{formatTime(meal.cookingTime)\}</span>\
                    <button class="recent-action" onclick="event.stopPropagation(); repeatMeal($\{meal.id\})">\
                        <i data-lucide="rotate-cw"></i>\
                    </button>\
                </div>\
            </div>\
        </div>\
    `).join('');\
    \
    recentMealsGrid.innerHTML = mealsHtml;\
    lucide.createIcons();\
\}\
\
// Handle form submission\
async function handleFormSubmit(event) \{\
    event.preventDefault();\
    \
    // Get form data\
    const formData = new FormData(form);\
    const dietaryRestrictions = Array.from(formData.getAll('dietaryRestrictions'));\
    const ingredientsAvailable = formData.get('ingredientsAvailable') === 'true';\
    const timeAvailable = parseInt(formData.get('timeAvailable'));\
    const nutritionGoal = formData.get('nutritionGoal') || 'balanced';\
    const calorieBudget = formData.get('calorieBudget') || 'full';\
\
    // Validate time input\
    if (!timeAvailable || timeAvailable <= 0) \{\
        showModal('Input Error', 'Please enter a valid time in minutes (a positive number).');\
        return;\
    \}\
\
    // Prepare request data\
    const requestData = \{\
        dietaryRestrictions,\
        ingredientsAvailable,\
        timeAvailable,\
        nutritionGoal,\
        calorieBudget\
    \};\
\
    // Show loading state\
    suggestionSection.style.display = 'none';\
    loadingSection.style.display = 'block';\
    planButton.disabled = true;\
\
    try \{\
        const response = await fetch(`$\{API_BASE\}/api/meals/suggest`, \{\
            method: 'POST',\
            headers: \{\
                'Content-Type': 'application/json',\
            \},\
            body: JSON.stringify(requestData)\
        \});\
\
        if (!response.ok) \{\
            throw new Error('Failed to get meal suggestion');\
        \}\
\
        const data = await response.json();\
        displaySuggestion(data);\
\
    \} catch (error) \{\
        console.error('Error:', error);\
        showModal('Error', 'Failed to generate meal suggestion. Please try again.');\
    \} finally \{\
        loadingSection.style.display = 'none';\
        planButton.disabled = false;\
    \}\
\}\
\
// Display suggestion based on response type\
function displaySuggestion(data) \{\
    let html = '';\
    \
    switch (data.type) \{\
        case 'meal_suggestion':\
            html = createMealSuggestionCard(data.meal);\
            break;\
        case 'shopping_list':\
            html = createShoppingListCard(data.message, data.items);\
            break;\
        case 'no_match':\
            html = createNoMatchCard(data.message);\
            break;\
    \}\
    \
    suggestionContent.innerHTML = html;\
    suggestionSection.style.display = 'block';\
    suggestionSection.scrollIntoView(\{ behavior: 'smooth' \});\
    lucide.createIcons();\
\}\
\
// Action handlers\
function viewRecipe(mealId) \{\
    showModal('Recipe Details', `Recipe details for meal ID $\{mealId\} would be displayed here.`);\
\}\
\
function startCooking(mealId) \{\
    showModal('Start Cooking', `Cooking mode for meal ID $\{mealId\} would start here with step-by-step instructions.`);\
\}\
\
function goShopping() \{\
    showModal('Shopping List', 'Your shopping list would be exported or shared here.');\
\}\
\
function selectRecentMeal(mealId) \{\
    showModal('Recent Meal', `Details for recent meal ID $\{mealId\} would be displayed here.`);\
\}\
\
function repeatMeal(mealId) \{\
    showModal('Repeat Meal', `Meal ID $\{mealId\} has been added to your cooking queue.`);\
\}\
\
function resetForm() \{\
    form.reset();\
    suggestionSection.style.display = 'none';\
    updateCalorieBudgetVisibility();\
    document.querySelector('input[name="nutritionGoal"][value="balanced"]').checked = true;\
    document.querySelector('input[name="ingredientsAvailable"][value="true"]').checked = true;\
\}\
\
// Quick action handlers\
function handleQuickAction(action) \{\
    resetForm();\
    \
    switch (action) \{\
        case 'quick-meal':\
            timeInput.value = '15';\
            document.querySelector('input[name="nutritionGoal"][value="balanced"]').checked = true;\
            break;\
        case 'healthy':\
            document.querySelector('input[name="nutritionGoal"][value="low-calorie"]').checked = true;\
            break;\
        case 'favorites':\
            showModal('Favorites', 'Your favorite meals would be displayed here.');\
            return;\
    \}\
    \
    updateCalorieBudgetVisibility();\
    form.scrollIntoView(\{ behavior: 'smooth' \});\
\}\
\
// Event Listeners\
form.addEventListener('submit', handleFormSubmit);\
timeInput.addEventListener('input', updateCalorieBudgetVisibility);\
ingredientsRadios.forEach(radio => \{\
    radio.addEventListener('change', updateCalorieBudgetVisibility);\
\});\
\
modalCloseBtn.addEventListener('click', hideModal);\
messageModal.addEventListener('click', (e) => \{\
    if (e.target === messageModal) \{\
        hideModal();\
    \}\
\});\
\
// Quick action event listeners\
document.querySelectorAll('.quick-btn').forEach(btn => \{\
    btn.addEventListener('click', () => \{\
        const action = btn.getAttribute('data-action');\
        handleQuickAction(action);\
    \});\
\});\
\
// Navigation event listeners\
document.querySelectorAll('.nav-item').forEach(item => \{\
    item.addEventListener('click', () => \{\
        // Remove active class from all nav items\
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));\
        // Add active class to clicked item\
        item.classList.add('active');\
    \});\
\});\
\
// Initialize app\
document.addEventListener('DOMContentLoaded', () => \{\
    updateCalorieBudgetVisibility();\
    loadRecentMeals();\
    \
    // Add animation classes to form groups\
    document.querySelectorAll('.form-group').forEach((group, index) => \{\
        setTimeout(() => \{\
            group.classList.add('slide-in-up');\
        \}, index * 100);\
    \});\
\});\
\
// Keyboard shortcuts\
document.addEventListener('keydown', (e) => \{\
    if (e.key === 'Escape') \{\
        hideModal();\
    \}\
    if (e.key === 'Enter' && e.ctrlKey) \{\
        form.dispatchEvent(new Event('submit'));\
    \}\
\});\
\
// Touch/swipe support for mobile\
let touchStartX = 0;\
let touchEndX = 0;\
\
document.addEventListener('touchstart', (e) => \{\
    touchStartX = e.changedTouches[0].screenX;\
\});\
\
document.addEventListener('touchend', (e) => \{\
    touchEndX = e.changedTouches[0].screenX;\
    handleSwipe();\
\});\
\
function handleSwipe() \{\
    const swipeThreshold = 50;\
    const diff = touchStartX - touchEndX;\
    \
    if (Math.abs(diff) > swipeThreshold) \{\
        if (diff > 0) \{\
            // Swipe left - could implement navigation\
            console.log('Swiped left');\
        \} else \{\
            // Swipe right - could implement navigation\
            console.log('Swiped right');\
        \}\
    \}\
\}\
\
// Performance optimization: Lazy load images\
function lazyLoadImages() \{\
    const images = document.querySelectorAll('img[data-src]');\
    const imageObserver = new IntersectionObserver((entries, observer) => \{\
        entries.forEach(entry => \{\
            if (entry.isIntersecting) \{\
                const img = entry.target;\
                img.src = img.dataset.src;\
                img.classList.remove('lazy');\
                imageObserver.unobserve(img);\
            \}\
        \});\
    \});\
\
    images.forEach(img => imageObserver.observe(img));\
\}\
\
// Call lazy loading when DOM is ready\
if (document.readyState === 'loading') \{\
    document.addEventListener('DOMContentLoaded', lazyLoadImages);\
\} else \{\
    lazyLoadImages();\
\}\
\
// Service Worker registration for PWA capabilities (optional)\
if ('serviceWorker' in navigator) \{\
    window.addEventListener('load', () => \{\
        navigator.serviceWorker.register('/sw.js')\
            .then(registration => \{\
                console.log('SW registered: ', registration);\
            \})\
            .catch(registrationError => \{\
                console.log('SW registration failed: ', registrationError);\
            \});\
    \});\
\}}