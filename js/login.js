
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

        /* Lets a locally registered demo user log in without depending on ReqRes.
        in a real world application, I would not use localStorage for this, because it is not secure for passwords.
         */
        const user = JSON.parse(localStorage.getItem("user"));

        if (user && email === user.email && password === user.password) {
            document.cookie = "token=local-login-token; path=/; max-age=3600; SameSite=Lax";
            document.cookie = "profileName=" + encodeURIComponent(user.name) + "; path=/; max-age=604800; SameSite=Lax";
            document.cookie = "profileEmail=" + encodeURIComponent(user.email) + "; path=/; max-age=604800; SameSite=Lax";

            $("#login-message")
                .removeClass("error")
                .addClass("success")
                .text("Login successful. Redirecting to profile.");

            setTimeout(function () {
                window.location.href = "profile.html";
            }, 600);

            return;
        }

        try {
            // Falls back to the ReqRes demo login when there is no local match.
            const response = await fetch("https://reqres.in/api/login", {
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
                $("#login-message").text(data.error || "Login failed.");
                return;
            }

            // Keep the user signed in for one hour.
            document.cookie = "token=" + data.token + "; path=/; max-age=3600; SameSite=Lax";

            $("#login-message")
                .removeClass("error")
                .addClass("success")
                .text("Login successful. Redirecting to profile.");

            setTimeout(function () {
                window.location.href = "profile.html";
            }, 600);
        } catch (error) {
            $("#login-message").text("Unable to login right now.");
        }
    });
});
