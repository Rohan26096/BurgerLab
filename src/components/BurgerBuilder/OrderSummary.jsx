import {
  buns,
  bottomBuns,
  patties,
  cheeses,
  toppings,
  sauces,
} from "../../data/ingredients"

const OrderSummary = ({
  burger,
  onAddToCart,
  onClear,
}) => {

  const selectedBun =
    buns[burger.bunIndex]

  const selectedBottomBun =
    bottomBuns[burger.bottomBunIndex]

  const selectedPatty =
    patties[burger.pattyIndex]

  const selectedCheese =
    cheeses[burger.cheeseIndex]

  const selectedSauce =
    sauces[burger.sauceIndex]


  // =========================
  // BUILD ORDER ROWS
  // =========================

  const rows = [
    {
      name: `${selectedBun.name} (Top)`,
      quantity: 1,
      price: selectedBun.price,
      image: selectedBun.image,
    },

    ...toppings
      .filter(
        (topping) =>
          burger.toppings[topping.name] > 0
      )
      .map((topping) => ({
        name: topping.name,
        quantity:
          burger.toppings[topping.name],
        price:
          topping.price *
          burger.toppings[topping.name],
        image: topping.image,
      })),

    ...(burger.cheeseQuantity > 0
      ? [
          {
            name: selectedCheese.name,
            quantity: burger.cheeseQuantity,
            price:
              selectedCheese.price *
              burger.cheeseQuantity,
            image: selectedCheese.image,
          },
        ]
      : []),

    ...(burger.pattyQuantity > 0
      ? [
          {
            name: selectedPatty.name,
            quantity: burger.pattyQuantity,
            price:
              selectedPatty.price *
              burger.pattyQuantity,
            image: selectedPatty.image,
          },
        ]
      : []),

    ...(burger.sauceQuantity > 0
      ? [
          {
            name: selectedSauce.name,
            quantity: burger.sauceQuantity,
            price:
              selectedSauce.price *
              burger.sauceQuantity,
            image: selectedSauce.image,
          },
        ]
      : []),

    {
      name: `${selectedBottomBun.name} (Bottom)`,
      quantity: 1,
      price: selectedBottomBun.price,
      image: selectedBottomBun.image,
    },
  ]


  // =========================
  // TOTAL
  // =========================

  const total = rows.reduce(
    (sum, row) =>
      sum + row.price,
    0
  )


  // =========================
  // NUTRITION
  // =========================

  const toppingNutrition =
    toppings.reduce(
      (nutrition, topping) => {

        const quantity =
          burger.toppings[topping.name] || 0

        return {
          calories:
            nutrition.calories +
            (topping.calories || 0) *
              quantity,

          protein:
            nutrition.protein +
            (topping.protein || 0) *
              quantity,

          carbs:
            nutrition.carbs +
            (topping.carbs || 0) *
              quantity,

          fats:
            nutrition.fats +
            (topping.fats || 0) *
              quantity,
        }
      },
      {
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
      }
    )


  const calories = Math.round(
    (selectedBun.calories || 0) +
    (selectedBottomBun.calories || 0) +
    (selectedPatty.calories || 0) *
      burger.pattyQuantity +
    (selectedCheese.calories || 0) *
      burger.cheeseQuantity +
    (selectedSauce.calories || 0) *
      burger.sauceQuantity +
    toppingNutrition.calories
  )


  const protein = Math.round(
    (selectedBun.protein || 0) +
    (selectedBottomBun.protein || 0) +
    (selectedPatty.protein || 0) *
      burger.pattyQuantity +
    (selectedCheese.protein || 0) *
      burger.cheeseQuantity +
    (selectedSauce.protein || 0) *
      burger.sauceQuantity +
    toppingNutrition.protein
  )


  const carbs = Math.round(
    (selectedBun.carbs || 0) +
    (selectedBottomBun.carbs || 0) +
    (selectedPatty.carbs || 0) *
      burger.pattyQuantity +
    (selectedCheese.carbs || 0) *
      burger.cheeseQuantity +
    (selectedSauce.carbs || 0) *
      burger.sauceQuantity +
    toppingNutrition.carbs
  )


  const fats = Math.round(
    (selectedBun.fats || 0) +
    (selectedBottomBun.fats || 0) +
    (selectedPatty.fats || 0) *
      burger.pattyQuantity +
    (selectedCheese.fats || 0) *
      burger.cheeseQuantity +
    (selectedSauce.fats || 0) *
      burger.sauceQuantity +
    toppingNutrition.fats
  )


  // =========================
  // INGREDIENT COUNT
  // =========================

  const ingredientCount =
    rows.reduce(
      (count, row) =>
        count + row.quantity,
      0
    )


  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = () => {

    onAddToCart({
      burger: {
        ...burger,

        toppings: {
          ...burger.toppings,
        },
      },

      rows: [...rows],

      total,
    })
  }


  return (
    <section className="order-panel">

      {/* =========================
          HEADER
      ========================= */}

      <div className="order-heading">

        <div>
          <h2>
            Your Order
          </h2>

          <span className="order-count">
            {ingredientCount} ingredients
          </span>
        </div>

        <button
          type="button"
          onClick={onClear}
        >
          ↻ &nbsp; Clear All
        </button>

      </div>


      {/* =========================
          ORDER ITEMS
      ========================= */}

      <div className="order-list">

        {rows.map((row, index) => (

          <div
            className="order-row"
            key={`${row.name}-${index}`}
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


      {/* =========================
          TOTAL
      ========================= */}

      <div className="total-row">

        <span>
          Total
        </span>

        <strong>
          ₹{total}
        </strong>

      </div>


      {/* =========================
          CART
      ========================= */}

      <button
        type="button"
        className="cart-button"
        onClick={handleAddToCart}
      >
        🛒 &nbsp; Add to Cart
      </button>


      {/* =========================
          NUTRITION
      ========================= */}

      <div className="nutrition-card">

        <h3>
          Nutritional Information (Approx.)
        </h3>


        <div className="nutrition-grid">

          <div>
            <strong>
              {calories}
            </strong>

            <span>
              kcal
            </span>
          </div>


          <div>
            <strong>
              {protein}g
            </strong>

            <span>
              Protein
            </span>
          </div>


          <div>
            <strong>
              {carbs}g
            </strong>

            <span>
              Carbs
            </span>
          </div>


          <div>
            <strong>
              {fats}g
            </strong>

            <span>
              Fats
            </span>
          </div>

        </div>


        <p>
          Nutrition values are estimates and may vary.
        </p>

      </div>

    </section>
  )
}

export default OrderSummary