// navbar
let menubar = document.querySelector("#menu-bars");
let mynav = document.querySelector(".navbar");

menubar.onclick = () => {
  menubar.classList.toggle("fa-times");
  mynav.classList.toggle("active");
};
// Add a click event listener to all navigation bar elements except the menu icon
const navbarItems = document.querySelectorAll(".navbar a:not(#menu-bars)");
navbarItems.forEach(item => {
  item.addEventListener("click", () => {
    if (mynav.classList.contains("active")) {
      menubar.classList.toggle("fa-times");
      mynav.classList.toggle("active");
    }
  });
});

// const sr = ScrollReveal({
//   distance: "45px",
//   duration: 2700,
//   reset: true,
// });

// sr.reveal(".myimage", { delay: 350, origin: "left" });
// sr.reveal(".home .content", { delay: 350, origin: "right" });
// sr.reveal(".speciality", { delay: 350, origin: "top" });
// sr.reveal(".popular", { delay: 350, origin: "bottom" });
// sr.reveal(".review .box", { delay: 350, origin: "top" });
// sr.reveal(".myform", { delay: 350, origin: "bottom" });

// ------------------------------------------Add button Code--------------------------------------------------

var cartData = {};
let cartCount = 0;
let cartCountElement = document.getElementById("cart-count"); // Declare cartCountElement in the global scope

// Event delegation for "Add to Cart" functionality
document.querySelector(".Burger").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

document.querySelector(".Sandwich").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

document.querySelector(".Pasta").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

document.querySelector(".Single_topping").addEventListener("click", (event) => {
  handleeAddToCartClick(event);
});

document.querySelector(".Double_topping").addEventListener("click", (event) => {
  handleeAddToCartClick(event);
});

document.querySelector(".Premium").addEventListener("click", (event) => {
  handleeAddToCartClick(event);
});

document.querySelector(".Chinese").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

document.querySelector(".Shakes").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

document.querySelector(".Garlic").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

document.querySelector(".Wrap").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

document.querySelector(".Chaap").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

document.querySelector(".Momos").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

function handleAddToCartClick(event) {
  const button = event.target.closest(".add-to-cart");
  if (button) {
    const GotoCart = button.parentNode.querySelector(".Go-to-Cart");

    button.style.display = "none";
    GotoCart.style.display = "flex";

    // Update cart count only when "Order Now" button is clicked
    cartCount++;
    cartCountElement.textContent = cartCount;
  }
}
function handleeAddToCartClick(event) {
  const btnn = event.target.closest(".btnn");

  if (btnn) {
    const newButtonsContainer = btnn.parentNode.querySelector('.new-buttons');

    btnn.style.display = "none";
    // goButtonContainer.style.display = "none";
    newButtonsContainer.style.display = "flex";
  }
  const newButtonsContainer = event.target.closest(".new-buttons");

  if (newButtonsContainer) {
    const goButtonContainer = newButtonsContainer.parentNode.querySelector(".Go-to-Cart , .add-to-cart");

    newButtonsContainer.style.display = "none";
    goButtonContainer.style.display = "flex";
  }
}

// ---------------------cart Data code-----------------------------

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

function submitOrder(cartData) {
  var message = "I would like to order:\n";

  for (const itemId in cartData) {
    if (cartData.hasOwnProperty(itemId)) {
      const item = cartData[itemId];
      message += `${item.quantity}x ${item.name} - ₹ ${item.price}\n`;
    }
  }

  // Calculate the total amount
  var totalAmount = calculateTotal();
  message += `\nTotal amount: ${totalAmount}`;

  // Replace 'YOUR_WHATSAPP_NUMBER' with the actual WhatsApp number
  var whatsappNumber = '+917015823645';

  // Construct the WhatsApp link
  var whatsappLink = "https://api.whatsapp.com/send?phone=" + whatsappNumber + "&text=" + encodeURIComponent(message);

  // Open WhatsApp in a new tab to send the message
  window.open(whatsappLink, '_blank');
}

// -------------------------dropdown_menu_Start-----------------------------------

// const dropdownContent = document.querySelector(".dropdown-content");
// const menuButton = document.querySelector(".dropbtn");

// dropdownContent.querySelectorAll("a").forEach((link) => {
//   link.addEventListener("click", () => {
//     // Close the dropdown after an option is clicked
//     dropdownContent.style.display = "none";
//   });
// }); 

// menuButton.addEventListener("click", () => {
//   // Toggle the dropdown when the menu button is clicked
//   if (dropdownContent.style.display === "none") {
//     dropdownContent.style.display = "block";
//   } else {
//     dropdownContent.style.display = "none";
//   }
// });
// menuButton.addEventListener("mouseover", () => {
//   // Open the dropdown when hovering over the menu button
//   dropdownContent.style.display = "block";
// });

// // Close the dropdown when the mouse leaves the dropdown area
// dropdownContent.addEventListener("mouseleave", () => {
//   dropdownContent.style.display = "none";
// });

// -------------------------dropdown_menu_End----------------------------------

// -------------------------Cart_data_Start------------------------------------

function showCartModal() {
  if (cartCount < 1) {
    alert("Please add items to the cart first.");
    return;
  }
  const cartModal = document.getElementById("cartModal");
  cartModal.style.display = "block";

  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = "";

   // Apply a max-height and overflow-y style to create a scrollbar
   cartItemsContainer.style.maxHeight = "400px"; // Adjust the value as needed
   cartItemsContainer.style.overflowX = "auto";

  const table = document.createElement("table");
  table.classList.add("cart-table");

  const headerRow = document.createElement("tr");
  const headerNames = ["Image", "Name", "Quantity", "Price"];
  for (const headerName of headerNames) {
    const headerCell = document.createElement("th");
    headerCell.textContent = headerName;
    if (
      headerName === "Name" ||
      headerName === "Quantity" ||
      headerName === "Image" ||
      headerName === "Price" 
      ) {
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
      
      const minusIcon = document.createElement("i");
      minusIcon.classList.add("fas", "fa-minus", "quantity-icon");
      minusIcon.setAttribute("data-item-id", itemId);
      minusIcon.addEventListener("click", () => {
        // Decrement the quantity when the minus icon is clicked
        if (item.quantity > 1) {
          item.quantity--;
          quantityValue.textContent = item.quantity;
          updatePrice(item, priceCell);
          TotalCell.textContent = `total: ${calculateTotal()}`; // Update the total amount
        }
        else {
          // Remove the item from the cart when quantity is less than one
          delete cartData[itemId];
          showCartModal(); // Refresh the cart modal after deleting an item
          updateCartCount(); // Update the cart count
          TotalCell.textContent = `total: ${calculateTotal()}`; // Update the total amount
              }
      });
      quantityCell.appendChild(minusIcon);
      
      const quantityValue = document.createElement("span");
      quantityValue.classList.add("item-quantity")
      quantityValue.textContent = item.quantity;
      quantityCell.appendChild(quantityValue);
      
      const plusIcon = document.createElement("i");
      plusIcon.classList.add("fas", "fa-plus", "quantity-icon");
      plusIcon.setAttribute("data-item-id", itemId);
      plusIcon.addEventListener("click", () => {
        // Increment the quantity when the plus icon is clicked
        item.quantity++;
        quantityValue.textContent = item.quantity;
        updatePrice(item, priceCell);
        TotalCell.textContent = `total: ${calculateTotal()}`; // Update the total amount
      });
      quantityCell.appendChild(plusIcon);
      
      cartRow.appendChild(quantityCell);

      const priceCell = document.createElement("td");
      priceCell.classList.add("center-align");
      priceCell.textContent = `₹ ${item.price * item.quantity}`;
      cartRow.appendChild(priceCell);

      table.appendChild(cartRow);
    }
  }

  
  const emptyFooterRow = document.createElement("tr");
const emptyFooterCell = document.createElement("td");
emptyFooterCell.setAttribute("colspan", headerNames.length);
emptyFooterRow.appendChild(emptyFooterCell);
table.appendChild(emptyFooterRow);

  // Create a footer row for sub-total and total
  const footerRow = document.createElement("tr");

  const emptyCell = document.createElement("td");
  emptyCell.setAttribute("colspan", "1"); 
  footerRow.appendChild(emptyCell);

  const TotalCell = document.createElement("td");
  TotalCell.textContent = `total: ${calculateTotal()}`  ;
  TotalCell.classList.add("cart-footer");
  footerRow.appendChild(TotalCell);

  const emptyCell2 = document.createElement("td");
  emptyCell2.setAttribute("colspan", "1"); 
  footerRow.appendChild(emptyCell2);

    const submitCell = document.createElement("td");
    submitCell.setAttribute("colspan", "1"); // Span 3 columns for the submit button
    submitCell.classList.add("submit-cell"); // Add a custom class to style the submit cell
    footerRow.appendChild(submitCell);
      // Create the "Submit Order" button
   const submitButton = document.createElement("button");
   submitButton.textContent = "Place Order";
   submitButton.classList.add("submit-button");
   submitButton.addEventListener("click", () => {
    submitOrder(cartData);
   });
   submitCell.appendChild(submitButton); // Append the button to the submit cell

   table.appendChild(footerRow);
   
   cartItemsContainer.appendChild(table);
}
function updatePrice(item, priceCell) {
  // Update the price cell with the new calculated price
  priceCell.textContent = `₹ ${item.price * item.quantity}`;
}
// -------------------------Cart_data_End------------------------------------

function closeCartModal() {
  const cartModal = document.getElementById("cartModal");
  cartModal.style.display = "none";
  location.reload();
}

function addToCart(id, name, price, image, quantity) {
  if (cartData.hasOwnProperty(id)) {
    cartData[id].quantity += 1;
  } else {
    cartData[id] = {
      name: name,
      price: price,
      image: image,
      quantity: +1,
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
// ------------------- fetching json data------------------------------------

let http = new XMLHttpRequest();

http.open("get", "products.json", true);

http.send();

http.onload = function () {
  if (this.readyState == 4 && this.status == 200) {
let products = JSON.parse(this.responseText);
let Burger = "";
let Sandwich = "";
let Pasta = "";
let Single = "";
let Double = "";
let Premium = "";
let Chinese = "";
let Shakes = "";
let Garlic = "";
let Wrap = "";
let Chaap = "";
let Momos = "";
for (let i = 0; i < products.length; i++) {
const item = products[i];
if (i < 6) {
  Single += `
  <div class="box" >
  <span class="price product-price"> ₹ ${item.price.Regular}</span>
  <img src="${item.image}" alt="img">
  <h3 class="product-name" id="1">${item.name}</h3>
  <div class="stars">
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  </div>
  <h2 class="btnn">ADD</h2>
    <div class="Go-to-Cart" style="display: none;">
  <h2 class="go" onclick="showCartModal()">GO <i class="fas fa fa-shopping-cart"></i></h2>
  </div>
  <div class="new-buttons" style="display: none;">
  <button class="popup-option add-to-cart" onclick="addToCart('${item.id}', '${item.namee.R}', ${item.price.Regular}, '${item.image}')">Reg ₹ 10</button>
  <button class="popup-option add-to-cart" onclick="addToCart('${item.id}', '${item.namee.M}', ${item.price.Medium}, '${item.image}')">Med ₹ 20</button>
  <button class="popup-option add-to-cart" onclick="addToCart('${item.id}', '${item.namee.L}', ${item.price.Large}, '${item.image}')">Large ₹ 30</button>
</div>
  </div>
  `;
}
if (i >= 6 && i < 12) {
  Double += `
  <div class="box" >
  <span class="price product-price"> ₹ ${item.price.Regular}</span>
  <img src="${item.image}" alt="img">
  <h3 class="product-name" id="1">${item.name}</h3>
  <div class="stars">
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  </div>
  <h2 class="btnn">ADD</h2>
    <div class="Go-to-Cart" style="display: none;">
  <h2 class="go" onclick="showCartModal()">GO <i class="fas fa fa-shopping-cart"></i></h2>
  </div>
  <div class="new-buttons" style="display: none;">
  <button class="popup-option add-to-cart" onclick="addToCart('${item.id}', '${item.namee.R}', ${item.price.Regular}, '${item.image}')">Reg ₹ 10</button>
  <button class="popup-option add-to-cart" onclick="addToCart('${item.id}', '${item.namee.M}', ${item.price.Medium}, '${item.image}')">Med ₹ 20</button>
  <button class="popup-option add-to-cart" onclick="addToCart('${item.id}', '${item.namee.L}', ${item.price.Large}, '${item.image}')">Large ₹ 30</button>
</div>
  </div>
  `;
}
if (i >= 12 && i < 20) {
  Premium += `
  <div class="box" >
  <span class="price product-price"> ₹ ${item.price.Regular}</span>
  <img src="${item.image}" alt="img">
  <h3 class="product-name" id="1">${item.name}</h3>
  <div class="stars">
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  </div>
  <h2 class="btnn">ADD</h2>
    <div class="Go-to-Cart" style="display: none;">
  <h2 class="go" onclick="showCartModal()">GO <i class="fas fa fa-shopping-cart"></i></h2>
  </div>
  <div class="new-buttons" style="display: none;">
  <button class="popup-option add-to-cart" onclick="addToCart('${item.id}', '${item.namee.R}', ${item.price.Regular}, '${item.image}')">Reg ₹ 10</button>
  <button class="popup-option add-to-cart" onclick="addToCart('${item.id}', '${item.namee.M}', ${item.price.Medium}, '${item.image}')">Med ₹ 20</button>
  <button class="popup-option add-to-cart" onclick="addToCart('${item.id}', '${item.namee.L}', ${item.price.Large}, '${item.image}')">Large ₹ 30</button>
</div>
  </div>
  `;
}
if (i >= 20 && i < 23) {
  Burger += `
<div class="box" >
<span class="price product-price"> ₹ ${item.price}</span>
<img src="${item.image}" alt="img">
<h3 class="product-name" id="1">${item.name}</h3>
<div class="stars">
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
</div>
<h2 class="btn add-to-cart "  onclick="addToCart('${item.id}', '${item.name}', ${item.price}, '${item.image}') ">ADD</h2>
<div class="Go-to-Cart" style="display: none;">
<h2 class="go" onclick="showCartModal()">GO <i class="fas fa fa-shopping-cart"></i></h2>
</div>

</div>
</div>
</div>
`;
}
if (i >= 23 && i < 27) {
  Sandwich += `
<div class="box" >
<span class="price product-price"> ₹ ${item.price}</span>
<img src="${item.image}" alt="img">
<h3 class="product-name" id="1">${item.name}</h3>
<div class="stars">
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
</div>
<h2 class="btn add-to-cart "  onclick="addToCart('${item.id}', '${item.name}', ${item.price}, '${item.image}') ">ADD</h2>
<div class="Go-to-Cart" style="display: none;">
<h2 class="go" onclick="showCartModal()">GO <i class="fas fa fa-shopping-cart"></i></h2>
</div>

</div>
</div>
</div>
`;
}
if (i >= 27 && i < 30) {
  Wrap += `
  <div class="box" >
  <span class="price product-price"> ₹ ${item.price}</span>
  <img src="${item.image}" alt="img">
  <h3 class="product-name" id="1">${item.name}</h3>
  <div class="stars">
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  </div>
  <h2 class="btn add-to-cart "  onclick="addToCart('${item.id}', '${item.name}', ${item.price}, '${item.image}') ">ADD</h2>
  <div class="Go-to-Cart" style="display: none;">
  <h2 class="go" onclick="showCartModal()">GO <i class="fas fa fa-shopping-cart"></i></h2>
  </div>
  
  </div>
  </div>
  </div>
  `;
  }
if (i >= 30 && i < 33) {
    Garlic += `
      <div class="box" >
     <span class="price product-price"> ₹ ${item.price}</span>
     <img src="${item.image}" alt="img">
     <h3 class="product-name" id="1">${item.name}</h3>
     <div class="stars">
     <i class="fas fa-star"></i>
     <i class="fas fa-star"></i>
     <i class="fas fa-star"></i>
     <i class="fas fa-star"></i>
     <i class="fas fa-star"></i>
    </div>
    <h2 class="btn add-to-cart "  onclick="addToCart('${item.id}', '${item.name}', ${item.price}, '${item.image}') ">ADD</h2>
    <div class="Go-to-Cart" style="display: none;">
    <h2 class="go" onclick="showCartModal()">GO <i class="fas fa fa-shopping-cart"></i></h2>
    </div>
    
    </div>
    </div>
    </div>
    `;
}
if (i >= 33 && i < 38) {
  Pasta += `
    <div class="box" >
   <span class="price product-price"> ₹ ${item.price}</span>
   <img src="${item.image}" alt="img">
   <h3 class="product-name" id="1">${item.name}</h3>
   <div class="stars">
   <i class="fas fa-star"></i>
   <i class="fas fa-star"></i>
   <i class="fas fa-star"></i>
   <i class="fas fa-star"></i>
   <i class="fas fa-star"></i>
  </div>
  <h2 class="btn add-to-cart "  onclick="addToCart('${item.id}', '${item.name}', ${item.price}, '${item.image}') ">ADD</h2>
  <div class="Go-to-Cart" style="display: none;">
  <h2 class="go" onclick="showCartModal()">GO <i class="fas fa fa-shopping-cart"></i></h2>
  </div>
  
  </div>
  </div>
  </div>
  `;
}
if (i >= 38 && i < 44) {
  Shakes += `
  <div class="box" >
  <span class="price product-price"> ₹ ${item.price}</span>
  <img src="${item.image}" alt="img">
  <h3 class="product-name" id="1">${item.name}</h3>
  <div class="stars">
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  </div>
  <h2 class="btn add-to-cart "  onclick="addToCart('${item.id}', '${item.name}', ${item.price}, '${item.image}') ">ADD</h2>
  <div class="Go-to-Cart" style="display: none;">
  <h2 class="go" onclick="showCartModal()">GO <i class="fas fa fa-shopping-cart"></i></h2>
  </div>
  
  </div>
  </div>
  </div>
  `;
}
if (i >= 44 && i < 50) {
Chaap += `
<div class="box" >
<span class="price product-price"> ₹ ${item.price}</span>
<img src="${item.image}" alt="img">
<h3 class="product-name" id="1">${item.name}</h3>
<div class="stars">
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
</div>
<h2 class="btn add-to-cart "  onclick="addToCart('${item.id}', '${item.name}', ${item.price}, '${item.image}') ">ADD</h2>
<div class="Go-to-Cart" style="display: none;">
<h2 class="go" onclick="showCartModal()">GO <i class="fas fa fa-shopping-cart"></i></h2>
</div>

</div>
</div>
</div>
`;
}
if (i >= 50 && i < 61) {
  Chinese += `
<div class="box" >
<span class="price product-price"> ₹ ${item.price}</span>
<img src="${item.image}" alt="img">
<h3 class="product-name" id="1">${item.name}</h3>
<div class="stars">
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
</div>
<h2 class="btn add-to-cart "  onclick="addToCart('${item.id}', '${item.name}', ${item.price}, '${item.image}') ">ADD</h2>
<div class="Go-to-Cart" style="display: none;">
<h2 class="go" onclick="showCartModal()">GO <i class="fas fa fa-shopping-cart"></i></h2>
</div>

</div>
</div>
</div>
`;
}
if (i >= 61 && i < 64) {
Momos += `
<div class="box" >
<span class="price product-price"> ₹ ${item.price}</span>
<img src="${item.image}" alt="img">
<h3 class="product-name" id="1">${item.name}</h3>
<div class="stars">
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
</div>
<h2 class="btn add-to-cart "  onclick="addToCart('${item.id}', '${item.name}', ${item.price}, '${item.image}') ">ADD</h2>
<div class="Go-to-Cart" style="display: none;">
<h2 class="go" onclick="showCartModal()">GO <i class="fas fa fa-shopping-cart"></i></h2>
</div>

</div>
</div>
</div>
`;
}
}
document.querySelector(".Burger").innerHTML = Burger;
document.querySelector(".Sandwich").innerHTML = Sandwich;
document.querySelector(".Pasta").innerHTML = Pasta;
document.querySelector(".Single_topping").innerHTML = Single;
document.querySelector(".Double_topping").innerHTML = Double;
document.querySelector(".Premium").innerHTML = Premium;
document.querySelector(".Chinese").innerHTML = Chinese;
document.querySelector(".Shakes").innerHTML = Shakes;
document.querySelector(".Garlic").innerHTML = Garlic;
document.querySelector(".Wrap").innerHTML = Wrap;
document.querySelector(".Chaap").innerHTML = Chaap;
document.querySelector(".Momos").innerHTML = Momos;
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
