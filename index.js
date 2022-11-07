//////////////
// we have a basic skeleton here to help you start.
// if you dont want to use it you dont have to -
// just clear the file and start from scratch
//////////////

// notice in our html we have a node with ID "app"
// hint: use this reference later to inject data into your page
const app = document.getElementById('app');
const apiPrefix = "https://api.nobelprize.org/2.1/laureates"
var currentQuery = ''
const titleType = 'h2'
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

    // wiki image https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=500&titles=Albert Einstein

    laureatesArray.forEach(element => {

      laureateName = document.createElement(titleType)
      laureateName.innerHTML = element['fullName'][lang]

      laureateDesc = document.createElement(descType)
      nobelPrizes = element['nobelPrizes']
      var desc = ''
      nobelPrizes.forEach(nobel => {
        desc += nobel['motivation'][lang]
      })
      laureateDesc.innerText = desc
      
      const img = document.createElement('img')
      img.style.maxHeight = '20px';
      img.style.maxWidth = '20px';
      img.alt = nobelPrizes[0]['category'][lang]
      img.src = getCategoryImage(element)
      img.style.marginRight = '4px'
      img.style.verticalAlign = 'middle';
      

      const category = document.createElement('span');
      category.innerHTML = nobelPrizes[0]['category'][lang]
      category.style.verticalAlign = 'middle';


      const card = document.createElement('div');
      card.className = dataClassName;
      card.append(laureateName, img, category, laureateDesc)

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

document.addEventListener('DOMContentLoaded', () => {
  getData();
})