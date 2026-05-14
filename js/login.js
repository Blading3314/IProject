
$(document).ready(function () {
    if(document.cookie.includes("token=")) {
        window.location.href = "profile.html";
    }
    
    $("#login-form").on("submit", async function (e) {
        e.preventDefault();

        let email = $("#email").val().trim();
        let password = $("#password").val().trim();

         $("#login-message")
            .removeClass("success")
            .addClass("error")
            .text("");

        try {
            const response = await fetch("https://reqres.in/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "reqres-free-v1"
                },
                body: JSON.stringify({ //turns object into json
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                $("#login-message").text(data.error || "Login failed.");
                return;
            }

            // max age is 1 hour

            document.cookie = "token=" + data.token + "; path=/; max-age=3600; SameSite=Lax";

            $("#login-message")
                .removeClass("error")
                .addClass("success")
                .text("Login successful.");
        } catch (error) {
            $("#login-message").text("Unable to login right now.");
        }
    });
});
