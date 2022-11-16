
export function sortData(data, key) {
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