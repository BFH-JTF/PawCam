import DocPouchClient from "docpouch-client";
const TOOLPATH = "toolchain.html"
const client = new DocPouchClient('https://docpouch.pantek.app', 80);

async function toolchainAccess(user, password) {
    const loginResponse = await client.login({
        name: user,
        password: password
    });

    if (loginResponse) {
        client.setToken(loginResponse.token);
        localStorage.setItem('authToken', loginResponse.token);
        window.location.replace(TOOLPATH)
    }
    else {
        throw new Error('Login failed');
    }
}

const modal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.login-close');
const form = document.getElementById('loginForm');
const errorDiv = document.getElementById('loginError');

closeBtn.onclick = function() {
    modal.style.display = 'none';
    errorDiv.classList.remove('show');
    errorDiv.textContent = '';
    form.reset();
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        errorDiv.classList.remove('show');
        errorDiv.textContent = '';
        form.reset();
    }
}

form.onsubmit = async function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        (await toolchainAccess(username, password)).then(() => {
            modal.style.display = 'none';
            errorDiv.classList.remove('show');
            errorDiv.textContent = '';
            form.reset();
        })
    } catch (error) {
        errorDiv.textContent = 'Login failed: ' + error.message;
        errorDiv.classList.add('show');
    }
}

window.showLoginDialog = function() {
    let token = localStorage.getItem("authToken");
    if (token){
        client.setToken(token);
        client.listUsers().then(users => {
            if (users.length === 0){
                localStorage.removeItem("authToken");
                modal.style.display = 'block';
            }
            else
                window.location.replace(TOOLPATH)
        })
    }
    else
        modal.style.display = 'block';
};