import { useEffect, useState } from "react"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001"
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
    const [razorpayLoaded, setRazorpayLoaded] = useState(
        !!window.Razorpay
    )

    // =========================
    // TOTAL
    // =========================

    const total = cartItems.reduce(
        (sum, item) =>
            sum +
            item.total * (item.quantity || 1),
        0
    )


    // =========================
    // LOAD RAZORPAY
    // =========================

    useEffect(() => {
        if (window.Razorpay) {
            setRazorpayLoaded(true)
            return
        }

        const existingScript = document.querySelector(
            'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
        )

        if (existingScript) {
            existingScript.addEventListener(
                "load",
                () => setRazorpayLoaded(true)
            )

            return
        }

        const script = document.createElement("script")

        script.src =
            "https://checkout.razorpay.com/v1/checkout.js"

        script.async = true

        script.onload = () => {
            setRazorpayLoaded(true)
        }

        script.onerror = () => {
            setError(
                "Payment system could not load. Please refresh and try again."
            )
        }

        document.body.appendChild(script)

        return () => {
            script.onload = null
            script.onerror = null
        }
    }, [])


    // =========================
    // INPUT CHANGE
    // =========================

    const handleChange = (e) => {
        const { name, value } = e.target

        setCustomer((prev) => ({
            ...prev,
            [name]: value,
        }))

        // Remove error as soon as user starts correcting form
        if (error) {
            setError("")
        }
    }


    // =========================
    // FORM VALIDATION
    // =========================

    const validateForm = () => {
        const {
            name,
            phone,
            email,
            address,
            city,
            pinCode,
        } = customer

        if (
            !name.trim() ||
            !phone.trim() ||
            !email.trim() ||
            !address.trim() ||
            !city.trim() ||
            !pinCode.trim()
        ) {
            setError(
                "Please fill in all delivery details."
            )

            return false
        }

        const phoneRegex = /^[6-9]\d{9}$/

        if (!phoneRegex.test(phone.trim())) {
            setError(
                "Please enter a valid 10-digit Indian phone number."
            )

            return false
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(email.trim())) {
            setError(
                "Please enter a valid email address."
            )

            return false
        }

        const pinRegex = /^\d{6}$/

        if (!pinRegex.test(pinCode.trim())) {
            setError(
                "Please enter a valid 6-digit PIN code."
            )

            return false
        }

        setError("")

        return true
    }


    // =========================
    // PAYMENT
    // =========================

    const handlePayment = async () => {
        if (isProcessing) return

        if (!validateForm()) return

        if (!razorpayLoaded || !window.Razorpay) {
            setError(
                "Payment system is still loading. Please try again in a moment."
            )

            return
        }

        try {
            setIsProcessing(true)
            setError("")


            // =========================
            // 1. CREATE ORDER
            // =========================

            const orderResponse = await fetch(
                `${API_URL}/api/payment/create-order`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        amount: total,
                    }),
                }
            )


            if (!orderResponse.ok) {
                throw new Error(
                    "Could not create payment order"
                )
            }


            const order =
                await orderResponse.json()


            // =========================
            // 2. RAZORPAY OPTIONS
            // =========================

            const options = {
                key:
                    import.meta.env
                        .VITE_RAZORPAY_KEY_ID,

                amount: order.amount,

                currency: order.currency,

                name: "BurgerLab",

                description:
                    `${cartItems.length} Custom Burger${cartItems.length > 1
                        ? "s"
                        : ""
                    }`,

                order_id: order.id,


                // =========================
                // PAYMENT SUCCESS
                // =========================

                handler: async function (
                    response
                ) {
                    try {
                        const verifyResponse =
                            await fetch(
                                `${API_URL}/api/payment/verify`,
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


                        if (
                            !verifyResponse.ok ||
                            !verification.verified
                        ) {
                            setError(
                                "Payment verification failed."
                            )

                            setIsProcessing(false)

                            return
                        }


                        // =========================
                        // PAYMENT VERIFIED
                        // =========================

                        onPaymentSuccess({
                            paymentId:
                                response.razorpay_payment_id,

                            orderId:
                                response.razorpay_order_id,

                            total,

                            customer: {
                                ...customer,
                                name: customer.name.trim(),
                                phone:
                                    customer.phone.trim(),
                                email:
                                    customer.email.trim(),
                                address:
                                    customer.address.trim(),
                                city:
                                    customer.city.trim(),
                                pinCode:
                                    customer.pinCode.trim(),
                            },
                        })


                    } catch (error) {
                        console.error(error)

                        setError(
                            "Something went wrong while verifying payment."
                        )

                        setIsProcessing(false)
                    }
                },


                // =========================
                // PREFILL
                // =========================

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


                // =========================
                // CLOSE CHECKOUT
                // =========================

                modal: {
                    ondismiss: function () {
                        setIsProcessing(false)
                    },
                },
            }


            // =========================
            // 3. OPEN RAZORPAY
            // =========================

            const razorpay =
                new window.Razorpay(options)


            razorpay.on(
                "payment.failed",
                function (response) {
                    console.error(
                        response.error
                    )

                    setError(
                        response.error
                            ?.description ||
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


    // =========================
    // RENDER
    // =========================

    return (
        <main className="checkout-page">

            <div className="checkout-container">

                {/* BACK */}

                <button
                    className="checkout-back"
                    onClick={onBack}
                    disabled={isProcessing}
                >
                    ← Back to Cart
                </button>


                {/* HEADER */}

                <div className="checkout-heading">

                    <p className="checkout-eyebrow">
                        BURGERLAB
                    </p>

                    <h1>
                        Checkout
                    </h1>

                    <p>
                        One step closer to eating your
                        questionable burger creation.
                    </p>

                </div>


                <div className="checkout-layout">

                    {/* =========================
                        DELIVERY DETAILS
                    ========================= */}

                    <section className="checkout-card">

                        <h2>
                            Delivery Details
                        </h2>

                        <p className="checkout-card-subtitle">
                            Where should we send your burger?
                        </p>


                        <div className="checkout-form">

                            {/* NAME */}

                            <label>
                                Full Name

                                <input
                                    type="text"
                                    name="name"
                                    value={customer.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    autoComplete="name"
                                    disabled={isProcessing}
                                />
                            </label>


                            {/* PHONE */}

                            <label>
                                Phone

                                <input
                                    type="tel"
                                    name="phone"
                                    value={customer.phone}
                                    onChange={handleChange}
                                    placeholder="9876543210"
                                    inputMode="numeric"
                                    maxLength="10"
                                    autoComplete="tel"
                                    disabled={isProcessing}
                                />
                            </label>


                            {/* EMAIL */}

                            <label>
                                Email

                                <input
                                    type="email"
                                    name="email"
                                    value={customer.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    disabled={isProcessing}
                                />
                            </label>


                            {/* ADDRESS */}

                            <label className="checkout-full">
                                Address

                                <textarea
                                    name="address"
                                    value={customer.address}
                                    onChange={handleChange}
                                    placeholder="House number, street, area"
                                    rows="4"
                                    autoComplete="street-address"
                                    disabled={isProcessing}
                                />
                            </label>


                            {/* CITY */}

                            <label>
                                City

                                <input
                                    type="text"
                                    name="city"
                                    value={customer.city}
                                    onChange={handleChange}
                                    placeholder="Bengaluru"
                                    autoComplete="address-level2"
                                    disabled={isProcessing}
                                />
                            </label>


                            {/* PIN */}

                            <label>
                                PIN Code

                                <input
                                    type="text"
                                    name="pinCode"
                                    value={customer.pinCode}
                                    onChange={handleChange}
                                    placeholder="560001"
                                    inputMode="numeric"
                                    maxLength="6"
                                    autoComplete="postal-code"
                                    disabled={isProcessing}
                                />
                            </label>

                        </div>

                    </section>


                    {/* =========================
                        ORDER SUMMARY
                    ========================= */}

                    <aside className="checkout-card checkout-summary">

                        <h2>
                            Your Order
                        </h2>


                        <div className="checkout-items">

                            {cartItems.map(
                                (item, index) => (

                                    <div
                                        className="checkout-item"
                                        key={item.id}
                                    >

                                        <div>

                                            <strong>
                                                🍔 Custom Burger{" "}
                                                {index + 1}

                                                {item.quantity >
                                                    1 &&
                                                    ` × ${item.quantity}`}
                                            </strong>

                                            <span>
                                                {item.rows.length}{" "}
                                                ingredients
                                            </span>

                                        </div>


                                        <strong>
                                            ₹
                                            {(
                                                item.total *
                                                (item.quantity ||
                                                    1)
                                            ).toFixed(2)}
                                        </strong>

                                    </div>
                                )
                            )}

                        </div>


                        {/* SUBTOTAL */}

                        <div className="checkout-price-row">

                            <span>
                                Subtotal
                            </span>

                            <span>
                                ₹{total.toFixed(2)}
                            </span>

                        </div>


                        {/* DELIVERY */}

                        <div className="checkout-price-row">

                            <span>
                                Delivery
                            </span>

                            <span>
                                FREE
                            </span>

                        </div>


                        {/* TOTAL */}

                        <div className="checkout-total">

                            <span>
                                Total
                            </span>

                            <strong>
                                ₹{total.toFixed(2)}
                            </strong>

                        </div>


                        {/* ERROR */}

                        {error && (
                            <p className="payment-error">
                                ⚠️ {error}
                            </p>
                        )}


                        {/* PAY BUTTON */}

                        <button
                            className="checkout-pay-button"
                            onClick={handlePayment}
                            disabled={
                                isProcessing ||
                                !razorpayLoaded
                            }
                        >

                            {isProcessing
                                ? "Processing Payment..."
                                : !razorpayLoaded
                                    ? "Loading Payment..."
                                    : `Pay ₹${total.toFixed(2)}`}

                        </button>


                        {/* SECURITY */}

                        <p className="checkout-secure">
                            🔒 Secure payment powered by Razorpay
                        </p>

                    </aside>

                </div>

            </div>

        </main>
    )
}