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
    }

    const results = data.results;
    let rowDiv;
    results.map((result, index) =>{
        // const imageWrapper = document.createElement("div");
        // imageWrapper.classList.add("card");
        // const image = document.createElement("img");
        // image.src = result.urls.small;
        // image.alt = result.alt_description;
        // const imageLink = document.createElement("a");
        // imageLink.href = result.links.html;
        // imageLink.target = "_blank";
        // imageLink.textContent = result.alt_description;
        // // console.log(imageLink);

        // imageWrapper.appendChild(image);
        // imageWrapper.appendChild(imageLink);
        // containerElement.appendChild(imageWrapper);
        if (index % 3 === 0) {
            // Start a new row for every third image
            rowDiv = document.createElement("div");
            rowDiv.classList.add("row");
        }
        const colDiv = document.createElement("div");
        colDiv.classList.add( "col-lg-6", "col-md-6", "col-12");

        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card", "mb-3");

        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        image.classList.add("card-img-top");

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.classList.add("text-dark-emphasis", "p-2", "d-block", "text-decoration-none");
        imageLink.textContent = result.alt_description;

        cardDiv.appendChild(image);
        cardDiv.appendChild(imageLink);
        colDiv.appendChild(cardDiv);
        // containerElement.appendChild(colDiv);

        rowDiv.appendChild(colDiv);

        if ((index % 3 === 2) || (index === results.length - 1)) {
            containerElement.appendChild(rowDiv);
        }
    })

    if (page > 1) {
        showMoreButton.style.display = block;
    }
}

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
})