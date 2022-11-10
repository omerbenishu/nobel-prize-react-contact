const app = document.getElementById('app');
const API_PREFIX = "https://api.nobelprize.org/2.1/laureates?limit=40"
var currentQuery = ''
const titleType = 'h3'
const descType = 'p'
const dataClassName = 'data'
const itemClassName = 'item'
var lang = 'en'

async function getData() {
  const response = await fetch(API_PREFIX + currentQuery);
  return await response.json();
}

async function renderUI(data) {
  var laureatesArray = data['laureates']
  console.log(laureatesArray[0])
  
  
  // Filtering

  // Sorting

  laureatesArray.forEach(element => {

        // select
    var t = document.querySelector('#item-template').cloneNode(true);
    const nobelPrizes = element['nobelPrizes']

    let country
    try { country = element['birth']['place']['countryNow'][lang]}
    catch(err){ country = 'World'}
    t.content.querySelector('.flagImg').title = country

    country = country.toLowerCase().replace(' ', '-')
    t.content.querySelector('.flagImg').src = './resources/flags/' + country + '.png'
    t.content.querySelector(titleType).innerHTML += element['fullName'][lang]
    t.content.querySelector('.categoryImg').title = nobelPrizes[0]['category'][lang]
    t.content.querySelector('.categoryImg').src = getCategoryImage(element)
    t.content.querySelector('.category').innerHTML = nobelPrizes[0]['category'][lang]
    t.content.querySelector('.dateImg').src = './resources/calendarIcon.png'
    t.content.querySelector('.year').innerHTML = nobelPrizes[0]['awardYear']
    t.content.querySelector('.infoImg').src = './resources/idea.png'
    var desc = ''
    nobelPrizes.forEach(nobel => {
      desc += nobel['motivation'][lang]
    })
    t.content.querySelector('.desc').innerHTML += capitalizeFirstLetter(desc)

    document.getElementById('app').append(t.content);
  });

}

function getCategoryImage(element){
  switch(element['nobelPrizes'][0]['category']['en']){
    case 'Physics':
      return './resources/physicsIcon.png';
    case 'Economic Sciences':
      return './resources/economicIcon.png';
    case 'Literature':
      return './resources/literatureIcon.png';
    case 'Chemistry':
      return './resources/chemistryIcon.png';
    case 'Peace':
      return './resources/peaceIcon.png';
    case 'Physiology or Medicine':
      return './resources/medIcon.png';
  }
}

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function clearUI() {
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }
}

const data = await getData();
await renderUI(data);