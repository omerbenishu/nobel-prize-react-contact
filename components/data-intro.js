export default function DataIntro({ changeHandler }) {
  return (
    <div id="main">
      
      <div id="meta-row">
        <label htmlFor="data-sort">
          Sort by
        </label>
        <select id="data-sort" onChange={changeHandler}>
          <option value="name">Name</option>
          <option value="year">Year</option>
          <option value="country">Country</option>
        </select>
        <button id="order" onClick={changeHandler}>↓</button>

        <label htmlFor="data-filter">Filter by</label>
        <select id="data-filter" onChange={changeHandler}>
          <option value="All">All</option>
          <option value="Physics">Physics</option>
          <option value="Economic Sciences">Economic Sciences</option>
          <option value="Literature">Literature</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Peace">Peace</option>
          <option value="Physiology or Medicine">Physiology or Medicine</option>
        </select>
      </div>
    </div>
  )
}
