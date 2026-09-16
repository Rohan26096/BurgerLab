const CartDrawer = ({
    cartItems,
    onClose,
    onRemove,
    onClear,
    onCheckout,
    onIncrease,
    onDecrease,
}) => {

    const cartTotal = cartItems.reduce(
        (sum, item) =>
            sum + item.total * (item.quantity || 1),
        0
    );


    const cartCount = cartItems.reduce(
        (sum, item) =>
            sum + (item.quantity || 1),
        0
    );


    return (
        <>
            {/* Dark overlay */}

            <div
                className="cart-overlay"
                onClick={onClose}
            />


            {/* Cart drawer */}

            <aside className="cart-drawer">

                <div className="cart-drawer-header">

                    <div>

                        <h2>
                            Your Cart
                        </h2>

                        <span>
                            {cartCount}{" "}
                            {cartCount === 1
                                ? "burger"
                                : "burgers"}
                        </span>

                    </div>


                    <button
                        type="button"
                        className="cart-close"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                {cartItems.length === 0 ? (

                    <div className="empty-cart">

                        <div className="empty-cart-icon">
                            🛒
                        </div>

                        <h3>
                            Your cart is empty
                        </h3>

                        <p>
                            Your burger is still waiting to be built.
                            <br />
                            Don't leave it hanging.
                        </p>

                        <button
                            type="button"
                            className="empty-cart-button"
                            onClick={onClose}
                        >
                            Build a Burger
                        </button>

                    </div>

                ) : (

                    <>

                        <div className="cart-items">

                            {cartItems.map((item, index) => (

                                <div
                                    className="cart-item"
                                    key={item.id}
                                >

                                    <div className="cart-item-top">

                                        <div className="cart-burger-icon">
                                            🍔
                                        </div>


                                        <div className="cart-item-title">

                                            <strong>
                                                Custom Burger {index + 1}
                                            </strong>

                                            <span>
                                                {item.rows?.length || 0}
                                                {" "}ingredients
                                            </span>

                                        </div>


                                        <button
                                            type="button"
                                            className="remove-cart-item"
                                            onClick={() =>
                                                onRemove(item.id)
                                            }
                                            aria-label="Remove burger"
                                        >
                                            ×
                                        </button>

                                    </div>


                                    <div className="cart-ingredients">

                                        {item.rows?.map(
                                            (row, rowIndex) => (

                                                <div
                                                    className="cart-ingredient"
                                                    key={`${row.name}-${rowIndex}`}
                                                >

                                                    <img
                                                        src={row.image}
                                                        alt={row.name}
                                                    />

                                                    <span>

                                                        {row.quantity > 1
                                                            ? `${row.quantity} × `
                                                            : ""}

                                                        {row.name}

                                                    </span>

                                                </div>

                                            )
                                        )}

                                    </div>


                                    {/* Quantity + Price */}

                                    <div className="cart-item-bottom">

                                        <div className="cart-quantity">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onDecrease(item.id)
                                                }
                                                disabled={
                                                    (item.quantity || 1) <= 1
                                                }
                                            >
                                                −
                                            </button>


                                            <span>
                                                {item.quantity || 1}
                                            </span>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onIncrease(item.id)
                                                }
                                            >
                                                +
                                            </button>

                                        </div>


                                        <strong className="cart-item-price">
                                            ₹{(
                                                item.total *
                                                (item.quantity || 1)
                                            ).toFixed(2)}
                                        </strong>

                                    </div>

                                </div>

                            ))}

                        </div>


                        <div className="cart-footer">

                            <button
                                type="button"
                                className="clear-cart-button"
                                onClick={onClear}
                            >
                                Clear Cart
                            </button>


                            <div className="cart-total">

                                <span>
                                    Total
                                </span>

                                <strong>
                                    ₹{cartTotal.toFixed(2)}
                                </strong>

                            </div>


                            <button
                                type="button"
                                className="checkout-button"
                                onClick={onCheckout}
                            >
                                Proceed to Checkout

                                <span>
                                    →
                                </span>

                            </button>

                        </div>

                    </>

                )}

            </aside>
        </>
    );
};


export default CartDrawer;