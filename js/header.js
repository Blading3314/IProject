let products = [];

$(document).ready(function () {

    $("#header-container").load("header.html", function () {
        const searchInput = $("#search-input");
        const searchDropdown = $("#search-dropdown");

        $.get("https://fakestoreapi.com/products", function (data) {
            products = data;
        });

        searchDropdown.hide();

        searchInput.on("input", function () {
            const query = $(this).val().toLowerCase().trim();

            if (query.length === 0) {
                searchDropdown.empty().hide();
                return;
            }

            const results = products.filter(p => p.title.toLowerCase().includes(query));

            if (results.length > 0) {
                searchDropdown.empty();
                results.forEach(p => {
                    const item = $("<div/>").addClass("search-item").text(p.title);

                    item.on("click", function () {
                        setClothingDetails(p);
                    });

                    searchDropdown.append(item);
                })
                searchDropdown.show();
            } else {
                searchDropdown.empty().hide();
            }
        });

        $(document).on("click", function(e) {
            if(!e.target.closest("#search-input, #search-dropdown")) {
                searchDropdown.hide();
            }
        })

        const cart = localStorage.getItem("cart");
        updateCartCount();

        const user = localStorage.getItem("user");
        userAccount(user);
    });
})

function setClothingDetails(product) {
    localStorage.setItem("product", JSON.stringify(product));
    window.location.href = "pdp.html";
}

window.updateCartCount = function() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalQuantity = 0;

    cart.forEach(item => {
        totalQuantity += item.quantity || 1;
    });
    
    $("#cart-count").text(totalQuantity);
}

function userAccount(user) {
    if(!user) {
        $("#user-account").attr("href", "register.html");
    }
}