import { useState } from "react";
import DataIntro from "../components/data-intro";
import Loading from "../components/loading";
import Message from "../components/message";
import LaureatesList from "../components/laureates-list";
import { useLaureatesData } from "../hooks/data";
import { filterData, sortData, cleanData } from "../utils";
import { SHOW_LIM } from "../config";

export default function IndexPage() {
  const { data, isLoading, isError } = useLaureatesData();

  const [sortKey, setSortKey] = useState("name");
  const [filterKey, setFilterKey] = useState("All");
  const [orederKey, setOrderKey] = useState(1);

  function getDataQueryKeys(event) {
    if (event.target.id === "data-sort") {
      setSortKey(event.target.value);
    }
    if (event.target.id === "data-filter") {
      setFilterKey(event.target.value);
    }
    if (event.target.id === "order") {
      if (orederKey === 1) {
        event.target.innerHTML = "↑";
        setOrderKey(-1);
      } else {
        event.target.innerHTML = "↓";
        setOrderKey(1);
      }
    }
  }

  if (isLoading) return <Loading />;
  if (isError) return <Message content="An error occured..." />;
  if (!data) return <Loading />;

  let laureates = cleanData(data);
  laureates = filterData(sortData(laureates, sortKey, orederKey), filterKey);
  laureates = laureates.slice(0, SHOW_LIM);

  return (
    <div className="index-main">
      <DataIntro changeHandler={getDataQueryKeys} />
      <LaureatesList laureates={laureates} />
    </div>
  );
}
