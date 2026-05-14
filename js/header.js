let products = [];

$(document).ready(function() {

    $("#header-container").load("header.html");

    const searchInput = $("#search-input");
    const searchDropdown = $("#search-dropdown");

    $.get("https://fakestoreapi.com/products", function(data) {
        products = data;
    });

    searchDropdown.hide();

    searchInput.on("input", function () {
        const query = $(this).val().toLowerCase().trim();

        if(query.length === 0) {
            searchDropdown.empty().hide();
            return;
        }

        const results = products.filter(p => p.title.toLowerCase().includes(query));

        if(results.length > 0) {
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
    console.log(products);
})

function setClothingDetails(product) {
    localStorage.setItem("product", JSON.stringify(product));
    window.location.href = "pdp.html";
}