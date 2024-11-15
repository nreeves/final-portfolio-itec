const pending_ASCII = `░`;
const done_ASCII = `▓`;
const loadingASCII = `

`;
const randomBootText = [
    `Loading system files ...`,
    `Loading user files ...`,
    `Loading user skills ...`,
    `Loading user portfolio ...`,
    'Displaying portfolio ...',
]
// DOM selection and startup simulator
const loadingBar = document.querySelector('.loading-bar');
const fill = document.getElementById('fill');
const character = document.createElement('div');
const loadingSection = document.getElementById('loading');
const commandSection = document.getElementById('command-interface');
const asciiArtSection = document.getElementById('loading-ascii-art');
const loadingText = document.getElementById('loading-text');

//style adjustment
asciiArtSection.innerHTML = loadingASCII;
asciiArtSection.style.display = 'block';
asciiArtSection.style.width= '600px';
loadingText.innerHTML = `Loading ...`;
commandSection.style.display = 'none';
character.innerHTML = pending_ASCII;
character.style.position = 'absolute';
character.style.visibility = 'hidden';
//filling the bar
document.body.appendChild(character);
const widthOfOneCharacter = character.clientWidth;
const windowWidth = window.innerWidth;
const widthOfFill = Math.max(windowWidth * 0.5, 350);
fill.style.maxWidth = `${widthOfFill}px`;
fill.innerHTML = pending_ASCII.repeat(Math.floor(widthOfFill / widthOfOneCharacter));
loadingBar.appendChild(fill);

let progress = 0;
let asciiText;
let currentWidth = 0;

const textGenerator = setInterval(() => { 
    loadingText.innerHTML += `.`;
    if (loadingText.innerHTML.length > 10) {
        loadingText.innerHTML = randomBootText[Math.floor(Math.random() * randomBootText.length)];
    }

}, 500);
const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 10);
    if (currentWidth >= widthOfFill) {
        asciiText = done_ASCII.repeat(progress);
        fill.prepend(document.createTextNode(asciiText));
        loadingSection.style.display = 'none';
        commandSection.style.display = 'inline-block';
        const input = document.getElementById("command-input");
        input.focus();
    clearInterval(interval);
    } else {
    if(currentWidth < widthOfFill) {
        currentWidth += progress/100 * widthOfFill;
        asciiText = done_ASCII.repeat(progress);
        fill.prepend(document.createTextNode(asciiText));
    }
  }
}, 500);

// ░ called medium shade in ascii 
// summary of what its doing, dynamically measuring the width of the pending ascii character by
// generating an invisible div, character.clientwidth gives the pixel width of ░
// program then calculates the browser window in pixels and dynamically sizes the
// loading bar based on screensize
//finally the makes the loading bar 50% of the screen, ensures that the loading bar is minimum 350 px on smaller screens 