let toggle_icon = document.querySelector(".fa-bars"),
  toggled_nav = document.querySelector(".toggled_nav"),
  close_nav_icon = document.querySelector(".fa-xmark"),
  main_nav = document.querySelector("nav ul"),
  links = document.querySelectorAll("ul li a");
(cart_icon_fav = document.querySelector(".fav_num")),
cart_icon_num = document.querySelector(".items_num"),
  (location_origin = window.location.origin);


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

// redirect to cart
document.querySelector(".cart_icon").addEventListener("click", () => {
  window.location.href = `${location_origin}/html/cart.html`;
});

// redirect to Favourities
document.querySelector(".heart_icon").addEventListener("click", () => {
  window.location.href = `${location_origin}/html/favourites.html`;
});
