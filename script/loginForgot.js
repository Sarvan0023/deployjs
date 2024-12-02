let url = "https://fakestoreapi.com/products"
let forgotEmail = document.querySelector(".forgotEmail")
let forgotEmailBtn = document.querySelector(".forgotEmailBtn")
let body = document.querySelector("body")

forgotEmailBtn.addEventListener("click", function (e) {
    e.preventDefault()
    fetch(url).then(res => res.json()).then(data => {
        data.forEach(elem => {
            e.preventDefault()
            if (elem.email != forgotEmail.value) {
                Swal.fire({
                    icon: 'error',
                    title: 'Email not found',
                    text: 'Please enter correct credentials to reset password',
                })
            }
            else {
                body.innerHTML = `<div class="login">
                <div class="card">
                    <div class="header">Forgot your password?</div>
                    <div class="logintext">Nor again is there anyone who to enjoy a pleasure that
                        or pursues or desires to obtain</div>
                    <form action="">
                        <div><label for="text">Code</label>
                                <input type="number" name="text" class="forgotCode" id="text" placeholder="* * * * * *">
                                <button class="codeApprove">Approve</button>
                    </form>
                </div>
        
            </div>`
                let forgotCode = document.querySelector(".forgotCode")
                let codeApprove = document.querySelector(".codeApprove")
                codeApprove.addEventListener("click", function (e) {
                    e.preventDefault()
                    if ((forgotCode.value).length != 6) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Code should contain 6 symbols',
                        })
                    }
                    else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Code approved',
                        })
                        body.innerHTML = `<div class="login">
                        <div class="card">
                            <div class="header">Reset password</div>
                            <div class="logintext">Nor again is there anyone who to enjoy a pleasure that
                                or pursues or desires to obtain</div>
                            <form action="">
                                <label for="text">New password</label>
                                <input type="password" name="text" class="newPass" id="text" placeholder="* * * * * *">
                                <button class="approveNewPass">Approve</button>
                            </form>
                        </div>
                    </div>`
                        let newPass = document.querySelector(".newPass")
                        let approveNewPass = document.querySelector(".approveNewPass")
                        approveNewPass.addEventListener("click", function (e) {
                            e.preventDefault()
                            fetch(url).then(res => res.json()).then(data => {
                                let change = data.find(elem => elem.email == forgotEmail.value);
                                if (change) {
                                    change.password == newPass.value
                                    fetch(`${url}/${change.id}`, {
                                        method: "Put",
                                        body: JSON.stringify({
                                            "email": change.email,
                                            "password": newPass.value,
                                            "profilePic": change.profilePic,
                                            "basket": change.basket,
                                            "favorites": change.favorites,
                                            "orders": change.orders,
                                            "name": change.name,
                                            "surname":change.surname,
                                            "balance":change.balance,
                                            "admin":change.admin,
                                            "id": change.id,
                                        }),
                                        headers: {
                                            "Content-type": "application/json; charset=UTF-8"
                                        }
                                    }).then(
                                        body.innerHTML = `<div class="login loginForgot">
                                        <div class="card">
                                            <div class="succesImg"><img src="./res/img/icons/checked (2).svg" alt=""></div>
                                            <div class="header">Password updated successfully</div>
                                            <div class="logintext">Please reload your account
                                                enter</div>
                                            <form action="">
                                                <button class="loginForgotBtn"><a href="./login.html">Login</a></button>
                                
                                            </form>
                                        </div>
                                    </div>`
                                    )
                                }

                            })
                        })
                    }
                })
            }
        })
    })
})