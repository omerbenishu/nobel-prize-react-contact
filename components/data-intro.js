export default function DataIntro({ changeHandler }) {
  return (
    <div id="main">
      <h1>
        <img id="nobel" src="https://www.kindpng.com/picc/m/77-771594_group-search-results-brainpop-nobel-peace-prize-icon.png"/>
        Nobel prize laureates
      </h1>
      <div id="meta-row">
        <label for="data-sort">
          Sort by
        </label>
        <select id="data-sort">
          <option value="name">Name</option>
          <option value="year">Year</option>
          <option value="country">Country</option>
        </select>
        <button id="order">↓</button>

        <label for="data-filter">Filter by</label>
        <select id="data-filter">
          <option value="All">All</option>
          <option value="Physics">Physics</option>
          <option value="Economic Sciences">Economic Sciences</option>
          <option value="Literature">Literature</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Peace">Peace</option>
          <option value="Physiology or Medicine">Physiology or Medicine</option>
        </select>
        <div id="miniLoader"/>
      </div>
    </div>
  )
}
