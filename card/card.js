
const cartItems = JSON.parse(localStorage.getItem('cartItems'));

function displayCartItems() {
    const cartContainer = document.getElementById('cartItems');
    const totalPrice = document.querySelector("#totalPrice"); 
    let tPrice = 0;
    if (cartItems && cartItems.length > 0) {
        cartContainer.innerHTML = ''; 

        cartItems.forEach((item, index) => {
            const bookInfo = document.createElement('div');
            bookInfo.innerHTML = `
            <div class="book-info">
            <p><strong>Title:</strong> ${item.title}</p>
            <p><strong>Author:</strong> ${item.author}</p>
            <p><strong>Price:</strong> ${item.price}</p>
            <img src="../images/remove.png" alt="Remove" class="remove-item" data-index="${index}">
        </div>
                <hr>
            `;
            cartContainer.appendChild(bookInfo);
            tPrice += parseFloat((String(item.price).replace('$','')).replace(' ','')); 
        });
        
        totalPrice.innerText = `Total Price: $${tPrice}` 
        const removeItems = document.querySelectorAll('.remove-item');
        removeItems.forEach(item => {
            item.addEventListener('click', removeCartItem);
        });

    } else {
        cartContainer.innerHTML = '<p>No items in the cart</p>';
        totalPrice.innerHTML='<p>Total Price: $0.00</p>'
    }
}

function removeCartItem(event) {
    const indexToRemove = event.target.dataset.index;
    cartItems.splice(indexToRemove, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems();
}

window.addEventListener('load', displayCartItems);





  
