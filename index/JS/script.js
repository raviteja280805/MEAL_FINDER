// ========================================
// HTML ELEMENTS
// ========================================

const categoriesContainer =
    document.getElementById("categories");

const mealsContainer =
    document.getElementById("meals");

const mealsSection =
    document.getElementById("mealsSection");

const categoriesSection =
    document.getElementById("categoriesSection");

const mealDetailsSection =
    document.getElementById("mealDetailsSection");

const mealDetails =
    document.getElementById("mealDetails");

const mealsTitle =
    document.getElementById("mealsTitle");

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");

const menuButton =
    document.getElementById("menuButton");

const closeMenu =
    document.getElementById("closeMenu");

const sideMenu =
    document.getElementById("sideMenu");

const menuCategories =
    document.getElementById("menuCategories");

const categoryInfoSection = document.getElementById("categoryInfoSection");

const categoryInfo = document.getElementById("categoryInfo");


// ========================================
// API URL
// ========================================

const categoriesAPI =
    "https://www.themealdb.com/api/json/v1/1/categories.php";


// ========================================
// LOAD CATEGORIES
// ========================================

fetch(categoriesAPI)

    .then(response => response.json())

    .then(data => {

        displayCategories(data.categories);

        displayMenuCategories(data.categories);

    })

    .catch(error => {

        console.error("Category error:", error);

    });


// ========================================
// DISPLAY CATEGORY CARDS
// ========================================

function displayCategories(categories) {

    categoriesContainer.innerHTML = "";

    categories.forEach(category => {

        const categoryCard =
            document.createElement("div");

        categoryCard.classList.add("category-card");

        categoryCard.innerHTML = `

            <img
                src="${category.strCategoryThumb}"
                alt="${category.strCategory}"
            >

            <span class="category-name">
                ${category.strCategory}
            </span>

        `;

        // When category card is clicked
        categoryCard.addEventListener("click", () => {

            getMealsByCategory(category.strCategory);

        });

        categoriesContainer.appendChild(categoryCard);

    });

}


// ========================================
// DISPLAY MENU CATEGORIES
// ========================================

function displayMenuCategories(categories) {

    menuCategories.innerHTML = "";

    categories.forEach(category => {

        const menuItem =
            document.createElement("div");

        menuItem.classList.add("menu-category");

        menuItem.textContent =
            category.strCategory;

        menuItem.addEventListener("click", () => {

            getMealsByCategory(category.strCategory);

            sideMenu.classList.remove("open");

        });

        menuCategories.appendChild(menuItem);

    });

}


// ========================================
// FILTER MEALS BY CATEGORY
// ========================================

function getMealsByCategory(category) {

    const url =
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

    fetch(url)

        .then(response => response.json())

        .then(data => {

            mealsTitle.textContent =
                category.toUpperCase();

            displayMeals(data.meals);

            showMealsSection();

        })

        .catch(error => {

            console.error("Category meals error:", error);

        });

}


// ========================================
// DISPLAY MEALS
// ========================================

function displayMeals(meals) {

    mealsContainer.innerHTML = "";

    if (!meals) {

        mealsContainer.innerHTML =
            "<p>No meals found.</p>";

        return;

    }

    meals.forEach(meal => {

        const mealCard =
            document.createElement("div");

        mealCard.classList.add("meal-card");

        mealCard.innerHTML = `

            <img
                src="${meal.strMealThumb}"
                alt="${meal.strMeal}"
            >

            <div class="meal-card-content">

                <h3>
                    ${meal.strMeal}
                </h3>

            </div>

        `;

        // Click meal → get full details
        mealCard.addEventListener("click", () => {

            getMealDetails(meal.idMeal);

        });

        mealsContainer.appendChild(mealCard);

    });

}


// ========================================
// SEARCH MEALS
// ========================================

function searchMeals() {

    const foodName =
        searchInput.value.trim();

    if (foodName === "") {

    showLandingPage();

    return;

}

function showLandingPage() {

    // Hide search results
    mealsSection.style.display = "none";

    // Hide meal details
    mealDetailsSection.style.display = "none";

    // Show categories
    categoriesSection.style.display = "block";

    // Scroll back to the top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}
    const url =
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;

    fetch(url)

        .then(response => response.json())

        .then(data => {

            mealsTitle.textContent =
                `SEARCH RESULTS FOR "${foodName.toUpperCase()}"`;

            displayMeals(data.meals);

            showMealsSection();

        })

        .catch(error => {

            console.error("Search error:", error);

        });

}


// ========================================
// SEARCH BUTTON
// ========================================

searchBtn.addEventListener("click", () => {

    searchMeals();

});


// ========================================
// SEARCH USING ENTER KEY
// ========================================

searchInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        searchMeals();

    }

});


// ========================================
// GET MEAL DETAILS
// ========================================

function getMealDetails(mealId) {

    const url =
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    fetch(url)

        .then(response => response.json())

        .then(data => {

            const meal =
                data.meals[0];

            displayMealDetails(meal);

        })

        .catch(error => {

            console.error("Meal details error:", error);

        });

}


// ========================================
// DISPLAY MEAL DETAILS
// ========================================

function displayMealDetails(meal) {

    mealDetails.innerHTML = `

        <div class="meal-details">

            <div class="meal-details-top">

                <div>

                    <img
                        class="meal-details-image"
                        src="${meal.strMealThumb}"
                        alt="${meal.strMeal}"
                    >

                </div>


                <div class="meal-info">

                    <h2>
                        ${meal.strMeal}
                    </h2>

                    <p>
                        <strong>Category:</strong>
                        ${meal.strCategory}
                    </p>

                    <p>
                        <strong>Area:</strong>
                        ${meal.strArea}
                    </p>

                    <p>
                        <strong>Tags:</strong>
                        ${meal.strTags || "No tags"}
                    </p>


                    <div class="ingredients">

                        <h3>Ingredients</h3>

                        <div class="ingredients-list">

                            ${getIngredients(meal)}

                        </div>

                    </div>

                </div>

            </div>


            <div class="instructions">

                <h3>Instructions</h3>

                <p>
                    ${meal.strInstructions}
                </p>

            </div>

        </div>

    `;

    mealDetailsSection.style.display = "block";

    mealDetailsSection.scrollIntoView({
        behavior: "smooth"
    });

}


// ========================================
// GET INGREDIENTS
// ========================================

function getIngredients(meal) {

    let ingredientsHTML = "";

    for (let i = 1; i <= 20; i++) {

        const ingredient =
            meal[`strIngredient${i}`];

        const measure =
            meal[`strMeasure${i}`];

        if (
            ingredient &&
            ingredient.trim() !== ""
        ) {

            ingredientsHTML += `

                <div>
                    ${ingredient}
                    - ${measure || ""}
                </div>

            `;

        }

    }

    return ingredientsHTML;

}


// ========================================
// SHOW MEALS SECTION
// ========================================

function showMealsSection() {

    mealsSection.style.display = "block";

    mealsSection.scrollIntoView({
        behavior: "smooth"
    });

}


// ========================================
// HAMBURGER OPEN
// ========================================

menuButton.addEventListener("click", () => {

    sideMenu.classList.add("open");

});


// ========================================
// HAMBURGER CLOSE
// ========================================

closeMenu.addEventListener("click", () => {

    sideMenu.classList.remove("open");

});

mealsSection.style.display = "none";
mealDetailsSection.style.display = "none";