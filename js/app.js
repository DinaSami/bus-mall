'use strict';
const images = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

const leftImage = document.getElementById('left');
const centerImage = document.getElementById('center');
const rightImage = document.getElementById('right');
const imageSection = document.getElementById('images');


function Product(name) {
  this.name = name;
  this.image = `./assets/${this.name}.jpg`;
  this.votes = 0;
  this.views = 0;
  Product.all.push(this);
}
Product.all = [];

for (let i = 0; i < images.length; i++) {
  new Product(images[i]);
}
function render() {
  const imageOnLeft = randomNumber(0, Product.all.length - 1);
  leftImage.src = Product.all[imageOnLeft].image;
  leftImage.alt = Product.all[imageOnLeft].name;
  leftImage.title = Product.all[imageOnLeft].name;



  const imageOnCanter = randomNumber(0, Product.all.length - 1);
  centerImage.src = Product.all[imageOnCanter].image;
  centerImage.alt = Product.all[imageOnCanter].name;
  centerImage.title = Product.all[imageOnCanter].name;




  const imageOnRight = randomNumber(0, Product.all.length - 1);
  rightImage.src = Product.all[imageOnRight].image;
  rightImage.alt = Product.all[imageOnRight].name;
  rightImage.title = Product.all[imageOnRight].name;

  const listPro = document.createElement('ul');
  imageSection.appendChild(listPro);


  for (let i = 0; i < images.length; i++) {
    const liEl = document.createElement('li');
    listPro.appendChild(liEl);
    liEl.textContent = `${Product.all[i].name} had ${Product.all[i].votes} votes, and was seen ${Product.all[i].views} times.`;
  }
}

imageSection.addEventListener('click', clickImage);

function clickImage(event) {
  if (event.target.id !== 'images') {
    for (let i = 0; i < Product.all.length; i++) {
      if (Product.all[i].name === event.target.title) {
        Product.all[i].votes++;
        Product.all[i].views++;
      }
    }
  }
  render();
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
render();
