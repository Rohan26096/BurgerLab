import { useState } from "react";
import { buns, bottomBuns, patties, cheeses, toppings, sauces } from "../../data/ingredients";

const BurgerPreview = ({ burger }) => {
  const [view, setView] = useState("front");
  const selectedBun = buns[burger.bunIndex];
  const selectedBottomBun = bottomBuns[burger.bottomBunIndex];
  const selectedPatty = patties[burger.pattyIndex];
  const selectedCheese = cheeses[burger.cheeseIndex];
  const selectedSauce = sauces[burger.sauceIndex];

  const visualToppings = toppings.filter(t => burger.toppings[t.name] > 0);

  return (
    <section className="preview-column">
      <div className="preview-card">
        <div className="preview-header">
          <div>
            <h2>Your Burger</h2>
            <p>Live Preview</p>
          </div>
          <span className="custom-pill">Custom</span>
        </div>

        <div className={`burger-stage ${view}`}>
          <div className="burger-stack">
            <img className="visual-bun top" src={selectedBun.image} alt={selectedBun.name} />

            {Array.from({ length: burger.sauceQuantity }).map((_, i) => (
              <img className="visual-sauce" src={selectedSauce.image} alt="sauce" key={`top-sauce-${i}`} />
            ))}

            {visualToppings.map(topping =>
              Array.from({ length: burger.toppings[topping.name] }).map((_, i) => (
                <img
                  className={`visual-${topping.name.toLowerCase().replaceAll(" ", "-")}`}
                  src={topping.image}
                  alt={topping.name}
                  key={`${topping.name}-${i}`}
                />
              ))
            )}

            {Array.from({ length: burger.cheeseQuantity }).map((_, i) => (
              <img className="visual-cheese" src={selectedCheese.image} alt={selectedCheese.name} key={`cheese-${i}`} />
            ))}

            {Array.from({ length: burger.pattyQuantity }).map((_, i) => (
              <img className="visual-patty" src={selectedPatty.image} alt={selectedPatty.name} key={`patty-${i}`} />
            ))}

            {Array.from({ length: burger.sauceQuantity }).map((_, i) => (
              <img className="visual-sauce" src={selectedSauce.image} alt="sauce" key={`bottom-sauce-${i}`} />
            ))}

            <img className="visual-bun bottom" src={selectedBottomBun.image} alt={selectedBottomBun.name} />
          </div>
        </div>

        <div className="rotate-hint">⟳ &nbsp; Drag to rotate</div>

        <div className="view-tabs">
          {[['front', 'Front View'], ['side', 'Side View'], ['top', 'Top View']].map(([key, label]) => (
            <button key={key} type="button" className={view === key ? 'active' : ''} onClick={() => setView(key)}>{label}</button>
          ))}
        </div>
      </div>

      <div className="preview-note">
        <div className="note-burger">🍔</div>
        <div><strong>Looks delicious!</strong><span>Your custom burger is ready.</span></div>
      </div>
    </section>
  );
};

export default BurgerPreview;
