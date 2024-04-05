const access = "t-3O3Ly2OlBHsoNefV6_x8zOFtiXBEW8ComdPKHqsog";

const formElement = document.querySelector('form');
const searchInput = document.getElementById("search-input");
const containerElement = document.querySelector(".container");
const showMoreButton = document.getElementById('show-more');

formElement.addEventListener("submit", (event)=>{
    event.preventDefault();
    console.log('Submitted!');
})