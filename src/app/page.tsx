import BrowseCarsDrawer from "@/components/BrowseCarsDrawer";

export default function Home() {
  return (
    <div className="main-container">

      <div className="hero-bg"></div>

      <div className="hero-content">
        <h1 className="hero-title">Find your next ride.</h1>
        <p className="hero-description">Discover the best car rental deals in town. Whether you're looking for a compact car, an SUV, or a luxury vehicle, we have you covered.</p>

        <BrowseCarsDrawer />

      </div>

      <div className="content">
        <h2 className="content-title">Why Choose Us?</h2>
        <p className="content-description">We offer a wide selection of vehicles, competitive pricing, and exceptional customer service. Our easy-to-use platform allows you to book your car rental in just a few clicks.</p>
      </div>
    </div>
  );
}
