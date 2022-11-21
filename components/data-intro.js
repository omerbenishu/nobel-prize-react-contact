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
      <div id="miniLoader"></div>
      </div>
      <div id="loaderContainer">
        <div id="loader"></div>
        <p id="loadingText">
          Loading the greatest minds might take a while, so enjoy reading a fact about them:
          <br/>
          When Pakistani human rights advocate Malala Yousafzai won the Nobel Peace Prize in 2014 at the age of 17, she became the youngest winner by a wide margin.  The second youngest winner to date is Sir William Lawrence Bragg who won the physics prize in 1915 at age 25 for work with the X-ray. The oldest winner? Economist Leonid Hurwicz, who won in 2007 at 90.

        </p>
      </div>
    </div>
  )
}
