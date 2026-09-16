import { useEffect, useState } from "react"

export const Checkout = ({
    cartItems,
    onBack,
    onPaymentSuccess,
}) => {

    const [customer, setCustomer] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        pinCode: "",
    })

    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState("")


    const total = cartItems.reduce(
        (sum, item) =>
            sum +
            item.total *
            (item.quantity || 1),
        0
    )

    useEffect(() => {

        const existingScript = document.querySelector(
            'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
        )

        if (existingScript) return

        const script = document.createElement("script")

        script.src =
            "https://checkout.razorpay.com/v1/checkout.js"

        script.async = true

        document.body.appendChild(script)

    }, [])


    const handleChange = (e) => {

        const { name, value } = e.target

        setCustomer(prev => ({
            ...prev,
            [name]: value,
        }))
    }


    const validateForm = () => {

        if (
            !customer.name ||
            !customer.phone ||
            !customer.email ||
            !customer.address ||
            !customer.city ||
            !customer.pinCode
        ) {
            setError("Please fill in all delivery details.")
            return false
        }

        setError("")
        return true
    }


    const handlePayment = async () => {

        if (!validateForm()) return

        if (!window.Razorpay) {
            setError(
                "Payment system could not load. Please refresh and try again."
            )
            return
        }

        try {

            setIsProcessing(true)
            setError("")


            // 1. CREATE ORDER ON BACKEND

            const orderResponse = await fetch(
                "http://localhost:5001/api/payment/create-order",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        amount: total,
                    }),
                }
            )


            if (!orderResponse.ok) {
                throw new Error("Could not create payment order")
            }


            const order = await orderResponse.json()


            // 2. RAZORPAY CHECKOUT OPTIONS

            const options = {

                key: import.meta.env.VITE_RAZORPAY_KEY_ID,

                amount: order.amount,

                currency: order.currency,

                name: "BurgerLab",

                description: `${cartItems.length} Custom Burger${cartItems.length > 1 ? "s" : ""
                    }`,

                order_id: order.id,


                // 3. RUNS AFTER PAYMENT

                handler: async function (response) {

                    try {

                        const verifyResponse = await fetch(
                            "http://localhost:5001/api/payment/verify",
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json",
                                },

                                body: JSON.stringify({
                                    razorpay_order_id:
                                        response.razorpay_order_id,

                                    razorpay_payment_id:
                                        response.razorpay_payment_id,

                                    razorpay_signature:
                                        response.razorpay_signature,
                                }),
                            }
                        )


                        const verification =
                            await verifyResponse.json()


                        if (!verification.verified) {

                            setError(
                                "Payment verification failed."
                            )

                            setIsProcessing(false)

                            return
                        }


                        // PAYMENT VERIFIED 🎉

                        onPaymentSuccess({
                            paymentId:
                                response.razorpay_payment_id,

                            orderId:
                                response.razorpay_order_id,

                            total,

                            customer,
                        })


                    } catch (error) {

                        console.error(error)

                        setError(
                            "Something went wrong while verifying payment."
                        )

                        setIsProcessing(false)
                    }
                },


                prefill: {

                    name: customer.name,

                    email: customer.email,

                    contact: customer.phone,
                },


                notes: {

                    address: customer.address,

                    city: customer.city,

                    pinCode: customer.pinCode,
                },


                theme: {
                    color: "#111111",
                },


                modal: {

                    ondismiss: function () {
                        setIsProcessing(false)
                    },
                },
            }


            // 4. OPEN RAZORPAY

            const razorpay = new window.Razorpay(options)

            razorpay.on(
                "payment.failed",
                function (response) {

                    console.error(
                        response.error
                    )

                    setError(
                        response.error.description ||
                        "Payment failed. Please try again."
                    )

                    setIsProcessing(false)
                }
            )


            razorpay.open()


        } catch (error) {

            console.error(error)

            setError(
                "Could not start payment. Make sure the BurgerLab server is running."
            )

            setIsProcessing(false)
        }
    }


    return (

        <main className="checkout-page">

            <div className="checkout-container">

                <button
                    className="checkout-back"
                    onClick={onBack}
                >
                    ← Back to Cart
                </button>


                <div className="checkout-heading">

                    <h1>Checkout</h1>

                    <p>
                        One step closer to eating your
                        questionable burger creation.
                    </p>

                </div>


                <div className="checkout-layout">


                    {/* DELIVERY DETAILS */}

                    <section className="checkout-card">

                        <h2>Delivery Details</h2>


                        <div className="checkout-form">


                            <label>

                                Full Name

                                <input
                                    type="text"
                                    name="name"
                                    value={customer.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                />

                            </label>


                            <label>

                                Phone

                                <input
                                    type="tel"
                                    name="phone"
                                    value={customer.phone}
                                    onChange={handleChange}
                                    placeholder="9876543210"
                                />

                            </label>


                            <label>

                                Email

                                <input
                                    type="email"
                                    name="email"
                                    value={customer.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                />

                            </label>


                            <label className="checkout-full">

                                Address

                                <textarea
                                    name="address"
                                    value={customer.address}
                                    onChange={handleChange}
                                    placeholder="House number, street, area"
                                    rows="4"
                                />

                            </label>


                            <label>

                                City

                                <input
                                    type="text"
                                    name="city"
                                    value={customer.city}
                                    onChange={handleChange}
                                    placeholder="Bengaluru"
                                />

                            </label>


                            <label>

                                PIN Code

                                <input
                                    type="text"
                                    name="pinCode"
                                    value={customer.pinCode}
                                    onChange={handleChange}
                                    placeholder="560001"
                                />

                            </label>

                        </div>

                    </section>


                    {/* ORDER SUMMARY */}

                    <aside className="checkout-card checkout-summary">

                        <h2>Your Order</h2>


                        <div className="checkout-items">

                            {cartItems.map(
                                (item, index) => (

                                    <div
                                        className="checkout-item"
                                        key={item.id}
                                    >

                                        <div>

                                            <strong>
                                                Custom Burger {index + 1}
                                                {item.quantity > 1 &&
                                                    ` × ${item.quantity}`}
                                            </strong>

                                            <span>
                                                {item.rows.length} ingredients
                                            </span>

                                        </div>


                                        <strong>
                                            ₹{(
                                                item.total *
                                                (item.quantity || 1)
                                            ).toFixed(2)}
                                        </strong>

                                    </div>
                                )
                            )}

                        </div>


                        <div className="checkout-price-row">

                            <span>Subtotal</span>

                            <span>
                                ₹{total.toFixed(2)}
                            </span>

                        </div>


                        <div className="checkout-price-row">

                            <span>Delivery</span>

                            <span>FREE</span>

                        </div>


                        <div className="checkout-total">

                            <span>Total</span>

                            <strong>
                                ₹{total.toFixed(2)}
                            </strong>

                        </div>


                        {error && (

                            <p className="payment-error">
                                {error}
                            </p>

                        )}


                        <button
                            className="checkout-pay-button"
                            onClick={handlePayment}
                            disabled={isProcessing}
                        >

                            {isProcessing
                                ? "Processing..."
                                : `Pay ₹${total.toFixed(2)}`
                            }

                        </button>


                        <p className="checkout-secure">
                            🔒 Secure payment powered by Razorpay
                        </p>

                    </aside>

                </div>

            </div>

        </main>
    )
}