// Password needs lowercase, uppercase, and a number for this demo.
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
// Basic email shape: something@something.something.
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setCookie(name, value, days) {
    let expires = "";

    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/; SameSite=Lax";
}

$(document).ready(function () {
    $("#register-form").on("submit", async function (e) {
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

        try {
            // ReqRes only succeeds for known demo users, but it gives us a token response.
            const response = await fetch("https://reqres.in/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "free_user_3DjPZMvRqgFHwM5yuZBgRFmLUCD"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                $("#register-message").text(data.error || "Registration failed.");
                return;
            }

            setCookie("token", data.token, 7);
            setCookie("profileName", name, 7);
            setCookie("profileEmail", email, 7);

            // Store the demo user locally so login can match the registered password.
            localStorage.setItem("user", JSON.stringify({
                name: name,
                email: email,
                password: password
            }));

            $("#register-message")
                .removeClass("error")
                .addClass("success")
                .text("Registration successful. Redirecting to profile.");

            setTimeout(function () {
                window.location.href = "profile.html";
            }, 600);
        } catch (error) {
            $("#register-message").text("Unable to register right now.");
        }
    });
});
