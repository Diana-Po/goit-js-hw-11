import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchImages } from "./js/pixabay-api";
import { showLoader, hideLoader, displayImages } from "./js/render-functions";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const loader = document.querySelector(".loader");
const gallery = document.getElementById("gallery");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = input.value.trim();

    if (query === "") {
        iziToast.error({
            title: "Error",
            message: "Please enter a search query!",
            position: "topRight",
            pauseOnHover: false,
            closeOnClick: true,
        });
        return;
    }

    // Очищаємо галерею перед запитом
    gallery.innerHTML = "";
    showLoader(loader);

    try {
        const images = await fetchImages(query);

        if (images.length === 0) {
            iziToast.error({
                title: "Error",
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topRight",
                pauseOnHover: false,
                closeOnClick: true,
            });
        } else {
            displayImages(images);
        }
    } catch (error) {
        gallery.innerHTML = "";
        iziToast.error({
            title: "Error",
            message: "Something went wrong. Please try again later!",
            position: "topRight",
            pauseOnHover: false,
            closeOnClick: true,
        });
    } finally {
        hideLoader(loader);
    }
});
