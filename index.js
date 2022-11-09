//////////////
// we have a basic skeleton here to help you start.
// if you dont want to use it you dont have to -
// just clear the file and start from scratch
//////////////

// notice in our html we have a node with ID "app"
// hint: use this reference later to inject data into your page
const app = document.getElementById('app');
const apiPrefix = "https://api.nobelprize.org/2.1/laureates?limit=40"
var currentQuery = ''
const titleType = 'h3'
const descType = 'p'
const dataClassName = 'data'
const itemClassName = 'item'
var lang = 'en'
async function getData() {
  // write you logic for getting the data from the API here
  // return your data from this function
  fetch(apiPrefix + currentQuery).
  then(data => data.json()).
  then(data => render(data))
  

}

async function render(data) {
    var laureatesArray = data['laureates']
    console.log(laureatesArray[0])
    
    
    // Filtering

    // Sorting


    laureatesArray.forEach(element => {
      nobelPrizes = element['nobelPrizes']

      laureateName = document.createElement(titleType)
      laureateName.innerHTML = element['fullName'][lang]
      laureateName.className = 'title'

      const flagImg = document.createElement('img')
      try{ country = element['birth']['place']['countryNow'][lang].toLowerCase() }
      catch(err){ country = 'world'}
      country = country.replace(' ', '-')

      if (country.includes('palestine')){ country = 'israel'}
      flagImg.src = './resources/flags/' + country + '.png'
      flagImg.className = 'flagImg'
      
      laureateName.prepend(flagImg)

      const catImg = document.createElement('img')
      catImg.alt = nobelPrizes[0]['category'][lang]
      catImg.src = getCategoryImage(element)
      catImg.className = 'categoryImg'


      const category = document.createElement('span');
      category.innerHTML = nobelPrizes[0]['category'][lang]
      category.className = 'category'

      const dateImg = document.createElement('img')
      dateImg.src = './resources/calendarIcon.png'
      dateImg.className = 'dateImg'


      const year = document.createElement('span');
      year.innerHTML = nobelPrizes[0]['awardYear']
      year.className = 'year'

      const infoImg = document.createElement('img')
      infoImg.src = './resources/idea.png'
      infoImg.className = 'infoImg'


      laureateDesc = document.createElement(descType)
      var desc = ''
      nobelPrizes.forEach(nobel => {
        desc += nobel['motivation'][lang]
      })

      laureateDesc.innerText = capitalizeFirstLetter(desc)
      laureateDesc.prepend(infoImg)

      laureateDesc.className = 'desc'



      const card = document.createElement('div');
      card.className = dataClassName;
      card.append(laureateName, catImg, category, newLineElement() , dateImg, year, newLineElement(),laureateDesc)

      const presenter = document.createElement('div');
      presenter.className = itemClassName;
      presenter.append(card);

      document.getElementById('app').append(presenter);
    });

}

async function getWikiImage(laureateData){
  fetch('https://www.wikidata.org/wiki/Special:EntityData/Q173500.json').
  then(data => data.json()).
  then(data => console.log(data))
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

function newLineElement(){
  return document.createElement('br')
}

document.addEventListener('DOMContentLoaded', () => {
  getData();
})