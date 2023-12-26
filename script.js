

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', () => {
        const searchInput = document.getElementById('searchInput').value.trim();
        if (searchInput !== '') {
            window.location.href = `searchResults.html?searchQuery=${encodeURIComponent(searchInput)}`;
        } else {
            alert('Please enter a book name to search.');
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".container-child");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
  
    const totalSlides = slides.length;
    const slidesPerPage = 3;
    let currentIndex = 0;
  
    function showSlides(startIndex) {
      slides.forEach((slide) => {
        slide.style.display = "none";
      });
      for (let i = startIndex; i < startIndex + slidesPerPage; i++) {
        if (i < totalSlides) {
          slides[i].style.display = "block";
        }
      }
    }
  
    showSlides(currentIndex);
  
    leftArrow.addEventListener("click", function () {
      if (currentIndex > 0) {
        currentIndex -= slidesPerPage;
        showSlides(currentIndex);
      }
    });
  
    rightArrow.addEventListener("click", function () {
      if (currentIndex + slidesPerPage < totalSlides) {
        currentIndex += slidesPerPage;
        showSlides(currentIndex);
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

  





