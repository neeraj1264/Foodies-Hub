// navbar
let menubar = document.querySelector("#menu-bars");
let mynav = document.querySelector(".navbar");

menubar.onclick = () => {
  menubar.classList.toggle("fa-times");
  mynav.classList.toggle("active");
};

// const sr = ScrollReveal({
//   distance: "45px",
//   duration: 2700,
//   reset: true,
// });

// sr.reveal(".myimage", { delay: 350, origin: "left" });
// sr.reveal(".home .content", { delay: 350, origin: "right" });
// sr.reveal(".speciality", { delay: 350, origin: "top" });
// sr.reveal(".popular", { delay: 350, origin: "bottom" });
// sr.reveal(".gallery", { delay: 350, origin: "bottom" });
// sr.reveal(".review .box", { delay: 350, origin: "top" });
// sr.reveal(".myform", { delay: 350, origin: "bottom" });

// ------------------------------------------Add button Code--------------------------------------------------

let cartCount = 0;
let cartCountElement = document.getElementById("cart-count"); // Declare cartCountElement in the global scope

// Event delegation for "Add to Cart" functionality
document.querySelector('.Single_topping').addEventListener('click', (event) => {
  handleAddToCartClick(event);
});

document.querySelector('.Double_topping').addEventListener('click', (event) => {
  handleAddToCartClick(event);
});

document.querySelector('.Premium').addEventListener('click', (event) => {
  handleAddToCartClick(event);
});

  function handleAddToCartClick(event) {
  const button = event.target.closest('.add-to-cart');
  if (button) {
    const quantityContainer = button.parentNode.querySelector('.quantity-controls');
    const incrementButton = quantityContainer.querySelector('.increment');
    const quantityElement = quantityContainer.querySelector('.quantity');
    const decrementButton = quantityContainer.querySelector('.decrement');
    decrementButton.disabled = false;
    incrementButton.disabled = false;

    button.style.display = 'none';
    quantityContainer.style.display = 'flex';

    let quantity = 1; // Set initial quantity to 1

    quantityElement.textContent = quantity;

    incrementButton.addEventListener('click', () => {
      quantity++;
      quantityElement.textContent = quantity;
      console.log(quantity)
    });

    decrementButton.addEventListener('click', () => {
      if (quantity === 0) {
        delete cartData[itemId];
        return; // Exit the function if quantity is already 0
      }
      quantity--;
      quantityElement.textContent = quantity;
      if (quantity < 1) {
        decrementButton.disabled = true;
        button.style.display = 'inline-block';
        quantityContainer.style.display = 'none';
        cartCount--;
        cartCountElement.textContent = cartCount;
      
        // Update the cartData quantity for this item
        const itemId = button.getAttribute('data-item-id');
        if (cartData.hasOwnProperty(itemId)) {
          cartData[itemId].quantity = quantity; // Update the quantity in cartData
          if (cartData[itemId].quantity < 1) {
            delete cartData[itemId]; 
        }
        showCartModal(); // Refresh the cart modal after deleting an item
      }
    
        if (cartCount < 0) {
          cartCount = 0; // Ensure cartCount is not negative
        }
        cartCountElement.textContent = cartCount;
      }
    });

    // Update cart count only when "Order Now" button is clicked
    cartCount++;
    cartCountElement.textContent = cartCount;
  
  }

};



// ---------------------cart Data code-----------------------------
let cartData = {}; 

// Calculate and return the sub-total of all items in the cart
function calculateTotal() {
  let Total = 0;
  for (const itemId in cartData) {
    if (cartData.hasOwnProperty(itemId)) {
      Total += cartData[itemId].quantity * cartData[itemId].price;
    }
  }
  return `₹ ${Total.toFixed(2)}`;
}

function showCartModal() {
  const cartModal = document.getElementById("cartModal");
  cartModal.style.display = "block";

  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = "";

  const table = document.createElement("table");
  table.classList.add("cart-table");

  const headerRow = document.createElement("tr");
  const headerNames = ["Image", "Name", "Quantity", "Price", "Delete"];
  for (const headerName of headerNames) {
    const headerCell = document.createElement("th");
    headerCell.textContent = headerName;
    if (headerName === "Name" || headerName === "Quantity" || headerName === "Image" || headerName === "Price" || headerName === "Delete") {
      headerCell.classList.add("header-spaced"); // Add the class for spacing
    }
    headerRow.appendChild(headerCell);
  }
  table.appendChild(headerRow); 

  for (const itemId in cartData) {
    if (cartData.hasOwnProperty(itemId)) {
      const item = cartData[itemId];
      const cartRow = document.createElement("tr");

      const imageCell = document.createElement("td");
      const itemImage = document.createElement("img");
      itemImage.src = item.image;
      itemImage.alt = item.name;
      imageCell.appendChild(itemImage);
      cartRow.appendChild(imageCell);

      const nameCell = document.createElement("td");
      nameCell.classList.add("center-align");
      nameCell.textContent = item.name;
      cartRow.appendChild(nameCell);

      const quantityCell = document.createElement("td");
      quantityCell.classList.add("center-align");
      quantityCell.textContent = item.quantity;
      cartRow.appendChild(quantityCell);

      const priceCell = document.createElement("td");
      priceCell.classList.add("center-align");
      priceCell.textContent = `₹ ${item.price}`;
      cartRow.appendChild(priceCell);

      const deleteCell = document.createElement("td");
      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fas", "fa-trash-alt", "delete-icon" );
      deleteIcon.setAttribute("data-item-id", itemId);
      deleteCell.appendChild(deleteIcon);
      cartRow.appendChild(deleteCell);

      table.appendChild(cartRow);
      
    }
  }
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-icon')) {
      const itemId = event.target.getAttribute('data-item-id');
      delete cartData[itemId];
      showCartModal(); // Refresh the cart modal after deleting an item
      updateCartCount();
    }
  });

// Create a footer row for sub-total and total
const footerRow = document.createElement("tr");

const emptyCell = document.createElement("td");
emptyCell.setAttribute("colspan", "1"); // Span 1 columns for sub-total and total
footerRow.appendChild(emptyCell);

const TotalCell = document.createElement("td");
TotalCell.textContent = "total:";
TotalCell.classList.add("cart-footer");
footerRow.appendChild(TotalCell);

const TotalAmountCell = document.createElement("td");
TotalAmountCell.textContent = calculateTotal(); // Calculate sub-total
TotalAmountCell.classList.add("cart-footer");
footerRow.appendChild(TotalAmountCell);

table.appendChild(footerRow);


cartItemsContainer.appendChild(table);

}
function closeCartModal() {
  const cartModal = document.getElementById("cartModal");
  cartModal.style.display = "none";
}

function addToCart(id, name, price, image, quantity) {
  if (cartData.hasOwnProperty(id)) {
    cartData[id].quantity += 1;
  } else {
    cartData[id] = {
      name: name,
      price: price,
      image: image,
      quantity: +1 ,
    };
  }

  updateCartCount();
}

function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  let cartItemCount = 0;
  for (const itemId in cartData) {
    if (cartData.hasOwnProperty(itemId)) {
      cartItemCount += cartData[itemId].quantity;
    }
  }
  cartCountElement.textContent = cartItemCount;
}
function openCategoryDropdown(button) {
  const quantityContainer = button.parentNode.querySelector('.quantity-controls');
  const categoryDropdown = quantityContainer.querySelector('.category-dropdown');
  const addToCartButton = quantityContainer.querySelector('.add-to-cart-button');
  const itemId = addToCartButton.getAttribute('data-id');
  const products = JSON.parse(http.responseText);
  const selectedItem = products.find(item => item.id.toString() === itemId);
  if (selectedItem) {
    quantityContainer.style.display = 'flex';

    categoryDropdown.addEventListener('change', () => {
      const selectedCategory = categoryDropdown.value;
      const updatedPrice = selectedItem.pricee[selectedCategory];

      addToCartButton.setAttribute('data-price', updatedPrice);
    });
  } else {
    console.log(`Item with ID ${itemId} not found.`);
  }  
}

// ------------------- fetching json data------------------------------------

let http = new XMLHttpRequest();

http.open("get", "products.json", true);

http.send();

http.onload = function () {
  if (this.readyState == 4 && this.status == 200) {
    let products = JSON.parse(this.responseText);
    let Single = "";
    let Double = "";
    let Premium = "";
    for (let i = 0; i < products.length; i++) {
      const item = products[i];
      if (i < 6) {
      Single += 
      `
  <div class="box" >
 <span class="price product-price"> ₹ ${item.price}</span>
 <img src="${item.image}" alt="img">
 <h3 class="product-name" id="1">${item.name}</h3>
 <div>
 ${item.p}
 </div>
 <div class="quantity-container">
<div class="quantity-container">
<h2 class="btn add-to-cart "  onclick="addToCart('${item.id}', '${item.name}', ${item.price}, '${item.image}') ">ADD</h2>
<div class="quantity-controls" style="display: none;">
<button class="btn increment"><i class="fas fa-plus"></i></button>
<span class="quantity">0</span>
<button class="btn decrement" disabled><i class="fas fa-minus"></i></button>
</div>

</div>
</div>
</div>
`;
} else if (i >= 6 && i < 12 )  {
  Double +=  `
  <div class="box">
  <span class="price product-price"> ₹ ${item.price}</span>
  <img src="${item.image}" alt="img">
  <h3 class="product-name" id="1">${item.name}</h3>
  <div>
    ${item.p}
  </div>
  <div class="add-button-container">
    <button class="btn add-to-cart"   onclick="addToCart('${item.id}', '${item.name}', ${item.price}, '${item.image}'); openCategoryDropdown(this)">
      ADD
    </button>
    <div class="quantity-controls" style="display: none;">
      <select class="category-dropdown">
        <option value="Regular">Regular ₹ ${item.pricee.Regular} </option>
        <option value="Medium">Medium ₹ ${item.pricee.Medium}</option>
        <option value="Large">Large ₹ ${item.pricee.Large}</option>
      </select>
      <button class="btn increment"><i class="fas fa-plus"></i></button>
      <span class="quantity">0</span>
      <button class="btn decrement" disabled><i class="fas fa-minus"></i></button>
      <button class="btn add-to-cart-button" style="display: none;">
        Add to Cart
      </button>
    </div>
  </div>
</div>
`    
}
else if (i >= 12 && i < 20 )  {
  Premium +=  `
  <div class="box" >
 <span class="price product-price"> ₹ ${item.price}</span>
 <img src="${item.image}" alt="img">
 <h3 class="product-name" id="1">${item.name}</h3>
 <div>
 ${item.p}
 </div>
 <div class="quantity-container">
<div class="quantity-container">
<h2 class="btn add-to-cart "  onclick="addToCart('${item.id}', '${item.name}', ${item.price}, '${item.image}') ">ADD</h2>
<div class="quantity-controls" style="display: none;">
<button class="btn increment"><i class="fas fa-plus"></i></button>
<span class="quantity">0</span>
<button class="btn decrement" disabled><i class="fas fa-minus"></i></button>
</div>

</div>
</div>
</div>
`;
}
    }
    document.querySelector(".Single_topping").innerHTML = Single;
    document.querySelector(".Double_topping").innerHTML = Double;
    document.querySelector(".Premium").innerHTML = Premium;

  }
};

//  ------------------Function to toggle dark mode-----------------------------
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");

  // Get the mode icon element
  const modeIcon = document.getElementById("mode-icon");

  // Toggle the icon between moon and sun based on the dark mode class
  if (body.classList.contains("dark-mode")) {
    modeIcon.classList.remove("fa-moon");
    modeIcon.classList.add("fa-sun");
  } else {
    modeIcon.classList.remove("fa-sun");
    modeIcon.classList.add("fa-moon");
  }
}
