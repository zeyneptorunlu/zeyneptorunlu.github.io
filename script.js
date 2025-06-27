{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // script.js\
document.addEventListener('DOMContentLoaded', () => \{\
  const form = document.getElementById('planner-form');\
  const timeInput = document.getElementById('time-input');\
  const radios = Array.from(form.elements['restriction']);\
  const submitBtn = document.getElementById('get-recommendation');\
  const spinner = document.getElementById('spinner');\
  const resultContainer = document.getElementById('result-container');\
  const suggestionEl = document.getElementById('suggestion');\
  const shoppingListEl = document.getElementById('shopping-list');\
\
  // Enable submit only when time is valid\
  timeInput.addEventListener('input', () => \{\
    const val = parseInt(timeInput.value, 10);\
    submitBtn.disabled = !(Number.isInteger(val) && val > 0);\
  \});\
\
  form.addEventListener('submit', async e => \{\
    e.preventDefault();\
    resultContainer.classList.add('hidden');\
    spinner.classList.remove('hidden');\
\
    const time = parseInt(timeInput.value, 10);\
    const restriction = radios.find(r => r.checked)?.value || 'None';\
\
    // Fake delay for UX\
    await new Promise(res => setTimeout(res, 300));\
\
    const \{ meal, items \} = getPlan(time, restriction);\
    suggestionEl.textContent = meal;\
    shoppingListEl.innerHTML = '';\
    items.forEach(i => \{\
      const li = document.createElement('li');\
      li.textContent = i;\
      shoppingListEl.append(li);\
    \});\
\
    spinner.classList.add('hidden');\
    resultContainer.classList.remove('hidden');\
  \});\
\
  function getPlan(minutes, restriction) \{\
    // Simple example logic\
    if (minutes < 15) \{\
      return \{\
        meal: 'Grab a quick fruit & yogurt snack',\
        items: ['Yogurt', 'Mixed berries', `$\{restriction\} granola`]\
      \};\
    \} else if (minutes < 30) \{\
      return \{\
        meal: `Make a $\{restriction.toLowerCase()\} wrap`,\
        items: [\
          'Tortilla wraps',\
          'Lettuce',\
          'Tomato',\
          `$\{restriction\} protein (e.g. falafel or canned tuna)`,\
          'Hummus'\
        ]\
      \};\
    \} else \{\
      return \{\
        meal: `Cook a $\{restriction.toLowerCase()\} stir-fry`,\
        items: [\
          'Rice or noodles',\
          'Mixed veggies',\
          `$\{restriction\} protein`,\
          'Soy sauce',\
          'Garlic & ginger'\
        ]\
      \};\
    \}\
  \}\
\});}