async function getClothes() {
    try {
        const response = await fetch(
            "https://fakestoreapi.com/products"
        );

        const result = await response.json();
        localStorage.setItem("list", JSON.stringify(result));
        return result;

    } catch (error) {
        console.error("Error fetching clothes:", error);
        return [];
    }
}

async function load() {

    let list = JSON.parse(localStorage.getItem("list"));

    if(!list) {
        list = await getClothes();
    }

    console.log(list);
    
    let featuredList = list.filter(e => e.price >= 80);


    eachSlide(slides, featuredList);
}
const numPerPage = 5;
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
        <img class="product-image" src="${product.image}" alt="${product.title}.png">
        <section class="product-info">
          <section class="product-name">${product.title}</section>
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

load();
