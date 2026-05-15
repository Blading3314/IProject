$(document).ready(function () {
    if (!isLoggedIn()) {
        window.location.href = "login.html";
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    displayCart();

    // DISPLAY CART
    function displayCart() {

        $("#cartBody").empty();

        let grandTotal = 0;

        // EMPTY CART
        if (cart.length === 0) {

            $("#cartBody").append(`

                <tr>
                    <td colspan="5">
                        Your cart is empty
                    </td>
                </tr>

            `);

            $("#total").text("$0.00");

            return;
        }

        // DISPLAY ITEMS
        cart.forEach((product, index) => {

            const quantity = product.quantity || 1;

            const itemTotal = quantity * product.price;

            grandTotal += itemTotal;

            $("#cartBody").append(`

                <tr data-index="${index}">

                    <td>

                        <div class="product">

                            <img 
                                src="${product.image}" 
                                alt="${product.title}"
                            >

                            <div>

                                <div class="product-name">
                                    ${product.title}
                                </div>

                                <small>
                                    ${product.category}
                                </small>

                            </div>

                        </div>

                    </td>

                    <td class="price">
                        $${product.price.toFixed(2)}
                    </td>

                    <td>

                        <input 
                            type="number"
                            class="quantity"
                            min="1"
                            value="${quantity}"
                        >

                    </td>

                    <td class="item-total">
                        $${itemTotal.toFixed(2)}
                    </td>

                    <td>

                        <button class="remove-btn">
                            Remove
                        </button>

                    </td>

                </tr>

            `);

        });

        $("#total")
            .text(`$${grandTotal.toFixed(2)}`);
    }

    // UPDATE QUANTITY
    $(document).on("input", ".quantity", function () {

        const row = $(this).closest("tr");

        const id = row.data("index");

        let quantity = parseInt($(this).val());

        if (quantity === "") {
            return;
        }

        if (isNaN(quantity) || quantity < 1) {
            quantity = 1;
        }

        const price = cart[id].price;

        const itemTotal = quantity * price;

        row.find(".item-total")
            .text(`$${itemTotal.toFixed(2)}`);

        cart[id].quantity = quantity;

        recalculateTotal();

        saveCart();

        updateCartCount();
    });

    // REMOVE ITEM
    $(document).on("click", ".remove-btn", function () {

        const row = $(this).closest("tr");

        const id = row.data("index");

        $(this).closest("tr").remove();

        cart.splice(id, 1);

        row.remove();

        recalculateTotal();

        saveCart();

        updateCartCount();
    });

    // RECALCULATE GRAND TOTAL
    function recalculateTotal() {

        grandTotal = 0;

        $(".item-total").each(function () {

            const value = parseFloat(
                $(this).text().replace("$", "")
            );

            grandTotal += value;
        });

        updateGrandTotal();
    }

    // UPDATE GRAND TOTAL DISPLAY
    function updateGrandTotal() {

        $("#total")
            .text(`$${grandTotal.toFixed(2)}`);
    }

    // SAVE CART TO LOCAL STORAGE
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));

        console.log(cart);
    }

    // PROCEED TO CHECKOUT
    $("#checkout").click(function () {
        window.location.href = "checkout.html";
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
    // Cart is only available when the login token cookie exists.
    return getCookie("token") !== "";
}
