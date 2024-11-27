let location_origin = window.location.origin;
let favourities = JSON.parse(localStorage.getItem("favourities")) || [],
cart_icon_num = document.querySelector(".items_num"),
cart_icon_fav = document.querySelector(".fav_num");

let favourities_container = document.querySelector(".favourities");

 // set num of cart items
 if(JSON.parse(localStorage.getItem("cart")))
    {
      cart_icon_num.innerHTML = JSON.parse(localStorage.getItem("cart")).length ;
    
    }
    else
    {
      cart_icon_num.innerHTML = 0
    }
    


// redirect to cart
document.querySelector(".cart_icon").addEventListener("click",()=>{
    window.location.href = `${location_origin}/html/cart.html`
  })

  function chekFavLength(favArr) {
    if (!favArr || favArr.length === 0) {
      document.querySelector(".favourities").innerHTML += `
         <div class="empty_cart">
         <h2>Your Wishlist is currently empty</h2>
         <button class="back"><a href="../html/shop.html">Back To shop</a><button>
         </div>
         
         `;
  
    } else {
        displayFavourites(favourities)
        cart_icon_fav.innerHTML = JSON.parse(localStorage.getItem("favourities")).length ;
    }
  }
  chekFavLength(favourities);


function displayFavourites(favourities)
{

    favourities_container.innerHTML = ` `
    favourities.forEach((product)=>{
        favourities_container.innerHTML += ` 
         <div class="card">
          <div class="card_img" >
            <div class="fav_icon" onclick = "removeFav(${product.id})"><i class="fa-solid fa-heart"></i></div>
            <img src=${product.image}  alt="" />
          </div>
          <div class="price_and_rate">
            <div class="price"><span class="color-red">${product.price} EG</span></div>
            <div class="rate">
              <span class="rate_icon"><i class="fa-solid fa-star"></i></span>
              <span class="rate_value color-white">${product.rating.rate}</span>
            </div>
          </div>
          <h5 class="color-white" onclick ="productDetails(${product.id})">${product.title}</h5>
          <div class="avilable_pieces">
            <span class="circle_check"
              ><i class="fa-regular fa-circle-check color-red"></i
            ></span>
            <span class="pieces_num color-white">${product.rating.count} </span
            ><span class="color-white">pieces</span>
          </div>
          <div class="souce">
            <span class="circle_check"
              ><i class="fa-regular fa-circle-check color-red"></i
            ></span>
            <span class="souce_type color-white">${product.categorySlug}</span>
          </div>

          <button class="add_to_cart" onclick="addToCart(${product.id})">Add To cart</button>
        </div>`
    })
}


// start add to cart
let cart = JSON.parse(localStorage.getItem("cart")) || [] ;
 async function addToCart(productId)
{
  let res = await fetch('http://localhost:3000/products')
  let products = await res.json()
  let productAddedToCart =  products.find((ele)=> ele.id == productId)
  let cartProduct = cart.find((ele)=> ele.id == productId )
  if(cartProduct === undefined)
  {
    cart.push({...productAddedToCart , quantity:1})

  }else
  {
    cartProduct.quantity++;
  }
  localStorage.setItem("cart",JSON.stringify(cart))
  document.querySelector(".items_num").innerHTML = JSON.parse(localStorage.getItem("cart")).length || 0 ;
   
}


// start add to favourities
 async function removeFav(favId)
{
    
    console.log(arguments);
    let notFavProduct = favourities.find((ele)=> ele.id == favId )
    favourities = favourities.filter((ele)=> ele.id !== notFavProduct.id )
    localStorage.setItem("favourities",JSON.stringify(favourities))
    displayFavourites(favourities)
    chekFavLength(JSON.parse(localStorage.getItem("favourities")).length )
  cart_icon_fav.innerHTML = JSON.parse(localStorage.getItem("favourities")).length ;
   
}


function productDetails(id) {
  window.location.href = `${location_origin}/html/productDetails.html?productId=${id}`;
}