// =================================
// MEAL DETAILS PAGE
// =================================


// API
const mealDetailsAPI =
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

const categoriesAPI =
    "https://www.themealdb.com/api/json/v1/1/categories.php";

const mealDetailsSection =
    document.getElementById("mealDetailsSection");

mealDetailsSection.style.display = "block";


// =================================
// HTML ELEMENTS
// =================================

const mealDetails =
    document.getElementById("mealDetails");

const categoriesContainer =
    document.getElementById("categories");

const menuButton =
    document.getElementById("menuButton");

const closeMenu =
    document.getElementById("closeMenu");

const sideMenu =
    document.getElementById("sideMenu");

const menuCategories =
    document.getElementById("menuCategories");

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");


// =================================
// GET MEAL ID FROM URL
// =================================

const urlParams =
    new URLSearchParams(window.location.search);

const mealId =
    urlParams.get("id");


// =================================
// LOAD MEAL
// =================================

if (mealId) {

    getMealDetails(mealId);

}


// =================================
// GET MEAL DETAILS
// =================================

function getMealDetails(id) {

    const url =
        mealDetailsAPI +
        encodeURIComponent(id);

    fetch(url)
        .then(response => response.json())
        .then(data => {

            if (!data.meals) {

                mealDetails.innerHTML = `
                    <p class="no-results">
                        Meal not found.
                    </p>
                `;

                return;
            }

            const meal =
                data.meals[0];

            displayMealDetails(meal);

        })
        .catch(error => {

            console.error(
                "Meal details error:",
                error
            );

        });

}


// =================================
// DISPLAY MEAL DETAILS
// =================================

function displayMealDetails(meal) {

    mealDetails.innerHTML = `

        <!-- BREADCRUMB -->

        <div class="meal-breadcrumb">

            <button
                class="breadcrumb-home"
                type="button"
                onclick="goHome()"
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


        <!-- DETAILS CONTENT -->

        <div class="meal-details">

            <h2 class="details-title">
                MEAL DETAILS
            </h2>


            <div class="meal-details-top">


                <!-- IMAGE -->

                <div>

                    <img
                        class="meal-details-image"
                        src="${meal.strMealThumb}"
                        alt="${meal.strMeal}"
                    >

                </div>


                <!-- INFORMATION -->

                <div class="meal-info">

                    <h2>
                        ${meal.strMeal}
                    </h2>


                    <p>
                        <strong>Category:</strong>
                        ${meal.strCategory || "Not available"}
                    </p>


                    <p>
                        <strong>Area:</strong>
                        ${meal.strArea || "Not available"}
                    </p>


                    <p>
                        <strong>Source:</strong>

                        ${
                            meal.strSource
                                ? `
                                    <a
                                        href="${meal.strSource}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        ${meal.strSource}
                                    </a>
                                `
                                : "Not available"
                        }

                    </p>


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

}


// =================================
// GET INGREDIENTS + MEASUREMENTS
// =================================

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


// =================================
// LOAD CATEGORIES
// =================================

fetch(categoriesAPI)
    .then(response => response.json())
    .then(data => {

        displayCategories(data.categories);

        displayMenuCategories(data.categories);

    })
    .catch(error => {

        console.error(
            "Categories error:",
            error
        );

    });


// =================================
// DISPLAY CATEGORIES AT BOTTOM
// =================================

function displayCategories(categories) {

    categoriesContainer.innerHTML = "";


    categories.forEach(function (category) {

        const categoryCard =
            document.createElement("div");


        categoryCard.classList.add(
            "category-card"
        );


        categoryCard.innerHTML = `

            <img
                src="${category.strCategoryThumb}"
                alt="${category.strCategory}"
            >

            <span class="category-name">
                ${category.strCategory}
            </span>

        `;


        categoryCard.addEventListener(
            "click",
            function () {

                window.location.href =
                    `category.html?category=${encodeURIComponent(category.strCategory)}`;

            }
        );


        categoriesContainer.appendChild(
            categoryCard
        );

    });

}


// =================================
// HAMBURGER CATEGORIES
// =================================

function displayMenuCategories(categories) {

    menuCategories.innerHTML = "";


    categories.forEach(function (category) {

        const menuItem =
            document.createElement("div");


        menuItem.classList.add(
            "menu-category"
        );


        menuItem.textContent =
            category.strCategory;


        menuItem.addEventListener(
            "click",
            function () {

                window.location.href =
                    `category.html?category=${encodeURIComponent(category.strCategory)}`;

            }
        );


        menuCategories.appendChild(
            menuItem
        );

    });

}


// =================================
// HAMBURGER OPEN
// =================================

menuButton.addEventListener(
    "click",
    function () {

        sideMenu.classList.add("open");

    }
);


// =================================
// HAMBURGER CLOSE
// =================================

closeMenu.addEventListener(
    "click",
    function () {

        sideMenu.classList.remove("open");

    }
);


// =================================
// GO HOME
// =================================

function goHome() {
    window.location.href = "index.html";
}

// =================================
// MEAL FINDER LOGO → HOME
// =================================

const logo =
    document.querySelector(".header h1");


if (logo) {

    logo.style.cursor = "pointer";


    logo.addEventListener(
        "click",
        function () {

            window.location.href =
                "index.html";

        }
    );

}

function searchMeals() {

    const foodName =
        searchInput.value.trim();

    if (foodName === "") {

        window.location.href =
            "index.html";

        return;
    }

    window.location.href =
        `category.html?search=${encodeURIComponent(foodName)}`;
}

searchBtn.addEventListener(
    "click",
    searchMeals
);


searchInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            searchMeals();

        }

    }
);