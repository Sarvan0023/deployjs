// adding user's name to signin in header
let signIn = document.querySelector(".signIn");
let url = "https://fakestoreapi.com/products";
let id;
if (JSON.parse(localStorage.getItem("loginId"))) {
  let id = JSON.parse(localStorage.getItem("loginId"));
  // console.log(id);
  fetch(`${url}${id}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      let credentials = document.querySelector(".credentials");
      credentials.innerHTML = `
    <div class="imgCredential"><img src="${data.profilePic}" alt=""></div>
    <div class="details">
    <div class="username">${data.title}</div>
    <div class="client">Client code: ${data.id}</div>
    </div>
    </div>
    `;

      signIn.innerHTML = `<a href="./orders.html">${data.title}</a>`;
    });
}
let urlProd = "https://fakestoreapi.com/products";
basketArr = JSON.parse(localStorage.getItem("basket")) || [];
favorites = JSON.parse(localStorage.getItem("favorites")) || [];


let favProdsRow = document.querySelector(".favProdsRow");

Swal.fire({
  title: "Loading...",
  allowOutsideClick: false,
  onBeforeOpen: () => {
    Swal.showLoading();
  },
});

fetch(urlProd)
  .then((res) => res.json())
  .then((data) => {
    Swal.close();

    for (let elem of favorites) {
      favProdsRow.innerHTML += `
  <div class="box box1 favProds col-6" >
    <div class="margin">
    <a href="./productPage.html" class="detailProd block rounded  text-grey-700 hover:bg-green-100 md:p-0 md:hover:bg-transparent md:hover:text-green-700" name="${elem.id}">
      <div class="buttons">
        <div class="newbtn">New</div>
        <img name="${elem.id}" class="deleteFav deleteButton" src="./res/img/icons/close.svg" alt="" />
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
      <p class="textp">${elem.title}
      </p>
      <div class="money">
        <p>New</p>
        <span>From$${elem.price}</span>
      </div>
      <div name="${elem.id}" class="cardbtn add-to-card block rounded  text-grey-700 hover:bg-red-100 md:p-0 md:hover:bg-transparent md:hover:text-red-700">
        <p>Add to cart</p>
      </div>
      </a>
    </div>
  </div>`;
    }
    let detailProds = document.querySelectorAll(".detailProd");
    detailProds.forEach((btn) => {
      // console.log(btn);
      btn.addEventListener("click", function (e) {

        e.preventDefault();
        e.stopPropagation();
        let elemId = btn.getAttribute("name");
        window.location.href = `productPage.html?id=${elemId}`;
      });
    });


    //delete from fav
    let deleteFavs = document.querySelectorAll(".deleteButton");

    for (let btn of deleteFavs) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        btn.parentElement.parentElement.parentElement.parentElement.remove()
        Swal.fire({
          icon: "success",
          title: "Deleted from Favorite",
        });
        const productId = btn.getAttribute("name");
        favorites = favorites.filter((dataFav) => dataFav.id != productId);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        fetch(`${url}${loggedIn}`)
          .then(res => res.json())
          .then(data => {
            return fetch(`${url}${loggedIn}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...data,
                basket: basketArr,
                favorites: favorites
              })
            });
          })
          .then(() => {
          })
          .catch(error => {
            console.error("error", error);
          });
      });
    }
    //add to cart
    let addtocartbtn = document.querySelectorAll(".cardbtn");
    for (let btn of addtocartbtn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        console.log("SALAM");
        e.preventDefault();
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

        Swal.fire({
          icon: "success",
          title: "Added to basket ",
        });
      });
    }
  })
  .catch((err) => {
    Swal.close();
    console.log(err);
  });
