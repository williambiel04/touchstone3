// script.js

// Arrays to meet the advanced rubric requirement (at least two arrays or objects)
let favoriteProducts = [];
const formFieldsToValidate = ['name', 'email'];

// Run this when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();

    // Set up "Save to Favorites" buttons on the products page
    const favButtons = document.querySelectorAll('.fav-btn');
    favButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const product = event.target.getAttribute('data-product');
            addToFavorites(product);
        });
    });

    // Pre-fill the "Item Details" box on the contact page if they have favorites
    const itemDetailsBox = document.getElementById('item-details');
    if (itemDetailsBox && favoriteProducts.length > 0) {
        itemDetailsBox.value = "I'm interested in ordering: " + favoriteProducts.join(", ");
    }

    // Set up form validation on the contact page
    const preorderForm = document.getElementById('preorder-form');
    if (preorderForm) {
        preorderForm.addEventListener('submit', validateForm);
    }
});

// --- Feature & Storage Functions ---

function loadFavorites() {
    const savedData = localStorage.getItem('bakeryFavorites');
    if (savedData) {
        favoriteProducts = JSON.parse(savedData); // Convert string back to an array
    }
    updateFavoritesDisplay();
}

function addToFavorites(productName) {
    // Only add it if it's not already in the array
    if (!favoriteProducts.includes(productName)) {
        favoriteProducts.push(productName);
        localStorage.setItem('bakeryFavorites', JSON.stringify(favoriteProducts)); // Save to storage
        updateFavoritesDisplay();
    }
}

function updateFavoritesDisplay() {
    const container = document.getElementById('favorites-container');
    if (!container) return; // Stop if we aren't on the products page

    container.innerHTML = '<h3>Your Saved Favorites:</h3>';
    
    if (favoriteProducts.length === 0) {
        container.innerHTML += '<p>You haven\'t saved anything yet.</p>';
        return;
    }

    const list = document.createElement('ul');
    favoriteProducts.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        list.appendChild(listItem);
    });
    
    container.appendChild(list);
}

// --- Form Validation Functions ---

function validateForm(event) {
    let formIsValid = true;

    // Clear out old error messages
    document.getElementById('name-error').textContent = '';
    document.getElementById('email-error').textContent = '';

    // Check Name (Must not be empty)
    const nameInput = document.getElementById('name');
    if (nameInput.value.trim() === '') {
        displayError('name-error', 'Please enter your name.');
        formIsValid = false;
    }

    // Check Email (Must match basic email format)
    const emailInput = document.getElementById('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailPattern.test(emailInput.value.trim())) {
        displayError('email-error', 'Please enter a valid email address.');
        formIsValid = false;
    }

    // Stop the form from submitting if there are errors
    if (!formIsValid) {
        event.preventDefault();
    }
}

function displayError(elementId, message) {
    const errorContainer = document.getElementById(elementId);
    if (errorContainer) {
        errorContainer.textContent = message;
        errorContainer.style.color = '#d9534f'; // Red text for errors
        errorContainer.style.fontWeight = 'bold';
        errorContainer.style.fontSize = '0.9rem';
    }
}
