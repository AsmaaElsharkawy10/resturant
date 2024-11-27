let toggle_icon = document.querySelector(".fa-bars") ,
    toggled_nav = document.querySelector(".toggled_nav"),
    close_nav_icon = document.querySelector(".fa-xmark"),
    main_nav = document.querySelector("nav ul"),
    links = document.querySelectorAll("ul li a"),
    slidesContainer = document.querySelector('.cards'),
    cart_icon_num = document.querySelector(".items_num"),
    cart_icon_fav = document.querySelector(".fav_num"),
    location_origin = window.location.origin
    ;


   

    
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
   

  //  start navbar

toggle_icon.addEventListener("click" , ()=>{
    toggled_nav.classList.add("active_nav")
    
})

close_nav_icon.addEventListener("click",()=>{
    toggled_nav.classList.remove("active_nav")

})



main_nav.addEventListener("click", function(e){
    if(e.target.classList.contains("active_link"))
    {

       return;
    }else
    {
      links.forEach((ele)=>{
        ele.classList.remove("active_link")
        e.target.classList.add("active_link")
      })
    }
})


  //  End navbar


// swiper

const swiper = new Swiper('.swiper', 
  {
  slidesPerView: 3 ,
  spaceBetween: 20,
  pagination:{
    el:".swiper-pagination",
    clickable:true

  },
  navigation:{
    prevEl:".swiper-button-prev",
    nextEl:".swiper-button-next"
  },
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
   breakpoints: {
    // when window width is >= 320px
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
      allowTouchMove:true

    },
    // when window width is >= 480px
    600: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    // when window width is >= 640px
    1024: {
      slidesPerView: 3,
      spaceBetween: 40,
      allowTouchMove:false
    }
  }
}

);

async function printProducts()
{
    let res = await fetch('http://localhost:3000/products')
    let products = await res.json()
    console.log(products);
    
    displayProducts(products)

}

printProducts()

function displayProducts(products) {

    products.forEach((product)=>{
    
   slidesContainer.innerHTML += ` 
         <div class="card swiper-slide">
          <div class="card_img" >
            <div class="fav_icon" onclick = "addToFavourites(${product.id})"><i class="fa-solid fa-heart"></i></div>
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

// End swiper

// redirect to product details page
function productDetails(id)
{
  window.location.href = `${location_origin}/html/productDetails.html?productId=${id}`
}


// redirect to cart
document.querySelector(".cart_icon").addEventListener("click",()=>{
  window.location.href = `${location_origin}/html/cart.html`
})


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
  cart_icon_num.innerHTML = JSON.parse(localStorage.getItem("cart")).length;
   
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


// video play
function hide() {
  if (document.querySelector("video").paused) document.querySelector("video").play(); 
  else document.querySelector("video").pause();
  document.querySelector(".video_layout").classList.add("hide")
}









