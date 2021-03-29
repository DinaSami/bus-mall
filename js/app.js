'use strict';
const images = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

const leftImage = document.getElementById('left');
const centerImage = document.getElementById('center');
const rightImage = document.getElementById('right');
const imageSection = document.getElementById('images');
const bottonResult = document.getElementById('btn');
let imageOnLeft;
let imageOnCanter;
let imageOnRight;
let attempts = 0;
let votesArray = [];
let viewsArray = [];

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

  imageOnLeft = randomNumber(0, Product.all.length - 1);
  imageOnCanter = randomNumber(0, Product.all.length - 1);
  imageOnRight = randomNumber(0, Product.all.length - 1);


  while (imageOnLeft === imageOnCanter || imageOnLeft === imageOnRight) {
    imageOnLeft = randomNumber(0, Product.all.length - 1);
  }

  leftImage.src = Product.all[imageOnLeft].image;
  leftImage.alt = Product.all[imageOnLeft].name;
  leftImage.title = Product.all[imageOnLeft].name;
  Product.all[imageOnLeft].views++;

  while (imageOnCanter === imageOnRight || imageOnCanter === imageOnLeft) {
    imageOnCanter = randomNumber(0, Product.all.length - 1);
  }

  centerImage.src = Product.all[imageOnCanter].image;
  centerImage.alt = Product.all[imageOnCanter].name;
  centerImage.title = Product.all[imageOnCanter].name;
  Product.all[imageOnCanter].views++;

  while (imageOnRight === imageOnCanter || imageOnRight === imageOnLeft) {
    imageOnRight = randomNumber(0, Product.all.length - 1);
  }
  rightImage.src = Product.all[imageOnRight].image;
  rightImage.alt = Product.all[imageOnRight].name;
  rightImage.title = Product.all[imageOnRight].name;
  Product.all[imageOnRight].views++;
}

imageSection.addEventListener('click', clickImages);

function clickImages(event) {


  if (event.target.id !== 'images') {

    if (attempts < 10) {
      attempts++;
      render();
      if (event.target.id === leftImage.id) {
        Product.all[imageOnLeft].votes++;

      } else if (event.target.id === centerImage.id) {
        Product.all[imageOnCanter].votes++;
      }
      else {
        Product.all[imageOnRight].votes++;
      }
    }
  }
}


bottonResult.addEventListener('click', resultBotton);

function resultBotton() {

  let listImages = document.getElementById('listProducts');
  for (let i = 0; i < Product.all.length; i++) {
    votesArray.push(Product.all[i].votes);
    viewsArray.push(Product.all[i].views);
    let liEl = document.createElement('li');
    listImages.appendChild(liEl);
    liEl.textContent = `${Product.all[i].name} had ${Product.all[i].votes} votes, and was seen ${Product.all[i].views} times.`
  }
  bottonResult.removeEventListener('click', resultBotton);
  chartRender();
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
render();
Product.all[imageOnLeft].views--;
Product.all[imageOnCanter].views--;
Product.all[imageOnRight].views--;


function chartRender() {
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: images,
      datasets: [{
        label: 'Products votes',
        backgroundColor: 'red',
        borderColor: 'red',
        data: votesArray
      },
      {
        label: 'Products views',
        backgroundColor: 'black',
        borderColor: 'black',
        data: viewsArray
      }]
    },

    // Configuration options go here
    options: {}
  });

}
