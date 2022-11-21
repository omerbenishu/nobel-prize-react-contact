import Image from "next/image";
import { FLAGS_PATH,RESOURCES_LOCAL_BASE } from "../config";
import { useGameData } from "../hooks/data";
import { makeGamesStats } from "../utils";
import RecordStatsRow from "./record-stats-row";

export default function Record({ record }) {
  const { data: data2022, isLoading: loading2022, isError: isError2022 } = useGameData(2022);
  const { data: data2021, isLoading: loading2021, isError: isError2021 } = useGameData(2021);

  const stats2022 = makeGamesStats(record.id, 2022, data2022);
  const stats2021 = makeGamesStats(record.id, 2021, data2021);

  getFlagSrc = (country) => {
  const src = `${FLAGS_PATH}${country.toLowerCase().replace(" ", "-")}.svg`
  if (imageExists(src)){
    return src;
  }
  return `${FLAGS_PATH}/world.svg`
  }

  imageExists = (image_url) => {
    const http = new XMLHttpRequest();
  
    http.open("HEAD", image_url, false);
    http.send();
  
    return http.status != 404;
  }

   getCategoryImage = (category) => {
    switch (category) {
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

  return (
  <div class="item">
    <div class="data">
      <h3 class="title">
        <Image class="flagImg" title={`${record.country}`} src={getFlagSrc(record.country)}/>
        {record.name}
      </h3>
      <Image class="categoryImg" title={record.category} src={getCategoryImage(record.category)}/>
      <span class="category">{record.category}</span>
      <br/>
      <Image class="dateImg" src={`${RESOURCES_LOCAL_BASE}/calendarIcon.svg`}/>
      <span class="year">{record.year}</span>
      <br/>
      <p class="desc">
        <Image class="infoImg" src={`${RESOURCES_LOCAL_BASE}/idea.png`}/>
        {record.desc}
      </p>
      </div>
    </div>
  )
}
