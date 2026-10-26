import QuantityControl from "./QuantityControl"

const IngredientSelector = ({
    title,
    ingredient,
    onPrevious,
    onNext,
    quantity,
    onDecrease,
    onIncrease,
    min = 0,
    max,
}) => (
    <div className="ingredient-block">

        <div className="ingredient-label">
            {title}
        </div>

        <div className="ingredient-card">

            <button
                type="button"
                className="round-arrow"
                onClick={onPrevious}
            >
                ‹
            </button>


            <div className="ingredient-main">

                <div className="ingredient-image">
                    <img
                        src={ingredient.image}
                        alt={ingredient.name}
                    />
                </div>

                <div className="ingredient-copy">

                    <strong>
                        {ingredient.name}
                    </strong>

                    <span>
                        {title === "Onion"
                            ? "Freshly prepared"
                            : `₹${ingredient.price}`}
                    </span>

                </div>

            </div>


            {quantity !== undefined && (
                <QuantityControl
                    quantity={quantity}
                    onDecrease={onDecrease}
                    onIncrease={onIncrease}
                    min={min}
                    max={max}
                />
            )}


            <button
                type="button"
                className="round-arrow"
                onClick={onNext}
            >
                ›
            </button>

        </div>

    </div>
)

export default IngredientSelector