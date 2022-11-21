import Record from "./record";

export default function RecordList({ records }) {
  return (
    <div id="app" className="row">
      {records.map(record => {
        return <Record key={record.name} record={record} />
      })}
    </div>
  )
}
