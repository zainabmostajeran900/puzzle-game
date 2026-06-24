let left = document.getElementById("left");
let button = document.getElementById("button");
let body = document.getElementById("body");
let counter = 0;
let twoImage = [];
let saveTwoImage = [];
let yourName = "";
let html = "";
const imgSource = [
  { src: "public/angular.svg", id: 10 },
  { src: "public/aurelia.svg", id: 12 },
  { src: "public/backbone.svg", id: 14 },
  { src: "public/ember.svg", id: 16 },
  { src: "public/react.svg", id: 18 },
  { src: "public/vue.svg", id: 20 },
  { src: "public/angular.svg", id: 22 },
  { src: "public/aurelia.svg", id: 24 },
  { src: "public/backbone.svg", id: 26 },
  { src: "public/ember.svg", id: 28 },
  { src: "public/react.svg", id: 30 },
  { src: "public/vue.svg", id: 32 },
];
//======
button.firstElementChild.addEventListener("click", newGame);
button.lastElementChild.addEventListener("click", clearBoard);
left.addEventListener("click", cardChange);
function randomizer() {
  imgSource.forEach((item, index) => {
    const random = Math.floor(Math.random() * imgSource.length);
    let sample = imgSource[index];
    imgSource[index] = imgSource[random];
    imgSource[random] = sample;
  });
  renderCartElement();
}
randomizer();
function renderCartElement() {
  let html = "";
  imgSource.forEach((item) => {
    html += `<img data-id="${item.id}" src="public/js.svg" alt="" />`;
  });
  left.innerHTML = html;
}
function cardChange(event) {
  if (event.target.tagName !== "IMG") return;
  let src = event.target.src;
  if (src.slice(src.indexOf("public")) !== "public/js.svg") return;
  event.target.classList.add("rotate");
  let img = imgSource.find(
    ({ id }) => id.toString() === event.target.dataset.id
  );
  setTimeout(() => {
    event.target.src = img.src;
  }, 100);
  if (!twoImage[0]) {
    twoImage[0] = img.src;
  } else if (!twoImage[1]) {
    twoImage[1] = img.src;
  }
  if (twoImage.length === 2) {
    if (twoImage[0] === twoImage[1]) {
      saveTwoImage.push(twoImage[0]);
    }
    setTimeout(reset, 1400);
    left.removeEventListener("click", cardChange);
    setTimeout(() => {
      left.addEventListener("click", cardChange);
    }, 1400);
    counter++;
    twoImage = [];
    if (saveTwoImage.length === 6) {
      yourName = prompt("enter your name");
      createElement();
    }
  }
}

function newGame() {
  saveTwoImage = [];
  counter = 0;
  randomizer();
  reset();
}
function createElement() {
  html += `<tr>
            <td>${yourName}</td>
            <td>${counter}</td>
           </tr>`;
  body.innerHTML = html;
}
function clearBoard() {
  body.innerHTML = "";
  html = "";
}
function reset() {
  let src;
  for (const element of left.children) {
    src = element.src.slice(element.src.indexOf("public"));
    if (!saveTwoImage.includes(src) && !src.includes("public/js.svg")) {
      element.src = "public/js.svg";
      element.classList.remove("rotate");
    }
  }
}
