let datas = [];
let Basketscard = document.querySelector(".leftside");
let LocalCartArr = JSON.parse(localStorage.getItem("basket"));
let subTotal = document.querySelector(".subTotal");
let favArr = JSON.parse(localStorage.getItem("favorites")) || [];
const subtotalElement = document.getElementById("subtotal");

function updateSubtotal() {
  let subtotal = 0;
  for (const product of datas) {
    subtotal += product.price * product.count;
  }
  if (subtotalElement) {
    subtotalElement.textContent = `$${subtotal}`;
  }
}

if (LocalCartArr) {
  datas = [...LocalCartArr];
}
let totalsum = 0;

function updateCounts() {
  totalsum = 0;
  let basketCount = 0;
  for (const product of datas) {
    const productId = product.id;
    let basketElement = document.querySelector(`#countInput${productId}`);
    // basketElement.textContent = product.count;
    let sum = product.price * product.count;
    totalsum += sum;
    basketCount += product.count;

    const sumElement = document.querySelector(`#sumValue${productId}`);
    if (sumElement) {
      sumElement.textContent = `${sum}`;
    }
  }

  const basketCountElement = document.querySelector(".basket-count");
  if (basketCountElement) {
    basketCountElement.textContent = basketCount;
  }

  subTotal.textContent = "$" + Math.floor(totalsum);
}

datas.forEach((product) => {
  const isInFavorites = favArr.some((fav) => fav.id === product.id);
  const heartIconSrc = isInFavorites
    ? "./res/img/icons/favourite.svg"
    : "./res/img/icons/favourite (1).svg";

  let sum = product.price * product.count;
  Basketscard.innerHTML += `
  <div class="leftt flexverr">
  <a href="./productPage.html" class="detailProd" name="${product.id}">
<div class="forimage">
  <img
    src="${product.image}"
    alt=""
  />
</div>
</a>
<div class="detailscart">
  <div class="flexverrr">
    <p>${product.title}</p>
    <p class="marginleft">US $${sum}</p>
  </div>
  <div class="spans flexver">
    <span class="span1">Size: XS</span>
    <span id="sumValue${product.id}" class="span2">Color: ${product.color}</span>
  </div>
  <span class="span3">Delivery: 25-32 days</span>
  <p class="span4">Quality</p>
  <div class="flexverrt">
    <div class="araliq">
      <span>2</span>
      <span>-</span>
      <span>9</span>
      <img src="/res/img/icons/chevron-down.svg" alt="" />
    </div>
    <div class="iconlar flexverc">
    <img class="addToFav" name="${product.id}" src="${heartIconSrc}" alt="" />
      <p class="pp">Favorite</p>
      <img name="${product.id}" class="RemoveBtn" src="./res/img/icons/trash 1.svg" alt="" />
      <p  name="${product.id}" class="RemoveBtn">Remove</p>
    </div>
  </div>
</div>
</div>

   `;

  let addToFavs = document.querySelectorAll(".addToFav");

  addToFavs.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log(`${btn.getAttribute("name")}`);
      console.log(favArr);
      const productId = this.getAttribute("name");
      const isInFavorites = favArr.some((fav) => fav.id === productId);
      if (isInFavorites) {
        removeFavorite(productId);
        Swal.fire({
          icon: "success",
          title: "Deleted from Favorite",
        });
      } else {
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
      const product = datas.find((item) => item.id === productId);
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
    const btn = document.querySelector(`.addToFav[name="${productId}"]`);
    if (btn) {
      btn.src = isInFavorites
        ? "./res/img/icons/favourite.svg"
        : "./res/img/icons/favourite (1).svg";
    }
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

  totalsum += sum;
});

updateCounts();
updateSubtotal();

let RemoveBtns = document.querySelectorAll(".RemoveBtn");

for (let btn of RemoveBtns) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log(
      btn.parentElement.parentElement.parentElement.parentElement.remove()
    );

    LocalCartArr = LocalCartArr.filter(
      (data) => data.id != this.getAttribute("name")
    );
    localStorage.setItem("basket", JSON.stringify(LocalCartArr));
    updateCounts();
    updateSubtotal();

    //partial solition
    window.location.reload();
  });
}

///////////

let confirmButton = document.querySelector(".confirmbtn");
confirmButton.addEventListener("click", async () => {
  let user = JSON.parse(localStorage.getItem("loginId"));

  if (user) {
    // let leftside=document.querySelector(".leftside")
    // leftside.innerHTML=``
    const userId = user;

    const response = await axios.get(
      `https://fakestoreapi.com/products/${userId}`
    );

    let userBalance = response.data.balance;

    if (userBalance >= totalsum) {
      Swal.fire({
        icon: "success",
        title: "Order completed",
      });
      if (!response.data.orders) {
        response.data.orders = [];
      }

      for (const product of datas) {
        const BagResponse = await axios.get(
          `https://fakestoreapi.com/products/${product.id}`
        );
        response.data.orders.push(BagResponse.data);
      }

      userBalance -= totalsum;

      await axios.put(
        `https://fakestoreapi.com/products/${userId}`,
        {
          balance: userBalance,
          orders: response.data.orders,
        }
      );

      LocalCartArr = [];
      localStorage.setItem("basket", JSON.stringify(LocalCartArr));
      Basketscard.innerHTML = "";
      updateCounts();
      updateSubtotal();
      subTotal.textContent = "$0";
      subtotalElement.textContent = "$0";
    } else {
      Swal.fire({
        icon: "error",
        title: "Insufficient Balance",
        text: "Your balance is not sufficient to make this payment.",
      });
    }
  } else {
    console.log("salam");
    Swal.fire({
      icon: "error",
      title: "Log in first",
    });
    window.location.href = "login.html";
  }
});

// updateCounts();
// updateSubtotal();

// adding user's name to signin in header
let signIn = document.querySelector(".signIn");
let url = "https://654bcb115b38a59f28efb8ab.mockapi.io/users/";
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
