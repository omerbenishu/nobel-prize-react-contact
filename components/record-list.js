import Record from "./record";

export default function RecordList({ records }) {
  return (
    <div className="row">
      {records.map(record => {
        return <Record key={record.id} record={record} />
      })}
    </div>
  )
}
