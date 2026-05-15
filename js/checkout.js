$(document).ready(function () {
    if (!isLoggedIn()) {
        window.location.href = "login.html";
        return;
    }

    let name = getCookie("profileName").split(" ");
    let email = getCookie("profileAddress");
    let phone = getCookie("profilePhone");
    let address = getCookie("profileAddress");

    $("#firstName").val(name[0]);
    $("#lastName").val(name[1]);
    $("#email").val(email);
    $("#phone").val(phone);
    $("#address").val(address);


    $(".placeOrderBtn").click(function (e) {
        e.preventDefault();

        const valid = validation();

        if (valid) {
            const order = {
                customer: {
                    firstName: $("#firstName").val().trim(),
                    lastName: $("#lastName").val().trim(),
                    email: $("#email").val().trim(),
                    phone: $("#phone").val().trim(),
                    address: $("#address").val().trim(),
                    delivery: $("#deliveryOption").val()
                },
                cart: getCartItems()
            };

            localStorage.setItem("order", JSON.stringify(order));

            alert("Order placed successfully!");

            window.location.href = "confirmation.html";
        }
    });
});

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

function isLoggedIn() {
    // Checkout is only available when the login token cookie exists.
    return getCookie("token") !== "";
}

// FETCH CART ITEMS FROM LOCAL STORAGE
function getCartItems() {
    try {
        const cartData = localStorage.getItem("cart");
        return cartData ? JSON.parse(cartData) : [];

    } catch (error) {
        console.error("Error fetching items:", error);
        return [];
    }
}

function displayCartItems() {
    let cart = getCartItems();

    let grandTotal = 0;

    $(".summaryList").empty();

    // DISPLAY ORDER SUMMARY
    cart.forEach(item => {
        
        const itemTotal = item.quantity * item.price;

        grandTotal += itemTotal;

        $(".summaryList").append(`

            <div class="summaryItem">

                <div class="summaryProduct">

                    <img 
                        src="${item.image}" 
                        alt="${item.title}">

                    <div>

                        <div class="summaryTitle">
                            ${item.title}
                        </div>

                        <small>
                            ${item.category}
                        </small>

                        <div class="summaryQty">
                            Quantity: ${item.quantity}
                        </div>

                    </div>

                </div>

                <div class="summaryPrice">
                    $${itemTotal.toFixed(2)}
                </div>

            </div>

        `);
        
    });

    $(".summaryList").append(`

        <div class="summaryTotal">

            <span>Total</span>

            <span>
                $${grandTotal.toFixed(2)}
            </span>

        </div>

        `);
}

function validation() {
    let isValid = true;

    const firstName = $("#firstName").val().trim();
    const lastName = $("#lastName").val().trim();
    const email = $("#email").val().trim();
    const phone = $("#phone").val().trim();
    const address = $("#address").val().trim();

    const nameRegex = /^[A-Za-z\s]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    // CLEAR PREVIOUS ERRORS
    $(".errorText").text("");
    $("input").removeClass("error");


    // TEST REGEX AND DISPLAY ERRORS
    if (!nameRegex.test(firstName)) {
        $("#firstNameError").text("Please enter a valid first name.");
        $("#firstName").addClass("error");
        isValid = false;
    }

    if (!nameRegex.test(lastName)) {
        $("#lastNameError").text("Please enter a valid last name.");
        $("#lastName").addClass("error");
        isValid = false;
    }

    if (!emailRegex.test(email)) {
        $("#emailError").text("Please enter a valid email address.");
        $("#email").addClass("error");
        isValid = false;
    }

    if (!phoneRegex.test(phone)) {
        $("#phoneError").text("Please enter a valid phone number.");
        $("#phone").addClass("error");
        isValid = false;
    }

    if (!address) {
        $("#addressError").text("Please enter your address.");
        $("#address").addClass("error");
        isValid = false;
    }

    return isValid;
}
