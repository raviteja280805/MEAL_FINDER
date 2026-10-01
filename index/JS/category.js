// =================================
// CATEGORY PAGE
// =================================


// API
const categoriesAPI =
    "https://www.themealdb.com/api/json/v1/1/categories.php";

const categoryMealsAPI =
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=";


// HTML ELEMENTS
const categoryInfoSection =
    document.getElementById("categoryInfoSection");

const categoryInfo =
    document.getElementById("categoryInfo");

const mealsSection =
    document.getElementById("mealsSection");

const mealsContainer =
    document.getElementById("meals");

const mealsTitle =
    document.getElementById("mealsTitle");

const categoriesContainer =
    document.getElementById("categories");

const categoriesSection =
    document.getElementById("categoriesSection");

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
// GET CATEGORY FROM URL
// =================================

const urlParams =
    new URLSearchParams(window.location.search);

const categoryName =
    urlParams.get("category");

const searchName =
    urlParams.get("search");

// =================================
// LOAD PAGE
// =================================

if (categoryName) {

    loadCategoryPage(categoryName);

}
else if (searchName) {

    loadSearchPage(searchName);

}


// =================================
// LOAD CATEGORY PAGE
// =================================

function loadCategoryPage(categoryName) {

    // Get category information
    fetch(categoriesAPI)
        .then(response => response.json())
        .then(data => {

            const category =
                data.categories.find(
                    item =>
                        item.strCategory.toLowerCase() ===
                        categoryName.toLowerCase()
                );

            if (category) {

                displayCategoryInfo(category);

            }

            displayCategories(data.categories);
            displayMenuCategories(data.categories);

        })
        .catch(error => {

            console.error(
                "Category information error:",
                error
            );

        });


    // Get meals for selected category
    fetch(
        categoryMealsAPI +
        encodeURIComponent(categoryName)
    )
        .then(response => response.json())
        .then(data => {

            displayMeals(data.meals);

        })
        .catch(error => {

            console.error(
                "Category meals error:",
                error
            );

        });

}


// =================================
// CATEGORY DESCRIPTION
// =================================

function displayCategoryInfo(category) {

    categoryInfo.innerHTML = `

        <div class="category-info">

            <h2>
                ${category.strCategory}
            </h2>

            <p>
                ${category.strCategoryDescription}
            </p>

        </div>

    `;

    categoryInfoSection.style.display = "block";
}


// =================================
// MEALS
// =================================

function displayMeals(meals) {

    mealsContainer.innerHTML = "";

    mealsTitle.textContent = "MEALS";

    if (!meals) {

        mealsContainer.innerHTML = `
            <p class="no-results">
                No meals found.
            </p>
        `;

        return;
    }


    meals.forEach(function (meal) {

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


        mealCard.addEventListener(
            "click",
            function () {

                window.location.href =
                    `meal.html?id=${encodeURIComponent(meal.idMeal)}`;

            }
        );


        mealsContainer.appendChild(mealCard);

    });


    mealsSection.style.display = "block";

}


// =================================
// CATEGORY CARDS AT BOTTOM
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
// MEAL FINDER → HOME
// =================================

const logo =
    document.querySelector(".header h1");

logo.addEventListener(
    "click",
    function () {

        window.location.href =
            "index.html";

    }
);

logo.style.cursor = "pointer";

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


function loadSearchPage(searchName) {

    fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
        encodeURIComponent(searchName)
    )
        .then(response => response.json())
        .then(data => {

            categoryInfoSection.style.display = "none";

            mealsSection.style.display = "block";

            mealsTitle.textContent =
                `SEARCH RESULTS FOR "${searchName.toUpperCase()}"`;

            displayMeals(data.meals);

            categoriesSection.style.display = "block";

        })
        .catch(error => {

            console.error(
                "Search error:",
                error
            );

        });

}