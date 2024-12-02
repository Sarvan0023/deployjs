console.log("work");
let url = "https://fakestoreapi.com/products"
let logEmail = document.querySelector(".logEmail")
let logPass = document.querySelector(".logPass")
let logBtn = document.querySelector(".logBtn")

logBtn.addEventListener("click", function (e) {
    e.preventDefault()
    fetch(url).then(res => res.json()).then(data => {
        data.forEach(elem => {
            if (elem.email == logEmail.value && elem.password == logPass.value) {
                // console.log("login");
                localStorage.setItem("loginId", JSON.stringify(elem.id))
                window.location.href = "./index.html"
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Incorrect email or password',
                    text: 'Please enter correct credentials to sign in',
                })
            }
        })
    })
})