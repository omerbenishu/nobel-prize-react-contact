
export function sortData(data, key, order) {
  if (data == null) return;
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

export function filterData(data, key) {
  if (data == null) return;
  const filteredData = data.filter((person) => {
    if (key === "All") {
      return person;
    } else {
      return key === person.category;
    }
  });
  return filteredData;
}

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function  cleanData(data){
  const cleaned = [];
  data.laureates.forEach((element) => {
    try {
      let eCountry;
      try {
        eCountry = element.birth.place.countryNow.en;
      } catch (err) {
        eCountry = "World";
      }

      cleaned.push({
        country: eCountry,
        name: element.fullName.en,
        category: element.nobelPrizes[0].category.en,
        year: element.nobelPrizes[0].awardYear,
        desc: capitalizeFirstLetter(element.nobelPrizes[0].motivation.en),
      });
    } catch (err) {}
  });
  return cleaned;
}