// Updated script.js for LocalStorage-based Authentication

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("auth-form");
    const title = document.getElementById("form-title");
    const toggleText = document.getElementById("toggle-link");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("toggle-password");
    const loginButton = document.querySelector(".login__button");
    const usernameInput = document.getElementById("username");

    let isLogin = true;

    const updateForm = () => {
        title.textContent = isLogin ? "Login" : "Sign Up";
        toggleText.innerHTML = isLogin
            ? "Don't have an account? <span>Sign Up</span>"
            : "Already have an account? <span>Login</span>";
        loginButton.textContent = isLogin ? "Login" : "Sign Up";
    };

    toggleText.addEventListener("click", () => {
        isLogin = !isLogin;
        updateForm();
    });

    togglePassword.addEventListener("click", () => {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
        togglePassword.classList.toggle("ri-eye-line");
        togglePassword.classList.toggle("ri-eye-off-line");
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (!username || !password) {
            alert("Please fill in all fields");
            return;
        }
        
        let users = JSON.parse(localStorage.getItem("users")) || [];
        
        if (isLogin) {
            const validUser = users.find(user => user.username === username && user.password === password);
            if (validUser) {
                alert("Login successful!");
                localStorage.setItem("loggedInUser", username);
                window.location.href = "Game/game.html"; // Redirect after login
            } else {
                alert("Invalid credentials");
            }
        } else {
            if (users.some(user => user.username === username)) {
                alert("Username already exists");
            } else {
                users.push({ username, password });
                localStorage.setItem("users", JSON.stringify(users));
                alert("Signup successful! Please login.");
                isLogin = true;
                updateForm();
            }
        }
    });

    updateForm();
});
