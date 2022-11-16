import Link from "next/link";

export default function Navbar() {
  return (
    <div id="navbar">
      <div className="container">
        <div className="row navbar-items">
          <div className="item navbar-logo">
            <div className="content">
              <Link href="/">Australian Football</Link>
            </div>
          </div>
          <div className="item navbar-menu">
            <div className="content">
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
