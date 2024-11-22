let toggle_icon = document.querySelector(".fa-bars"),
  toggled_nav = document.querySelector(".toggled_nav"),
  close_nav_icon = document.querySelector(".fa-xmark"),
  main_nav = document.querySelector("nav ul"),
  cart_icon_num = document.querySelector(".items_num"),
  cart_icon_fav = document.querySelector(".fav_num"),
  links = document.querySelectorAll("ul li a");


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

let productTitle = document.querySelector(".product_category"),
  productContainer = document.querySelector(".product");
let urlParams = new URLSearchParams(window.location.search);
let product_id = urlParams.get("productId");

async function getProduct() {
  let res = await fetch(`http://localhost:3000/products?id=${product_id}`);
  let product = await res.json();
  return product;
}

async function displayProduct() {
  let product = await getProduct();
  product.forEach((ele) => {
    productTitle.innerHTML = ele.categorySlug;
    productContainer.innerHTML += `
       <div class="product_title">
        <h4>${ele.categorySlug}</h4>
        <h3>${ele.title}</h3>
    </div>

    <div class="product_details">
        <div class="product_img">
          <div class="fav_icon" onclick = "addToFavourites(${ele.id})"><i class="fa-solid fa-heart"></i></div>
            <img src=${ele.image} alt="">
        </div>

        <div class="product_desc">
            <h2>${ele.title}</h2>
            <p>${ele.description}</p>
            <h3>${ele.price} EG</h3>
            <button class="add_to_cart" onclick="addToCart(${ele.id})">ADD To Cart</button>
        </div>

    </div>`;
  });
}
displayProduct();

// redirect to cart
document.querySelector(".cart_icon").addEventListener("click", () => {
  window.location.href = `${location_origin}/html/cart.html`;
});

// redirect to Favourities
document.querySelector(".heart_icon").addEventListener("click",()=>{
  window.location.href = `${location_origin}/html/favourites.html`
})


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
let favourities = JSON.parse(localStorage.getItem("favourities")) || [] ;
 async function addToFavourites(favId)
{
  let res = await fetch('http://localhost:3000/products')
  let products = await res.json()
  let productAddedToFavourites  =  products.find((ele)=> ele.id == favId)
  let favProduct =  favourities.find((ele)=> ele.id === favId)
  
  if(favProduct === undefined)
  {
    favourities.push(productAddedToFavourites)
  
    
  }else
  {
    let notFavProduct = favourities.find((ele)=> ele.id == favId )
    favourities = favourities.filter((ele)=> ele.id !== notFavProduct.id )

    
  }
  localStorage.setItem("favourities",JSON.stringify(favourities))
  cart_icon_fav.innerHTML = JSON.parse(localStorage.getItem("favourities")).length ;
   
}
