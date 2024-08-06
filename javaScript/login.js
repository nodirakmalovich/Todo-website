let form = document.querySelector('.login_row_col_4_form')
let emailInput = document.querySelector('.login_row_col_4_form_email')
let passwordInput = document.querySelector('.login_row_col_4_form_password')

let logIn = document.querySelector('.login_row_col_4_form_login')

let registrBtn = document.querySelector('.login_row_col_4_form_registr')

logIn.addEventListener('click', (e) => {
    e.preventDefault()
    if (emailInput.value == '') {
        emailInput.style.borderColor = 'red'
        emailInput.placeholder = 'Please fill this field'
    } else {
        emailInput.style.borderColor = '#D0D0D0'
        emailInput.placeholder = 'Email'
    }

    if (passwordInput.value == '') {
        passwordInput.style.borderColor = 'red'
        passwordInput.placeholder = 'Please fill this field'
    } else {
        passwordInput.style.borderColor = '#D0D0D0'
        passwordInput.placeholder = 'Password'
    }

    fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: emailInput.value,
            password: passwordInput.value,
        })
    })
        .then(res => res.json())
        .then(res => {
            if(res.message){
                emailInput.value = ''
                emailInput.placeholder = res.message
                emailInput.style.borderColor = 'red'
    
                passwordInput.style.borderColor = 'red'
                passwordInput.value = ''
                passwordInput.placeholder = res.message
            }
            if (res.token) {
                window.location.replace("./htmls/index.html");
                emailInput.placeholder = 'Email'
                passwordInput.placeholder = 'Password'
            }
        });
})
