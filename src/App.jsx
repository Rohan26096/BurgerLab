import { useState } from "react";
import Navbar from "./components/Navbar";
import BuildBurger from "./pages/BuildBurger";

function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <>
      <Navbar cartCount={cartCount} />
      <BuildBurger onCartChange={setCartCount} />
    </>
  );
}

export default App;
