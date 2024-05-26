// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
const container = document.querySelector("#container");
let newImg = document.createElement("img");
for (let i = 1; i < 152; i++) {

    newImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png `;
    container.appendChild(newImg);
    newImg = document.createElement("img");
}
