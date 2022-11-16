export default function RecordStatsRow({ stats }) {
  return (
    <tr>
      <td>{stats.year}</td>
      <td>{stats.played}</td>
      <td>{stats.won}</td>
      <td>{stats.lost}</td>
    </tr>
  )
}
