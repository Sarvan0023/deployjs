let logout = document.querySelector(".logout")
let loggedIn = JSON.parse(localStorage.getItem("loginId"))
 basketArr = JSON.parse(localStorage.getItem("basket")) || [];
favArr = JSON.parse(localStorage.getItem("favorites")) || [];
url = "https://fakestoreapi.com/products";

if (!loggedIn) {
    logout.style.display = "none"
}
else {
    fetch(`${url}${loggedIn}`).then(res => res.json()).then(data => {
        logout.style.display = "block"
        logout.addEventListener("click", function (e) {
            e.preventDefault()
            console.log(loggedIn);
           fetch(`${url}${loggedIn}`, {
                method: "Put",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                    basket: basketArr,
                    favorites:favArr
                })
            }
            )
            localStorage.removeItem("loginId")
            localStorage.removeItem("basket")
            localStorage.removeItem("favorites")
            window.location.reload()
        })
    })
}
fetch(`${url}${loggedIn}`).then(res => res.json()).then(data => {
    if (data.favorites) {
        localStorage.setItem("favorites", JSON.stringify(data.favorites))
    }
    if (data.basket) {
        localStorage.setItem("basket", JSON.stringify(data.basket))
    }
    console.log("worked");
})
