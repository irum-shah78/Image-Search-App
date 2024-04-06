const accessKey = "t-3O3Ly2OlBHsoNefV6_x8zOFtiXBEW8ComdPKHqsog";

const formElement = document.querySelector('form');
const searchInput = document.getElementById("search-input");
const containerElement = document.querySelector(".container");
const showMoreButton = document.getElementById('show-more');

let inputData = " ";
let page = 1;

async function searchImages() {
    inputData = searchInput.value;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    console.log(url);

    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        containerElement.innerHTML = "";
        containerElement.classList.add("d-flex", "justify-content-center", "align-items-center", "ms-5", "ps-3");
    }

    const results = data.results;

    let row = containerElement.querySelector(".row");
    if (!row) {
        row = document.createElement("div");
        row.classList.add("row");
        containerElement.appendChild(row);
    }

    results.map((result) => {

        const col = document.createElement("div");
        col.classList.add("col-lg-4", "col-md-6", "col-12");

        const card = document.createElement("div");
        card.classList.add("card", "mb-3");
        card.style.width = "22rem";
        card.style.marginBottom = "20px";
        card.style.cursor = "pointer";
        card.style.transition = "transform 0.3s ease-in-out";

        const image = document.createElement("img");
        image.classList.add("card-img-top");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        image.style.width = "100%";
        image.style.height = "250px";
        image.style.objectFit = "cover";

        const link = document.createElement("a");
        link.classList.add("text-dark-emphasis", "p-2", "d-block", "text-decoration-none");
        link.href = result.links.html;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = result.alt_description;

        card.appendChild(image);
        card.appendChild(link);
        col.appendChild(card);
        row.appendChild(col);

    });

    page++;
    console.log(page);

    if (page > 1) {
        showMoreButton.classList.remove("d-none");
        showMoreButton.classList.add("mb-3")
    }
}

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMoreButton.addEventListener("click", (event) => {
    searchImages();
});
