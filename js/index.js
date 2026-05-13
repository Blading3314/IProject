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

const slides = document.getElementsByClassName("carousel-group");

async function load() {

    let list = JSON.parse(localStorage.getItem("list"));

    if(!list) {
        list = await getClothes();
    }

    console.log(list);
    
    let featuredList = list.filter(e => e.price >= 80);


    eachSlide(slides, featuredList);
}

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

    // <section class="product-info">
    //     <section class="product-name">${product.title}</section>
    //     <section class="product-category">${product.category}</section>
    // </section>