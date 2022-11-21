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

export default function Record({ record }) {
  return (
    <div className="item">
      <div className="data">
        <h3 className="title">
          <Image
            className="flagImg"
            width="100"
            height="100"
            title={`${record.country}`}
            alt={`${record.country}`}
            src={flags[`${getCountryImage(record.country)}`]}
          />
          {record.name}
        </h3>
        <Image
          className="categoryImg"
          width="100"
          height="100"
          title={record.category}
          alt={record.category}
          src={images[getCategoryImage(record.category)]}
        />
        <span className="category">{record.category}</span>
        <br />
        <Image
          className="dateImg"
          width="100"
          height="100"
          src={images["calendarIcon.png"]}
          alt="Date"
        />
        <span className="year">{record.year}</span>
        <br />
        <p className="desc">
          <Image
            className="infoImg"
            width="100"
            height="100"
            src={images["idea.png"]}
            alt="Info"
          />
          {record.desc}
        </p>
      </div>
    </div>
  );
}
