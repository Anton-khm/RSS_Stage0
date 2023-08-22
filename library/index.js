const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 25,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 1
        },
        1400: {
            slidesPerView: 3
        },
    }
});

console.log('Score: 50 / 50\n1.Вёрстка соответствует макету. Ширина экрана 768px +26\n2.Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12\n3.На ширине экрана 768рх реализовано адаптивное меню +12')

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("burger").addEventListener("click", function () {
        document.querySelector(".header").classList.toggle("open")
    })
})

//Closing menu items after clicking on them
const menuItems = document.querySelectorAll(".nav-item")

menuItems.forEach((item) => {
    item.addEventListener("click", event => {
        event._isClick = true;
    })
})

document.body.addEventListener('click', event => {
    if (event._isClick) { document.querySelector(".header").classList.remove("open") }
});

//Closing menu when clicking outside it
document.getElementById("menu").addEventListener('click', event => {
    event._isClickWithInMenu = true;
});
document.getElementById("burger").addEventListener('click', event => {
    event._isClickWithInMenu = true;
});
document.body.addEventListener('click', event => {
    if (event._isClickWithInMenu) return;
    // Действие при клике
    document.querySelector(".header").classList.remove("open")
});

//Slider
const carousel = document.querySelector(".carousel")
const firstDiv = carousel.querySelectorAll("div")[0]
const arrowIcons = document.querySelectorAll(".slider_images button")

let isDragStart = false, prevPageX, prevScrollLeft;
let firstDivWidth = firstDiv.clientWidth + 25;

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        carousel.scrollLeft += icon.id == "left" ? -firstDivWidth : firstDivWidth;
    })
})

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    // carousel.classList.add("dragging");
    let positionDiff = e.pageX - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
}

const dragStop = () => {
    isDragStart = false;
    // carousel.classList.remove("dragging");
}

carousel.addEventListener("mousedown", dragStart)
carousel.addEventListener("mousemove", dragging)
carousel.addEventListener("mouseup", dragStop)





let slides = document.querySelectorAll('.slide');
let btns = document.querySelectorAll('.btn');

let currentSlide = 0;


let manualNav = function (manual) {
    if (manual >= slides.length) { manual = 0; }
    if (manual < 0) { manual = slides.length - 1; }

    slides.forEach((slide) => {
        slide.classList.remove('active');

        btns.forEach((btn) => {
            btn.classList.remove('active');
        })
    })

    // slides[currentSlide].classList.add('active');
    // btns[currentSlide].classList.add('active');
    slides[manual].classList.add("active");
    btns[manual].classList.add("active");

    currentSlide = manual;
}

btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        if (currentSlide !== i) {
            manualNav(i);
            // currentSlide = i;
            carousel.scrollLeft += currentSlide < i ? -firstDivWidth : firstDivWidth;
        }
    })
})


// function changeSlide(moveTo) {
//     if (moveTo >= slides.length) { moveTo = 0; }
//     if (moveTo < 0) { moveTo = slides.length - 1; }

//     slides[currentSlide].classList.toggle("active");
//     btns[currentSlide].classList.toggle("active");
//     slides[moveTo].classList.toggle("active");
//     btns[moveTo].classList.toggle("active");

//     currentSlide = moveTo;
// }

// btns.forEach((bullet, bulletIndex) => {
//     bullet.addEventListener('click', () => {
//         if (currentSlide !== bulletIndex) {
//             changeSlide(bulletIndex);
//             carousel.scrollLeft += btn.id == "left" ? -firstDivWidth : firstDivWidth;
//         }
//     })
// })

