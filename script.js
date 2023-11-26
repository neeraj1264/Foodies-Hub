// navbar
let menubar = document.querySelector("#menu-bars");
let mynav = document.querySelector(".navbar");

menubar.onclick = () => {
  menubar.classList.toggle("fa-times");
  mynav.classList.toggle("active");
};
// Add a click event listener to all navigation bar elements except the menu icon
const navbarItems = document.querySelectorAll(".navbar a:not(#menu-bars)");
navbarItems.forEach((item) => {
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
  handleAddToCartClick(event);
});

document.querySelector(".Double_topping").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

document.querySelector(".Premium").addEventListener("click", (event) => {
  handleAddToCartClick(event);
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

document.querySelector(".Snacks").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

document.querySelector(".Vegetables").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

document.querySelector(".Roti").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

function handleAddToCartClick(event) {
  const button = event.target.closest(".add-to-cart");
  if (button) {
    if (!isUserSignedUp()) {
      event.preventDefault();
      alert("Enter Your Address First");
      window.location.href = "signup.html";
    } else if (isUserSignedUp()) {
      const quantity = button.parentNode.querySelector(".quantity-control");

      button.style.display = "none";
      quantity.style.display = "flex";

      // Update cart count only when "Order Now" button is clicked
      cartCount++;
      cartCountElement.textContent = cartCount;
    }
  }
}

// ---------------------cart Data code-----------------------------

function calculateitemTotal() {
  let Total = 0;

  for (const itemId in cartData) {
    if (cartData.hasOwnProperty(itemId)) {
      Total += cartData[itemId].quantity * cartData[itemId].price;
    }
  }
  return Total;
}

function calculateTotal() {
  let total = 20; // Initial amount, assuming it includes a fixed charge of ₹20 (delivery or service charge)

  // Calculate the total amount of items in the cart
  for (const itemId in cartData) {
    if (cartData.hasOwnProperty(itemId)) {
      total += cartData[itemId].quantity * cartData[itemId].price;
    }
  }

  const discountCell = document.querySelector(".disc");
  if (discountCell && discountCell.textContent) {
    const discountAmount = parseFloat(
      discountCell.textContent.replace(/[^\d.-]/g, "")
    );
    if (!isNaN(discountAmount)) {
      // Deduct the discount from the total amount (subtracting the discount)
      total -= Math.abs(discountAmount); // Use Math.abs() to ensure a negative value is subtracted
    }
  }

  return ` ${total.toFixed(2)}`;
}

function getRandom4DigitNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}
function calculateDiscount(itemTotalAmount) {
  const discount = itemTotalAmount * 0.1; // Calculate 10% discount
  return discount;
}
let isCouponApplied = false;
function submitOrder(cartData) {
  // Retrieve the current order number from localStorage
  const currentOrderNumber = getRandom4DigitNumber();

  const customerData = JSON.parse(localStorage.getItem("userData"));

  var totalAmount = calculateTotal();
  totalAmount = `₹ ${totalAmount}`;

  if (typeof totalAmount !== "string") {
    console.error("Total amount is not in the expected format");
    return;
  }
  const discountCell = document.querySelector(".disc");
  const itemTotalAmount = calculateitemTotal();
  // var itemTotalAmount = parseFloat(totalAmount.replace('₹', '').trim());

  const discount = calculateDiscount(itemTotalAmount);
  updateDiscount(discountCell, discount);

  var message = `Order      : *ORD-${currentOrderNumber}*\n`;
  message += `Phone    : *${customerData.mobileNumber}*\n`;
  message += `Name     : *${customerData.name}*\n`;
  message += `Amount : *${totalAmount}*\n`;
  message += `Address : *${customerData.address}*\n\n`;
  message += "----------items----------\n\n";
  for (const itemId in cartData) {
    if (cartData.hasOwnProperty(itemId)) {
      const item = cartData[itemId];
      message += `${item.quantity}.0 x   ${item.name} = ₹ ${item.price}\n`;
    }
  }
  message += `Service Charge = ₹ 20.00\n`;

  if (isCouponApplied) {
    message += `Discount : *₹ ${discount.toFixed(2)}*\n`;
  }

  // Replace 'YOUR_WHATSAPP_NUMBER' with the actual WhatsApp number
  var whatsappNumber = "+917015823645";

  // Construct the WhatsApp link
  var whatsappLink =
    "https://api.whatsapp.com/send?phone=" +
    whatsappNumber +
    "&text=" +
    encodeURIComponent(message);

  // Open WhatsApp in a new tab to send the message
  window.open(whatsappLink, "_blank");

  // Delay the page reload by 5 seconds
  setTimeout(function () {
    showPopup();
  }, 5000);
}

// Function to update the displayed discount amount
function updateDiscount(discountCell, discountAmount) {
  // Check if discountCell is defined
  if (discountCell) {
    discountCell.textContent = `- ${discountAmount.toFixed(2)}`;
  }
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
let isCartModalOpen = false;
// -------------------------Cart_data_Start------------------------------------

function showCartModal() {
  if (Object.keys(cartData).length === 0) {
    closeCartModal(); // Close the modal
    return;
  }
  // Get the reference to the marquee element
  const marqueeElement = document.getElementById("marqueeElement");

  // Check if the marquee element exists and hide it if found
  if (marqueeElement) {
    marqueeElement.style.display = "none";
  }
  document.getElementById("cartModal").style.display = "block";
  isCartModalOpen = true;

  // Hide the menu-header when the cart modal is open
  const menuHeader = document.getElementById("menu-head");
  if (menuHeader) {
    menuHeader.style.display = "none";
  }

  document.getElementById("dark-mode-toggle").style.display = "none";

  if (cartCount < 1) {
    alert("Please add items to the cart first.");
    closeCartModal();
    return;
  }
  const cartModal = document.getElementById("cartModal");
  cartModal.style.display = "block";

  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = "";

  // Apply a max-height and overflow-y style to create a scrollbar
  cartItemsContainer.style.maxHeight = "500px"; // Adjust the value as needed
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
      imageCell.classList.add("center-align");
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

      // --------------------------minuscell------------------------------

      const minusIcon = document.createElement("i");
      minusIcon.classList.add("fas", "fa-minus", "quantity-icon");
      minusIcon.setAttribute("data-item-id", itemId);
      minusIcon.addEventListener("click", () => {
        // Decrement the quantity when the minus icon is clicked
        if (item.quantity > 1) {
          item.quantity--;
          quantityValue.textContent = item.quantity;

          updatePrice(item, priceCell);
          updateDiscountLabel()
          const discountCell = document.querySelector(".disc");
          const itemTotalAmount = calculateitemTotal();
          if (!isNaN(itemTotalAmount)) {
            Itemtotalcell.textContent = `₹ ${itemTotalAmount.toFixed(2)}`; // Update the item total

            // Update the discount
            const discountAmount = calculateDiscount(itemTotalAmount);
            updateDiscount(discountCell, discountAmount);

            // Update the total amount
            if (!isCouponApplied) {
              const totalAmount = itemTotalAmount + 20;
              totalcell.textContent = `₹ ${totalAmount.toFixed(2)}`;
            } else {
              const totalAmount = itemTotalAmount + 20 - discountAmount;
              totalcell.textContent = `₹ ${totalAmount.toFixed(2)}`;
            }
          } else {
            // Handle the case where itemTotalAmount is not a number
            console.error("Invalid item total amount:", itemTotalAmount);
          }
        } else {
          // Remove the item from the cart when quantity is less than one
          delete cartData[itemId];
          showCartModal(); // Refresh the cart modal after deleting an item
          updateCartCount(); // Update the cart count
          hideQuantityContainer(itemId);
        }
      });
      quantityCell.appendChild(minusIcon);

      const quantityValue = document.createElement("span");
      quantityValue.classList.add("item-quantity");
      quantityValue.textContent = item.quantity;
      quantityCell.appendChild(quantityValue);

// ---------------------------------plusicon-----------------------------------

      const plusIcon = document.createElement("i");
      plusIcon.classList.add("fas", "fa-plus", "quantity-icon");
      plusIcon.setAttribute("data-item-id", itemId);
      plusIcon.addEventListener("click", () => {
        // Increment the quantity when the plus icon is clicked
        item.quantity++;
        quantityValue.textContent = item.quantity;
        updatePrice(item, priceCell);
        updateDiscountLabel()
        const discountCell = document.querySelector(".disc");
        const itemTotalAmount = calculateitemTotal();
        if (!isNaN(itemTotalAmount)) {
          Itemtotalcell.textContent = `₹ ${itemTotalAmount.toFixed(2)}`; // Update the item total

          // Update the discount
          const discountAmount = calculateDiscount(itemTotalAmount);
          updateDiscount(discountCell, discountAmount);

          // Update the total amount
          if (!isCouponApplied) {
            const totalAmount = itemTotalAmount + 20;
            totalcell.textContent = `₹ ${totalAmount.toFixed(2)}`;
          } else {
            const totalAmount = itemTotalAmount + 20 - discountAmount;
            totalcell.textContent = `₹ ${totalAmount.toFixed(2)}`;
          }
        } else {
          // Handle the case where itemTotalAmount is not a number
          console.error("Invalid item total amount:", itemTotalAmount);
        }
      });
      quantityCell.appendChild(plusIcon);

      cartRow.appendChild(quantityCell);

      const priceCell = document.createElement("td");
      priceCell.classList.add("center-align");
      priceCell.textContent = `₹ ${item.price * item.quantity}`;
      cartRow.appendChild(priceCell);

      table.appendChild(cartRow);
      // Add product details to the invoice content
      addToInvoice(
        item.name,
        item.quantity,
        item.price,
        item.price * item.quantity
      );
    }
  }
  // -------------------------- Coupon Section ---------------------------------

  const coupon = document.createElement("tr");
  coupon.classList.add("coupon");
  
  const couponInputCell = document.createElement("td");
  couponInputCell.setAttribute("colspan", "4");
  coupon.appendChild(couponInputCell);
  
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");
  
  const couponInput = document.createElement("input");
  couponInput.setAttribute("type", "text");
  couponInput.setAttribute("placeholder", "Enter coupon code");
  couponInput.classList.add("coupon-input");
  couponInput.setAttribute("id", "couponInput");
  inputContainer.appendChild(couponInput);
  
  const applyButton = document.createElement("button");
  applyButton.textContent = "Apply";
  applyButton.classList.add("apply-button");
  applyButton.addEventListener("click", () => {
    applyCoupon(); // Function to apply the coupon logic
  });
  inputContainer.appendChild(applyButton);
  
  couponInputCell.appendChild(inputContainer);
  
  const errorLabel = document.createElement("label");
  errorLabel.textContent = "Invalid coupon code!";
  errorLabel.classList.add("error-label");

  couponInputCell.appendChild(errorLabel);
  
  table.appendChild(coupon);
  
  function updateDiscountLabel() {
    const discount = calculateDiscount(calculateitemTotal()); // Recalculate discount
    // const discountCell = document.querySelector(".disc");
    const removecouponlable = document.querySelector(".removecouponlable");
    
    if (isCouponApplied) {
      removecouponlable.textContent = `You Saved ₹${discount.toFixed(2)} with coupon code`;
    } else {
      removecouponlable.textContent = "";
    }
  }
  // ------------------------------------Remove Coupon------------------------------------

  const removecoupon = document.createElement("tr");
  removecoupon.classList.add("Remove-Coupon");

  const emptyremovecoupon = document.createElement("td");
  emptyremovecoupon.setAttribute("colspan", "3");
  removecoupon.appendChild(emptyremovecoupon);

  const removecouponlable = document.createElement("td");
  // removecouponlable.textContent = "CouponApplied Succesfully";
  removecouponlable.classList.add("removecouponlable"); // Add a class to this cell
  emptyremovecoupon.appendChild(removecouponlable);

  // const emptyremovecoupon2 = document.createElement("td");
  // emptyremovecoupon2.setAttribute("colspan", "1");
  // removecoupon.appendChild(emptyremovecoupon2);

  // const closeButton = document.createElement("button");
  // closeButton.textContent = "X";
  // closeButton.classList.add("remove-button");
  // //  removecoupon.style.display = "none";
  // closeButton.addEventListener("click", () => {
  //   removeCoupon(); // Function to apply the coupon logic
  // });
  // emptyremovecoupon2.appendChild(closeButton);
  table.appendChild(removecoupon);

  //  isCouponApplied = true;
  function removeCoupon() {
    showCartModal();
  }
  // ------------------------------------horizontal-line start------------------------------------

  const emptyFooterRow1 = document.createElement("tr");

  const emptyFooterCell1 = document.createElement("td");
  emptyFooterCell1.setAttribute("colspan", "4");
  emptyFooterCell1.classList.add("footer-hr-cell"); // Add a class to this cell
  emptyFooterRow1.appendChild(emptyFooterCell1);

  table.appendChild(emptyFooterRow1);

  // ------------------------------------Empty-row------------------------------------

  const emptyFooterRow = document.createElement("tr");
  const emptyFooterCell = document.createElement("td");
  emptyFooterCell.setAttribute("colspan", headerNames.length);
  emptyFooterRow.appendChild(emptyFooterCell);
  table.appendChild(emptyFooterRow);

  // ------------------------------------itemtotal-row------------------------------------

  const itemtotal = document.createElement("tr");
  itemtotal.classList.add("cart-footer");

  const emptyCell3 = document.createElement("td");
  emptyCell3.textContent = "Item-Total";
  emptyCell3.classList.add("cart-footer");
  itemtotal.appendChild(emptyCell3);

  const emptyCell4 = document.createElement("td");
  emptyCell4.setAttribute("colspan", "2");
  itemtotal.appendChild(emptyCell4);

  const Itemtotalcell = document.createElement("td");
  Itemtotalcell.textContent = `₹ ${calculateitemTotal().toFixed(2)}`;
  Itemtotalcell.classList.add("cart-footer");
  itemtotal.appendChild(Itemtotalcell);

  table.appendChild(itemtotal);

  // ------------------------------------delivery-row------------------------------------

  const delivery = document.createElement("tr");

  const emptyCell5 = document.createElement("td");
  emptyCell5.textContent = "Delivery";
  emptyCell5.classList.add("cart-footer");
  delivery.appendChild(emptyCell5);

  const emptyCell6 = document.createElement("td");
  emptyCell6.setAttribute("colspan", "2");
  delivery.appendChild(emptyCell6);

  const emptyCell10 = document.createElement("td");
  emptyCell10.textContent = "[ Upto 2km ]";
  emptyCell10.classList.add("cart-footer");
  emptyCell6.appendChild(emptyCell10);

  const deliverycell = document.createElement("td");
  deliverycell.textContent = "+ 20";
  deliverycell.classList.add("cart-footer");
  delivery.appendChild(deliverycell);

  table.appendChild(delivery);

  // ----------------------------------- discount row ----------------------------------
  isCouponApplied = false;
  function applyCoupon() {
    const couponInput = document.getElementById("couponInput");
    const userInput = couponInput.value.trim().toLowerCase();

    if (userInput === "india") {
      let itemTotalAmount = parseFloat(
        Itemtotalcell.textContent.replace("₹", "").trim()
      );

      // Calculate the discount based on the item total
      const discount = itemTotalAmount * 0.1; // Calculate 10% discount
      isCouponApplied = true;
      // Update the displayed item total amount
      Itemtotalcell.textContent = `₹ ${itemTotalAmount.toFixed(2)}`;

      // Recalculate the total amount by summing up the updated item total and the delivery (if applicable)
      const deliveryAmount = 20; // Assuming delivery is ₹20
      const totalAmount = itemTotalAmount + deliveryAmount - discount;

      // Update the displayed total amount
      totalcell.textContent = `₹ ${totalAmount.toFixed(2)}`;

      const removecouponlable = document.querySelector(".removecouponlable");
      removecouponlable.textContent = `You Saved ₹${discount} with coupon code`;

      // -----------------------discount row----------------------------
      const discountRow = document.createElement("tr");
      discountRow.classList.add("discount-row"); // Add a class to identify the discount row

      // Create cells for displaying discount information
      const discountCellLabel = document.createElement("td");
      discountCellLabel.textContent = "Discount";
      discountCellLabel.classList.add("cart-footer");
      discountRow.appendChild(discountCellLabel);

      const emptyCell9 = document.createElement("td");
      emptyCell9.setAttribute("colspan", "2");
      discountRow.appendChild(emptyCell9);

      const discountCell = document.createElement("td");
      discountCell.textContent = "[Coupon Apply]";
      discountCell.classList.add("cart-footer");
      emptyCell9.appendChild(discountCell);

      // Create a cell to display the actual discount amount
      const discountAmountCell = document.createElement("td");
      discountAmountCell.textContent = `- ${discount.toFixed(2)}`; // Display the calculated discount
      discountAmountCell.classList.add("cart-footer");
      discountAmountCell.classList.add("disc");
      discountRow.appendChild(discountAmountCell);

      // Append the discountRow to the table after the item total row
      const itemTotalRow = table.querySelector(".cart-footer"); // Assuming this class identifies the item total row
      itemTotalRow.parentNode.insertBefore(
        discountRow,
        delivery.nextSibling
      );

      // Hide the coupon row
      const couponRow = document.getElementsByClassName("coupon")[0];
      const removecoupon = document.querySelector(".Remove-Coupon");
      couponRow.style.display = "none";
      removecoupon.style.display = "contents";
    } else  {
      // alert("Invalid coupon code or no discount available.");
      const lable = document.querySelector(".error-label")
      const inp = document.querySelector (".coupon-input")
      lable.style.display = "block"
      inp.style.borderColor = "red";
        }
  }
  // ------------------------------------Total-row------------------------------------

  const Total = document.createElement("tr");

  const emptyCell7 = document.createElement("td");
  emptyCell7.textContent = "Total";
  emptyCell7.classList.add("cart-footer");
  Total.appendChild(emptyCell7);

  const emptyCell8 = document.createElement("td");
  emptyCell8.setAttribute("colspan", "2");
  Total.appendChild(emptyCell8);

  const totalcell = document.createElement("td");
  totalcell.textContent = `${calculateTotal()}`;
  totalcell.classList.add("cart-footer");
  Total.appendChild(totalcell);

  table.appendChild(Total);
  // ------------------------------------submit-row------------------------------------

  const submitrow = document.createElement("tr");

  const emptyCell = document.createElement("td");
  emptyCell.setAttribute("colspan", "2");
  submitrow.appendChild(emptyCell);

  const submitCell = document.createElement("td");
  submitCell.setAttribute("colspan", "2");
  submitCell.classList.add("submit-cell");
  submitrow.appendChild(submitCell);
  // Create the "Submit Order" button
  const submitButton = document.createElement("button");
  submitButton.textContent = "Place Order";
  submitButton.classList.add("submit-button");
  submitButton.addEventListener("click", () => {
    submitOrder(cartData);
  });
  submitCell.appendChild(submitButton); // Append the button to the submit cell

  table.appendChild(submitrow);

  const emptyFooterRow2 = document.createElement("tr");
  const emptyFooterCell5 = document.createElement("td");
  emptyFooterCell5.setAttribute("colspan", headerNames.length);
  emptyFooterRow2.appendChild(emptyFooterCell5);
  table.appendChild(emptyFooterRow2);

  cartItemsContainer.appendChild(table);
}
// Function to add product details to the invoice
function addToInvoice(name, quantity, price, total) {
  // Create elements or manipulate your invoice content here
  // For example, you can append this information to a separate invoice content variable
  const invoiceContent = `Product: ${name}, Quantity: ${quantity}, Price: ₹${price}, Total: ₹${total}`;
  // Append this content to your invoice
}

function updatePrice(item, priceCell) {
  // Update the price cell with the new calculated price
  priceCell.textContent = `₹ ${item.price * item.quantity}`;
}

// -------------------------Cart_data_End------------------------------------

function closeCartModal() {
  document.getElementById("cartModal").style.display = "none";
  isCartModalOpen = false;

  // Show the menu-header when the cart modal is closed
  const menuHeader = document.getElementById("menu-head");
  if (menuHeader) {
    menuHeader.style.display = "flex";
  }
  document.getElementById("dark-mode-toggle").style.display = "block";
  const cartModal = document.getElementById("cartModal");
  cartModal.style.display = "none";

  const marqueeElement = document.getElementById("marqueeElement");

  // Check if the marquee element exists and show it if found
  if (marqueeElement) {
    marqueeElement.style.display = "block";
  }
}

function addToCart(id, name, price, image, value) {
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

function showDropdown(itemId) {
  const dropdown = document.getElementById(`dropdown-${itemId}`);
  dropdown.style.display = "block";
}

function hideDropdown(itemId) {
  const dropdown = document.getElementById(`dropdown-${itemId}`);
  dropdown.style.display = "none";
}

function addToCartWithSize(id, name, image) {
  const dropdown = document.getElementById(`dropdown-options-${id}`);
  const selectedOption = dropdown.options[dropdown.selectedIndex].text;
  const size = selectedOption.split("-")[0].trim();
  const price = parseInt(selectedOption.split("₹")[1]);

  // You can add the selected size and price to the cartData object
  addToCart(id, `${name} (${size})`, price, image);
  // hideDropdown(id);
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
    function uncustomize(item) {
      return `
  <div class="box" >
  <span class="dis product-price"><b>${Math.round(
    ((item.mrp - item.price) / item.mrp) * 100
  )}</b>% off</span>
  <img src="${item.image}" alt="img" onclick="zoomImage(this)">
  <h3 class="product-name" >${item.name}</h3>
  <span class="pricee product-price"> <b>₹ ${item.price}</b> 
  <del class="mrp">₹ ${item.mrp}</del>
   <span class="rev"> 4.7 <i class="fas fa-star"></i></span>
   </span>
   <div class="stars"></div>
  
  <h2 class="btn add-to-cart "  onclick="addToCart('${item.id}', '${
        item.name
      }', ${item.price}, '${item.image}') ">ADD</h2>
   
 <form class="quantity-control" style="display: none;">
 <div class="value-button decrease" onclick="decreaseValue(${
   item.id
 })" value="Decrease Value"><i class="fas fa-minus-circle"></i></div>
 <input type="number" class="number" id="number-${
   item.id
 }" value="1" readonly />
 <div class="value-button increase" onclick="increaseValue(${
   item.id
 })" value="Increase Value"><i class="fas fa-plus-circle"></i></div>
</form>

  </div>
  `;
    }
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
    let Vegetables = "";
    let Roti = "";
    let Snacks = "";
    let Chaap = "";
    let Momos = "";
    for (let i = 0; i < products.length; i++) {
      const item = products[i];
      if (i < 6) {
        Single += `
  <div class="box" >
  <span class="dis product-price"><b>${Math.round(
    ((item.mrp - item.price.Small) / item.mrp) * 100
  )}</b>% off</span>
  <img src="${item.image}" alt="img" onclick="zoomImage(this)">
  <h3 class="product-name" >${item.name}</h3>
   </span>
   <div class="stars"></div>
   <div class="dropdownn" id="dropdown-${item.id}" style="display: flex;">
   <select class="size" id="dropdown-options-${item.id}">
     <option value="Small">Small - ₹${item.price.Small}</option>
     <option value="Regular">Regular - ₹${item.price.Regular}</option>
   </select><br><br>
 </div>
 <button class="btn btn-ok add-to-cart" onclick="addToCartWithSize('${
   item.id
 }', '${item.name}', '${item.image}')">Add</button>
  
 <form class="quantity-control" style="display: none;">
 <div class="value-button decrease" onclick="decreaseValue(${
   item.id
 })" value="Decrease Value"><i class="fas fa-minus-circle"></i></div>
 <input type="number" class="number" id="number-${
   item.id
 }" value="1" readonly  />
 <div class="value-button increase" onclick="increaseValue(${
   item.id
 })" value="Increase Value"><i class="fas fa-plus-circle"></i></div>
</form>

  </div>
  `;
        Single += `
<div class="image-zoom-container" id="image-zoom-container">
<span class="close-zoom" onclick="closeZoomImage()">&times;</span>
<img class="zoomed-image" id="zoomed-image">
</div>
`;
      }
      if (i >= 6 && i < 12) {
        Double += `
  <div class="box" >
  <span class="dis product-price"><b>${Math.round(
    ((item.mrp - item.price.Small) / item.mrp) * 100
  )}</b>% off</span>
  <img src="${item.image}" alt="img" onclick="zoomImage(this)">
  <h3 class="product-name" >${item.name}</h3>
   </span>
   <div class="stars"></div>
   <div class="dropdownn" id="dropdown-${item.id}" style="display: flex;">
   <select class="size" id="dropdown-options-${item.id}">
     <option value="Small">Small - ₹${item.price.Small}</option>
     <option value="Regular">Regular - ₹${item.price.Regular}</option>
     <option value="Medium">Medium - ₹${item.price.Medium}</option>
   </select><br><br>
 </div>
 <button class="btn btn-ok add-to-cart" onclick="addToCartWithSize('${
   item.id
 }', '${item.name}', '${item.image}')">Add</button>
 
 <form class="quantity-control" style="display: none;">
 <div class="value-button decrease" onclick="decreaseValue(${
   item.id
 })" value="Decrease Value"><i class="fas fa-minus-circle"></i></div>
 <input type="number" class="number" id="number-${
   item.id
 }" value="1" readonly  />
 <div class="value-button increase" onclick="increaseValue(${
   item.id
 })" value="Increase Value"><i class="fas fa-plus-circle"></i></div>
</form>

  </div>
  `;
        Double += `
<div class="image-zoom-container" id="image-zoom-container">
<span class="close-zoom" onclick="closeZoomImage()">&times;</span>
<img class="zoomed-image" id="zoomed-image">
</div>
`;
      }
      if (i >= 12 && i < 20) {
        Premium += `
  <div class="box" >
  <span class="dis product-price"><b>${Math.round(
    ((item.mrp - item.price.Regular) / item.mrp) * 100
  )}</b>% off</span>
  <img src="${item.image}" alt="img" onclick="zoomImage(this)">
  <h3 class="product-name" >${item.name}</h3>
   <div class="stars"></div>
  <p>${item.p}</p>
  <div class="dropdownn" id="dropdown-${item.id}" style="display: flex;">
  <select class="size" id="dropdown-options-${item.id}">
    <option value="Regular">Regular - ₹${item.price.Regular}</option>
    <option value="Medium">Medium - ₹${item.price.Medium}</option>
    <option value="Large">Large - ₹${item.price.Large}</option>
  </select><br><br>
</div>
<button class="btn btn-ok add-to-cart" onclick="addToCartWithSize('${
          item.id
        }', '${item.name}', '${item.image}')">Add</button>
    
 <form class="quantity-control" style="display: none;">
 <div class="value-button decrease" onclick="decreaseValue(${
   item.id
 })" value="Decrease Value"><i class="fas fa-minus-circle"></i></div>
 <input type="number" class="number" id="number-${
   item.id
 }" value="1" readonly  />
 <div class="value-button increase" onclick="increaseValue(${
   item.id
 })" value="Increase Value"><i class="fas fa-plus-circle"></i></div>
</form>

  </div>
  `;
        Premium += `
<div class="image-zoom-container" id="image-zoom-container">
<span class="close-zoom" onclick="closeZoomImage()">&times;</span>
<img class="zoomed-image" id="zoomed-image">
</div>
`;
      }
      if (i >= 20 && i < 23) {
        Burger += uncustomize(item);

        Burger += `
<div class="image-zoom-container" id="image-zoom-container">
<span class="close-zoom" onclick="closeZoomImage()">&times;</span>
<img class="zoomed-image" id="zoomed-image">
</div>
`;
      }
      if (i >= 23 && i < 27) {
        Sandwich += uncustomize(item);
      }
      if ((i >= 27 && i < 30) || i === 68 || i === 69) {
        Wrap += uncustomize(item);
      }
      if (i >= 30 && i < 33) {
        Garlic += uncustomize(item);
      }
      if (i >= 33 && i < 38) {
        Pasta += uncustomize(item);
      }
      if (i >= 38 && i < 44) {
        Shakes += uncustomize(item);
      }
      if (i >= 44 && i < 50) {
        Chaap += uncustomize(item);
      }
      if (i >= 50 && i < 61) {
        Chinese += uncustomize(item);
      }
      if (i >= 61 && i < 64) {
        Momos += uncustomize(item);
      }
      if (i >= 64 && i < 68) {
        Snacks += uncustomize(item);
      }
      if (i >= 70 && i < 87) {
        Vegetables += `
  <div class="box" >
  <span class="dis product-price"><b>${Math.round(
    ((item.mrp - item.price.Half) / item.mrp) * 100
  )}</b>% off</span>
  <img src="${item.image}" alt="img" onclick="zoomImage(this)">
  <h3 class="product-name" >${item.name}</h3>
   <div class="stars"></div>
   <div class="dropdownn" id="dropdown-${item.id}" style="display: flex;">
   <select class="size" id="dropdown-options-${item.id}">
     <option value="Half">Half - ₹${item.price.Half}</option>
     <option value="Full">Full - ₹${item.price.Full}</option>
   </select><br><br>
 </div>
 <button class="btn btn-ok add-to-cart" onclick="addToCartWithSize('${
   item.id
 }', '${item.name}', '${item.image}')">Add</button>
  
 <form class="quantity-control" style="display: none;">
 <div class="value-button decrease" onclick="decreaseValue(${
   item.id
 })" value="Decrease Value"><i class="fas fa-minus-circle"></i></div>
 <input type="number" class="number" id="number-${
   item.id
 }" value="1" readonly  />
 <div class="value-button increase" onclick="increaseValue(${
   item.id
 })" value="Increase Value"><i class="fas fa-plus-circle"></i></div>
</form>

  </div>
  `;
        Vegetables += `
  <div class="image-zoom-container" id="image-zoom-container">
  <span class="close-zoom" onclick="closeZoomImage()">&times;</span>
  <img class="zoomed-image" id="zoomed-image">
  </div>
  `;
      }
      if (i >= 87 && i < 99) {
        Roti += uncustomize(item);
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
    document.querySelector(".Snacks").innerHTML = Snacks;
    document.querySelector(".Vegetables").innerHTML = Vegetables;
    document.querySelector(".Roti").innerHTML = Roti;
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

    localStorage.setItem("darkMode", "enabled");
  } else {
    modeIcon.classList.remove("fa-sun");
    modeIcon.classList.add("fa-moon");

    localStorage.setItem("darkMode", "disabled");
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const modeIcon = document.getElementById("mode-icon");

  // Check if the user has a preference in localStorage
  const darkModePreference = localStorage.getItem("darkMode");

  if (darkModePreference === "enabled") {
    body.classList.add("dark-mode");
    modeIcon.classList.remove("fa-moon");
    modeIcon.classList.add("fa-sun");
  } else {
    body.classList.remove("dark-mode");
    modeIcon.classList.remove("fa-sun");
    modeIcon.classList.add("fa-moon");
  }
});

// JavaScript function to zoom in on an image
function zoomImage(image) {
  const zoomedImage = document.getElementById("zoomed-image");
  const imageZoomContainer = document.getElementById("image-zoom-container");

  zoomedImage.src = image.src;
  imageZoomContainer.style.display = "block";
}

// JavaScript function to close the zoomed-in image
function closeZoomImage() {
  const imageZoomContainer = document.getElementById("image-zoom-container");
  imageZoomContainer.style.display = "none";
}

function increaseValue(itemId) {
  var value = parseInt(document.getElementById(`number-${itemId}`).value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById(`number-${itemId}`).value = value;
  updateCartData(itemId, value);
}

function decreaseValue(itemId) {
  var valueElement = document.getElementById(`number-${itemId}`);
  var value = parseInt(valueElement.value, 10);
  value = isNaN(value) ? 0 : value;

  // Check if the value is greater than 1
  if (value > 1) {
    value--;
    valueElement.value = value;
    updateCartData(itemId, value);
  } else {
    // If the value is 1 or less, hide the quantity container
    valueElement.value = 1;
    delete cartData[itemId];
    updateCartCount(); // Update the cart count
    hideQuantityContainer(itemId);
  }
}

function updateCartData(itemId, quantity) {
  if (cartData.hasOwnProperty(itemId)) {
    cartData[itemId].quantity = quantity;
  }
}

function hideQuantityContainer(itemId) {
  const quantityContainer = document
    .getElementById(`number-${itemId}`)
    .closest(".quantity-control");
  quantityContainer.style.display = "none";
  cartCount--;
  cartCountElement.textContent = cartCount;

  const button = quantityContainer.parentNode.querySelector(".add-to-cart");
  button.style.display = "inline-block";
}
// Function to generate and download the invoice using pdfmake
function generateAndDownloadInvoice(shopName, ownerName, mobileNo, cartData) {
  const customerData = JSON.parse(localStorage.getItem("userData"));

  const {
    name: customerName,
    address: customerAddress,
    mobileNumber: customerPhone,
  } = customerData;
  // Create an array to store the table body data
  const tableBody = [];

  // Add header row to the table
  tableBody.push(["Products", "Quantity", "Price", "Total"]);

  // Iterate through the cart items and add them to the table
  for (const itemId in cartData) {
    if (cartData.hasOwnProperty(itemId)) {
      const item = cartData[itemId];
      tableBody.push([
        item.name,
        item.quantity,
        `₹ ${item.price}`,
        `₹ ${item.price * item.quantity}`,
      ]);
    }
  }

  // Calculate the total amount including the delivery charge
  const deliveryCharge = 20; // You can adjust this value as needed
  const itemTotal = Object.values(cartData).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalAmount = itemTotal + deliveryCharge;
  const Discount = itemTotal * 0.1;
  const FinalAmount = itemTotal + deliveryCharge - Discount;

  // Define the content for your PDF
  const docDefinition = {
    content: [
      { text: "Foodies Hub", style: "header" },
      { text: `Guru Nanak Colony, Pehowa, Haryana`, style: "headerr" },
      { text: `Phone Number - 7015823645`, style: "headerr" },
      {
        canvas: [
          { type: "line", x1: 0, y1: 10, x2: 515, y2: 10, lineWidth: 2 },
        ],
        margin: [0, 20],
      },
      { text: "Invoice Details", style: "subheader" },
      { text: `Customer Name   -     ${customerName}`, style: "customerInfo" },
      {
        text: `Address                 -     ${customerAddress}`,
        style: "customerInfo",
      },
      {
        text: ` Phone Number     -     ${customerPhone}`,
        style: "customerInfoWithSpace",
      },
      {
        table: {
          widths: ["*", "auto", "auto", "auto"],
          headerRows: 1,
          alignment: "center",
          margin: [0, 10, 0, 0],
          body: tableBody,
        },
        style: "tableStyle", // Add style for the table body content
      },
      {
        text: `Item Total:          ₹ ${itemTotal.toFixed(2)}/-`,
        style: "total",
      },
      { text: `Service Charge:     + 20.00/-`, style: "totall" },
    ],
    styles: {
      header: {
        fontSize: 35,
        bold: true,
        alignment: "center",
        margin: [0, 0, 0, 10], // Adjust margins as needed
      },
      headerr: {
        fontSize: 25,
        alignment: "center",
        margin: [0, 0, 0, 10], // Adjust margins as needed
      },
      subheader: {
        fontSize: 25,
        bold: true,
        alignment: "center",
        margin: [0, 10, 0, 5],
      },
      total: {
        fontSize: 25,
        bold: true,
        alignment: "right",
        margin: [0, 60, 0, 0],
      },
      totall: {
        fontSize: 25,
        bold: true,
        alignment: "right",
        margin: [0, 10, 0, 0],
      },
      tableStyle: {
        fontSize: 15,
      },
      customerInfo: {
        fontSize: 20,
        alignment: "left",
        margin: [0, 10, 0, 0],
      },
      customerInfoWithSpace: {
        // Adjusted style with space
        fontSize: 20,
        alignment: "left",
        margin: [0, 10, 0, 20], // Increase bottom margin
      },
    },
  };
  if (isCouponApplied) {
    // If coupon applied, show the Discount and Final Amount
    docDefinition.content.push(
      {
        text: `Discount:          - ${Discount.toFixed(2)}/-`,
        style: "totall",
      },
      {
        text: `Final Amount:    ₹ ${FinalAmount.toFixed(2)}/-`,
        style: "totall",
      }
    );
  } else {
    // If no coupon applied, show the Total Amount
    docDefinition.content.push({
      text: `Total Amount:    ₹ ${totalAmount.toFixed(2)}/-`,
      style: "totall",
    });
  }
  // Generate the PDF
  const pdfDocGenerator = pdfMake.createPdf(docDefinition);

  // Download the PDF
  pdfDocGenerator.download("invoice.pdf");
}

function showPopup() {
  // Create the popup element
  var popup = document.createElement("div");
  popup.className = "popup";

  // Create the close button (X button) in the top right corner
  var closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.className = "close-button";

  // Add a click event listener to the close button to close the popup
  closeButton.addEventListener("click", function () {
    location.reload();
  });
  // Create the success message
  var successMessage = document.createElement("p");
  successMessage.textContent = "Order placed successfully!";

  // Create a container div for centering the button
  var buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  // Create the "View Invoice" button
  var viewInvoiceButton = document.createElement("button");
  viewInvoiceButton.textContent = "Download Invoice";
  viewInvoiceButton.classList.add("popup-invoice-button");

  // Add an event listener to the button (you can replace the function with your own logic)
  viewInvoiceButton.addEventListener("click", function () {
    generateAndDownloadInvoice(
      "Foodies Hub",
      "Neeraj Manchanda",
      "7015823645",
      cartData
    );
  });
  // Append elements to the popup
  popup.appendChild(closeButton);
  popup.appendChild(successMessage);
  buttonContainer.appendChild(viewInvoiceButton);
  popup.appendChild(buttonContainer);

  // Create the overlay element
  var overlay = document.createElement("div");
  overlay.className = "overlay";

  // Append the popup and overlay to the body
  document.body.appendChild(overlay);
  document.body.appendChild(popup);

  // Show the popup and overlay
  overlay.style.display = "block";
  popup.style.display = "block";

  // Function to close the popup
  function closePopup() {
    overlay.style.display = "none";
    popup.style.display = "none";
  }
}

function isUserSignedUp() {
  const userData = localStorage.getItem("userData");
  return userData !== null;
}

// Get references to the menuheader elements
const menuheader = document.getElementById("menu-head");
const navbar = document.querySelector(".navbar");

const specificScrollPosition = 1896;

window.addEventListener("scroll", function () {
  let scrollPosition = window.scrollY || window.scrollY;
  // console.log('Scroll position:', scrollPosition);
  if (scrollPosition > specificScrollPosition && !isCartModalOpen) {
    menuheader.style.display = "flex";
    navbar.classList.add("activee");
  } else {
    menuheader.style.display = "none";
    navbar.classList.remove("activee");
  }
});

const marqueeElement = document.getElementById("marqueeElement");
const scrollThreshold = window.innerHeight; // 100vh

function handleScroll() {
  let scrollPosition = window.scrollY || window.scrollY;

  if (scrollPosition <= scrollThreshold) {
    marqueeElement.style.display = "block"; // Hide the marquee element
  } else {
    marqueeElement.style.display = "none"; // Show the marquee element
  }
}
// Add a one-time listener to handle initial display
window.addEventListener("DOMContentLoaded", handleScroll);

// Add the scroll listener to handle subsequent scrolling
window.addEventListener("scroll", handleScroll);
