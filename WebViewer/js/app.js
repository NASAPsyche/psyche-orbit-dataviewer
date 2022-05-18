
// splash screen
let splash = document.querySelector('.splash');

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {

        splash.classList.add('active');

        setTimeout(() => {
            splash.classList.remove('active');
            splash.classList.add('end');
        }, 3000);

    }, 2000);
})