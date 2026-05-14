const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
const regexEmail = /^[a-zA-Z0-9][a-zA-Z0-9\_\.\-]{3,15}@\D[a-zA-Z0-9\.]{0,22}\D(?:\.com|\.ca|\.qc\.ca)$/;

$(document).ready(function () {
    $("#register-form").on("submit", function (e) {
        e.preventDefault();

        let name = $("#name").val().trim();
        let email = $("#email").val().trim();
        let password = $("#password").val().trim();
        let confirm = $("#confirm-password").val().trim();

        $("#register-message").text("");

        if (!regexEmail.test(email)) {
            $("#register-message").text("Invalid Email.");
            return;
        }

        if (!regexPassword.test(password)) {
            $("#register-message").text("Invalid Password.");
            return;
        }

        if (password !== confirm) {
            $("#register-message").text("Passwords do not match.");
            return;
        }

        let user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem("user", JSON.stringify(user));

        $("#register-message")
            .removeClass("error")
            .addClass("success")
            .text("Registration successful redirecting to Login Page");

        setTimeout(function () {
            window.location.href = "login.html";
        }, 600);
    });
});