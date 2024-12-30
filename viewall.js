document.addEventListener('DOMContentLoaded', function () {
    const recipeContainer = document.getElementById('recipe-container');
    const search = document.getElementById('search');
    
    // Get recipes from localStorage
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    //Function to render recipes
    function renderRecipes(recipesToRender, query ='') {
        recipeContainer.innerHTML = ''; //Clearing existing content
        
        if (recipesToRender.length === 0) {
            if (query) {
                recipeContainer.innerHTML = `<p>No recipes of "${query}" found!</p>`;
            } else {
                recipeContainer.innerHTML = '<p>No recipes added yet. Go back and add some!</p>';
            }
            return;
        }

        // If there's a search query, prioritize matching recipes
        let prioritizedRecipes = [];
        let otherRecipes = [];
        if (query) {
            recipesToRender.forEach(recipe => {
                const matchesQuery = 
                    recipe.name.toLowerCase().includes(query) ||
                    recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query));

                if (matchesQuery) {
                    prioritizedRecipes.push(recipe);
                } else {
                    otherRecipes.push(recipe);
                }
            });
            recipesToRender = [...prioritizedRecipes, ...otherRecipes];
        }

        // Display / render the recipes
        recipesToRender.forEach((recipe, index) => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');

            recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <h3>${recipe.name}</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
            <p><strong>Steps:</strong> ${recipe.steps}</p>
            <button class="delete-button" data-index="${index}">Delete</button>
            `;

            recipeContainer.appendChild(recipeCard);
        });

        // Add event listeners for delete button

        const deletebuttons = document.querySelectorAll('.delete-button');
        deletebuttons.forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                deleteRecipe(index);
            });
        });
    }

    // Function to delete a recipe
    function deleteRecipe(index) {
        recipes.splice(index, 1); // Remove the recipe at the given index
        localStorage.setItem('recipes', JSON.stringify(recipes)); // Update localStorage
        renderRecipes(recipes); // Re-render recipes
    }

    // Search Recipes
    search.addEventListener('input', () => {
        const query = search.value.toLowerCase();
        renderRecipes(recipes, query);
    });

    // Initial rendering of recipes
    renderRecipes(recipes);
});
