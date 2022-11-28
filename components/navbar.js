import newIcon from "../resources/new.png"
import homeIcon from "../resources/home.png"
import ImagedLink from "./imaged-link";

export default function Navbar() {
  return (
    <div id="navbar">
      <h1>
        <img
          id="nobel"
          src="https://www.kindpng.com/picc/m/77-771594_group-search-results-brainpop-nobel-peace-prize-icon.png"
        />
        Nobel prize laureates
      </h1>
      <div className="navbar-menu">
            <ImagedLink src={homeIcon} href={'/'} title={'Home'}/>
            <ImagedLink src={newIcon} href={'/contact'} title={'Suggest a new category'}/>
      </div>
    </div>
  );
}
