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

//open/close Login_modal
profileIcon.addEventListener('click', () => {
    loginMenu.classList.toggle('opened');
    document.querySelector(".header").classList.remove("open")
})

profileIcon.addEventListener('click', event => {
    event._isClickWithInMenu = true;
});

loginMenu.addEventListener('click', event => {
    event._isClickWithInMenu = true;
});

document.body.addEventListener('click', event => {
    if (event._isClickWithInMenu) return;
    loginMenu.classList.remove('opened')
});


//Burger
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("burger").addEventListener("click", function () {
        document.querySelector(".header").classList.toggle("open")
        loginMenu.classList.remove('opened')
    })
})

//Closing Burger menu items after clicking on them
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

//Closing Burger menu when clicking outside it
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


//Register functionality

window.onload = function () {

    // Check for LocalStorage support.
    if (localStorage) {

        // Add an event listener for form submissions
        document.getElementById('registerForm').addEventListener('submit', function () {
            // Get the values of fields.
            let firstName = document.getElementById('first_name').value;
            let lastName = document.getElementById('last_name').value;
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;

            // Save fields in localStorage.
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('lastName', lastName);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            localStorage.setItem('isRegistered', true);

            //generate random card number
            const randomNumber = Math.floor(Math.random() * Math.pow(10, 10));
            const hex = randomNumber.toString(16);
            localStorage.setItem('cardNumber', hex);

            document.getElementById('register').classList.toggle('.overlay .cancel');
        });
    }
}

// Changing Profile Icon with First Letters
if (localStorage.getItem('isRegistered') !== null && localStorage.getItem('firstName') !== null && localStorage.getItem('lastName') !== null) {
    let registered = localStorage.getItem('isRegistered');
    let firstName = localStorage.getItem('firstName');
    let lastName = localStorage.getItem('lastName');

    let firstChar = firstName.toUpperCase().charAt(0);
    let lastChar = lastName.toUpperCase().charAt(0);
    let initials = firstChar + lastChar;

    if (registered === 'true') {
        profileIcon.classList.add("authorized");
        profileIcon.innerHTML += initials;

        document.querySelector(".login_link").style.display = 'none';
        document.querySelector(".register_link").style.display = 'none';
        document.querySelector(".myprofile_link").style.display = 'flex';
        document.querySelector(".logout_link").style.display = 'flex';
    }
}
else {
    console.log('The localStorage keys do NOT exist');
}

function closeSelf() {
    document.getElementById("closeRegForm").click();
}


//Open Login Modal from Buy Card button
const buyCardBtns = document.querySelectorAll('.favorites-cards .btn-action')
const loginModal = document.querySelector('.popup1')
const favoritesBooks = document.querySelector('.favorites-cards-wrapper')
const openLoginModalBtn = document.querySelector('.login_link')

favoritesBooks.onclick = function (event) {
    let id = event.target.dataset.toggleId;
    if (!id) return;

    openLoginModal();
}

function openLoginModal() {
    openLoginModalBtn.click();
}

// document.body.addEventListener('click', function (event) {
//     let id = event.target.dataset.toggleId;
//     if (!id) return;

//     let elem = document.getElementById(id);

//     elem.hidden = !elem.hidden;
// });

// buyCardBtns.forEach((btn) => {
// document.addEventListener('click', function (event) {
//     let id = event.target.dataset.toggleId;
//     if (!id) return;

//     let elem = document.querySelectorAll(id);

//     elem.hidden = !elem.hidden;
// });
// })


//     let firstChar = firstName.toUpperCase().charAt(0);
//     let lastChar = lastName.toUpperCase().charAt(0);
//     let initials = firstChar + lastChar;

//     if (registered === 'true') {

//         profileIcon.classList.add("authorized");
//         // profileIcon.style.background = "#FFFFFF";
//         // profileIcon.style.backgroundImage = "none";
//         // profileIcon.style.borderRadius = '25px';
//         // profileIcon.style.display = 'flex';
//         // profileIcon.style.alignItems = 'center';
//         // profileIcon.style.justifyContent = 'center';
//         // profileIcon.style.fontSize = '15px';
//         // profileIcon.style.lineHeight = '20px';
//         // profileIcon.style.color = '#BB945F';
//         profileIcon.innerHTML += initials;
//     }
// };

