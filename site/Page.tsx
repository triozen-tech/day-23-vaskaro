import Loader from "./components/Loader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Models from "./components/Models";
import Gate from "./components/Gate";
import Engine from "./components/Engine";
import GearShop from "./components/GearShop";
import Roads from "./components/Roads";
import Booking from "./components/Booking";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <main>
      <Loader />
      <Nav />
      <Hero />
      <Models />
      <Gate />
      <Engine />
      <GearShop />
      <Roads />
      <Booking />
      <Footer />
    </main>
  );
}
