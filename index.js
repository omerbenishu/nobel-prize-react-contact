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
        desc += 'Category: ' + nobel['category'][lang] + '\n' + nobel['motivation'][lang]
      })
      laureateDesc.innerText = desc
      
      //const img = document.createElement('img')
      //img.src = 'https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=Jaguar&pithumbsize=500'



      const card = document.createElement('div');
      card.className = dataClassName;
      card.append(laureateName, laureateDesc)

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

document.addEventListener('DOMContentLoaded', () => {
  getData();
})