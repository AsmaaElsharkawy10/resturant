let toggle_icon = document.querySelector(".fa-bars") ,
    toggled_nav = document.querySelector(".toggled_nav"),
    close_nav_icon = document.querySelector(".fa-xmark"),
    main_nav = document.querySelector("nav ul"),
cart = JSON.parse(localStorage.getItem("cart")) || [];
(cart_icon_num = document.querySelector(".items_num")),
  (cart_poducts_container = document.querySelector(".cart_products")),
  (cart_icon_fav = document.querySelector(".fav_num")),
  (cart_title = document.querySelector(".cart h2")),
  (checkOut = document.querySelector(".checkout_products"));
location_origin = window.location.origin;

 //set cart icon num
if(JSON.parse(localStorage.getItem("cart")))
  {
    cart_icon_num.innerHTML = JSON.parse(localStorage.getItem("cart")).length ;
  
  }
  else
  {
    cart_icon_num.innerHTML = 0
  }
  //set fav icon num
  if(JSON.parse(localStorage.getItem("favourities")))
    {
      cart_icon_fav.innerHTML = JSON.parse(localStorage.getItem("favourities")).length ;
    
    }
    else
    {
      cart_icon_fav.innerHTML = 0
    }
     
  
function chekCartLength(cartArr) {
  if (!cartArr || cartArr.length === 0) {
    cart_title.innerHTML = " ";
    document.querySelector(".cart").innerHTML += `
       <div class="empty_cart">
       <h2>Your cart is currently empty</h2>
       <button class="back"><a href="../html/shop.html">Back To shop</a><button>
       </div>
       
       `;

    document.querySelector(".cart_container").innerHTML = ``;
  } else {
    displayCartItes(cartArr);
    cart_title.innerHTML = `${cartArr.length} items in cart`;
    checkOut.innerHTML = `
          <div class="total">
             <span>Total</span>
             <span>${checkTotalPrice(cartArr)} EG</span>
          </div>
            <div class="shipping">
             <span>Shipping</span>
             <span>Free</span>
          </div>

          <button class="checkout_btn">Checkout</button>
    `;
  }
}
chekCartLength(cart);

// total price function
function checkTotalPrice(cart) {
  let total = 0;
  cart.forEach((ele) => {
    total += ele.price * ele.quantity;
  });
  return Math.ceil(total);
}

function displayCartItes(cart) {
  cart_poducts_container.innerHTML = ` `;
  cart.forEach((ele) => {
    cart_poducts_container.innerHTML += `
          <div class="cart_product">
                      <div class="img_desc">
                      <div class="product_img">
                          <img src=${ele.image} alt="">
                      </div>
                      <div class="product_desc">
                          <h2>${ele.title}</h2>
                          <h3>${ele.price}</h3>
                          <h4>Category : ${ele.categorySlug}</h4>
                      </div>
                      </div>

                      <div class="product_quantity">
                           <span class="minus" onclick = "decreaseQuantity(${ele.id} , ${ele.quantity})"> - </span>
                           <span class="ele_quantity">${ele.quantity}</span>
                           <span class="plus" onclick = "increaseQuantity(${ele.id} , ${ele.quantity})"> + </span>
                      </div>

                  </div> `;
  });
}

function increaseQuantity(id, quantity) {
  let newQuantity = quantity + 1;

  let item = cart.find((ele) => ele.id === id);
  let newItem = { ...item, quantity: newQuantity };
  Object.assign(item, newItem);
  cart = cart.map((obj) => (obj.id === newItem.id ? newItem : obj));
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItes(JSON.parse(localStorage.getItem("cart")));
  cart_icon_num.innerHTML = JSON.parse(localStorage.getItem("cart")).length;
  chekCartLength(JSON.parse(localStorage.getItem("cart")));
}

function decreaseQuantity(id, quantity) {
  let newQuantity = quantity - 1;
  if (quantity === 1) {
    let item = cart.find((ele) => ele.id === id);
    cart = cart.filter((ele) => ele !== item);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItes(JSON.parse(localStorage.getItem("cart")));
    cart_icon_num.innerHTML = JSON.parse(localStorage.getItem("cart")).length;
    chekCartLength(JSON.parse(localStorage.getItem("cart")));
  } else {
    let item = cart.find((ele) => ele.id === id);
    let newItem = { ...item, quantity: newQuantity };
    Object.assign(item, newItem);
    cart = cart.map((obj) => (obj.id === newItem.id ? newItem : obj));
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItes(JSON.parse(localStorage.getItem("cart")));
    cart_icon_num.innerHTML = JSON.parse(localStorage.getItem("cart")).length;
    chekCartLength(JSON.parse(localStorage.getItem("cart")));
  }
}

// redirect to Favourities
document.querySelector(".heart_icon").addEventListener("click", () => {
  window.location.href = `${location_origin}/html/favourites.html`;
});

// redirect to cart
document.querySelector(".cart_icon").addEventListener("click", () => {
  window.location.href = `${location_origin}/html/cart.html`;
});

      //navbar
      toggle_icon.addEventListener("click", () => {
        toggled_nav.classList.add("active_nav");
      });
      
      close_nav_icon.addEventListener("click", () => {
        toggled_nav.classList.remove("active_nav");
      });
      
      main_nav.addEventListener("click", function (e) {
        if (e.target.classList.contains("active_link")) {
          return;
        } else {
          links.forEach((ele) => {
            ele.classList.remove("active_link");
            e.target.classList.add("active_link");
          });
        }
      });