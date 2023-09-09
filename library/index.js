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
const profileIcon = document.querySelector('.profile');
const loginMenu = document.querySelector('.login_menu');
const profileTitle = document.querySelector(".login_menu_title");

//open/close Login_modal
profileIcon.addEventListener('click', () => {
    loginMenu.classList.toggle('opened');
    document.querySelector(".header").classList.remove("open");
});

profileIcon.addEventListener('click', event => {
    event._isClickWithInMenu = true;
});

loginMenu.addEventListener('click', event => {
    event._isClickWithInMenu = true;
});

document.body.addEventListener('click', event => {
    if (event._isClickWithInMenu) return;
    loginMenu.classList.remove('opened');
});


//Burger
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("burger").addEventListener("click", function () {
        document.querySelector(".header").classList.toggle("open");
        loginMenu.classList.remove('opened');
    });
});

//Closing Burger menu items after clicking on them
const menuItems = document.querySelectorAll(".nav-item");

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
let visitsNumber = 0;
let books = [{ author: "Test", title: "Test" }, { author: "Test1", title: "Test2" }];
console.log(books)

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
            visitsNumber += 1;

            //generate random card number
            const randomNumber = Math.floor(Math.random() * Math.pow(10, 10));
            const hex = randomNumber.toString(16);

            // Save fields in localStorage.
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('lastName', lastName);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            localStorage.setItem('isRegistered', true);
            localStorage.setItem('isAuthorized', true);
            localStorage.setItem('cardNumber', hex);
            localStorage.setItem('numberVisits', visitsNumber);
            localStorage.setItem('books', JSON.stringify(books));
            location.reload();
            changeProfileIcon(profileIcon);

            // Close modal after success submit
            document.getElementById('register').classList.toggle('.overlay .cancel');
        });
    } else { console.log('Local storage does not supports') }
}
// }


// Changing Profile Icon with First Letters
function changeProfileIcon(block) {

    if (localStorage.getItem('isRegistered') !== null && localStorage.getItem('firstName') !== null && localStorage.getItem('lastName') !== null) {
        let registered = localStorage.getItem('isRegistered');
        let authorized = localStorage.getItem('isAuthorized');
        let firstName = localStorage.getItem('firstName');
        let lastName = localStorage.getItem('lastName');
        let fullName = firstName + ' ' + lastName;

        let firstChar = firstName.toUpperCase().charAt(0);
        let lastChar = lastName.toUpperCase().charAt(0);
        let initials = firstChar + lastChar;

        if ((registered === 'true' && authorized === 'true') || authorized === 'true') {
            block.classList.add("authorized");
            block.innerHTML = initials;

            //Displaying tooltip
            block_to_insert = document.createElement('span');
            block_to_insert.innerHTML = fullName;
            block_to_insert.classList.add("tooltiptext");
            block.appendChild(block_to_insert);


            //Display new profile menu list
            document.querySelector(".login_link").style.display = 'none';
            document.querySelector(".register_link").style.display = 'none';
            document.querySelector(".myprofile_link").style.display = 'flex';
            document.querySelector(".logout_link").style.display = 'flex';

            profileIcon.addEventListener("click", () => {
                const randNumber = localStorage.getItem('cardNumber');
                profileTitle.innerHTML = randNumber;
                profileTitle.style.fontSize = '14px';
            })
        }
    }
    else {
        console.log('The localStorage keys do NOT exist');
    }
}

changeProfileIcon(profileIcon);


//Closing form after submit action
// const closeBtn = document.getElementById("closeRegForm");

function closeSelf() {
    document.getElementById("closeRegForm").click();
}

//Open Login Modal from Buy Card button
// const buyCardBtns = document.querySelectorAll('.favorites-cards .btn-action')
const loginModal = document.querySelector('.popup1')
const favoritesBooks = document.querySelector('.favorites-cards-wrapper')
const openLoginModalBtn = document.querySelector('.login_link')

// if ((localStorage.getItem('isRegistered') === 'true' & localStorage.getItem('isAuthorized') !== 'true') || localStorage.getItem('isRegistered') !== 'true') {
//     favoritesBooks.onclick = function (event) {
//         let id = event.target.dataset.toggleId;
//         if (!id) return;

//         openLoginModal();
//     }

//     function openLoginModal() {
//         openLoginModalBtn.click();
//     }
// } else {
//     //Changing Profile title with Card Number title
//     const randNumber = localStorage.getItem('cardNumber');
//     profileTitle.innerHTML = randNumber;
//     profileTitle.style.fontSize = '14px';
// }

// window.onload = function () {
//     profileIcon.addEventListener("click", () => {
//         if (localStorage.getItem('isAuthorized') === 'true') {
//             const randNumber = localStorage.getItem('cardNumber');
//             profileTitle.innerHTML = randNumber;
//             profileTitle.style.fontSize = '14px';
//         } else return;
//     })
// }


//Adding Icon and Fullname to MyProfile modal
const myProfileBtn = document.querySelector(".myprofile_link")
const myProfileDialog = document.getElementById("myprofile");

myProfileBtn.addEventListener("click", () => {
    const fullNameTitle = document.querySelector(".fullname");
    const visitsNumber = document.querySelector(".number_visits");
    const booksNumber = document.querySelector(".number_books");

    let firstName = localStorage.getItem('firstName');
    let lastName = localStorage.getItem('lastName');
    let fullName = firstName + ' ' + lastName;

    fullNameTitle.innerHTML = String(fullName);
    if (firstName.length >= 12 || lastName.length >= 12) {
        fullNameTitle.style.fontSize = '12px';
    }

    const myProfileImage = document.querySelector(".shortcut");
    changeProfileIcon(myProfileImage);

    visitsNumber.innerHTML = localStorage.getItem('numberVisits');
    // booksNumber.innerHTML = localStorage.getItem('books');
})

//Logout
const logoutBtn = document.querySelector(".logout_link");

logoutBtn.addEventListener("click", () => {
    if (localStorage.getItem('isAuthorized') === 'true') {
        localStorage.setItem('isAuthorized', false);
    }
    location.reload();
})

//Login
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm").addEventListener('submit', function () {
        // Get the values of fields.

        if (localStorage.getItem('email') === document.getElementById("email_field").value && localStorage.getItem('password') === document.getElementById("password_field").value) {
            localStorage.setItem('numberVisits', Number(localStorage.getItem('numberVisits')) + 1);
            localStorage.setItem("isAuthorized", true);
            location.reload();
            changeProfileIcon(profileIcon);
        } else {
            alert('No such user');
        }
    });
})

// function closeSelf() {
//     document.getElementById("closeByCardModal").click();
// }


const buyCardBtns = document.querySelectorAll('.favorites-cards .btn-action');

buyCardBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (localStorage.getItem('isRegistered') === 'true' & localStorage.getItem('isAuthorized') === 'true') {
            document.getElementById('bycard').style.display = 'block';

            const buyCardForm = document.getElementById("bycardForm");
            const buyCardBtn = document.getElementById("bycardBtn");
            const buyCardNumber = document.getElementById("card_number");
            const expirationCode = document.getElementById("expiration_code");
            const expirationCode2 = document.getElementById("expiration_code2");
            const cvc = document.getElementById("cvc");
            const cardholderName = document.getElementById("cardholder_name");
            const postalCode = document.getElementById("postal_code");
            const cityTown = document.getElementById("city_town");

            buyCardForm.oninput = () => {
                buyCardBtn.disabled = buyCardNumber.value == '' || expirationCode.value == '' || expirationCode2.value == '' || cvc.value == '' || cardholderName.value == '' || postalCode.value == '' || cityTown.value == '';
            }

            // buyCardForm.addEventListener('submit', function () {
            //     localStorage.setItem('books', Number(localStorage.getItem('books')) + 1);

            // })
        } else {
            if ((localStorage.getItem('isRegistered') === 'true' & localStorage.getItem('isAuthorized') !== 'true') || localStorage.getItem('isRegistered') !== 'true') {
                favoritesBooks.onclick = function (event) {
                    let id = event.target.dataset.toggleId;
                    if (!id) return;

                    openLoginModal();
                }

                function openLoginModal() {
                    openLoginModalBtn.click();
                }
            }
        }
    })
});

function hidePopup() {
    document.getElementById("bycard").style.display = "none";
}


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

