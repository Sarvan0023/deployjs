// adding user's name to signin in header
let signIn = document.querySelector(".signIn");
let url = "https://fakestoreapi.com/products";
if (JSON.parse(localStorage.getItem("loginId"))) {
  let id = JSON.parse(localStorage.getItem("loginId"));
  console.log(id);
  fetch(`${url}${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      signIn.innerHTML = `<a href="./orders.html">${data.title}</a>`;
    });
}

let product = document.querySelector(".product");
let description = document.querySelector(".description");
let basketArr = JSON.parse(localStorage.getItem("basket")) || [];
let favArr = JSON.parse(localStorage.getItem("favorites")) || [];

Swal.fire({
  title: "Loading...",
  allowOutsideClick: false,
  onBeforeOpen: () => {
    Swal.showLoading();
  },
});

let urlProd = "https://fakestoreapi.com/products/";
let id = new URLSearchParams(window.location.search).get("id");
// let id = 4
fetch(`${urlProd}${id}`)
  .then((res) => res.json())
  .then((data) => {
    Swal.close();
    const productArray = [data];

    const isInFavorites = favArr.some((fav) => fav.id === data.id);
    const heartIconSrc = isInFavorites
      ? "./res/img/icons/favourite.svg"
      : "./res/img/icons/favourite (1).svg";

    product.innerHTML = `<div class="container">
    <div class="prodLarge">
      <div class="buttons">
        <div class="sale">New</div>
        <div class="favorite"  name="${data.id}">
        <img class="addToFav" name="${data.id}" src="${heartIconSrc}" alt="" />
        </div>
      </div>
      <div class="prodImgDiv">
        <img
          class="prodImg"
          src="${data.image}"
          alt=""
        />
      </div>
    </div>
    <div class="prodAbout">
      <div class="prodName">${data.title}</div>
      <div class="reviews">
        <div class="stars">
          <img class="star" src="./res/img/icons/star.svg" alt="" />
          <img class="star" src="./res/img/icons/star.svg" alt="" />
          <img class="star" src="./res/img/icons/star.svg" alt="" />
          <img class="star" src="./res/img/icons/star.svg" alt="" />
          <img class="star" src="./res/img/icons/star.svg" alt="" />
        </div>
        <div class="number">${data.rating} stars</div>
      </div>
      <div class="prices">
        <button class="price">
          <div class="countPrice">${data.count} pieces</div>
          <div class="onePrice">US $${data.price}</div>
        </button>
      </div>
      <div class="options">
        <div class="sizes">
          <p class="sizeP">Size</p>
          <button class="sizeOpt">XS</button>
          <button class="sizeOpt">S</button>
          <button class="sizeOpt">M</button>
        </div>
        <div class="colors">
          <p class="colorP">Color</p>
          <button class="colorOpt1"></button>
          <button class="colorOpt2"></button>
          <button class="colorOpt3"></button>
          <button class="colorOpt4"></button>
        </div>
      </div>
      <div class="checkout">
        <button class="addCart" name="${data.id}">Add to cart</button>
        <button class="cash" name="${data.id}">Cash payment</button>
      </div>
      <a href="#" class="whatsapp">Whatsapp Order</a>
    </div>
  </div>
    `;


    let addToFavs = document.querySelectorAll(".addToFav");

    addToFavs.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        let isInFavorites = favArr.some(
          (fav) => fav.id == btn.getAttribute("name")
        );
        e.preventDefault();
        e.stopPropagation();
        console.log(`${btn.getAttribute("name")}`);
        console.log(favArr);
        const productId = this.getAttribute("name");
        if (isInFavorites) {
          console.log("inFav");
          removeFavorite(productId);
          Swal.fire({
            icon: "success",
            title: "Deleted from Favorite",
          });
        } else {
          console.log("isntFav");
          addFavorite(productId);
          Swal.fire({
            icon: "success",
            title: "Added to Favorite",
          });
        }
      });
    });

    function addFavorite(productId) {
      const isAlreadyInFavorites = favArr.some((fav) => fav.id === productId);

      if (!isAlreadyInFavorites) {
        const product = productArray.find((item) => item.id === productId);
        if (product) {
          favArr.push(product);
          localStorage.setItem("favorites", JSON.stringify(favArr));
        }
      }

      updateHeartIcon(productId, true);
    }

    function removeFavorite(productId) {
      favArr = favArr.filter((fav) => fav.id !== productId);
      localStorage.setItem("favorites", JSON.stringify(favArr));

      updateHeartIcon(productId, false);
    }

    function updateHeartIcon(productId, isInFavorites) {
      const btns = document.querySelectorAll(`.addToFav[name="${productId}"]`);
      for (let btn of btns) {
        if (btn) {
          btn.src = isInFavorites
            ? "./res/img/icons/favourite.svg"
            : "./res/img/icons/favourite (1).svg";
        }
      }
    }
    ////////////////////
    let addCart = document.querySelector(".addCart");
    addCart.addEventListener("click", function (e) {
      e.preventDefault();
      console.log(this.name);
      Swal.fire({
        icon: "success",
        title: "Added to basket",
      });
      const productId = this.getAttribute("name");
      const basketItem = basketArr.find((item) => item.id == productId);
      if (basketItem) {
        basketItem.count++;
      } else {
        const product = productArray.find((item) => item.id == productId);
        if (product) {
          product.count = 1;
          basketArr.push(product);
        }
      }
      localStorage.setItem("basket", JSON.stringify(basketArr));
    });

    description.innerHTML = `<div class="descNames">
    <div class="prodDesc">
      <button class="prodDescname">Product Description</button>
    </div>
    <div class="reviews">
      <button class="prodReviews">Reviews</button>
    </div>
  </div>
  <hr />
  <div class="optionReviews">
  <div class="prodDescText">
    <p>
    This ${data.description} 
    
    </p>
  </div>
 
  </div>`;
    let prodDesc = document.querySelector(".prodDescname");
    let prodReviews = document.querySelector(".prodReviews");
    let options = document.querySelector(".optionReviews");
    prodDesc.addEventListener("click", function (e) {
      e.preventDefault();
      prodDesc.style.color = "red";
      prodReviews.style.color = "gray";
      options.innerHTML = ` <div class="prodDescText">
    <p>This ${data.description} 
    </p>
  </div>`;
    });
    prodReviews.addEventListener("click", function (e) {
      e.preventDefault();
      prodReviews.style.color = "red";
      prodDesc.style.color = "gray";
      options.innerHTML = ` <div class="reviewCards">
     <div class="card">
      <div class="header">
        <p class="username">John Smith</p>
        <div class="stars">
          <img class="star" src="./res/img/icons/star.svg" alt="" />
          <img class="star" src="./res/img/icons/star.svg" alt="" />
          <img class="star" src="./res/img/icons/star.svg" alt="" />
          <img class="star" src="./res/img/icons/star.svg" alt="" />
          <img class="star" src="./res/img/icons/star.svg" alt="" />
        </div>
      </div>
      <div class="date">09 July, 2021</div>
      <p class="text">
        ${data.title} is excellent choice for $${data.price}</p>
    </div>
    </div>
  </div>`;
    });

    let lowerCarousel = document.querySelector(".lowerCarousel")
    // console.log(data.categoryFirst);
    fetch(urlProd).then(res => res.json()).then(datas => {
      for (let elem of datas) {
        if (elem.categoryFirst == data.categoryFirst) {
          // console.log(elem);
          lowerCarousel.innerHTML += ` <div class="swiper-slide">
          <div class="box box1">
          <a href="./productPage.html" class="detailProd block rounded  text-grey-700 hover:bg-green-100 md:p-0 md:hover:bg-transparent md:hover:text-green-700" name="${elem.id}">
            <div class="buttons">
              <div class="newbtn">New</div>
              <div>
              <img class="addToFav" name="${elem.id}" src="${heartIconSrc}" alt="" />
              </div>
            </div>
            <div class="productbag">
              <img
                src="${elem.image}"
                alt=""
              />
            </div>
            <div class="stars">
              <img src="./res/img/icons/star.svg" alt="" />
              <img src="./res/img/icons/star.svg" alt="" />
              <img src="./res/img/icons/star.svg" alt="" />
              <img src="./res/img/icons/star.svg" alt="" />
              <img src="./res/img/icons/star.svg" alt="" />
            </div>
            <p class="textp">${elem.title}</p>
            <div class="money">
              <p>$${elem.price}</p>
             
            </div>
            <div name="${elem.id}" class="add-to-card cardbtn block rounded  text-grey-700 hover:bg-red-100 md:p-0 md:hover:bg-transparent md:hover:text-red-700">
              <p>Add to card</p>
            </div>
            </a>
          </div>
        </div>`;
          let addToFavs = document.querySelectorAll(".addToFav");

          addToFavs.forEach((btn) => {
            btn.addEventListener("click", function (e) {
              let isInFavorites = favArr.some(
                (fav) => fav.id == btn.getAttribute("name")
              );
              e.preventDefault();
              e.stopPropagation();
              console.log(`${btn.getAttribute("name")}`);
              console.log(favArr);
              const productId = this.getAttribute("name");
              if (isInFavorites) {
                console.log("inFav");
                removeFavorite(productId);
                Swal.fire({
                  icon: "success",
                  title: "Deleted from Favorite",
                });
              } else {
                console.log("isntFav");
                addFavorite(productId);
                Swal.fire({
                  icon: "success",
                  title: "Added to Favorite",
                });
              }
            });
          });

          function addFavorite(productId) {
            const isAlreadyInFavorites = favArr.some((fav) => fav.id === productId);

            if (!isAlreadyInFavorites) {
              const product = productArray.find((item) => item.id === productId);
              if (product) {
                favArr.push(product);
                localStorage.setItem("favorites", JSON.stringify(favArr));
              }
            }

            updateHeartIcon(productId, true);
          }

          function removeFavorite(productId) {
            favArr = favArr.filter((fav) => fav.id !== productId);
            localStorage.setItem("favorites", JSON.stringify(favArr));

            updateHeartIcon(productId, false);
          }

          function updateHeartIcon(productId, isInFavorites) {
            const btns = document.querySelectorAll(`.addToFav[name="${productId}"]`);
            for (let btn of btns) {
              if (btn) {
                btn.src = isInFavorites
                  ? "./res/img/icons/favourite.svg"
                  : "./res/img/icons/favourite (1).svg";
              }
            }
          }

          let addtocartbtn = document.querySelectorAll(".cardbtn");
          for (let btn of addtocartbtn) {
            btn.addEventListener("click", function (e) {
              Swal.fire({
                icon: "success",
                title: "Added to Basket",
              });
              console.log(`"SALAM" ${btn.getAttribute("name")}`);
              e.preventDefault();
              e.stopPropagation();
              const productId = this.getAttribute("name");
              const basketItem = basketArr.find((item) => item.id == productId);

              if (basketItem) {
                basketItem.count++;
              } else {
                const product = datas.find((item) => item.id == productId);
                if (product) {
                  product.count = 1;
                  basketArr.push(product);
                }
              }

              localStorage.setItem("basket", JSON.stringify(basketArr));
            });
          }

          let detailProds = document.querySelectorAll(".detailProd");
          detailProds.forEach((btn) => {
            // console.log(btn);
            btn.addEventListener("click", function (e) {
              e.stopPropagation();
              e.preventDefault();
              let elemId = btn.getAttribute("name");
              window.location.href = `productPage.html?id=${elemId}`;
            });
          });

        }
      }
    })
  });


