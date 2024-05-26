const btn = document.querySelector("#btn");
btn.addEventListener("click", () => {
    let bgColor = makeRandColor();
    let head = document.querySelector("#head");
    totColor = bgColor[0] + bgColor[1] + bgColor[2];
    if (totColor < 120) {
        head.style.color = 'white';
    }
    else {
        head.style.color = 'black';
    }
    document.body.style.backgroundColor = `rgb(${bgColor[0]},${bgColor[1]},${bgColor[2]})`;



    head.innerText = `rbg(${bgColor})`;

})

function makeRandColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return [r, g, b];
}