const QuantityControl = ({ quantity, onDecrease, onIncrease, min = 0 }) => (
  <div className="quantity-control">
    <button type="button" onClick={onDecrease} disabled={quantity <= min}>−</button>
    <span>{quantity}</span>
    <button type="button" onClick={onIncrease}>+</button>
  </div>
);

export default QuantityControl;
