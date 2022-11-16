import Image from "next/image";
import { IMAGE_BASE } from "../config";
import { useGameData } from "../hooks/data";
import { makeGamesStats } from "../utils";
import RecordStatsRow from "./record-stats-row";

export default function Record({ record }) {
  const { data: data2022, isLoading: loading2022, isError: isError2022 } = useGameData(2022);
  const { data: data2021, isLoading: loading2021, isError: isError2021 } = useGameData(2021);

  const stats2022 = makeGamesStats(record.id, 2022, data2022);
  const stats2021 = makeGamesStats(record.id, 2021, data2021);

  return (
    <div className="item card">
      <div className="content card-content">
        <div className="row">
          <div className="item card-title">
            <h2 className="content">{record.name}</h2>
            <p>{`Debuted in ${record.debut}`}</p>
          </div>
          <div className="item card-image">
            <Image alt="Australian Football" src={`${IMAGE_BASE}${record.logo}`} className="content" width="90" height="90" />
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <td>Year</td>
              <td>Played</td>
              <td>Won</td>
              <td>Lost</td>
            </tr>
          </thead>
          <tbody>
            {loading2022 ? <tr><td className="loading">Calculating stats for year ...</td></tr> : <RecordStatsRow stats={stats2022} />}
            {loading2021 ? <tr><td className="loading">Calculating stats for year ...</td></tr> : <RecordStatsRow stats={stats2021} />}
          </tbody>
        </table>
      </div>
    </div>
  )
}
