// Carousel Functionality
const carouselInner = document.querySelector('.carousel-images');
let currentIndex = 0; // Start with the first slide
let autoSlideInterval; //Dynamic sliding functionality

// Function to show the current slide
function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-images img'); // Get all images in the carousel
    const totalSlides = slides.length;

    // Handle looping logic
    if (index >= totalSlides) {
        currentIndex = 0; // Loop back to the first slide
    } else if (index < 0) {
        currentIndex = totalSlides - 1; // Loop to the last slide
    } else {
        currentIndex = index; // Update to the specified slide index
    }
    // Apply transform to shift the carousel
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Function to go to the previous slide
function prevSlide() {
    showSlide(currentIndex - 1);
    resetAutoSlide(); //Reset auto slide timer
}

// Function to go to the next slide
function nextSlide() {
    showSlide(currentIndex + 1);
    resetAutoSlide();
}
// Function to auto-slide every 3 seconds
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        showSlide(currentIndex + 1);
    }, 3000); // 3 seconds = 3000ms
}

// Function to stop and restart the auto-slide timer
function resetAutoSlide() {
    clearInterval(autoSlideInterval); // Stop the current interval
    startAutoSlide(); // Restart auto-sliding
}

// Initialize the carousel
startAutoSlide();

document.getElementById('recipe-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission (no page reload)

    // Get recipe data from the form
    const recipeName = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('ingredients').value;
    const steps = document.getElementById('steps').value;
    const recipeImage = document.getElementById('recipe-image').files[0];

    if (!recipeName || !ingredients || !steps || !recipeImage) {
        alert("All fields are required!");
        return;
    }
    // Test localStorage functionality
    localStorage.setItem('testKey', 'testValue');
    const value = localStorage.getItem('testKey');
    console.log(value); // Should output: 'testValue'

    // Clean up
    localStorage.removeItem('testKey');

    // Convert image to a Base64 string
    const reader = new FileReader();
    reader.readAsDataURL(recipeImage);
    reader.onload = function () {
        const imageBase64 = reader.result;

        // Create a recipe object
        const newRecipe = {
            name: recipeName,
            ingredients: ingredients.split(','), // Split by commas for better formatting
            steps: steps,
            image: imageBase64,
        };

        // Get recipes from localStorage or initialize an empty array
        const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

        // Add the new recipe
        recipes.push(newRecipe);

        // Save updated recipes back to localStorage
        localStorage.setItem('recipes', JSON.stringify(recipes));

        // Redirect to "View All Recipes" page
        window.location.href = 'viewall.html';
    };

    reader.onerror = function () {
        alert("Error reading image file.");
    };
});


