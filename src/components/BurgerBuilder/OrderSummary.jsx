import {
  buns,
  bottomBuns,
  patties,
  cheeses,
  toppings,
  sauces,
} from "../../data/ingredients";

const OrderSummary = ({
  burger,
  onAddToCart,
  onClear,
}) => {

  const selectedBun =
    buns[burger.bunIndex];

  const selectedBottomBun =
    bottomBuns[burger.bottomBunIndex];

  const selectedPatty =
    patties[burger.pattyIndex];

  const selectedCheese =
    cheeses[burger.cheeseIndex];

  const selectedSauce =
    sauces[burger.sauceIndex];

  const rows = [
    {
      name: `${selectedBun.name} (Top)`,
      quantity: 1,
      price: selectedBun.price,
      image: selectedBun.image,
    },

    ...(
      burger.toppings.Lettuce
        ? [{
          name: "Lettuce",
          quantity: burger.toppings.Lettuce,
          price: 10 * burger.toppings.Lettuce,
          image: toppings[0].image,
        }]
        : []
    ),

    ...(
      burger.toppings.Tomato
        ? [{
          name: "Tomato",
          quantity: burger.toppings.Tomato,
          price: 10 * burger.toppings.Tomato,
          image: toppings[1].image,
        }]
        : []
    ),

    ...(
      burger.toppings.Onion
        ? [{
          name: "Onion",
          quantity: burger.toppings.Onion,
          price: 10 * burger.toppings.Onion,
          image: toppings[2].image,
        }]
        : []
    ),

    ...(
      burger.toppings.Pickles
        ? [{
          name: "Pickles",
          quantity: burger.toppings.Pickles,
          price: 10 * burger.toppings.Pickles,
          image: toppings[3].image,
        }]
        : []
    ),

    ...(
      burger.toppings.Jalapeño
        ? [{
          name: "Jalapeño",
          quantity: burger.toppings.Jalapeño,
          price: 15 * burger.toppings.Jalapeño,
          image: toppings[4].image,
        }]
        : []
    ),

    ...(
      burger.toppings.Bacon
        ? [{
          name: "Bacon",
          quantity: burger.toppings.Bacon,
          price: 30 * burger.toppings.Bacon,
          image: toppings[5].image,
        }]
        : []
    ),

    ...(
      burger.cheeseQuantity
        ? [{
          name: selectedCheese.name,
          quantity: burger.cheeseQuantity,
          price:
            selectedCheese.price *
            burger.cheeseQuantity,
          image: selectedCheese.image,
        }]
        : []
    ),

    ...(
      burger.pattyQuantity
        ? [{
          name: selectedPatty.name,
          quantity: burger.pattyQuantity,
          price:
            selectedPatty.price *
            burger.pattyQuantity,
          image: selectedPatty.image,
        }]
        : []
    ),

    ...(
      burger.sauceQuantity
        ? [{
          name: selectedSauce.name,
          quantity: burger.sauceQuantity,
          price:
            selectedSauce.price *
            burger.sauceQuantity,
          image: selectedSauce.image,
        }]
        : []
    ),

    {
      name: `${selectedBottomBun.name} (Bottom)`,
      quantity: 1,
      price: selectedBottomBun.price,
      image: selectedBottomBun.image,
    },
  ];

  const total = rows.reduce(
    (sum, row) => sum + row.price,
    0
  );

  const toppingCalories =
    toppings.reduce(
      (sum, topping) =>
        sum +
        topping.calories *
        burger.toppings[topping.name],
      0
    );

  const sauceCalories =
    selectedSauce.calories *
    burger.sauceQuantity;

  const calories = Math.round(
    selectedBun.calories +
    selectedBottomBun.calories +
    selectedPatty.calories *
    burger.pattyQuantity +
    selectedCheese.calories *
    burger.cheeseQuantity +
    toppingCalories +
    sauceCalories
  );

  const protein = Math.round(
    5 +
    selectedPatty.protein *
    burger.pattyQuantity +
    selectedCheese.protein *
    burger.cheeseQuantity
  );

  const carbs = Math.round(
    30 +
    selectedPatty.carbs *
    burger.pattyQuantity +
    selectedCheese.carbs *
    burger.cheeseQuantity
  );

  const fats = Math.round(
    10 +
    selectedPatty.fats *
    burger.pattyQuantity +
    selectedCheese.fats *
    burger.cheeseQuantity
  );

  const handleAddToCart = () => {
    onAddToCart({
      burger: { ...burger },
      rows: [...rows],
      total,
    });
  };

  return (
    <section className="order-panel">

      <div className="order-heading">

        <h2>Your Order</h2>

        <button
          type="button"
          onClick={onClear}
        >
          ♜ &nbsp; Clear All
        </button>

      </div>

      <div className="order-list">

        {rows.map((row, i) => (

          <div
            className="order-row"
            key={`${row.name}-${i}`}
          >

            <div className="order-thumb">
              <img
                src={row.image}
                alt={row.name}
              />
            </div>

            <div className="order-name">

              <span>
                {row.name}
              </span>

              {row.quantity > 1 && (
                <small>
                  {row.quantity} ×
                </small>
              )}

            </div>

            <strong>
              ₹{row.price}
            </strong>

          </div>

        ))}

      </div>

      <div className="total-row">
        <span>Total</span>
        <strong>₹{total}</strong>
      </div>

      <button
        type="button"
        className="cart-button"
        onClick={handleAddToCart}
      >
        🛒 &nbsp; Add to Cart
      </button>

      <div className="nutrition-card">

        <h3>
          Nutritional Information (Approx.)
        </h3>

        <div className="nutrition-grid">

          <div>
            <strong>{calories}</strong>
            <span>kcal</span>
          </div>

          <div>
            <strong>{protein}g</strong>
            <span>Protein</span>
          </div>

          <div>
            <strong>{carbs}g</strong>
            <span>Carbs</span>
          </div>

          <div>
            <strong>{fats}g</strong>
            <span>Fats</span>
          </div>

        </div>

        <p>
          Nutrition values are estimates and may vary.
        </p>

      </div>

    </section>
  );
};

export default OrderSummary;