import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchImages } from "./pixabay-api";
import { showLoader, hideLoader, displayImages } from "./render-functions";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const loader = document.querySelector('.loader');

form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const query = input.value.trim(); 

    if (query === "") {
        iziToast.error({
            title: "Error",
            message: "Please enter a search query!",
            position: "topRight",
            pauseOnHover: false,
            closeOnClick: true
        });
        return;
    }

    showLoader(loader);  

    fetchImages(query).then(images => {
        if (images.length === 0) {
            iziToast.error({
                title: "Error",
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topRight",
                pauseOnHover: false,
                closeOnClick: true
            });
        } else {
            console.log(images);
            displayImages(images); 
        }
    })
    .finally(() => {
        hideLoader(loader);  
    });
});
