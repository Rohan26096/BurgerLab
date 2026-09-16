export const OrderSuccess = ({
    order,
    onBuildAnother,
}) => {

    return (

        <main className="success-page">

            <div className="success-card">

                <div className="success-icon">
                    ✓
                </div>

                <p className="success-label">
                    PAYMENT SUCCESSFUL
                </p>

                <h1>
                    Your burger is officially happening.
                </h1>

                <p className="success-message">
                    The kitchen has received your
                    questionable but respectable creation.
                    🍔
                </p>


                <div className="success-details">

                    <div>

                        <span>Amount Paid</span>

                        <strong>
                            ₹{Number(order.total).toFixed(2)}
                        </strong>

                    </div>


                    <div>

                        <span>Payment ID</span>

                        <strong>
                            {order.paymentId}
                        </strong>

                    </div>


                    <div>

                        <span>Razorpay Order</span>

                        <strong>
                            {order.orderId}
                        </strong>

                    </div>


                    <div>

                        <span>Delivering To</span>

                        <strong>
                            {order.customer?.name || "Customer"}
                        </strong>

                    </div>

                </div>


                <button
                    className="success-button"
                    onClick={onBuildAnother}
                >
                    Build Another Burger
                </button>

            </div>

        </main>
    )
}