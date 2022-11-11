const app = document.getElementById("app");
const API_PREFIX = "https://api.nobelprize.org/2.1/laureates?limit=100";
var currentQuery = "";
const titleType = "h3";
const descType = "p";
const dataClassName = "data";
const itemClassName = "item";
var currentSort = "Name";
var currentFilter = "All";
var lang = "en";

async function getData() {
  const response = await fetch(API_PREFIX + currentQuery);
  const json = await response.json();
  var cleanData = [];
  json.laureates.forEach((element) => {
    try {
      let eCountry;
      try {
        eCountry = element.birth.place.countryNow.en;
      } catch (err) {
        eCountry = "World";
      }

      cleanData.push({
        country: eCountry,
        name: element.fullName.en,
        category: element.nobelPrizes[0].category.en,
        year: element.nobelPrizes[0].awardYear,
        desc: element.nobelPrizes[0].motivation.en,
      });
    } catch (err) {
      console.log(err);
    }
  });
  return cleanData;
}

const dataSort = document.getElementById("data-sort");

dataSort.addEventListener("change", async (event) => {
  currentSort = event.target.value;
  const data = await getData();
  const sortedData = sortData(data, event.target.value);
  const filteredSortData = filterData(sortedData, currentFilter);
  await renderUI(filteredSortData);
});

const dataFilter = document.getElementById("data-filter");

dataFilter.addEventListener("change", async (event) => {
  currentFilter = event.target.value;
  const data = await getData();
  const filteredData = filterData(data, event.target.value);
  const filteredSortData = sortData(filteredData, currentSort);
  await renderUI(filteredSortData);
});

async function renderUI(data) {
  clearUI();
  console.log(data);
  data.forEach((element) => {
    try {
      var t = document.querySelector("#item-template").cloneNode(true);
      //const nobelPrizes = element["nobelPrizes"];

      t.content.querySelector(".flagImg").title = capitalizeFirstLetter(
        element.country
      );

      const country = element.country.toLowerCase().replace(" ", "-");
      const flagSrc = "./resources/flags/" + country + ".png";
      if (imageExists(flagSrc))
        t.content.querySelector(".flagImg").src =
          "./resources/flags/" + country + ".png";
      else {
        t.content.querySelector(".flagImg").src = "./resources/flags/world.png";
      }
      t.content.querySelector(titleType).innerHTML += element.name;
      t.content.querySelector(".categoryImg").title = element.category;
      t.content.querySelector(".categoryImg").src = getCategoryImage(element);
      t.content.querySelector(".category").innerHTML = element.category;
      t.content.querySelector(".dateImg").src = "./resources/calendarIcon.png";
      t.content.querySelector(".year").innerHTML = element.year;
      t.content.querySelector(".infoImg").src = "./resources/idea.png";
      t.content.querySelector(".desc").innerHTML += capitalizeFirstLetter(
        element.desc
      );

      document.getElementById("app").append(t.content);
    } catch (err) {
      console.log(err);
    }
  });
}

function getCategoryImage(element) {
  switch (element.category) {
    case "Physics":
      return "./resources/physicsIcon.png";
    case "Economic Sciences":
      return "./resources/economicIcon.png";
    case "Literature":
      return "./resources/literatureIcon.png";
    case "Chemistry":
      return "./resources/chemistryIcon.png";
    case "Peace":
      return "./resources/peaceIcon.png";
    case "Physiology or Medicine":
      return "./resources/medIcon.png";
    default:
      return "./resources/medIcon.png";
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

function imageExists(image_url) {
  var http = new XMLHttpRequest();

  http.open("HEAD", image_url, false);
  http.send();

  return http.status != 404;
}

function filterData(data, key) {
  data = data.filter((person) => {
    if (key === "All") {
      return person;
    } else {
      return key === person.category;
    }
  });
  return data;
}

function sortData(data, key) {
  data = data.sort((a, b) => {
    if (key === "name") {
      try {
        return a.name > b.name ? 1 : -1;
      } catch {
        console.log(a);
        console.log(b);
      }
    }
    if (key === "year") {
      return a.year > b.year ? 1 : -1;
    }
    if (key === "country") {
      var firstCountry, secondCountry;
      try {
        firstCountry = a.country;
      } catch {
        return 1;
      }
      try {
        secondCountry = b.country;
      } catch {
        return -1;
      }
      return firstCountry > secondCountry ? 1 : -1;
    }
    return 0;
  });
  return data;
}

const data = await getData();
await renderUI(data);
