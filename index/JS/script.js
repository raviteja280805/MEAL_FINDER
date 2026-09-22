// Get the HTML element where we will display categories
const categoriesContainer = document.getElementById("categories");

// TheMealDB Categories API
const categoriesAPI =
    "https://www.themealdb.com/api/json/v1/1/categories.php";

// Call the API
fetch(categoriesAPI)
    .then(response => response.json())
    .then(data => {

        // Check the API data in the browser console
        console.log(data);

        // Display the categories
        displayCategories(data.categories);

    })
    .catch(error => {

        // Show error if API request fails
        console.error("Error fetching categories:", error);

    });


// Function to display categories
function displayCategories(categories) {

    // Clear the categories container
    categoriesContainer.innerHTML = "";

    // Go through every category
    categories.forEach(category => {

        // Create a new div
        const categoryCard = document.createElement("div");

        // Give the div a CSS class
        categoryCard.classList.add("category-card");

        // Put image and category name inside the card
        categoryCard.innerHTML = `
            
            <img 
                src="${category.strCategoryThumb}" 
                alt="${category.strCategory}"
            >

            <span class="category-name">
                ${category.strCategory}
            </span>

        `;

        // Add the card to the webpage
        categoriesContainer.appendChild(categoryCard);

    });
}