const grid = document.querySelector('#grid');
const slider = document.querySelector('#slider');
let sliderValue = document.querySelector('#sliderValue');
let currentMode = 'Color';
let currentColor = 'black';

const colorPicker = document.querySelector('#colorPicker');
const colorBtn = document.querySelector('#color-mode');
const rainbowBtn = document.querySelector('#Rainbow');
const eraseBtn = document.querySelector('#Eraser');
const clearbtn = document.querySelector('#clear');


function setCurrentColor(newColor) {
    currentColor = newColor;
}

function clearGrid() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(gridItem => {
        gridItem.style.backgroundColor = '';
    });
}

colorPicker.addEventListener('input', function(event) {
    setCurrentColor(event.target.value);
});

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function adjustSize() {
    let size = slider.value;
    grid.innerHTML = "";    
    sliderValue.textContent = slider.value;
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size ; i++){
        let gridItem = document.createElement('div');
        gridItem.addEventListener('mouseover', changeColor);
        gridItem.addEventListener('mousedown', changeColor);
        gridItem.className = 'grid-item';
        grid.appendChild(gridItem);
    }
}



function changeColor(event){    
    if (event.type === 'mouseover' && !mouseDown) return;
    if(currentMode === 'Rainbow'){
        const R = Math.floor(Math.random() * 256);
        const G = Math.floor(Math.random() * 256);
        const B = Math.floor(Math.random() * 256);
        event.target.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
    } else if(currentMode === 'Color'){
        event.target.style.backgroundColor = currentColor;
    } else if(currentMode === 'Erase'){
        event.target.style.backgroundColor = 'rgb(164, 162, 162)';
    }
}
 
function getSliderValue() {
    sliderValue.textContent = slider.value;
}

slider.addEventListener('input', getSliderValue);
slider.addEventListener('click', adjustSize);
adjustSize();

colorBtn.addEventListener('click', function(){
    currentMode = 'Color';
});
rainbowBtn.addEventListener('click', function(){
    currentMode = 'Rainbow';
});
eraseBtn.addEventListener('click', function(){
    currentMode = 'Erase';
});
clearbtn.addEventListener('click', clearGrid);