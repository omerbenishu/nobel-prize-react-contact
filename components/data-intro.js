export default function DataIntro({ changeHandler }) {
  return (
    <div className="row">
      <div className="item intro">
        <div className="content">
          <strong>This is an app to discover football data.</strong>
        </div>
      </div>
      <div className="item intro">
        <div className="row">
          <div className="item control-container">
            <div className="content">
              <div className="row">
                <div className="item control">
                  <div>Sort</div>
                </div>
                <div className="item control">
                  <select id="data-sort" onChange={changeHandler}>
                    <option value="a-z">A to Z</option>
                    <option value="z-a">Z to A</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="item control-container">
            <div className="content">
              <div className="row">
                <div className="item control">
                  <div>Filter</div>
                </div>
                <div className="item control">
                  <select id="data-filter" onChange={changeHandler}>
                    <option value="-">n/a</option>
                    <option value="pre-1980">Pre 1980 teams</option>
                    <option value="post-1980">Post 1980 teams</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
