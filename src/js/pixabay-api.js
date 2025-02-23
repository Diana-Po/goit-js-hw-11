import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const form = document.getElementById("search-form");
const input = document.getElementById("search-input");

const API_KEY = "49001064-c7b72e374a4ae6399075933f6";
const BASE_URL = "https://pixabay.com/api/";

function fetchImages(query) {
    const params = {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    };

    return axios
        .get(BASE_URL, { params })
        .then(response => response.data.hits) 
        .catch(error => {
            console.error("Error fetching images:", error);
            iziToast.error({
                title: "Error",
                message: "Something went wrong. Please try again later!",
                position: "topRight",
                pauseOnHover: false,
                closeOnClick: true
            });
        });
}

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

    showLoader();
    
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
        hideLoader();
});

function displayImages(images){
    const gallery = document.getElementById("gallery");

    gallery.innerHTML = "";

    images.forEach(image => {
        const listItem = document.createElement('li');
        listItem.classList.add('gallery-item');

        listItem.innerHTML = `
        <a href="${image.largeImageURL}" class="gallery-link">
                <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-image" />
            </a>
        <div class="info">
            <p>Likes <span>${image.likes}</span></p>
            <p>Views <span>${image.views}</span></p>
            <p>Comments <span>${image.comments}</span></p>
            <p>Downloads <span>${image.downloads}</span></p>
        </div>`;

        gallery.appendChild(listItem);
    });

    const lightbox = new SimpleLightbox('.gallery-link', {
        captionsData: "alt"
    });

    lightbox.refresh();
}


function showLoader() {
    loader.classList.remove('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
}
})
