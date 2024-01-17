let menubar=document.querySelector("#menu-bars"),mynav=document.querySelector(".navbar");menubar.onclick=()=>{menubar.classList.toggle("fa-times"),mynav.classList.toggle("active")};const navbarItems=document.querySelectorAll(".navbar a:not(#menu-bars)");navbarItems.forEach(e=>{e.addEventListener("click",()=>{mynav.classList.contains("active")&&(menubar.classList.toggle("fa-times"),mynav.classList.toggle("active"))})});var cartData={};let cartCount=0,cartCountElement=document.getElementById("cart-count");function handleAddToCartClick(e){let t=e.target.closest(".add-to-cart");if(t){if(isUserSignedUp()){if(isUserSignedUp()){let a=t.parentNode.querySelector(".quantity-control");t.style.display="none",a.style.display="flex",cartCount++,cartCountElement.textContent=cartCount}}else e.preventDefault(),alert("Enter Your Address First\n\nNote: This is a one-time requirement."),window.location.href="signup.html"}}function calculateitemTotal(){let e=0;for(let t in cartData)cartData.hasOwnProperty(t)&&(e+=cartData[t].quantity*cartData[t].price);return e}function calculateTotal(){let e=20;for(let t in cartData)cartData.hasOwnProperty(t)&&(e+=cartData[t].quantity*cartData[t].price);let a=document.querySelector(".disc");if(a&&a.textContent){let n=parseFloat(a.textContent.replace(/[^\d.-]/g,""));isNaN(n)||(e-=Math.abs(n))}return` ${e.toFixed(2)}`}function getRandom4DigitNumber(){return Math.floor(1e3+9e3*Math.random())}function calculateDiscount(e){return .1*e}let isCouponApplied=!1;function submitOrder(e){let t=getRandom4DigitNumber(),a=JSON.parse(localStorage.getItem("userData"));var n=calculateTotal();if("string"!=typeof(n=`₹ ${n}`)){console.error("Total amount is not in the expected format");return}let l=document.querySelector(".disc"),i=calculateitemTotal(),o=calculateDiscount(i);updateDiscount(l,o);var s=`Order      : *ORD-${t}*
`;for(let d in s+=`Phone    : *${a.mobileNumber}*
`,s+=`Name     : *${a.name}*
`,s+=`Amount : *${n}*
`,s+=`Address : *${a.address}*

`,s+="----------items----------\n\n",e)if(e.hasOwnProperty(d)){let r=e[d];s+=`${r.quantity}.0 x   ${r.name} = ₹ ${r.price}
`}s+=`Service Charge = ₹ 20.00
`,isCouponApplied&&(s+=`Discount : *₹ ${o.toFixed(2)}*
`);var c="https://api.whatsapp.com/send?phone=+917015516336&text="+encodeURIComponent(s);window.open(c,"_blank"),setTimeout(function(){showPopup()},5e3)}function updateDiscount(e,t){e&&(e.textContent=`- ${t.toFixed(2)}`)}let isCartModalOpen=!1;function showCartModal(){if(0===Object.keys(cartData).length){closeCartModal();return}document.getElementById("cartModal").style.display="block",isCartModalOpen=!0;let e=document.getElementById("menu-head");e&&(e.style.display="none");let t=document.getElementById("marqueeElement");if(t&&(t.style.display="none"),document.getElementById("dark-mode-toggle").style.display="none",cartCount<1){alert("Please add items to the cart first."),closeCartModal();return}let a=document.getElementById("cartModal");a.style.display="block";let n=document.getElementById("cartItems");n.innerHTML="",n.style.maxHeight="500px",n.style.overflowX="auto";let l=document.createElement("table");l.classList.add("cart-table");let i=document.createElement("tr"),o=["Image","Name","Quantity","Price"];for(let s of o){let d=document.createElement("th");d.textContent=s,("Name"===s||"Quantity"===s||"Image"===s||"Price"===s)&&d.classList.add("header-spaced"),i.appendChild(d)}for(let r in l.appendChild(i),cartData)if(cartData.hasOwnProperty(r)){let c=cartData[r],p=document.createElement("tr"),m=document.createElement("td");m.classList.add("center-align");let u=document.createElement("img");u.src=c.image,u.alt=c.name,m.appendChild(u),p.appendChild(m);let y=document.createElement("td");y.classList.add("center-align"),y.textContent=c.name,p.appendChild(y);let g=document.createElement("td");g.classList.add("center-align");let h=document.createElement("i");h.classList.add("fas","fa-minus","quantity-icon"),h.setAttribute("data-item-id",r),h.addEventListener("click",()=>{if(c.quantity>1){c.quantity--,v.textContent=c.quantity,updatePrice(c,C),I();let e=document.querySelector(".disc"),t=calculateitemTotal();if(isNaN(t))console.error("Invalid item total amount:",t);else{F.textContent=`₹ ${t.toFixed(2)}`;let a=calculateDiscount(t);if(updateDiscount(e,a),isCouponApplied){let n=t+20-a;Y.textContent=`₹ ${n.toFixed(2)}`}else{let l=t+20;Y.textContent=`₹ ${l.toFixed(2)}`}}}else delete cartData[r],showCartModal(),updateCartCount(),hideQuantityContainer(r)}),g.appendChild(h);let v=document.createElement("span");v.classList.add("item-quantity"),v.textContent=c.quantity,g.appendChild(v);let f=document.createElement("i");f.classList.add("fas","fa-plus","quantity-icon"),f.setAttribute("data-item-id",r),f.addEventListener("click",()=>{c.quantity++,v.textContent=c.quantity,updatePrice(c,C),I();let e=document.querySelector(".disc"),t=calculateitemTotal();if(isNaN(t))console.error("Invalid item total amount:",t);else{F.textContent=`₹ ${t.toFixed(2)}`;let a=calculateDiscount(t);if(updateDiscount(e,a),isCouponApplied){let n=t+20-a;Y.textContent=`₹ ${n.toFixed(2)}`}else{let l=t+20;Y.textContent=`₹ ${l.toFixed(2)}`}}}),g.appendChild(f),p.appendChild(g);let C=document.createElement("td");C.classList.add("center-align"),C.textContent=`₹ ${c.price*c.quantity}`,p.appendChild(C),l.appendChild(p),addToInvoice(c.name,c.quantity,c.price,c.price*c.quantity)}let b=document.createElement("tr");b.classList.add("coupon");let E=document.createElement("td");E.setAttribute("colspan","4"),b.appendChild(E);let $=document.createElement("div");$.classList.add("input-container");let x=document.createElement("input");x.setAttribute("type","text"),x.setAttribute("placeholder","Enter coupon code"),x.classList.add("coupon-input"),x.setAttribute("id","couponInput"),$.appendChild(x);let L=document.createElement("button");L.textContent="Apply",L.classList.add("apply-button"),L.addEventListener("click",()=>{(function e(){let t=document.getElementById("couponInput"),a=t.value.trim().toLowerCase();if("foodies"===a){let n=parseFloat(F.textContent.replace("₹","").trim()),i=.1*n;isCouponApplied=!0,F.textContent=`₹ ${n.toFixed(2)}`,Y.textContent=`₹ ${(n+20-i).toFixed(2)}`;let o=document.querySelector(".removecouponlable");o.textContent=`You Saved ₹${i} with coupon code`;let s=document.createElement("tr");s.classList.add("discount-row");let d=document.createElement("td");d.textContent="Discount",d.classList.add("cart-footer"),s.appendChild(d);let r=document.createElement("td");r.setAttribute("colspan","2"),s.appendChild(r);let c=document.createElement("td");c.textContent="[Coupon Apply]",c.classList.add("cart-footer"),r.appendChild(c);let p=document.createElement("td");p.textContent=`- ${i.toFixed(2)}`,p.classList.add("cart-footer"),p.classList.add("disc"),s.appendChild(p);let m=l.querySelector(".cart-footer");m.parentNode.insertBefore(s,H.nextSibling);let u=document.getElementsByClassName("coupon")[0],y=document.querySelector(".Remove-Coupon");u.style.display="none",y.style.display="contents"}else{let g=document.querySelector(".error-label"),h=document.querySelector(".coupon-input");g.style.display="block",h.style.borderColor="red"}})()}),$.appendChild(L),E.appendChild($);let S=document.createElement("label");function I(){let e=calculateDiscount(calculateitemTotal()),t=document.querySelector(".removecouponlable");isCouponApplied?t.textContent=`You Saved ₹${e.toFixed(2)} with coupon code`:t.textContent=""}S.textContent="Invalid coupon code!",S.classList.add("error-label"),E.appendChild(S),l.appendChild(b);let k=document.createElement("tr");k.classList.add("Remove-Coupon");let q=document.createElement("td");q.setAttribute("colspan","3"),k.appendChild(q);let D=document.createElement("td");function z(){showCartModal()}D.classList.add("removecouponlable"),q.appendChild(D),l.appendChild(k);let _=document.createElement("tr"),w=document.createElement("td");w.setAttribute("colspan","4"),w.classList.add("footer-hr-cell"),_.appendChild(w),l.appendChild(_);let M=document.createElement("tr"),T=document.createElement("td");T.setAttribute("colspan",o.length),M.appendChild(T),l.appendChild(M);let A=document.createElement("tr");A.classList.add("cart-footer");let B=document.createElement("td");B.textContent="Item-Total",B.classList.add("cart-footer"),A.appendChild(B);let P=document.createElement("td");P.setAttribute("colspan","2"),A.appendChild(P);let F=document.createElement("td");F.textContent=`₹ ${calculateitemTotal().toFixed(2)}`,F.classList.add("cart-footer"),A.appendChild(F),l.appendChild(A);let H=document.createElement("tr"),V=document.createElement("td");V.textContent="Delivery",V.classList.add("cart-footer"),H.appendChild(V);let N=document.createElement("td");N.setAttribute("colspan","2"),H.appendChild(N);let O=document.createElement("td");O.textContent="[ Upto 2km ]",O.classList.add("cart-footer"),N.appendChild(O);let R=document.createElement("td");R.textContent="+ 20",R.classList.add("cart-footer"),H.appendChild(R),l.appendChild(H),isCouponApplied=!1;let j=document.createElement("tr"),W=document.createElement("td");W.textContent="Total",W.classList.add("cart-footer"),j.appendChild(W);let U=document.createElement("td");U.setAttribute("colspan","2"),j.appendChild(U);let Y=document.createElement("td");Y.textContent=`${calculateTotal()}`,Y.classList.add("cart-footer"),j.appendChild(Y),l.appendChild(j);let Q=document.createElement("tr"),Z=document.createElement("td");Z.setAttribute("colspan","2"),Q.appendChild(Z);let G=document.createElement("td");G.setAttribute("colspan","2"),G.classList.add("submit-cell"),Q.appendChild(G);let X=document.createElement("button");X.textContent="Place Order",X.classList.add("submit-button"),X.addEventListener("click",()=>{submitOrder(cartData)}),G.appendChild(X),l.appendChild(Q);let J=document.createElement("tr"),K=document.createElement("td");K.setAttribute("colspan",o.length),J.appendChild(K),l.appendChild(J),n.appendChild(l)}function addToInvoice(e,t,a,n){}function updatePrice(e,t){t.textContent=`₹ ${e.price*e.quantity}`}function closeCartModal(){document.getElementById("cartModal").style.display="none",isCartModalOpen=!1,document.getElementById("dark-mode-toggle").style.display="block";let e=document.getElementById("cartModal");e.style.display="none"}function addToCart(e,t,a,n,l){cartData.hasOwnProperty(e)?cartData[e].quantity+=1:cartData[e]={name:t,price:a,image:n,quantity:1},updateCartCount()}function showDropdown(e){let t=document.getElementById(`dropdown-${e}`);t.style.display="block"}function hideDropdown(e){let t=document.getElementById(`dropdown-${e}`);t.style.display="none"}function addToCartWithSize(e,t,a){let n=document.getElementById(`dropdown-options-${e}`),l=n.options[n.selectedIndex].text,i=l.split("-")[0].trim(),o=parseInt(l.split("₹")[1]);addToCart(e,`${t} (${i})`,o,a)}function updateCartCount(){let e=document.getElementById("cart-count"),t=0;for(let a in cartData)cartData.hasOwnProperty(a)&&(t+=cartData[a].quantity);e.textContent=t}let http=new XMLHttpRequest;function toggleDarkMode(){let e=document.body;e.classList.toggle("dark-mode");let t=document.getElementById("mode-icon");e.classList.contains("dark-mode")?(t.classList.remove("fa-moon"),t.classList.add("fa-sun"),localStorage.setItem("darkMode","enabled")):(t.classList.remove("fa-sun"),t.classList.add("fa-moon"),localStorage.setItem("darkMode","disabled"))}function zoomImage(e){let t=document.getElementById("zoomed-image"),a=document.getElementById("image-zoom-container");t.src=e.src,a.style.display="block"}function closeZoomImage(){let e=document.getElementById("image-zoom-container");e.style.display="none"}function increaseValue(e){var t=parseInt(document.getElementById(`number-${e}`).value,10);t=isNaN(t)?0:t,t++,document.getElementById(`number-${e}`).value=t,updateCartData(e,t)}function decreaseValue(e){var t=document.getElementById(`number-${e}`),a=parseInt(t.value,10);(a=isNaN(a)?0:a)>1?(a--,t.value=a,updateCartData(e,a)):(t.value=1,delete cartData[e],updateCartCount(),hideQuantityContainer(e))}function updateCartData(e,t){cartData.hasOwnProperty(e)&&(cartData[e].quantity=t)}function hideQuantityContainer(e){let t=document.getElementById(`number-${e}`).closest(".quantity-control");t.style.display="none",cartCount--,cartCountElement.textContent=cartCount;let a=t.parentNode.querySelector(".add-to-cart");a.style.display="inline-block"}function generateAndDownloadInvoice(e,t,a,n){let l=JSON.parse(localStorage.getItem("userData")),{name:i,address:o,mobileNumber:s}=l,d=[];for(let r in d.push(["Products","Quantity","Price","Total"]),n)if(n.hasOwnProperty(r)){let c=n[r];d.push([c.name,c.quantity,`₹ ${c.price}`,`₹ ${c.price*c.quantity}`,])}let p=Object.values(n).reduce((e,t)=>e+t.price*t.quantity,0),m=.1*p,u={content:[{text:"Foodies Hub",style:"header"},{text:"Guru Nanak Colony, Pehowa, Haryana",style:"headerr"},{text:"Phone Number - 7015823645",style:"headerr"},{canvas:[{type:"line",x1:0,y1:10,x2:515,y2:10,lineWidth:2},],margin:[0,20]},{text:"Invoice Details",style:"subheader"},{text:`Customer Name   -     ${i}`,style:"customerInfo"},{text:`Address                 -     ${o}`,style:"customerInfo"},{text:` Phone Number     -     ${s}`,style:"customerInfoWithSpace"},{table:{widths:["*","auto","auto","auto"],headerRows:1,alignment:"center",margin:[0,10,0,0],body:d},style:"tableStyle"},{text:`Item Total:          ₹ ${p.toFixed(2)}/-`,style:"total"},{text:"Service Charge:     + 20.00/-",style:"totall"},],styles:{header:{fontSize:35,bold:!0,alignment:"center",margin:[0,0,0,10]},headerr:{fontSize:25,alignment:"center",margin:[0,0,0,10]},subheader:{fontSize:25,bold:!0,alignment:"center",margin:[0,10,0,5]},total:{fontSize:25,bold:!0,alignment:"right",margin:[0,60,0,0]},totall:{fontSize:25,bold:!0,alignment:"right",margin:[0,10,0,0]},tableStyle:{fontSize:15},customerInfo:{fontSize:20,alignment:"left",margin:[0,10,0,0]},customerInfoWithSpace:{fontSize:20,alignment:"left",margin:[0,10,0,20]}}};isCouponApplied?u.content.push({text:`Discount:          - ${m.toFixed(2)}/-`,style:"totall"},{text:`Final Amount:    ₹ ${(p+20-m).toFixed(2)}/-`,style:"totall"}):u.content.push({text:`Total Amount:    ₹ ${(p+20).toFixed(2)}/-`,style:"totall"});let y=pdfMake.createPdf(u);y.download("invoice.pdf")}function showPopup(){var e=document.createElement("div");e.className="popup";var t=document.createElement("button");t.textContent="X",t.className="close-button",t.addEventListener("click",function(){location.reload()});var a=document.createElement("p");a.textContent="Order placed successfully!";var n=document.createElement("div");n.className="button-container";var l=document.createElement("button");l.textContent="Download Invoice",l.classList.add("popup-invoice-button"),l.addEventListener("click",function(){generateAndDownloadInvoice("Foodies Hub","Neeraj Manchanda","7015823645",cartData)}),e.appendChild(t),e.appendChild(a),n.appendChild(l),e.appendChild(n);var i=document.createElement("div");function o(){i.style.display="none",e.style.display="none"}i.className="overlay",document.body.appendChild(i),document.body.appendChild(e),i.style.display="block",e.style.display="block"}function isUserSignedUp(){let e=localStorage.getItem("userData");return null!==e}http.open("get","products.json",!0),http.send(),http.onload=function(){if(4==this.readyState&&200==this.status){let e=JSON.parse(this.responseText);function t(e){return`
  <div class="box" >
  <span class="dis product-price"><b>${Math.round((e.mrp-e.price)/e.mrp*100)}</b>% off</span>
  <img src="${e.image}" alt="img" onclick="zoomImage(this)">
  <h3 class="product-name" >${e.name}</h3>
  <span class="pricee product-price"> <b>₹ ${e.price}</b> 
  <del class="mrp">₹ ${e.mrp}</del>
   <span class="rev"> 4.7 <i class="fas fa-star"></i></span>
   </span>
   <div class="stars"></div>
  
  <h2 class="btn add-to-cart "  onclick="addToCart('${e.id}', '${e.name}', ${e.price}, '${e.image}') ">ADD</h2>
   
 <form class="quantity-control" style="display: none;">
 <div class="value-button decrease" onclick="decreaseValue(${e.id})" value="Decrease Value"><i class="fas fa-minus-circle"></i></div>
 <input type="number" class="number" id="number-${e.id}" value="1" readonly />
 <div class="value-button increase" onclick="increaseValue(${e.id})" value="Increase Value"><i class="fas fa-plus-circle"></i></div>
</form>

  </div>
  `}let a="",n="",l="",i="",o="",s="",d="",r="",c="",p="",m="",u="",y="",g="",h="";for(let v=0;v<e.length;v++){let f=e[v];v<6&&(i+=`
  <div class="box" >
  <span class="dis product-price"><b>${Math.round((f.mrp-f.price.Small)/f.mrp*100)}</b>% off</span>
  <img src="${f.image}" alt="img" onclick="zoomImage(this)">
  <h3 class="product-name" >${f.name}</h3>
   </span>
   <div class="stars"></div>
   <div class="dropdownn" id="dropdown-${f.id}" style="display: flex;">
   <select class="size" id="dropdown-options-${f.id}">
     <option value="Small">Small - ₹${f.price.Small}</option>
     <option value="Regular">Regular - ₹${f.price.Regular}</option>
   </select><br><br>
 </div>
 <button class="btn btn-ok add-to-cart" onclick="addToCartWithSize('${f.id}', '${f.name}', '${f.image}')">Add</button>
  
 <form class="quantity-control" style="display: none;">
 <div class="value-button decrease" onclick="decreaseValue(${f.id})" value="Decrease Value"><i class="fas fa-minus-circle"></i></div>
 <input type="number" class="number" id="number-${f.id}" value="1" readonly  />
 <div class="value-button increase" onclick="increaseValue(${f.id})" value="Increase Value"><i class="fas fa-plus-circle"></i></div>
</form>

  </div>
  `,i+=`
<div class="image-zoom-container" id="image-zoom-container">
<span class="close-zoom" onclick="closeZoomImage()">&times;</span>
<img class="zoomed-image" id="zoomed-image">
</div>
`),v>=6&&v<12&&(o+=`
  <div class="box" >
  <span class="dis product-price"><b>${Math.round((f.mrp-f.price.Small)/f.mrp*100)}</b>% off</span>
  <img src="${f.image}" alt="img" onclick="zoomImage(this)">
  <h3 class="product-name" >${f.name}</h3>
   </span>
   <div class="stars"></div>
   <div class="dropdownn" id="dropdown-${f.id}" style="display: flex;">
   <select class="size" id="dropdown-options-${f.id}">
     <option value="Small">Small - ₹${f.price.Small}</option>
     <option value="Regular">Regular - ₹${f.price.Regular}</option>
     <option value="Medium">Medium - ₹${f.price.Medium}</option>
   </select><br><br>
 </div>
 <button class="btn btn-ok add-to-cart" onclick="addToCartWithSize('${f.id}', '${f.name}', '${f.image}')">Add</button>
 
 <form class="quantity-control" style="display: none;">
 <div class="value-button decrease" onclick="decreaseValue(${f.id})" value="Decrease Value"><i class="fas fa-minus-circle"></i></div>
 <input type="number" class="number" id="number-${f.id}" value="1" readonly  />
 <div class="value-button increase" onclick="increaseValue(${f.id})" value="Increase Value"><i class="fas fa-plus-circle"></i></div>
</form>

  </div>
  `,o+=`
<div class="image-zoom-container" id="image-zoom-container">
<span class="close-zoom" onclick="closeZoomImage()">&times;</span>
<img class="zoomed-image" id="zoomed-image">
</div>
`),v>=12&&v<20&&(s+=`
  <div class="box" >
  <span class="dis product-price"><b>${Math.round((f.mrp-f.price.Regular)/f.mrp*100)}</b>% off</span>
  <img src="${f.image}" alt="img" onclick="zoomImage(this)">
  <h3 class="product-name" >${f.name}</h3>
   <div class="stars"></div>
  <p>${f.p}</p>
  <div class="dropdownn" id="dropdown-${f.id}" style="display: flex;">
  <select class="size" id="dropdown-options-${f.id}">
    <option value="Regular">Regular - ₹${f.price.Regular}</option>
    <option value="Medium">Medium - ₹${f.price.Medium}</option>
    <option value="Large">Large - ₹${f.price.Large}</option>
  </select><br><br>
</div>
<button class="btn btn-ok add-to-cart" onclick="addToCartWithSize('${f.id}', '${f.name}', '${f.image}')">Add</button>
    
 <form class="quantity-control" style="display: none;">
 <div class="value-button decrease" onclick="decreaseValue(${f.id})" value="Decrease Value"><i class="fas fa-minus-circle"></i></div>
 <input type="number" class="number" id="number-${f.id}" value="1" readonly  />
 <div class="value-button increase" onclick="increaseValue(${f.id})" value="Increase Value"><i class="fas fa-plus-circle"></i></div>
</form>

  </div>
  `,s+=`
<div class="image-zoom-container" id="image-zoom-container">
<span class="close-zoom" onclick="closeZoomImage()">&times;</span>
<img class="zoomed-image" id="zoomed-image">
</div>
`),v>=20&&v<23&&(a+=t(f),a+=`
<div class="image-zoom-container" id="image-zoom-container">
<span class="close-zoom" onclick="closeZoomImage()">&times;</span>
<img class="zoomed-image" id="zoomed-image">
</div>
`),v>=23&&v<27&&(n+=t(f)),(v>=27&&v<30||68===v||69===v)&&(p+=t(f)),v>=30&&v<33&&(c+=t(f)),v>=33&&v<38&&(l+=t(f)),v>=38&&v<44&&(r+=t(f)),v>=44&&v<50&&(g+=t(f)),v>=50&&v<61&&(d+=t(f)),v>=61&&v<64&&(h+=t(f)),v>=64&&v<68&&(y+=t(f)),v>=70&&v<87&&(m+=`
  <div class="box" >
  <span class="dis product-price"><b>${Math.round((f.mrp-f.price.Half)/f.mrp*100)}</b>% off</span>
  <img src="${f.image}" alt="img" onclick="zoomImage(this)">
  <h3 class="product-name" >${f.name}</h3>
   <div class="stars"></div>
   <div class="dropdownn" id="dropdown-${f.id}" style="display: flex;">
   <select class="size" id="dropdown-options-${f.id}">
     <option value="Half">Half - ₹${f.price.Half}</option>
     <option value="Full">Full - ₹${f.price.Full}</option>
   </select><br><br>
 </div>
 <button class="btn btn-ok add-to-cart" onclick="addToCartWithSize('${f.id}', '${f.name}', '${f.image}')">Add</button>
  
 <form class="quantity-control" style="display: none;">
 <div class="value-button decrease" onclick="decreaseValue(${f.id})" value="Decrease Value"><i class="fas fa-minus-circle"></i></div>
 <input type="number" class="number" id="number-${f.id}" value="1" readonly  />
 <div class="value-button increase" onclick="increaseValue(${f.id})" value="Increase Value"><i class="fas fa-plus-circle"></i></div>
</form>

  </div>
  `,m+=`
  <div class="image-zoom-container" id="image-zoom-container">
  <span class="close-zoom" onclick="closeZoomImage()">&times;</span>
  <img class="zoomed-image" id="zoomed-image">
  </div>
  `),v>=87&&v<99&&(u+=t(f))}document.querySelector(".Burger").innerHTML=a,document.querySelector(".Sandwich").innerHTML=n,document.querySelector(".Pasta").innerHTML=l,document.querySelector(".Single_topping").innerHTML=i,document.querySelector(".Double_topping").innerHTML=o,document.querySelector(".Premium").innerHTML=s,document.querySelector(".Chinese").innerHTML=d,document.querySelector(".Shakes").innerHTML=r,document.querySelector(".Garlic").innerHTML=c,document.querySelector(".Wrap").innerHTML=p,document.querySelector(".Chaap").innerHTML=g,document.querySelector(".Momos").innerHTML=h,document.querySelector(".Snacks").innerHTML=y,document.querySelector(".Vegetables").innerHTML=m,document.querySelector(".Roti").innerHTML=u}},document.addEventListener("DOMContentLoaded",function(){let e=document.body,t=document.getElementById("mode-icon"),a=localStorage.getItem("darkMode");"enabled"===a?(e.classList.add("dark-mode"),t.classList.remove("fa-moon"),t.classList.add("fa-sun")):(e.classList.remove("dark-mode"),t.classList.remove("fa-sun"),t.classList.add("fa-moon"))});const menuheader=document.getElementById("menu-head"),navbar=document.querySelector(".navbar"),specificScrollPosition=1896;window.addEventListener("scroll",function(){(window.scrollY||window.scrollY)>1896&&!isCartModalOpen?(menuheader.style.display="flex",navbar.classList.add("activee")):(menuheader.style.display="none",navbar.classList.remove("activee"))});const marqueeElement=document.getElementById("marqueeElement"),scrollThreshold=window.innerHeight;function handleScroll(){(window.scrollY||window.scrollY)<=scrollThreshold?marqueeElement.style.display="block":marqueeElement.style.display="none"}window.addEventListener("DOMContentLoaded",handleScroll),window.addEventListener("scroll",handleScroll);const menuItems=[{id:"paneer",image:"shahipaneer.jpeg",name:"Burger"},{id:"Sandwich",image:"Sandwich.jpg",name:"Sandwich"},{id:"Pasta",image:"whitepasta.jpg",name:"Pasta"},{id:"pizza",image:"s-img-2.jpg",name:"Pizza"},{id:"Chinese",image:"noodles1.jpg",name:"Chinese"},{id:"Shakes",image:"choco.jpg",name:"Shakes"},{id:"Garlic",image:"gb.jpg",name:"Garlic Bread"},{id:"Wrap",image:"paneerwrap.jpeg",name:"Wraps"},{id:"Snacks",image:"bhalle.jpeg",name:"Snacks"},{id:"Momos",image:"momo.jpg",name:"Momos"},{id:"Chaap",image:"chaap1.jpg",name:"Chaap"},{id:"Dinner",image:"shahipaneer.jpeg",name:"Dinner"},];function generateMenuItems(){let e=document.getElementById("menu-head");menuItems.forEach(t=>{let a=document.createElement("div");a.classList.add("menu-item");let n=document.createElement("a");n.href=`#${t.id}`;let l=document.createElement("img");l.src=`images/${t.image}`,l.alt=t.name;let i=document.createElement("span");i.classList.add("menu-name"),i.textContent=t.name,n.appendChild(l),n.appendChild(i),a.appendChild(n),e.appendChild(a)})}generateMenuItems();