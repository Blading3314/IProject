$(document).ready(function () {
    const product = JSON.parse(localStorage.getItem("product"));
    $(".carousel-group").html("<h2>Loading carousel...</h2>");

    $.ajax({
        url: "https://fakestoreapi.com/products",
        method: "GET",
        success: function (data) {
            if (!product) {
                setTimeout(function () {
                    window.location.href = "plp.html";
                }, 600);
            }
            displayProduct(product);
            $(".carousel-group").empty();

            appendToClass($(".carousel-group"), data);

            $("#cart-button").on("click", function () {
                let amount = parseInt($("#product-quantity").val(), 10) || 0;

                if (amount <= 0 || isNaN(amount)) {
                    alert("Please enter a valid quantity.");
                    return;
                }

                let cart = localStorage.getItem("cart");

                cart = cart ? JSON.parse(cart) : [];

                const existingItem = cart.find(item => item.id === product.id);

                if (existingItem) {
                    existingItem.quantity += amount;
                } 
                else {
                    const newItem = {
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                        category: product.category,
                        quantity: amount
                    };
                    cart.push(newItem);
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartCount();
                console.log(cart);
            });
        },

        error: function (xhr, status, error) {
            console.log("Error", error)
        }
    })
});

function appendToClass(classes, list) {
    $(classes).each(function () {
        addToCarousel(this, list)
    });
}

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

function getClothingDetails(product) {
    localStorage.setItem("product", JSON.stringify(product));
    window.location.href = "/html/pdp.html";
}

function displayProduct(product) {
    const pImage = $("#product-image");
    const pTitle = $("#product-title");
    const pDescription = $("#product-description");
    const pPrice = $("#product-price");
    const pStock = $("#product-sku");
    const pAvailability = $("#product-availability");
    var availabilityString = "";

    pImage.attr("src", product.image);
    pTitle.text(pTitle.text() + product.title);
    pDescription.text(pDescription.text() + product.description)
    pPrice.text(pPrice.text() + "$" + product.price.toFixed(2));
    pStock.text(pStock.text() + product.rating.count)

    product.rating.count > 0 ? availabilityString = "In Stock" : availabilityString = "Out of Stock";
    pAvailability.text(availabilityString);
}