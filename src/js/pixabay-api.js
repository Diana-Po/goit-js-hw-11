import axios from "axios";

const API_KEY = "49001064-c7b72e374a4ae6399075933f6";
const BASE_URL = "https://pixabay.com/api/";

export function fetchImages(query) {
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
            throw error;
        });
}
