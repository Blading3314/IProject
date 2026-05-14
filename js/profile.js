const defaultProfile = {
    name: "Eve Holt",
    email: "eve.holt@reqres.in",
    phone: "555-0134",
    address: "123 Market Street"
};

function setCookie(name, value, days) {
    let expires = "";

    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/; SameSite=Lax";
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");

    for (let i = 0; i < cookies.length; i++) {
        const parts = cookies[i].split("=");

        if (parts[0] === name) {
            return decodeURIComponent(parts.slice(1).join("="));
        }
    }

    return "";
}

function getProfile() {
    return {
      //if no cookie, return default profile
        name: getCookie("profileName") || defaultProfile.name,
        email: getCookie("profileEmail") || defaultProfile.email,
        phone: getCookie("profilePhone") || defaultProfile.phone,
        address: getCookie("profileAddress") || defaultProfile.address
    };
}

function renderProfile(profile) {
  // fill in profile details in forms and display box
    $("#display-name").text(profile.name);
    $("#display-email").text(profile.email);
    $("#display-phone").text(profile.phone);
    $("#display-address").text(profile.address);

    $("#name").val(profile.name);
    $("#email").val(profile.email);
    $("#phone").val(profile.phone);
    $("#address").val(profile.address);
}

$(document).ready(function () {
    if(!document.cookie.includes("token=")) {
        window.location.href = "login.html";
        return;
    }
    renderProfile(getProfile());

    $("#profile-form").on("submit", function (e) {
        e.preventDefault(); // prevent form from submitting normally

        const profile = {
            name: $("#name").val().trim(),
            email: $("#email").val().trim(),
            phone: $("#phone").val().trim(),
            address: $("#address").val().trim()
        };

        setCookie("profileName", profile.name, 7);
        setCookie("profileEmail", profile.email, 7);
        setCookie("profilePhone", profile.phone, 7);
        setCookie("profileAddress", profile.address, 7);

        renderProfile(profile);
        $("#profile-message").text("Profile saved.");
    });
});
