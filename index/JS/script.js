// ===============================
// API
// ===============================

const categoriesAPI =
    "https://www.themealdb.com/api/json/v1/1/categories.php";

const categoryMealsAPI =
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

const searchAPI =
    "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const mealDetailsAPI =
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";


// ===============================
// HTML ELEMENTS
// ===============================

const categoriesContainer = document.getElementById("categories");
const mealsContainer = document.getElementById("meals");

const categoryInfoSection =
    document.getElementById("categoryInfoSection");

const categoryInfo =
    document.getElementById("categoryInfo");

const mealsSection =
    document.getElementById("mealsSection");

const mealDetailsSection =
    document.getElementById("mealDetailsSection");

const categoriesSection =
    document.getElementById("categoriesSection");

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


// ===============================
// STORE CATEGORIES
// ===============================

let allCategories = [];


// ===============================
// INITIAL PAGE
// ===============================

categoryInfoSection.style.display = "none";
mealsSection.style.display = "none";
mealDetailsSection.style.display = "none";
categoriesSection.style.display = "block";


// ===============================
// LOAD CATEGORIES
// ===============================

fetch(categoriesAPI)
    .then(response => response.json())
    .then(data => {

        allCategories = data.categories;

        displayCategories(allCategories);
        displayMenuCategories(allCategories);

    })
    .catch(error => {
        console.error("Category error:", error);
    });


// ===============================
// DISPLAY CATEGORY CARDS
// ===============================

function displayCategories(categories) {

    categoriesContainer.innerHTML = "";

    categories.forEach(category => {

        const categoryCard = document.createElement("div");

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

        categoryCard.addEventListener("click", () => {

            getMealsByCategory(category.strCategory);

        });

        categoriesContainer.appendChild(categoryCard);

    });
}


// ===============================
// DISPLAY HAMBURGER CATEGORIES
// ===============================

function displayMenuCategories(categories) {

    menuCategories.innerHTML = "";

    categories.forEach(category => {

        const menuItem = document.createElement("div");

        menuItem.classList.add("menu-category");

        menuItem.textContent = category.strCategory;

        menuItem.addEventListener("click", () => {

            getMealsByCategory(category.strCategory);

            sideMenu.classList.remove("open");

        });

        menuCategories.appendChild(menuItem);

    });
}


// ===============================
// GET MEALS BY CATEGORY
// ===============================

function getMealsByCategory(categoryName) {

    const selectedCategory = allCategories.find(
        category =>
            category.strCategory.toLowerCase() ===
            categoryName.toLowerCase()
    );

    if (selectedCategory) {

        displayCategoryInfo(selectedCategory);

    }

    const url =
        categoryMealsAPI +
        encodeURIComponent(categoryName);

    fetch(url)
        .then(response => response.json())
        .then(data => {

            mealsTitle.textContent = "MEALS";

            displayMeals(data.meals);

            showCategoryPage();

        })
        .catch(error => {

            console.error(
                "Category meals error:",
                error
            );

        });
}


// ===============================
// DISPLAY CATEGORY INFORMATION
// ===============================

function displayCategoryInfo(category) {

    categoryInfo.innerHTML = `
        <div class="category-info">

            <h2>${category.strCategory}</h2>

            <p>
                ${category.strCategoryDescription}
            </p>

        </div>
    `;
}


// ===============================
// DISPLAY MEALS
// ===============================

function displayMeals(meals) {

    mealsContainer.innerHTML = "";

    if (!meals) {

        mealsContainer.innerHTML = `
            <p class="no-results">
                No meals found.
            </p>
        `;

        return;
    }

    meals.forEach(function (meal) {

        const mealCard = document.createElement("div");

        mealCard.classList.add("meal-card");

        mealCard.innerHTML = `
            <img
                src="${meal.strMealThumb}"
                alt="${meal.strMeal}"
            >

            <div class="meal-card-content">
                <h3>${meal.strMeal}</h3>
            </div>
        `;

        mealCard.addEventListener("click", function () {

            console.log("Meal clicked:", meal.strMeal);
            console.log("Meal ID:", meal.idMeal);

            getMealDetails(meal.idMeal);

        });

        mealsContainer.appendChild(mealCard);

    });
}


// ===============================
// SEARCH MEALS
// ===============================

function searchMeals() {

    const foodName =
        searchInput.value.trim();

    // Empty search
    if (foodName === "") {

        showLandingPage();

        return;
    }

    const url =
        searchAPI +
        encodeURIComponent(foodName);

    fetch(url)
        .then(response => response.json())
        .then(data => {

            categoryInfoSection.style.display = "none";

            mealDetailsSection.style.display = "none";

            mealsSection.style.display = "block";

            categoriesSection.style.display = "block";

            mealsTitle.textContent =
                `SEARCH RESULTS FOR "${foodName.toUpperCase()}"`;

            displayMeals(data.meals);

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        })
        .catch(error => {

            console.error(
                "Search error:",
                error
            );

        });
}


// ===============================
// SEARCH BUTTON
// ===============================

searchBtn.addEventListener(
    "click",
    searchMeals
);


// ===============================
// SEARCH USING ENTER
// ===============================

searchInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            searchMeals();

        }

    }
);


// ===============================
// GET MEAL DETAILS
// ===============================

function getMealDetails(mealId) {

    console.log("Getting meal details for ID:", mealId);

    const url =
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    fetch(url)
        .then(response => {

            console.log("Lookup response:", response);

            if (!response.ok) {
                throw new Error("Meal details request failed");
            }

            return response.json();
        })
        .then(data => {

            console.log("Meal details data:", data);

            if (!data.meals || data.meals.length === 0) {
                console.error("No meal found");
                return;
            }

            const meal = data.meals[0];

            displayMealDetails(meal);

        })
        .catch(error => {

            console.error(
                "Meal details error:",
                error
            );

        });
}

// ===============================
// DISPLAY MEAL DETAILS
// ===============================

function displayMealDetails(meal) {

    mealDetails.innerHTML = `

        <!-- ORANGE BREADCRUMB BAR -->

   <div class="meal-breadcrumb">

    <button
        class="breadcrumb-home"
        id="breadcrumbHome"
        type="button"
    >
        ⌂
    </button>

    <span class="breadcrumb-arrow">
        &gt;&gt;
    </span>

    <span class="breadcrumb-meal">
        ${meal.strMeal.toUpperCase()}
    </span>

</div>


        <!-- MEAL DETAILS -->

        <div class="meal-details">

            <h2 class="details-title">
                MEAL DETAILS
            </h2>


            <div class="meal-details-top">


                <!-- MEAL IMAGE -->

                <div>

                    <img
                        class="meal-details-image"
                        src="${meal.strMealThumb}"
                        alt="${meal.strMeal}"
                    >

                </div>


                <!-- MEAL INFORMATION -->

                <div class="meal-info">

                    <h2>
                        ${meal.strMeal}
                    </h2>


                    <p>
                        <strong>Category:</strong>
                        ${meal.strCategory || "Not available"}
                    </p>


                    ${
                        meal.strSource
                            ? `
                                <p>
                                    <strong>Source:</strong>
                                    <a
                                        href="${meal.strSource}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        ${meal.strSource}
                                    </a>
                                </p>
                            `
                            : `
                                <p>
                                    <strong>Source:</strong>
                                    Not available
                                </p>
                            `
                    }


                    <p>
                        <strong>Tags:</strong>
                        ${meal.strTags || "No tags"}
                    </p>


                    <!-- INGREDIENTS -->

                    <div class="ingredients">

                        <h3>
                            Ingredients
                        </h3>

                        <div class="ingredients-list">

                            ${getIngredients(meal)}

                        </div>

                    </div>

                </div>

            </div>


            <!-- INSTRUCTIONS -->

            <div class="instructions">

                <h3>
                    Instructions
                </h3>

                <p>
                    ${meal.strInstructions}
                </p>

            </div>

        </div>
    `;


    // ===============================
    // SHOW MEAL DETAILS AT TOP
    // ===============================

    categoryInfoSection.style.display = "none";

    mealsSection.style.display = "none";

    mealDetailsSection.style.display = "block";

    categoriesSection.style.display = "block";


    // Go to top of same page
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

const breadcrumbHome =
    document.getElementById("breadcrumbHome");

breadcrumbHome.addEventListener("click", function () {

    showLandingPage();

});

// ===============================
// GET INGREDIENTS + MEASUREMENTS
// ===============================

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

                <div class="ingredient-item">

                    <span>
                        ${ingredient}
                    </span>

                    <span>
                        ${measure || ""}
                    </span>

                </div>

            `;
        }
    }

    return ingredientsHTML;
}


// ===============================
// SHOW CATEGORY PAGE
// ===============================

function showCategoryPage() {

    categoryInfoSection.style.display = "block";

    mealsSection.style.display = "block";

    mealDetailsSection.style.display = "none";

    categoriesSection.style.display = "block";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ===============================
// SHOW LANDING PAGE
// ===============================

function showLandingPage() {

    categoryInfoSection.style.display = "none";

    mealsSection.style.display = "none";

    mealDetailsSection.style.display = "none";

    categoriesSection.style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ===============================
// OPEN HAMBURGER MENU
// ===============================



// ===============================
// CLOSE HAMBURGER MENU
// ===============================



function openSideMenu() {

    const sideMenu =
        document.getElementById("sideMenu");

    sideMenu.classList.add("open");
}


function closeSideMenu() {

    const sideMenu =
        document.getElementById("sideMenu");

    sideMenu.classList.remove("open");
}