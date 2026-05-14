$(document).ready(function () {
    $("#product-list").html("<h2>Loading products...</h2>");

    $.ajax({
        url: "https://fakestoreapi.com/products",
        method: "GET",
        success: function (data) {
          $("#product-list").empty();
          render(data);
        },

        error: function (xhr, status, error) {
            console.log("Error", error)
        }
    });

    $("#category-filter").on("change", function () {
      render(produce);
    });

    $("#price-sort").on("change", function () {
      render(produce);
    });

    $("#price-range").on("input", function () {
      $("#price-value").text("$" + $(this).val());
      render(produce);
    });
});

let produce = [];

function render(products) {
  if(!products) return;

  produce = products;

  const categoryFilter = $("#category-filter").val();
  const priceSortFilter = $("#price-sort").val();
  const maxPriceFilter = $("#price-range").val();

  const maxPrice = Math.max(...products.map(p => Math.ceil(p.price)));
  $("#price-range").attr("max", maxPrice);

  let filtered = products.filter(p => (
    (categoryFilter === "All Categories" || categoryFilter.toLowerCase() === p.category)
    && p.price <= maxPriceFilter
  ));

  if(priceSortFilter === "Low-High") {
    filtered.sort((a,b) => a.price - b.price);
  }

  if(priceSortFilter === "High-Low") {
    filtered.sort((a,b) => b.price - a.price);
  }

  const list = $("#product-list");
  list.empty();

  filtered.forEach(p => {
    const card = $(`
      <div class="product-card">
        <img class="product-image" src="${p.image}" alt="${p.title}.png">
      <label class="product-label" for="product-name">Title: </label>
      <p class="product-name">${p.title}</p>
      <label class="product-label" for="product-price">Price: </label>
      <p class="product-price">$${p.price.toFixed(2)}</p>`);
    
    card.on("click", function () {
      getClothingDetails(p);
    });

    list.append(card);
  });
}

function getClothingDetails(product) {
    localStorage.setItem("product", JSON.stringify(product));
    window.location.href = "pdp.html";
}
