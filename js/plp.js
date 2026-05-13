async function getClothes() {
  try {
    const response = await fetch(
      "https://dummyjson.com/c/a77b-d361-4639-bdc5"
    );

    const result = await response.json();
    localStorage.setItem("list", JSON.stringify(result));
    return result;

  } catch (error) {
    console.error("Error fetching clothes:", error);
    return [];
  }
}
const numPerPage = 12;
let page = 1;

async function render() {

    const clothing = await getClothes();

    clothing.filter(e => e.price)
    const categoryFilter = document.getElementById("category-filter").value;
    const priceSortFilter = document.getElementById("price-sort").value;
    const maxPriceFilter = document.getElementById("price-range").value;

    const maxPrice = Math.max(...clothing.map(product => Math.ceil(product.price)));
    console.log(maxPrice);
    document.getElementById("price-range").max = maxPrice;
    let filterList = clothing.filter(
      e => (categoryFilter === "All Categories" || categoryFilter === e.category) && e.price <= maxPriceFilter);


    if(priceSortFilter === "Low-High") {
      filterList.sort((a,b) => a.price - b.price);
    }
    if(priceSortFilter === "High-Low") {
      filterList.sort((a,b) => b.price - a.price);
    }

    const pagination = Math.max(1, Math.ceil(filterList.length / numPerPage));

    if(page > pagination) {
      page = 1;
    }

    const slice = filterList.slice((page - 1) * numPerPage, page * numPerPage);

    const list = document.getElementById("product-list");
    list.innerHTML = "";

    slice.forEach(product => {
      const card = document.createElement("section");
      card.className = "product-card";
      card.innerHTML = `
        <img class="product-image" src="" alt="${product.name}.png">
        <section class="product-info">
          <section class="product-name">${product.name}</section>
          <section class="product-category">${product.category}</section>
        </section>
        <section class="product-price">Price: $${product.price}</section>`;
      
        card.addEventListener("click", () => getClothingDetails(product));

        list.appendChild(card);
    });

    const pagi = document.getElementById("product-pagination");

  pagi.innerHTML = Array.from({ length: pagination }, (_, i) =>
    `<button class="page-btn ${i+1 === page ? 'active' : ''}" onclick="changePage(${i+1});">
  ${i+1}</button>`
  ).join("");
}

function changePage(p) {
  page = p;
  render();
}

function getClothingDetails(product) {
    localStorage.setItem("product", JSON.stringify(product));
    localStorage.setItem("clothes", JSON.stringify(getClothes()));
    window.location.href = "pdp.html";
}

document.getElementById("category-filter").addEventListener("change", () => {
  page=1; render()});
document.getElementById("price-sort").addEventListener("change", () => {
  page=1; render()});
document.getElementById("price-range").addEventListener("input", () => {
  page=1; render()});
render();
