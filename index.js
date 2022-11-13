const app = document.getElementById("app");
const API_PREFIX = "https://api.nobelprize.org/2.1/laureates";
let currentQuery = "?limit=981";
let SHOW_LIM = 50;
const titleType = "h3";
const descType = "p";
const dataClassName = "data";
const itemClassName = "item";
let currentSort = "name";
let currentFilter = "All";
let lang = "en";
let order = 1;

async function getData() {
  const response = await fetch(API_PREFIX + currentQuery);
  const json = await response.json();
  const cleanData = [];
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
    } catch (err) {}
  });
  return cleanData;
}

const dataSort = document.getElementById("data-sort");

dataSort.addEventListener("change", async (event) => {
  document.getElementById("miniLoader").style.display = "block";

  currentSort = event.target.value;
  const sortedData = sortData(data, event.target.value);
  const filteredSortData = filterData(sortedData, currentFilter);
  await renderUI(filteredSortData.slice(0, SHOW_LIM));
  document.getElementById("miniLoader").style.display = "none";
});

const dataFilter = document.getElementById("data-filter");

dataFilter.addEventListener("change", async (event) => {
  console.log("changed");
  document.getElementById("miniLoader").style.display = "block";

  currentFilter = event.target.value;
  const filteredData = filterData(data, event.target.value);
  const filteredSortData = sortData(filteredData, currentSort);
  await renderUI(filteredSortData.slice(0, SHOW_LIM));
  document.getElementById("miniLoader").style.display = "none";
});

const orderButton = document.getElementById("order");

orderButton.addEventListener("click", async () => {
  document.getElementById("miniLoader").style.display = "inline-block";

  order *= -1;
  console.log(orderButton.innerHTML);
  if (orderButton.innerHTML === "↑") {
    orderButton.innerHTML = "↓";
  } else {
    orderButton.innerHTML = "↑";
  }

  const filteredData = filterData(data, currentFilter);
  const filteredSortData = sortData(filteredData, currentSort);
  await renderUI(filteredSortData.slice(0, SHOW_LIM));
  document.getElementById("miniLoader").style.display = "none";
});

orderButton.addEventListener("mousedown", () => {
  document.getElementById("miniLoader").style.display = "inline-block";
});

dataFilter.addEventListener("mousedown", () => {
  document.getElementById("miniLoader").style.display = "inline-block";
});
dataSort.addEventListener("mousedown", () => {
  document.getElementById("miniLoader").style.display = "inline-block";
});

orderButton.addEventListener("focusout", () => {
  document.getElementById("miniLoader").style.display = "none";
});

dataFilter.addEventListener("focusout", () => {
  document.getElementById("miniLoader").style.display = "none";
});
dataSort.addEventListener("focusout", () => {
  document.getElementById("miniLoader").style.display = "none";
});

document.body.addEventListener("mousemove", (event) => {
  if (event.target.id === "data-filter" || event.target.id === "data-sort") {
    return;
  }
  dataSort.blur();
  dataFilter.blur();
});

async function renderUI(data) {
  clearUI();

  data.forEach((element) => {
    try {
      const t = document.querySelector("#item-template").cloneNode(true);

      t.content.querySelector(".flagImg").title = capitalizeFirstLetter(
        element.country
      );

      const country = element.country.toLowerCase().replace(" ", "-");
      const flagSrc = "./resources/flags/" + country + ".svg";
      if (imageExists(flagSrc))
        t.content.querySelector(".flagImg").src =
          "./resources/flags/" + country + ".svg";
      else {
        t.content.querySelector(".flagImg").src = "./resources/flags/world.svg";
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
  app.replaceChildren();
}

function getCategoryQuery(category) {
  switch (category) {
    case "Physics":
      return "phy";
    case "Economic Sciences":
      return "eco";
    case "Literature":
      return "lit";
    case "Chemistry":
      return "che";
    case "Peace":
      return "pea";
    case "Physiology or Medicine":
      return "med";
  }
}

function imageExists(image_url) {
  const http = new XMLHttpRequest();

  http.open("HEAD", image_url, false);
  http.send();

  return http.status != 404;
}

function filterData(data, key) {
  const filteredData = data.filter((person) => {
    if (key === "All") {
      return person;
    } else {
      return key === person.category;
    }
  });
  return filteredData;
}

function sortData(data, key) {
  data = data.sort((a, b) => {
    if (key === "name") {
      try {
        return a.name > b.name ? 1 * order : -1 * order;
      } catch {
        console.log(a);
        console.log(b);
      }
    }
    if (key === "year") {
      return a.year > b.year ? 1 * order : -1 * order;
    }
    if (key === "country") {
      let firstCountry, secondCountry;
      try {
        firstCountry = a.country;
      } catch {
        return 1 * order;
      }
      try {
        secondCountry = b.country;
      } catch {
        return -1 * order;
      }
      return firstCountry > secondCountry ? 1 * order : -1 * order;
    }
    return 0;
  });
  return data;
}
console.log("start");
document.getElementById("miniLoader").style.display = "none";
const data = await getData();
await renderUI(data.slice(0, SHOW_LIM));
document.getElementById("loaderContainer").style.display = "none";
