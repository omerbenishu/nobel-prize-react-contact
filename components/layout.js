import Footer from "./footer";
import Navbar from "./navbar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="container">
        {children}
      </main>
      <Footer />
    </div>
  )
}