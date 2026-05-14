$(document).ready(function () {

    let grandTotal = 0;

    let cart = [];

    let quantity = 1;
    let itemTotal = 0;

    $.ajax({
        url: "https://fakestoreapi.com/products",
        method: "GET",

        success: function (products) {

            const cartProducts = products.slice(0, 5);

            cartProducts.forEach(product => {

                itemTotal = quantity * product.price;
                grandTotal += itemTotal;

                cart.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    category: product.category,
                    quantity: quantity
                });

                $("#cartBody").append(`

                    <tr data-id="${product.id}">

                        <td>
                            <div class="product">

                                <img src="${product.image}" 
                                     alt="${product.title}">

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
                                value="1"
                                data-price="${product.price}"
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

            updateGrandTotal();

            saveCart();
        },

        error: function () {

            console.log("Failed to fetch products");

        }
    });

    // UPDATE QUANTITY
    $(document).on("input", ".quantity", function () {

        const row = $(this).closest("tr");

        const id = row.data("id");

        const quantity = parseInt($(this).val());

        const price = parseFloat($(this).data("price"));

        const itemTotal = quantity * price;

        row.find(".item-total")
            .text(`$${itemTotal.toFixed(2)}`);

        const item = cart.find(i => i.id === id);
        
        if (item) {
            item.quantity = quantity;
        }

        recalculateTotal();

        saveCart();
    });

    // REMOVE ITEM
    $(document).on("click", ".remove-btn", function () {

        const row = $(this).closest("tr");

        const id = row.data("id");

        $(this).closest("tr").remove();

        cart = cart.filter(i => i.id !== id);
        row.remove();

        recalculateTotal();

        saveCart();
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