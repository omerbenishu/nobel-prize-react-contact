const app = document.getElementById("app");
const API_PREFIX = "https://api.nobelprize.org/2.1/laureates?limit=1000";
var currentQuery = "";
const titleType = "h3";
const descType = "p";
const dataClassName = "data";
const itemClassName = "item";
var currentSort = 'Name';
var currentFilter = 'All';
var lang = "en";

async function getData() {
  const response = await fetch(API_PREFIX + currentQuery);
  return await response.json();
}

const dataSort = document.getElementById("data-sort");

dataSort.addEventListener("change", async (event) => {
  console.log("Data Sort Change");
  console.log(event.target.value);
  currentSort = event.target.value;
  const data = await getData();
  const sortedData = sortData(data, event.target.value);
  const filteredSortData = filterData(sortedData, currentFilter);
  await renderUI(filteredSortData);
});

const dataFilter = document.getElementById("data-filter");

dataFilter.addEventListener("change", async (event) => {
  console.log("Data Filter Change");
  console.log(event.target.value);
  currentFilter = event.target.value;
  const data = await getData();
  const filteredData = filterData(data, event.target.value);
  const filteredSortData = sortData(filteredData, currentSort)
  await renderUI(filteredSortData);
});

async function renderUI(data) {
  clearUI();

  var laureatesArray = data["laureates"];
  console.log(laureatesArray.length);

  // Filtering

  // Sorting

  laureatesArray.forEach((element) => {
    try {
      // select
      var t = document.querySelector("#item-template").cloneNode(true);
      const nobelPrizes = element["nobelPrizes"];

      let country;
      try {
        country = element["birth"]["place"]["countryNow"][lang];
      } catch (err) {
        country = "World";
      }
      t.content.querySelector(".flagImg").title =
        capitalizeFirstLetter(country);

      country = country.toLowerCase().replace(" ", "-");
      const flagSrc = "./resources/flags/" + country + ".png";
      if (imageExists(flagSrc))
        t.content.querySelector(".flagImg").src =
          "./resources/flags/" + country + ".png";
      else {
        t.content.querySelector(".flagImg").src = "./resources/flags/world.png";
      }
      t.content.querySelector(titleType).innerHTML += element["fullName"][lang];
      t.content.querySelector(".categoryImg").title =
        nobelPrizes[0]["category"][lang];
      t.content.querySelector(".categoryImg").src = getCategoryImage(element);
      t.content.querySelector(".category").innerHTML =
        nobelPrizes[0]["category"][lang];
      t.content.querySelector(".dateImg").src = "./resources/calendarIcon.png";
      t.content.querySelector(".year").innerHTML = nobelPrizes[0]["awardYear"];
      t.content.querySelector(".infoImg").src = "./resources/idea.png";
      var desc = "";
      nobelPrizes.forEach((nobel) => {
        desc += nobel["motivation"][lang];
      });
      t.content.querySelector(".desc").innerHTML += capitalizeFirstLetter(desc);

      document.getElementById("app").append(t.content);
    } catch {}
  });
}

function getCategoryImage(element) {
  switch (element["nobelPrizes"][0]["category"]["en"]) {
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
  data["laureates"] = data["laureates"].filter((person) => {
    if (key === "All") {
      return person;
    } else {
      return key === person["nobelPrizes"][0]["category"]["en"];
    }
  });
  return data;
}

function sortData(data, key) {
  data["laureates"] = data["laureates"].sort((a, b) => {
    if (key === "name") {
      try{
      return a["fullName"][lang] > b["fullName"][lang] ? 1 : -1;
      }
      catch {console.log(a); console.log(b)}
    }
    if (key === "year") {
      return a["nobelPrizes"][0]["awardYear"] > b["nobelPrizes"][0]["awardYear"]
        ? 1
        : -1;
    }
    if (key === "country") {
      var firstCountry, secondCountry
      try {
        firstCountry = a["birth"]["place"]["countryNow"][lang];
      } catch {
        return 1;
      }
      try {
        secondCountry = b["birth"]["place"]["countryNow"][lang];
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
