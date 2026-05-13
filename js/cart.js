$(document).ready(function () {

    let grandTotal = 0;

    $.ajax({
        url: "https://fakestoreapi.com/products",
        method: "GET",

        success: function (products) {

            const cartProducts = products.slice(0, 5);

            cartProducts.forEach(product => {

                let quantity = 1;
                let itemTotal = product.price * quantity;

                grandTotal += itemTotal;

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
        },

        error: function () {

            console.log("Failed to fetch products");

        }
    });

    // UPDATE QUANTITY
    $(document).on("input", ".quantity", function () {

        const quantity = parseInt($(this).val());

        const price = parseFloat($(this).data("price"));

        const itemTotal = quantity * price;

        const row = $(this).closest("tr");

        row.find(".item-total")
            .text(`$${itemTotal.toFixed(2)}`);

        recalculateTotal();
    });

    // REMOVE ITEM
    $(document).on("click", ".remove-btn", function () {

        $(this).closest("tr").remove();

        recalculateTotal();
    });

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

    function updateGrandTotal() {

        $("#total")
            .text(`$${grandTotal.toFixed(2)}`);
    }

    $("#checkout").click(function () {
        window.location.href = "checkout.html";
    });
});