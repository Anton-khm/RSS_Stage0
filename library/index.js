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


//Login_modal
const profileIcon = document.querySelector('.profile')
const loginMenu = document.querySelector('.login_menu')
const loginMenuOpened = document.querySelector('.login_menu.opened')

//login menu

profileIcon.addEventListener('click', () => {
    loginMenu.classList.toggle('opened');
    document.querySelector(".header").classList.remove("open")
})

profileIcon.addEventListener('click', event => {
    event._isClickWithInMenu = true;
});

loginMenuOpened.addEventListener('click', event => {
    event._isClickWithInMenu = true;
});

document.body.addEventListener('click', event => {
    if (event._isClickWithInMenu) return;
    // Действие при клике
    loginMenu.classList.remove('opened')
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("burger").addEventListener("click", function () {
        document.querySelector(".header").classList.toggle("open")
        loginMenu.classList.remove('opened')
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
    if (event._isClick) {
        document.querySelector(".header").classList.remove("open");
    }
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


//Favorites
const radioBox = document.querySelector('.section-favorites-radiobuttons')
radioBox.addEventListener('click', toggleTabs)

function toggleTabs(event) {

    const radioButtonsArr = Array.from(radioBox.querySelectorAll('.radio'));
    const selectedButton = event.target.closest('.radio');
    const index = radioButtonsArr.indexOf(selectedButton);

    const seasons = document.querySelectorAll('.favorites-cards');
    let activeSeason = document.querySelector('.active');
    let selectedSeason = seasons[index]

    if (activeSeason !== selectedSeason & index >= 0) {
        //     fade out
        activeSeason.classList.add('animated');

        seasons.forEach((season) => {
            season.classList.remove('selected')
        });
        selectedSeason.classList.toggle('selected');
    }

    //fade in
    fadeOutTiming = setTimeout(() => {
        activeSeason.classList.remove('animated');
        seasons.forEach((season) => {
            season.classList.remove('selected')
        });
        selectedSeason.classList.add('selected', 'animated');

        seasons.forEach((season) => {
            season.classList.remove('active')
        });
    }, 400)

    fadeInTiming = setTimeout(() => {
        seasons.forEach((season) => {
            season.classList.remove('selected', 'animated')
        });
        activeSeason = selectedSeason;
        activeSeason.classList.add('active');
    }, 400)
}

