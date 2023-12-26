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

    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get('searchQuery');

    if (searchQuery) {
        fetch(`https://openlibrary.org/search.json?q=${searchQuery}`)
            .then(res => res.json())
            .then(data => {
                const searchResultsDiv = document.getElementById('searchResults');
                if (data.docs.length > 0) {
                    const resultList = document.createElement('div');

                    data.docs.forEach(book => {
                        const bookContainer = document.createElement('div');
                        bookContainer.classList.add('container-child2');

                        const bookInfo = document.createElement('div');
                        bookInfo.classList.add('book-container');

                        const bookImage = document.createElement('img');
                        bookImage.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
                        bookImage.alt = "Book Cover";
                        bookImage.classList.add('book-image')
                        bookImage.imageContent = book.image;
                        bookInfo.appendChild(bookImage);

                        const bookDetails = document.createElement('div');
                        bookDetails.classList.add('bookinfo');

                        const bookTitle = document.createElement('p');
                        bookTitle.classList.add('book-name');
                        bookTitle.textContent = book.title;
                        bookDetails.appendChild(bookTitle);

                        const bookAuthor = document.createElement('p');
                        bookAuthor.classList.add('book-author');
                        bookAuthor.textContent = `Author(s): ${book.author_name}`;
                        bookDetails.appendChild(bookAuthor);

                        const bookPrice = document.createElement('p');
                        bookPrice.classList.add('price');
                        let randomPrice = parseFloat(localStorage.getItem(`price_${book.key}`));

                        if (!randomPrice || isNaN(randomPrice)) {
                            randomPrice = (Math.random() * (30 - 10) + 10).toFixed(2);
                            localStorage.setItem(`price_${book.key}`, randomPrice);
                        }
                        bookPrice.textContent = `Price: $${randomPrice}`;
                        bookDetails.appendChild(bookPrice);

                        bookInfo.appendChild(bookDetails);

                        const addToCartButton = document.createElement('button');
                        addToCartButton.classList.add('cart-button');
                        addToCartButton.textContent = "Add to Cart";
                        bookInfo.appendChild(addToCartButton);

                        addToCartButton.addEventListener('click', () => {
                            const bookInfoForCart = {
                                title: book.title,
                                author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
                                price: randomPrice 
                            };

                            addToCart(bookInfoForCart);
                        });

                        bookContainer.appendChild(bookInfo);
                        resultList.appendChild(bookContainer);
                    });

                    searchResultsDiv.appendChild(resultList);
                } else {
                    searchResultsDiv.innerHTML = '<p>No results found.</p>';
                }
            })
            .catch(error => {
                console.log("Error fetching data:", error);
            });
    } else {
        console.log('No search query provided.');
    }

    function addToCart(book) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push(book);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert('Book added to cart!');
    }
});