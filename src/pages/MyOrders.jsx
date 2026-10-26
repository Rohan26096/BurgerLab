import { useState } from "react"

export const MyOrders = ({
    orders,
    onBack,
    onReorder,
}) => {
    const [selectedOrder, setSelectedOrder] = useState(null)

    const handleReorder = (order) => {
        if (!order.burgers || order.burgers.length === 0) {
            alert("This older order cannot be reordered.")
            return
        }

        // Send the complete order to App.jsx
        onReorder(order)
    }

    const formatDate = (date) => {
        if (!date) return "Unknown date"

        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const getIngredientCount = (order) => {
        if (order.rows?.length) {
            return order.rows.length
        }

        return 0
    }

    const getBurgerCount = (order) => {
        if (!order.burgers?.length) {
            return 1
        }

        return order.burgers.reduce(
            (total, burger) =>
                total + (burger.quantity || 1),
            0
        )
    }

    // =========================
    // ORDER DETAILS
    // =========================

    if (selectedOrder) {
        const canReorder =
            selectedOrder.burgers &&
            selectedOrder.burgers.length > 0

        return (
            <div className="orders-page">
                <div className="orders-container">

                    <button
                        className="orders-back"
                        onClick={() =>
                            setSelectedOrder(null)
                        }
                    >
                        ← Back to Orders
                    </button>

                    <div className="order-details-card">

                        <div className="order-success-icon">
                            ✓
                        </div>

                        <p className="order-status">
                            PAYMENT SUCCESSFUL
                        </p>

                        <h1>
                            Your burger is officially happening.
                        </h1>

                        <p className="order-subtitle">
                            The kitchen has received your
                            questionable but respectable creation.
                            🍔
                        </p>

                        {/* ORDER INFORMATION */}

                        <div className="order-info">

                            <div className="order-info-row">
                                <span>Order ID</span>

                                <strong>
                                    #{selectedOrder.orderId}
                                </strong>
                            </div>

                            <div className="order-info-row">
                                <span>Payment ID</span>

                                <strong>
                                    {selectedOrder.paymentId ||
                                        "Not available"}
                                </strong>
                            </div>

                            <div className="order-info-row">
                                <span>Amount Paid</span>

                                <strong>
                                    ₹
                                    {Number(
                                        selectedOrder.amount || 0
                                    ).toFixed(2)}
                                </strong>
                            </div>

                            <div className="order-info-row">
                                <span>Payment Method</span>

                                <strong>
                                    {selectedOrder.paymentMethod ||
                                        "Razorpay"}
                                </strong>
                            </div>

                            <div className="order-info-row">
                                <span>Delivering To</span>

                                <strong>
                                    {selectedOrder.customer?.name ||
                                        "Customer"}
                                </strong>
                            </div>

                            <div className="order-info-row">
                                <span>Date</span>

                                <strong>
                                    {formatDate(
                                        selectedOrder.createdAt
                                    )}
                                </strong>
                            </div>

                        </div>

                        {/* DELIVERY DETAILS */}

                        {selectedOrder.customer && (
                            <div className="order-ingredients">

                                <h2>
                                    Delivery Details
                                </h2>

                                <div className="order-ingredient-row">
                                    <span>Name</span>

                                    <strong>
                                        {selectedOrder.customer.name ||
                                            "Customer"}
                                    </strong>
                                </div>

                                {selectedOrder.customer.phone && (
                                    <div className="order-ingredient-row">
                                        <span>Phone</span>

                                        <strong>
                                            {selectedOrder.customer.phone}
                                        </strong>
                                    </div>
                                )}

                                {selectedOrder.customer.email && (
                                    <div className="order-ingredient-row">
                                        <span>Email</span>

                                        <strong>
                                            {selectedOrder.customer.email}
                                        </strong>
                                    </div>
                                )}

                                {selectedOrder.customer.address && (
                                    <div className="order-ingredient-row">
                                        <span>Address</span>

                                        <strong>
                                            {selectedOrder.customer.address}
                                        </strong>
                                    </div>
                                )}

                                {selectedOrder.customer.city && (
                                    <div className="order-ingredient-row">
                                        <span>City</span>

                                        <strong>
                                            {selectedOrder.customer.city}
                                        </strong>
                                    </div>
                                )}

                                {selectedOrder.customer.pinCode && (
                                    <div className="order-ingredient-row">
                                        <span>PIN Code</span>

                                        <strong>
                                            {selectedOrder.customer.pinCode}
                                        </strong>
                                    </div>
                                )}

                            </div>
                        )}

                        {/* BURGER DETAILS */}

                        <div className="order-ingredients">

                            <h2>
                                Your Burger
                            </h2>

                            {selectedOrder.burgers?.length > 0 ? (
                                selectedOrder.burgers.map(
                                    (burger, burgerIndex) => (
                                        <div
                                            key={burgerIndex}
                                            className="order-burger-block"
                                        >

                                            <div className="order-ingredient-row">
                                                <span>
                                                    Burger{" "}
                                                    {burgerIndex + 1}
                                                </span>

                                                <strong>
                                                    ×{" "}
                                                    {burger.quantity ||
                                                        1}
                                                </strong>
                                            </div>

                                            {burger.topBun && (
                                                <div className="order-ingredient-row">
                                                    <span>
                                                        Top Bun
                                                    </span>

                                                    <strong>
                                                        {burger.topBun}
                                                    </strong>
                                                </div>
                                            )}

                                            {burger.patty && (
                                                <div className="order-ingredient-row">
                                                    <span>
                                                        Patty
                                                    </span>

                                                    <strong>
                                                        {burger.patty}
                                                    </strong>
                                                </div>
                                            )}

                                            {burger.cheese && (
                                                <div className="order-ingredient-row">
                                                    <span>
                                                        Cheese
                                                    </span>

                                                    <strong>
                                                        {burger.cheese}
                                                    </strong>
                                                </div>
                                            )}

                                            {burger.bottomBun && (
                                                <div className="order-ingredient-row">
                                                    <span>
                                                        Bottom Bun
                                                    </span>

                                                    <strong>
                                                        {burger.bottomBun}
                                                    </strong>
                                                </div>
                                            )}

                                            {burger.toppings &&
                                                Object.entries(
                                                    burger.toppings
                                                ).map(
                                                    (
                                                        [
                                                            name,
                                                            quantity,
                                                        ]
                                                    ) =>
                                                        quantity >
                                                            0 && (
                                                            <div
                                                                className="order-ingredient-row"
                                                                key={name}
                                                            >
                                                                <span>
                                                                    {name}
                                                                </span>

                                                                <strong>
                                                                    ×{" "}
                                                                    {
                                                                        quantity
                                                                    }
                                                                </strong>
                                                            </div>
                                                        )
                                                )}

                                        </div>
                                    )
                                )
                            ) : (
                                selectedOrder.rows?.map(
                                    (item, index) => (
                                        <div
                                            className="order-ingredient-row"
                                            key={index}
                                        >
                                            <span>
                                                {item.name}

                                                {item.quantity > 1
                                                    ? ` × ${item.quantity}`
                                                    : ""}
                                            </span>

                                            <strong>
                                                ₹
                                                {Number(
                                                    item.price || 0
                                                ).toFixed(2)}
                                            </strong>
                                        </div>
                                    )
                                )
                            )}

                        </div>

                        {/* TOTAL */}

                        <div className="order-info">

                            <div className="order-info-row">
                                <span>
                                    Total Paid
                                </span>

                                <strong>
                                    ₹
                                    {Number(
                                        selectedOrder.amount || 0
                                    ).toFixed(2)}
                                </strong>
                            </div>

                        </div>

                        {/* ACTIONS */}

                        <div className="order-details-actions">

                            {canReorder ? (
                                <button
                                    className="build-again-button"
                                    onClick={() =>
                                        handleReorder(
                                            selectedOrder
                                        )
                                    }
                                >
                                    Reorder Burger
                                </button>
                            ) : (
                                <button
                                    className="build-again-button"
                                    onClick={onBack}
                                >
                                    Build New Burger
                                </button>
                            )}

                            <button
                                className="order-secondary-button"
                                onClick={() =>
                                    setSelectedOrder(null)
                                }
                            >
                                Back to Orders
                            </button>

                        </div>

                    </div>

                </div>
            </div>
        )
    }

    // =========================
    // ORDERS LIST
    // =========================

    return (
        <div className="orders-page">

            <div className="orders-container">

                <button
                    className="orders-back"
                    onClick={onBack}
                >
                    ← Back to Burger
                </button>

                <div className="orders-header">

                    <p className="orders-eyebrow">
                        BURGERLAB
                    </p>

                    <h1>
                        My Orders
                    </h1>

                    <p>
                        Your questionable burger decisions,
                        all in one place.
                    </p>

                </div>

                {orders.length === 0 ? (

                    <div className="orders-empty">

                        <div className="orders-empty-icon">
                            🍔
                        </div>

                        <h2>
                            No orders yet.
                        </h2>

                        <p>
                            Your burger history is looking
                            suspiciously empty.
                        </p>

                        <button
                            className="build-again-button"
                            onClick={onBack}
                        >
                            Build Your First Burger
                        </button>

                    </div>

                ) : (

                    <div className="orders-list">

                        {orders.map((order) => (

                            <div
                                className="order-card"
                                key={order.orderId}
                            >

                                {/* TOP */}

                                <div className="order-card-top">

                                    <div>

                                        <p className="order-card-label">
                                            ORDER
                                        </p>

                                        <h2>
                                            #{order.orderId}
                                        </h2>

                                    </div>

                                    <span className="paid-badge">
                                        ✓ PAID
                                    </span>

                                </div>

                                {/* MIDDLE */}

                                <div className="order-card-middle">

                                    <div>

                                        <strong>
                                            🍔{" "}
                                            {getBurgerCount(order) > 1
                                                ? `${getBurgerCount(
                                                      order
                                                  )} Custom Burgers`
                                                : "Custom Burger"}
                                        </strong>

                                        <span>
                                            {getIngredientCount(
                                                order
                                            )}{" "}
                                            ingredients
                                        </span>

                                        <span>
                                            {formatDate(
                                                order.createdAt
                                            )}
                                        </span>

                                    </div>

                                    <strong className="order-card-price">
                                        ₹
                                        {Number(
                                            order.amount || 0
                                        ).toFixed(2)}
                                    </strong>

                                </div>

                                {/* BOTTOM */}

                                <div className="order-card-bottom">

                                    <span>
                                        {order.paymentMethod ||
                                            "Razorpay"}
                                    </span>

                                    <div className="order-card-actions">

                                        <button
                                            onClick={() =>
                                                setSelectedOrder(
                                                    order
                                                )
                                            }
                                        >
                                            View Details →
                                        </button>

                                        {order.burgers?.length > 0 && (
                                            <button
                                                className="reorder-link"
                                                onClick={() =>
                                                    handleReorder(
                                                        order
                                                    )
                                                }
                                            >
                                                Reorder Burger
                                            </button>
                                        )}

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    )
}