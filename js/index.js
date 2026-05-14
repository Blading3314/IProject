$(document).ready(function () {
    $(".carousel-group").html("<h2>Loading carousel...</h2>");

    $.ajax({
        url: "https://fakestoreapi.com/products",
        method: "GET",
        success: function (data) {
            $(".carousel-group").empty();

            appendToClass($(".carousel-group"), data)
        },

        error: function (xhr, status, error) {
            console.log("Error", error)
        }
    });
});

function appendToClass(classes, list) {
    $(classes).each(function () {
        addToCarousel(this, list)
    });
};

function addToCarousel(element, list) {
    list.forEach(product => {
        const card = $(`
        <div class="carousel-card">
            <img class="product-image" src="${product.image}" alt="${product.title}.png">
        </div>`
        );

        card.on("click", function () {
            localStorage.setItem("product", JSON.stringify(product));
            window.location.href = "/html/pdp.html";
        });

        $(element).append(card);
    })
}