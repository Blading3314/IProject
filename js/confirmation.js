$(document).ready(function () {
    displayOrder();

    $("#confirmBtn").click(function () {

        alert("Order confirmed!");

        localStorage.removeItem("cart");
        updateCartCount();
        
        localStorage.removeItem("order");
    });
});

// FETCH ORDER DETAILS FROM LOCAL STORAGE
function getOrderItems() {
    try {
        const orderData = localStorage.getItem("order");
        return orderData ? JSON.parse(orderData) : null;

    } catch (error) {
        console.error("Error fetching order:", error);
        return null;
    }
}

function displayOrder() {

    let order = getOrderItems();
    if (!order) return;

    let cart = order.cart;
    let customer = order.customer;

    let grandTotal = 0;

    // ORDER NUMBER (FIXED ID)
    $("#orderNum").text(
        "ORD-" + Math.floor(Math.random() * 1000000)
    );

    // CUSTOMER INFO
    $("#customerInfo").html(`

        <h3>Customer Details</h3>

        <p><strong>Name:</strong> ${customer.firstName} ${customer.lastName}</p>
        <p><strong>Email:</strong> ${customer.email}</p>
        <p><strong>Phone:</strong> ${customer.phone}</p>
        <p><strong>Address:</strong> ${customer.address}</p>
        <p><strong>Delivery:</strong> ${customer.delivery}</p>

    `);

    $(".orderItems").empty();

    // ITEMS
    cart.forEach(item => {

        const itemTotal =
            item.quantity * item.price;

        grandTotal += itemTotal;

        $(".orderItems").append(`

            <div class="summaryItem">

                <div class="summaryProduct">

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

    // TOTAL (FIXED ID)
    $("#totalPaid").text(
        `$${grandTotal.toFixed(2)}`
    );
}