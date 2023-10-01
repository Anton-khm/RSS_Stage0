const randomPhotos = 'https://api.unsplash.com/photos/random?count=12&client_id=hauR06qXoZm4yk7Pel71ywqXSP1r3_WjhWNk0MBjdCY'
const galleryContainer = document.querySelector(".gallery_container");

async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    // const images = await data.results;
    return data;
}

async function showData() {
    // const images = await getData();
    const data = await getData(randomPhotos);
    data.map((img) => {
        const newImg = `<div class="img-container"><img class="gallery-img" src="${img.urls.regular}" alt="image${data.indexOf(img)}"></div>`;
        galleryContainer.insertAdjacentHTML('beforeend', newImg);
    })
}

showData();

// Get the input field
let input = document.getElementById("search");
const searchBtn = document.querySelector(".searchBtn");

async function searchData() {
    const searchedPhotos = `https://api.unsplash.com/search/photos?query=${input.value}&client_id=hauR06qXoZm4yk7Pel71ywqXSP1r3_WjhWNk0MBjdCY`
    const data = await getData(searchedPhotos);
    data.results.map((img) => {
        const newImg = `<div class="img-container"><img class="gallery-img" src="${img.urls.regular}" alt="image${data.results.indexOf(img)}"></div>`;
        galleryContainer.insertAdjacentHTML('beforeend', newImg);
    })
}

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // // Trigger the button element with a click
        // document.querySelector(".searchBtn").click();
        if (input.value !== '') {
            galleryContainer.innerHTML = '';
            searchData();
        } else {
            galleryContainer.innerHTML = '';
            showData();
        }
    }
});

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    if (input.value !== '') {
        galleryContainer.innerHTML = '';
        searchData();
    } else {
        galleryContainer.innerHTML = '';
        showData();
    }
})

const clearBtn = document.querySelector(".clear_input");

clearBtn.addEventListener("click", function (event) {
    event.preventDefault();
    input.value = '';
})

