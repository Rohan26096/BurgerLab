import { useState } from "react"

export const MyOrders = ({
    orders,
    onBack,
    onReorder,
}) => {
    const [selectedOrder, setSelectedOrder] = useState(null)

    if (selectedOrder) {
        return (
            <div className="orders-page">
                <div className="orders-container">

                    <button
                        className="orders-back"
                        onClick={() => setSelectedOrder(null)}
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
                            The kitchen has received your questionable
                            but respectable creation. 🍔
                        </p>

                        <div className="order-info">

                            <div className="order-info-row">
                                <span>Order ID</span>
                                <strong>{selectedOrder.orderId}</strong>
                            </div>

                            <div className="order-info-row">
                                <span>Payment ID</span>
                                <strong>{selectedOrder.paymentId}</strong>
                            </div>

                            <div className="order-info-row">
                                <span>Amount Paid</span>
                                <strong>
                                    ₹{Number(selectedOrder.amount).toFixed(2)}
                                </strong>
                            </div>

                            <div className="order-info-row">
                                <span>Payment Method</span>
                                <strong>
                                    {selectedOrder.paymentMethod || "Razorpay"}
                                </strong>
                            </div>

                            <div className="order-info-row">
                                <span>Delivering To</span>
                                <strong>
                                    {selectedOrder.customer?.name || "Customer"}
                                </strong>
                            </div>

                            <div className="order-info-row">
                                <span>Date</span>
                                <strong>
                                    {new Date(selectedOrder.createdAt).toLocaleString()}
                                </strong>
                            </div>

                        </div>

                        <div className="order-ingredients">

                            <h2>Your Burger</h2>

                            {selectedOrder.rows?.map((item, index) => (
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
                                        ₹{Number(item.price * (item.quantity || 1)).toFixed(2)}
                                    </strong>
                                </div>
                            ))}

                        </div>

                        <div className="order-detail-actions">

                            <button
                                className="build-again-button"
                                onClick={() => onReorder(selectedOrder)}
                            >
                                🔁 Reorder Burger
                            </button>

                            <button
                                className="order-detail-back-button"
                                onClick={onBack}
                            >
                                Build Another Burger
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        )
    }

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
                        Your questionable burger decisions, all in one place.
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
                            Your burger history is looking suspiciously empty.
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

                                <div className="order-card-middle">

                                    <div>
                                        <strong>
                                            Custom Burger
                                        </strong>

                                        <span>
                                            {order.rows?.length || 0} ingredients
                                        </span>

                                        <span>
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <strong className="order-card-price">
                                        ₹{Number(order.amount).toFixed(2)}
                                    </strong>

                                </div>

                                <div className="order-card-bottom">

                                    <span>
                                        {order.paymentMethod || "Razorpay"}
                                    </span>

                                    <div className="order-card-actions">

                                        <button
                                            onClick={() =>
                                                setSelectedOrder(order)
                                            }
                                        >
                                            View Details →
                                        </button>

                                        <button
                                            onClick={() =>
                                                onReorder(order)
                                            }
                                        >
                                            Reorder Burger
                                        </button>

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