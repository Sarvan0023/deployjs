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

let productlist = document.querySelector(".productlist");
let basketArr = JSON.parse(localStorage.getItem("basket")) || [];
let favArr = JSON.parse(localStorage.getItem("favorites")) || [];
let categoryspan = document.querySelectorAll(".categoryspan");

//CategoryFirst//

let Eveningbags = document.querySelectorAll(".Eveningbags");
let Shoulderbags = document.querySelectorAll(".Shoulderbags");
let Backpack = document.querySelectorAll(".Backpack");
let Handbags = document.querySelectorAll(".Handbags");
let Postmanbags = document.querySelectorAll(".Postmanbag");
let Beltbags = document.querySelectorAll(".Beltbags");

let Cloth = document.querySelector(".Cloth");
let Cotton = document.querySelector(".Cotton");
let DenimJeans = document.querySelector(".DenimJeans");
let ExoticLeather = document.querySelector(".ExoticLeather");
let FauxFur = document.querySelector(".FauxFur");
let Glitter = document.querySelector(".Glitter");
////////////////

Swal.fire({
  title: "Loading...",
  allowOutsideClick: false,
  onBeforeOpen: () => {
    Swal.showLoading();
  },
});

let urlProd = "https://fakestoreapi.com/products";
fetch(urlProd)
  .then((res) => res.json())
  .then((data) => {
    Swal.close();
    let prodListCount = document.querySelector(".prodListCount");
    prodListCount.innerHTML = `${data.length} results`;

    function renderProducts(category) {
      productlist.innerHTML = "";

      data.forEach((element) => {
        if (element.categoryFirst === category) {
          const isInFavorites = favArr.some((fav) => fav.id === element.id);
          const heartIconSrc = isInFavorites
            ? "./res/img/icons/favourite.svg"
            : "./res/img/icons/favourite (1).svg";

          productlist.innerHTML += `
            <div class="box box1 col-6">
              <a href="./productPage.html" class="detailProd block rounded text-grey-700 hover:bg-green-100 md:p-0 md:hover:bg-transparent md:hover:text-green-700" name="${element.id}">
                <div class="margin">
                  <div class="buttons">
                    <div class="newbtn">New</div>
                    <img class="addToFav" name="${element.id}" src="${heartIconSrc}" alt="" />
                  </div>
                  <div class="productbag">
                    <img src="${element.image}" alt="" />
                  </div>
                  <div class="stars">
                    <img src="./res/img/icons/star.svg" alt="" />
                    <img src="./res/img/icons/star.svg" alt="" />
                    <img src="./res/img/icons/star.svg" alt="" />
                    <img src="./res/img/icons/star.svg" alt="" />
                    <img src="./res/img/icons/star.svg" alt="" />
                  </div>
                  <p class="textp">${element.title}</p>
                  <div class="money">
                    <p>$${element.price}</p>
                    
                  </div>
                  <div name="${element.id}" class="add-to-card cardbtn mt-3 block rounded text-grey-700 hover:bg-red-100 md:p-0 md:hover:bg-transparent md:hover:text-red-700">
                    <p>Add to cart</p>
                  </div>
                </div>
              </a>
            </div>`;
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
            const isAlreadyInFavorites = favArr.some(
              (fav) => fav.id === productId
            );

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
            const btns = document.querySelectorAll(
              `.addToFav[name="${productId}"]`
            );
            for (let btn of btns) {
              if (btn) {
                btn.src = isInFavorites
                  ? "./res/img/icons/favourite.svg"
                  : "./res/img/icons/favourite (1).svg";
              }
            }
          }

          let detailProds = document.querySelectorAll(".detailProd");
          detailProds.forEach((btn) => {
            btn.addEventListener("click", function (e) {
              e.stopPropagation();
              e.preventDefault();
              let elemId = btn.getAttribute("name");
              window.location.href = `productPage.html?id=${elemId}`;
            });
          });

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
              Swal.fire({
                icon: "success",
                title: "Added to basket ",
              });
              localStorage.setItem("basket", JSON.stringify(basketArr));
            });
          }
        }
      });
    }
    /////

    function renderProductsSecond(category) {
      productlist.innerHTML = "";

      data.forEach((element) => {
        if (element.categorySecond === category) {
          const isInFavorites = favArr.some((fav) => fav.id === element.id);
          const heartIconSrc = isInFavorites
            ? "./res/img/icons/favourite.svg"
            : "./res/img/icons/favourite (1).svg";

          productlist.innerHTML += `
        <div class="box box1 col-6">
          <a href="./productPage.html" class="detailProd block rounded text-grey-700 hover:bg-green-100 md:p-0 md:hover:bg-transparent md:hover:text-green-700" name="${element.id}">
            <div class="margin">
              <div class="buttons">
                <div class="newbtn">New</div>
                <img class="addToFav" name="${element.id}" src="${heartIconSrc}" alt="" />
              </div>
              <div class="productbag">
                <img src="${element.image}" alt="" />
              </div>
              <div class="stars">
                <img src="./res/img/icons/star.svg" alt="" />
                <img src="./res/img/icons/star.svg" alt="" />
                <img src="./res/img/icons/star.svg" alt="" />
                <img src="./res/img/icons/star.svg" alt="" />
                <img src="./res/img/icons/star.svg" alt="" />
              </div>
              <p class="textp">${element.title}</p>
              <div class="money">
                <p>$${element.price}</p>
                
              </div>
              <div name="${element.id}" class="add-to-card cardbtn mt-3 block rounded text-grey-700 hover:bg-red-100 md:p-0 md:hover:bg-transparent md:hover:text-red-700">
                <p>Add to cart</p>
              </div>
            </div>
          </a>
        </div>`;
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
            const isAlreadyInFavorites = favArr.some(
              (fav) => fav.id === productId
            );

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
            const btns = document.querySelectorAll(
              `.addToFav[name="${productId}"]`
            );
            for (let btn of btns) {
              if (btn) {
                btn.src = isInFavorites
                  ? "./res/img/icons/favourite.svg"
                  : "./res/img/icons/favourite (1).svg";
              }
            }
          }

          let detailProds = document.querySelectorAll(".detailProd");
          detailProds.forEach((btn) => {
            btn.addEventListener("click", function (e) {
              e.stopPropagation();
              e.preventDefault();
              let elemId = btn.getAttribute("name");
              window.location.href = `productPage.html?id=${elemId}`;
            });
          });

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
              Swal.fire({
                icon: "success",
                title: "Added to basket ",
              });
              localStorage.setItem("basket", JSON.stringify(basketArr));
            });
          }
        }
      });
    }

    ////
    function showAllProducts() {
      productlist.innerHTML = "";
      data.forEach((element) => {
        const isInFavorites = favArr.some((fav) => fav.id === element.id);
        const heartIconSrc = isInFavorites
          ? "./res/img/icons/favourite.svg"
          : "./res/img/icons/favourite (1).svg";

        productlist.innerHTML += `
          <div class="box box1 col-6">
            <a href="./productPage.html" class="detailProd block rounded text-grey-700 hover:bg-green-100 md:p-0 md:hover:bg-transparent md:hover:text-green-700" name="${element.id}">
              <div class="margin">
                <div class="buttons">
                  <div class="newbtn">New</div>
                  <img class="addToFav" name="${element.id}" src="${heartIconSrc}" alt="" />
                </div>
                <div class="productbag">
                  <img src="${element.image}" alt="" />
                </div>
                <div class="stars">
                  <img src="./res/img/icons/star.svg" alt="" />
                  <img src="./res/img/icons/star.svg" alt="" />
                  <img src="./res/img/icons/star.svg" alt="" />
                  <img src="./res/img/icons/star.svg" alt="" />
                  <img src="./res/img/icons/star.svg" alt="" />
                </div>
                <p class="textp">${element.title}</p>
                <div class="money">
                  <p>$${element.price}</p>
                  
                </div>
                <div name="${element.id}" class="add-to-card cardbtn mt-3 block rounded text-grey-700 hover:bg-red-100 md:p-0 md:hover:bg-transparent md:hover:text-red-700">
                <p>Add to cart</p>
                </div>
              </div>
            </a>
          </div>`;

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
          const isAlreadyInFavorites = favArr.some(
            (fav) => fav.id === productId
          );

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
          const btns = document.querySelectorAll(
            `.addToFav[name="${productId}"]`
          );
          for (let btn of btns) {
            if (btn) {
              btn.src = isInFavorites
                ? "./res/img/icons/favourite.svg"
                : "./res/img/icons/favourite (1).svg";
            }
          }
        }

        let detailProds = document.querySelectorAll(".detailProd");
        detailProds.forEach((btn) => {
          btn.addEventListener("click", function (e) {
            e.stopPropagation();
            e.preventDefault();
            let elemId = btn.getAttribute("name");
            window.location.href = `productPage.html?id=${elemId}`;
          });
        });

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
            Swal.fire({
              icon: "success",
              title: "Added to basket ",
            });
            localStorage.setItem("basket", JSON.stringify(basketArr));
          });
        }
      });
    }

    showAllProducts();

    ////////

    Cloth.addEventListener("click", function (e) {
      for (let span of categoryspan) {
        span.textContent = "Cloth";
      }
      e.preventDefault();
      renderProductsSecond("Cloth");
    });

    Cotton.addEventListener("click", function (e) {
      for (let span of categoryspan) {
        span.textContent = "Cotton";
      }
      e.preventDefault();
      renderProductsSecond("Cotton");
    });
    DenimJeans.addEventListener("click", function (e) {
      for (let span of categoryspan) {
        span.textContent = "Denim-Jeans";
      }
      e.preventDefault();
      renderProductsSecond("DenimJeans");
    });

    ExoticLeather.addEventListener("click", function (e) {
      for (let span of categoryspan) {
        span.textContent = "Exotic Leathers";
      }
      e.preventDefault();
      renderProductsSecond("ExoticLeather");
    });
    FauxFur.addEventListener("click", function (e) {
      for (let span of categoryspan) {
        span.textContent = "Faux Fur";
      }
      e.preventDefault();
      renderProductsSecond("FauxFur");
    });

    Glitter.addEventListener("click", function (e) {
      for (let span of categoryspan) {
        span.textContent = "Glitter";
      }
      e.preventDefault();
      renderProductsSecond("Glitter");
    });

    ////

    for (let btn of Eveningbags) {
      btn.addEventListener("click", function (e) {
        for (let span of categoryspan) {
          span.textContent = "Evening bags";
        }
        e.preventDefault();
        renderProducts("Eveningbags");
      });
    }

    for (let btn of Shoulderbags) {
      btn.addEventListener("click", function (e) {
        for (let span of categoryspan) {
          span.textContent = "Shoulder bag";
        }
        e.preventDefault();
        renderProducts("ShoulderBags");
      });
    }

    for (let btn of Backpack) {
      btn.addEventListener("click", function (e) {
        for (let span of categoryspan) {
          span.textContent = "Backpack";
        }
        e.preventDefault();
        renderProducts("Backpack");
      });
    }

    for (let btn of Handbags) {
      btn.addEventListener("click", function (e) {
        for (let span of categoryspan) {
          span.textContent = "Handbag";
        }
        e.preventDefault();
        renderProducts("Handbags");
      });
    }

    for (let btn of Postmanbags) {
      btn.addEventListener("click", function (e) {
        for (let span of categoryspan) {
          span.textContent = "Postman bag";
        }
        e.preventDefault();
        renderProducts("PostmanBags");
      });
    }

    for (let btn of Beltbags) {
      btn.addEventListener("click", function (e) {
        for (let span of categoryspan) {
          span.textContent = "Belt bags";
        }
        e.preventDefault();
        renderProducts("Beltbags");
      });
    }
  })
  .catch((err) => {
    Swal.close();
    console.log(err);
  });



  let filters = document.getElementById("filters");

  filters.addEventListener("change", function () {
    let selectedOption = filters.options[filters.selectedIndex].classList;
  
    switch (true) {
      case selectedOption.contains("priceBtn"):
        sortByPrice();
        break;
  
      case selectedOption.contains("soldbtn"):
        sortBySold();
        break;
  
      case selectedOption.contains("categoryAll"):
        showAllProducts();
        break;
  
      default:
        break;
    }
  });
  
  function sortByPrice() {
    let timerInterval;
    Swal.fire({
      title: "Products loading...",
      html: "I will close in <b></b> milliseconds.",
      timer: 1200,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  
    fetch(urlProd)
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => a.price - b.price);
  
        productlist.innerHTML = "";
        renderProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  function sortBySold() {
    let timerInterval;
    Swal.fire({
      title: "Products loading...",
      html: "I will close in <b></b> milliseconds.",
      timer: 1200,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  
    fetch(urlProd)
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => a.sold - b.sold);
  
        productlist.innerHTML = "";
        renderProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  function renderProducts(data) {
    data.forEach((element) => {

      const isInFavorites = favArr.some((fav) => fav.id === element.id);
      const heartIconSrc = isInFavorites
        ? "./res/img/icons/favourite.svg"
        : "./res/img/icons/favourite (1).svg";



      productlist.innerHTML += `
        <div class="box box1 col-6">
          <a href="./productPage.html" class="detailProd block rounded text-grey-700 hover:bg-green-100 md:p-0 md:hover:bg-transparent md:hover:text-green-700" name="${element.id}">
            <div class="margin">
              <div class="buttons">
                <div class="newbtn">New</div>
                <img class="addToFav" name="${element.id}" src="${heartIconSrc}" alt="" />
              </div>
              <div class="productbag">
                <img src="${element.image}" alt="" />
              </div>
              <div class="stars">
                <img src="./res/img/icons/star.svg" alt="" />
                <img src="./res/img/icons/star.svg" alt="" />
                <img src="./res/img/icons/star.svg" alt="" />
                <img src="./res/img/icons/star.svg" alt="" />
                <img src="./res/img/icons/star.svg" alt="" />
              </div>
              <p class="textp">${element.title}</p>
              <div class="money">
                <p>$${element.price}</p>
                
              </div>
              <div name="${element.id}" class="add-to-card cardbtn mt-3 block rounded text-grey-700 hover:bg-red-100 md:p-0 md:hover:bg-transparent md:hover:text-red-700">
                <p>Add to cart</p>
              </div>
            </div>
          </a>
        </div>`;
    });
  
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
      const btns = document.querySelectorAll(
        `.addToFav[name="${productId}"]`
      );
      for (let btn of btns) {
        if (btn) {
          btn.src = isInFavorites
            ? "./res/img/icons/favourite.svg"
            : "./res/img/icons/favourite (1).svg";
        }
      }
    }
  
    let detailProds = document.querySelectorAll(".detailProd");
    detailProds.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        e.preventDefault();
        let elemId = btn.getAttribute("name");
        window.location.href = `productPage.html?id=${elemId}`;
      });
    });
  
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
        Swal.fire({
          icon: "success",
          title: "Added to basket ",
        });
        localStorage.setItem("basket", JSON.stringify(basketArr));
      });
    }
  }
  

