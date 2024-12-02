let url = "https://fakestoreapi.com/products"
let body = document.querySelector("body")
let signEmail = document.querySelector(".signEmail")
let agreed = document.querySelector(".agreed")
let signBtn1 = document.querySelector(".signBtn1")
let signedUsername
let signedEmail
let signedPassword

signBtn1.addEventListener("click", function (e) {
    e.preventDefault()
    if (signEmail.value == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Provide an email first',
        })
    }
    else if (!agreed.checked) {
        Swal.fire({
            icon: 'error',
            title: 'Please agree with Terms of Use',
        })
    }
    else {
        signedEmail=signEmail.value
        body.innerHTML = `<div class="login">
        <div class="card">
            <div class="header">Create Account</div>
            <div class="logintext">Excepteur sint occaecat cupidatat mollit</div>
            <form action="">
                <label for="text">Code</label>
                        <input class="code" type="number" name="text" id="text" placeholder="* * * * * *">
                        <button class="approveCode">Approve</button>
                        <div class="notSent">Code not sent? <a href="#">Send again</a> (01:00 then)</div>
            </form>
        </div>
    </div>`
        let code = document.querySelector(".code")
        let approveCode = document.querySelector(".approveCode")
        approveCode.addEventListener("click", function (e) {
            e.preventDefault()
            if ((code.value).length != 6) {
                Swal.fire({
                    icon: 'error',
                    title: 'Code should contain 6 numbers',
                })
            }
            else {
                Swal.fire({
                    icon: 'success',
                    title: 'Code approved',
                })
                body.innerHTML = `<div class="login registered">
                <div class="card">
                    <div class="header">Create Account</div>
                    <div class="logintext">Please complete your account by setting your
                        username and password.</div>
                    <form action="">
                        <label for="username">First name and Last name</label>
                        <input type="text" name="username" id="username" class="username">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" class="password">
                        <label for="balance">Balance</label>
                        <input type="number" name="balance" id="balance" class="balance">
                        <button class="completeBtn">Complete</button>
                    </form>
                </div>
                </div>`
                let username = document.querySelector(".username")
                let password = document.querySelector(".password")
                let completeBtn = document.querySelector(".completeBtn")
                let balance=document.querySelector(".balance")
                completeBtn.addEventListener("click", function (e) {
                    e.preventDefault()
                    if (username.value == 0 || password.value == 0) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Please fill all fields',
                        })
                    }
                    else {
                        signedPassword=password.value
                        signedUsername=username.value
                        fetch(url, {
                            method: "POST",
                            body: JSON.stringify({
                                "email": signedEmail,
                                "password": signedPassword,
                                "profilePic": "https://picsum.photos/200",
                                "basket": [],
                                "favorites": [],
                                "orders": [],
                                "name": signedUsername,
                                "balance":balance,
                                "admin":false

                            }),
                            headers: {
                                "Content-type": "application/json; charset=UTF-8"
                            }
                        }).then(response => {
                            if (!response.ok) {
                                throw new Error("API didn't worked");
                            }
                            return response.json();
                        }).then(data => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Signed up successfully',
                            });
                            window.location.href = "./login.html";
                        }).catch(error => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Please try again.',
                            });
                        });
                        
                    }
                })
            }
        })
    }
})