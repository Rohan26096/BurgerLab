import { useState } from "react";
import BurgerControls from "../components/BurgerBuilder/BurgerControls";
import BurgerPreview from "../components/BurgerBuilder/BurgerPreview";
import OrderSummary from "../components/BurgerBuilder/OrderSummary";

const initialBurger = {
  bunIndex: 0,
  bottomBunIndex: 0,
  pattyIndex: 1,
  pattyQuantity: 1,
  cheeseIndex: 0,
  cheeseQuantity: 1,
  onionTypeIndex: 0,
  sauceIndex: 0,
  sauceQuantity: 1,
  toppings: {
    Lettuce: 1,
    Tomato: 1,
    Onion: 1,
    Pickles: 0,
    Jalapeño: 0,
    Bacon: 0,
  },
};

const BuildBurger = ({
  onAddToCart,
  reorderBurger,
}) => {

  const [burger, setBurger] = useState(() => {

    if (reorderBurger) {
      return {
        ...reorderBurger,
        toppings: {
          ...reorderBurger.toppings,
        },
      }
    }

    return {
      ...initialBurger,
      toppings: {
        ...initialBurger.toppings,
      },
    }

  })
  
  const clearBurger = () => {
    setBurger(initialBurger);
  };

  return (
    <main className="page-shell">

      {/* Burger Builder */}

      <div className="builder-grid">

        <BurgerControls
          burger={burger}
          setBurger={setBurger}
        />

        <BurgerPreview
          burger={burger}
        />

        <OrderSummary
          burger={burger}
          onAddToCart={onAddToCart}
          onClear={clearBurger}
        />

      </div>

      {/* About BurgerLab */}

      <section
        id="about"
        className="about-section"
      >

        <div className="about-content">

          <div className="about-burger">
            🍔
          </div>

          <div className="about-text">

            <span className="about-label">
              ABOUT BURGERLAB
            </span>

            <h2>
              You came here because
              <br />
              you were hungry.
            </h2>

            <p className="about-main">
              We don't judge.
            </p>

            <p>
              BurgerLab lets you build your burger exactly
              how you want it.
            </p>

            <div className="about-questions">

              <div className="about-question">
                <strong>Extra patty?</strong>
                <span>Obviously.</span>
              </div>

              <div className="about-question">
                <strong>More cheese?</strong>
                <span>Correct answer.</span>
              </div>

              <div className="about-question">
                <strong>Extra bacon?</strong>
                <span>We support your decisions.</span>
              </div>

              <div className="about-question">
                <strong>Too many jalapeños?</strong>
                <span>There is no such thing.</span>
              </div>

              <div className="about-question">
                <strong>Six servings?</strong>
                <span>
                  That's between you and your stomach. 😂
                </span>
              </div>

            </div>

            <p>
              Pick your ingredients, adjust the quantities,
              and create something you'll probably call{" "}
              <strong>"the perfect burger."</strong>
            </p>

            <div className="about-joke">

              <span>🍔</span>

              <div>
                <strong>
                  No judgment. Just burgers.
                </strong>

                <small>
                  Built with React. Powered by questionable
                  burger decisions.
                </small>
              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default BuildBurger;