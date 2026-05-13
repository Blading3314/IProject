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

const product = JSON.parse(localStorage.getItem("product"));

function displayProduct(product) {
    const pImage = document.querySelector("#product-image");
    const pTitle = document.getElementById("product-title");
    const pDescription = document.getElementById("product-description");
    const pPrice = document.getElementById("product-price");
    const pStock = document.getElementById("product-sku");
    const pAvailability = document.getElementById("product-availability");

    pImage.src = product.image;
    pTitle.textContent += product.title;
    pDescription.textContent += product.description;
    pPrice.textContent += "$" +product.price.toFixed(2);
    pStock.textContent += product.rating.count;
    product.rating.count > 0 ? pAvailability.textContent += "In Stock" : pAvailability.textContent += "Out of Stock"
}

const slides = document.getElementsByClassName("carousel-group");

function eachSlide(div, featuredList) {
    Array.from(div).forEach(group => addToCarousel(group, featuredList));
}

function addToCarousel(slide, featuredList) {
    featuredList.forEach(product => {
        const card = document.createElement("section");
        card.className = "carousel-card";
        card.innerHTML = `
            <img class="product-image" src="${product.image}" alt="${product.title}.png">`
        card.addEventListener("click", () => getClothingDetails(product));

        slide.appendChild(card);
    });
}

function getClothingDetails(product) {
    localStorage.setItem("product", JSON.stringify(product));
    window.location.href = "/html/pdp.html";
}

load();
displayProduct(product);