
let splash = document.querySelector('.splash');
let orbits = document.querySelector('.orbits');
let intro = document.querySelector('.intro');

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {

        splash.classList.add('active');
        orbits.classList.add('hide');

        setTimeout(() => {
            splash.classList.remove('active');
            splash.classList.add('fade');
        }, 3000);

        setTimeout(() => {
            splash.classList.remove('active');
            splash.classList.add('end');
            intro.classList.add('active');
        }, 5000);

    }, 1000);
})

// start button
var start = document.getElementById('startButton');
start.onclick = function startButton() {
    intro.classList.add('fade');
    orbits.classList.remove('hide');

    setTimeout(() => {
        intro.classList.add('end');
    }, 3000);
}

// orbit descriptions
let pA = document.getElementById('pA');
let pB = document.getElementById('pB');
let pC = document.getElementById('pC');
let pD = document.getElementById('pD');

// orbit a button
var orbitA = document.getElementById('orbitA');
orbitA.onclick = function buttonA() {
    pA.classList.toggle('show');
}

// orbit b button
var orbitB = document.getElementById('orbitB');
orbitB.onclick = function buttonB() {
    pB.classList.toggle('show');
}

// orbit c button
var orbitC = document.getElementById('orbitC');
orbitC.onclick = function buttonC() {
    pC.classList.toggle('show');
}

// orbit d button
var orbitD = document.getElementById('orbitD');
orbitD.onclick = function buttonD() {
    pD.classList.toggle('show');
}
