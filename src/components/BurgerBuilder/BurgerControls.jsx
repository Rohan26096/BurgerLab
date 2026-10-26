import IngredientSelector from "./IngredientSelector";
import ToppingSelector from "./ToppingSelector";

import {
  buns,
  bottomBuns,
  patties,
  cheeses,
  toppings,
  sauces,
} from "../../data/ingredients";

const defaultBurger = {
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
const BurgerControls = ({ burger, setBurger }) => {

  // =========================
  // CHANGE VARIANT
  // =========================

  const cycle = (key, list, direction) => {
    setBurger((prev) => ({
      ...prev,

      [key]:
        direction === "next"
          ? (prev[key] + 1) % list.length
          : (prev[key] - 1 + list.length) % list.length,
    }));
  };


  // =========================
  // CHANGE QUANTITY
  // =========================

  const setQuantity = (
    key,
    amount,
    min = 0
  ) => {
    setBurger((prev) => ({
      ...prev,

      [key]: Math.max(
        min,
        prev[key] + amount
      ),
    }));
  };


  // =========================
  // CHANGE TOPPING QUANTITY
  // =========================

  const setNestedQuantity = (
    group,
    name,
    amount
  ) => {
    setBurger((prev) => ({
      ...prev,

      [group]: {
        ...prev[group],

        [name]: Math.max(
          0,
          prev[group][name] + amount
        ),
      },
    }));
  };


  // =========================
  // RESET
  // =========================

  const resetBurger = () => {
    setBurger({
      ...defaultBurger,

      toppings: {
        ...defaultBurger.toppings,
      },
    });
  };


  return (
    <section className="controls-panel">

      {/* HEADER */}

      <div className="panel-heading">

        <h1>
          Build Your Burger
        </h1>

        <p>
          Choose your ingredients and
          create your perfect burger
        </p>

      </div>


      {/* TOP BUN */}

      <IngredientSelector
        title="Top Bun"
        ingredient={buns[burger.bunIndex]}

        onPrevious={() =>
          cycle(
            "bunIndex",
            buns,
            "previous"
          )
        }

        onNext={() =>
          cycle(
            "bunIndex",
            buns,
            "next"
          )
        }
      />


      {/* TOPPINGS */}

      <div className="topping-heading">

        <div className="plus-icon">
          +
        </div>

        <div>
          <strong>
            Add Topping
          </strong>

          <span>
            Add extra toppings between bun and cheese
          </span>
        </div>

        <span className="collapse-icon">
          ⌃
        </span>

      </div>


      <div className="topping-grid">

        {toppings.map((topping) => (

          <ToppingSelector
            key={topping.id}

            topping={topping}

            quantity={
              burger.toppings[topping.name]
            }

            onDecrease={() =>
              setNestedQuantity(
                "toppings",
                topping.name,
                -1
              )
            }

            onIncrease={() =>
              setNestedQuantity(
                "toppings",
                topping.name,
                1
              )
            }
          />

        ))}

      </div>


      {/* CHEESE */}
      <IngredientSelector
        title="Cheese"
        ingredient={cheeses[burger.cheeseIndex]}
        onPrevious={() => cycle("cheeseIndex", cheeses, "previous")}
        onNext={() => cycle("cheeseIndex", cheeses, "next")}
        quantity={burger.cheeseQuantity}
        onDecrease={() => setQuantity("cheeseQuantity", -1)}
        onIncrease={() => setQuantity("cheeseQuantity", 1)}
        max={3}
      />


      {/* PATTY */}

      <IngredientSelector
        title="Patty"
        ingredient={patties[burger.pattyIndex]}
        onPrevious={() => cycle("pattyIndex", patties, "previous")}
        onNext={() => cycle("pattyIndex", patties, "next")}
        quantity={burger.pattyQuantity}
        onDecrease={() => setQuantity("pattyQuantity", -1, 1)}
        onIncrease={() => setQuantity("pattyQuantity", 1, 1)}
        min={1}
        max={3}
      />


      {/* SAUCE */}

      <IngredientSelector
        title="Sauce"
        ingredient={sauces[burger.sauceIndex]}
        onPrevious={() => cycle("sauceIndex", sauces, "previous")}
        onNext={() => cycle("sauceIndex", sauces, "next")}
        quantity={burger.sauceQuantity}
        onDecrease={() => setQuantity("sauceQuantity", -1)}
        onIncrease={() => setQuantity("sauceQuantity", 1)}
        max={3}
      />


      {/* BOTTOM BUN */}

      <IngredientSelector
        title="Bottom Bun"
        ingredient={
          bottomBuns[
          burger.bottomBunIndex
          ]
        }

        onPrevious={() =>
          cycle(
            "bottomBunIndex",
            bottomBuns,
            "previous"
          )
        }

        onNext={() =>
          cycle(
            "bottomBunIndex",
            bottomBuns,
            "next"
          )
        }
      />


      {/* RESET */}

      <button
        type="button"
        className="reset-button"
        onClick={resetBurger}
      >
        ↻
        <span>
          Reset Burger
        </span>
      </button>

    </section>
  );
};

export default BurgerControls;