let form = document.querySelector('.login_row_col_4_form')
let emailInput = document.querySelector('.login_row_col_4_form_email')
let passwordInput = document.querySelector('.login_row_col_4_form_password')

let logIn = document.querySelector('.login_row_col_4_form_login')


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


    fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: emailInput.value,
            password: passwordInput.value,
        })
    })
        .then(res => res.json())
        .then(res => {
            if(res.error){
                emailInput.value = ''
                emailInput.placeholder = res.error
                emailInput.style.borderColor = 'red'
    
                passwordInput.style.borderColor = 'red'
                passwordInput.value = ''
                passwordInput.placeholder = res.error
            }
            if (res.token) {
                window.location.replace("../login.html");
                emailInput.placeholder = 'Email'
                passwordInput.placeholder = 'Password'
            }
        })
})

