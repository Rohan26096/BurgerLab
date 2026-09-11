import QuantityControl from "./QuantityControl";

const ToppingSelector = ({ topping, quantity, onDecrease, onIncrease }) => (
  <div className="topping-card">
    <div className="topping-image">
      <img src={topping.image} alt={topping.name} />
    </div>
    <div className="topping-copy">
      <strong>{topping.name}</strong>
      <span>₹{topping.price}</span>
    </div>
    <QuantityControl quantity={quantity} onDecrease={onDecrease} onIncrease={onIncrease} />
  </div>
);

export default ToppingSelector;
