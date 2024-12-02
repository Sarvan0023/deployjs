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
      signIn.innerHTML = `<a href="./orders.html">${data.name}</a>`;
    });
}
let body = document.querySelector("body");
let feature = document.querySelector(".feature");
let bestseller = document.querySelector(".bstsellerr");
let discountt = document.querySelector(".discountt");
let basketArr = JSON.parse(localStorage.getItem("basket")) || [];
let favArr = JSON.parse(localStorage.getItem("favorites")) || [];

Swal.fire({
  title: "Loading...",
  allowOutsideClick: false,
  onBeforeOpen: () => {
    Swal.showLoading();
  },
});

let urlProd = "https://654bcb115b38a59f28efb8ab.mockapi.io/products";
fetch(urlProd)
  .then((res) => res.json())
  .then((data) => {
    Swal.close();

    data.forEach((element) => {

      let isInFavorites = favArr.some((fav) => fav.id === element.id);
      const heartIconSrc = isInFavorites
        ? "./res/img/icons/favourite.svg"
        : "./res/img/icons/favourite (1).svg";


      if (element.categorySecond === "Cloth" || element.categorySecond === "ExoticLeather") {


        feature.innerHTML += ` <div class="swiper-slide">
      <div class="box box1">
      <a href="./productPage.html" class="detailProd block rounded  text-grey-700 hover:bg-green-100 md:p-0 md:hover:bg-transparent md:hover:text-green-700" name="${element.id}">
        <div class="buttons">
          <div class="isNewFeat"></div>
          <div>
          <img class="addToFav" name="${element.id}" src="${heartIconSrc}" alt="" />
          </div>
        </div>
        <div class="productbag">
          <img
            src="${element.avatar}"
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
        <p class="textp">${element.name}</p>
        <div class="money">
          <span>$${element.price}</span>
        </div>
        <div name="${element.id}" class="add-to-card cardbtn block rounded  text-grey-700 hover:bg-red-100 md:p-0 md:hover:bg-transparent md:hover:text-red-700">
          <p>Add to card</p>
        </div>
        </a>
      </div>
    </div>`;
      }
      if (true) {
        buttons = document.querySelectorAll(".isNewFeat")
        for (btn of buttons) {
          btn.innerHTML = `<div class="newbtn">New</div>`
        }
      }
      if (element.categorySecond === "FauxFur" || element.categorySecond === "DenimJeans") {

        bestseller.innerHTML += `

    <div class="swiper-slide">
              <div class="box box2">
              <a href="./productPage.html" class="detailProd block rounded  text-grey-700 hover:bg-green-100 md:p-0 md:hover:bg-transparent md:hover:text-green-700" name="${element.id}">
                <div class="buttons">
                <div class="newbtn">${element.sold} sold</div>
          <div class="isNew"></div>

                  <div>
                  <img class="addToFav" name="${element.id}" src="${heartIconSrc}" alt="" />
                  </div>
                </div>
                <div class="productbag">
                  <img
                    src="${element.avatar}"
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
                <p class="textp">${element.name}</p>
                <div class="money">
                  <span class="mainPrice">$${element.price}</span>
                </div>
                <div name="${element.id}" class="add-to-card cardbtn block rounded  text-grey-700 hover:bg-red-100 md:p-0 md:hover:bg-transparent md:hover:text-red-700">
                  <p>Add to card</p>
                </div>
                </a>
              </div>
            </div>
    

    `;
      }
      if (element.discountPercent) {
        let finPrice = Math.round((element.price * element.discountPercent) / 100)

        if (element.categorySecond === "Glitter" || element.categorySecond === "Cotton") {

          discountt.innerHTML += `
    
    <div class="swiper-slide">
      <div class="box box1">
      <a href="./productPage.html" class="detailProd block rounded  text-grey-700 hover:bg-green-100 md:p-0 md:hover:bg-transparent md:hover:text-green-700" name="${element.id}">
        <div class="buttons">
           <div class="percaint3">${element.discountPercent}%</div>
          <div class="isNew"></div>

          <div>
          <img class="addToFav" name="${element.id}" src="${heartIconSrc}" alt="" />
         </div>
        </div>
        <div class="productbag">
          <img
            src="${element.avatar}"
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
        <p class="textp">${element.name}</p>
        <div class="money">
          <p>$${finPrice}</p>
          <span class="mainPrice">From$${element.price}</span>
        </div>
        <div name="${element.id}" class="add-to-card cardbtn block rounded  text-grey-700 hover:bg-red-100 md:p-0 md:hover:bg-transparent md:hover:text-red-700">
          <p>Add to card</p>
        </div>
        </a>
      </div>
    </div>
    `;
        }
      }






      let addToFavs = document.querySelectorAll(".addToFav");

      addToFavs.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          isInFavorites = favArr.some((fav) => fav.id == btn.getAttribute("name"));
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



      //
    });


    function addFavorite(productId) {
      const isAlreadyInFavorites = favArr.some((fav) => fav.id === productId);

      if (!isAlreadyInFavorites) {
        const product = data.find((item) => item.id === productId);
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

    ////

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




    /////////////
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
          const product = data.find((item) => item.id == productId);
          if (product) {
            product.count = 1;
            basketArr.push(product);
          }
        }

        localStorage.setItem("basket", JSON.stringify(basketArr));
      });
    }

    let shopbtn = document.querySelectorAll(".shopbtn");
    for (let btn of shopbtn) {
      btn.addEventListener("click", function () {
        window.open("productPage.html", "_blank");
      });
    }
  })
  .catch((err) => {
    Swal.close();
    console.log(err);
  });

// body.innerHTML=``


let shopbtns = document.querySelectorAll(".shopbtn")
for (let btn of shopbtns) {
  btn.addEventListener("click", function (e) {
    e.preventDefault()
    let elemId = btn.getAttribute("name");
    window.open(`productPage.html?id=${elemId}`, '_blank');
  })
}