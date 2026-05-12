const product = JSON.parse(localStorage.getItem("product"));

console.log(product.name);
console.log(product.category);
console.log(product.price);

const list = JSON.parse(localStorage.getItem("list"));
console.log(list);

const productTitle = document.getElementById("product-title");
productTitle.textContent += product.name;
document.getElementById("product-description").textContent += product.description;
document.getElementById("product-price").textContent += "$" +product.price;
document.getElementById("product-sku").textContent += product.stock;
const productAvailability = document.getElementById("product-availability")
product.availability ? productAvailability.textContent += "Available" : productAvailability.textContent += "Out of stock"

let filterList = list.filter(e => e.category == product.category);
console.log(filterList)

const slides = document.getElementsByClassName("carousel-group");

function eachSlide(div) {
    Array.from(div).forEach(group => addToCarousel(group));
}

function addToCarousel(slide) {
    filterList.forEach(product => {
    const card = document.createElement("section");
    card.className = "carousel-card";
    card.innerHTML = `
    <img class="product-image" src="" alt="${product.name}.png">
    <section class="product-info">
        <section class="product-name">${product.name}</section>
        <section class="product-category">${product.category}</section>
    </section>
    <section class="product-price">Price: $${product.price}</section>`;
    
    card.addEventListener("click", () => getClothingDetails(product));

    slide.appendChild(card);
    });
}

function getClothingDetails(product) {
    localStorage.setItem("product", JSON.stringify(product));
    window.location.href = "pdp.html";
}

eachSlide(slides);