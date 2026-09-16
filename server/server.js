import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import Razorpay from "razorpay"
import crypto from "crypto"

dotenv.config()

const app = express()

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
    ],
}))

app.use(express.json())

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})


// Test route
app.get("/api/health", (req, res) => {
    res.json({
        message: "BurgerLab server is running 🍔"
    })
})


// CREATE RAZORPAY ORDER
app.post("/api/payment/create-order", async (req, res) => {
    try {
        const { amount } = req.body

        if (!amount || amount <= 0) {
            return res.status(400).json({
                message: "Invalid amount",
            })
        }

        const options = {
            amount: Math.round(amount * 100),
            currency: "INR",
            receipt: `burger_${Date.now()}`,
        }

        const order = await razorpay.orders.create(options)

        res.json(order)

    } catch (error) {
        console.error("Order creation error:", error)

        res.status(500).json({
            message: "Could not create Razorpay order",
        })
    }
})


// VERIFY PAYMENT
app.post("/api/payment/verify", (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                verified: false,
                message: "Missing payment information",
            })
        }

        const body =
            razorpay_order_id + "|" + razorpay_payment_id

        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(body)
            .digest("hex")

        const isAuthentic =
            expectedSignature === razorpay_signature

        if (!isAuthentic) {
            return res.status(400).json({
                verified: false,
                message: "Payment verification failed",
            })
        }

        res.json({
            verified: true,
            message: "Payment verified successfully",
        })

    } catch (error) {
        console.error("Verification error:", error)

        res.status(500).json({
            verified: false,
            message: "Payment verification failed",
        })
    }
})


const PORT = process.env.PORT || 5001

const server = app.listen(PORT, () => {
    console.log(`🍔 BurgerLab server running on port ${PORT}`)
})

server.on("error", (error) => {
    console.error("❌ Server error:", error)
})

process.stdin.resume()