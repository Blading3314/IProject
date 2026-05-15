const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

$(document).ready(function () {
    $("#footer-container").load("footer.html", function () {
        $("#subscribe-button").on("click", function () {
            let email = $("#input-newsletter").val().trim();
            $("#newsletter-message").text("");
            if (regexEmail.test(email)) {
                $("#newsletter-message")
                    .removeClass("error")
                    .addClass("success")
                    .text("Thank you for subscribing");
            } else {
                $("#newsletter-message")
                    .removeClass("success")
                    .addClass("error")
                    .text("Invalid email");
            }
        });
    });
})