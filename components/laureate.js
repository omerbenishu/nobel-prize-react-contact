import Image from "next/image";

function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}
const images = importAll(
  require.context("../resources", false, /\.(png|jpe?g|svg)$/)
);
const flags = importAll(
  require.context("../resources/flags", false, /\.(png|jpe?g|svg)$/)
);

function getCountryImage(country) {
  let curCountry = country.toLowerCase().replace(" ", "-");
  curCountry = curCountry + ".svg";
  if (flags[curCountry] != null) {
    return curCountry;
  } else {
    return "world.svg";
  }
}

function getCategoryImage(category) {
  switch (category) {
    case "Physics":
      return "physicsIcon.png";
    case "Economic Sciences":
      return "economicIcon.png";
    case "Literature":
      return "literatureIcon.png";
    case "Chemistry":
      return "chemistryIcon.png";
    case "Peace":
      return "peaceIcon.png";
    case "Physiology or Medicine":
      return "medIcon.png";
    default:
      return "medIcon.png";
  }
}

export default function Laureate({ laureate }) {
  return (
    <div className="item">
      <div className="data">
        <h3 className="title">
          <Image
            className="flagImg"
            width="100"
            height="100"
            title={`${laureate.country}`}
            alt={`${laureate.country}`}
            src={flags[`${getCountryImage(laureate.country)}`]}
          />
          {laureate.name}
        </h3>
        <Image
          className="categoryImg"
          width="100"
          height="100"
          title={laureate.category}
          alt={laureate.category}
          src={images[getCategoryImage(laureate.category)]}
        />
        <span className="category">{laureate.category}</span>
        <br />
        <Image
          className="dateImg"
          width="100"
          height="100"
          src={images["calendarIcon.png"]}
          alt="Date"
        />
        <span className="year">{laureate.year}</span>
        <br />
        <p className="desc">
          <Image
            className="infoImg"
            width="100"
            height="100"
            src={images["idea.png"]}
            alt="Info"
          />
          {laureate.desc}
        </p>
      </div>
    </div>
  );
}
