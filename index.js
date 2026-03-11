import DocPouchClient from "docpouch-client";

async function toolchainAccess(user, password) {
    const client = new DocPouchClient('https://your-docpouch-server.com', 80);
    const loginResponse = await client.login({
        name: user,
        password: password
    });

    if (loginResponse) {
        client.setToken('your-auth-token');
    } else {
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
        await toolchainAccess(username, password);
        modal.style.display = 'none';
        errorDiv.classList.remove('show');
        errorDiv.textContent = '';
        form.reset();
    } catch (error) {
        errorDiv.textContent = 'Login failed: ' + error.message;
        errorDiv.classList.add('show');
    }
}

window.showLoginDialog = function() {
    modal.style.display = 'block';
};