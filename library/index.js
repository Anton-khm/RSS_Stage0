console.log('Score: 50 / 50\n1.Вёрстка соответствует макету. Ширина экрана 768px +26\n2.Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12\n3.На ширине экрана 768рх реализовано адаптивное меню +12')

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("burger").addEventListener("click", function () {
        document.querySelector(".header").classList.toggle("open")
    })
})


document.getElementById("menu_item1").addEventListener("click", event => {
    event._isClick = true;
});

document.getElementById("menu_item2").addEventListener("click", event => {
    event._isClick = true;
});

document.getElementById("menu_item3").addEventListener("click", event => {
    event._isClick = true;
});

document.getElementById("menu_item4").addEventListener("click", event => {
    event._isClick = true;
});

document.getElementById("menu_item5").addEventListener("click", event => {
    event._isClick = true;
});

document.body.addEventListener('click', event => {
    if (event._isClick) { document.querySelector(".header").classList.remove("open") }
});





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

