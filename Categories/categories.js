function toggleDropdown() {
    const dropdown = document.getElementById("filterDropdown");
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
}

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', () => {
        const searchInput = document.getElementById('searchInput').value.trim();
        if (searchInput !== '') {
            window.location.href = `/searchResults.html?searchQuery=${encodeURIComponent(searchInput)}`;
        } else {
            alert('Please enter a book name to search.');
        }
    });
});



const addToCartButtons = document.querySelectorAll('.cart-button');

function addToCart(event) {
    const bookContainer = event.target.closest('.book-container');
    const bookInfo = {
        title: bookContainer.querySelector('.book-name').textContent,
        name: bookContainer.querySelector('.book-name').textContent,
        author: bookContainer.querySelector('.book-author').textContent,
        price: bookContainer.querySelector('.price').textContent,
    };

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(bookInfo);

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert('Book added to cart!');
}

addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
    
});