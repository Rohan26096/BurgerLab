import { useState } from "react"

const LoginModal = ({
    onClose,
    onLogin,
}) => {

    const [isSignup, setIsSignup] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const [error, setError] = useState("")


    const handleChange = (e) => {

        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        setError("")
    }


    const handleSubmit = (e) => {

        e.preventDefault()

        if (!formData.email || !formData.password) {
            setError("Please fill in all required fields.")
            return
        }


        if (isSignup && !formData.name) {
            setError("Please enter your name.")
            return
        }


        const users = JSON.parse(
            localStorage.getItem("burgerlab_users") || "[]"
        )


        if (isSignup) {

            const existingUser = users.find(
                (user) =>
                    user.email.toLowerCase() ===
                    formData.email.toLowerCase()
            )


            if (existingUser) {
                setError(
                    "An account with this email already exists."
                )
                return
            }


            const newUser = {
                id: Date.now(),
                name: formData.name,
                email: formData.email,
                password: formData.password,
            }


            localStorage.setItem(
                "burgerlab_users",
                JSON.stringify([
                    ...users,
                    newUser,
                ])
            )


            localStorage.setItem(
                "burgerlab_current_user",
                JSON.stringify(newUser)
            )


            onLogin(newUser)

        } else {

            const user = users.find(
                (user) =>
                    user.email.toLowerCase() ===
                        formData.email.toLowerCase() &&
                    user.password ===
                        formData.password
            )


            if (!user) {
                setError(
                    "Invalid email or password."
                )
                return
            }


            localStorage.setItem(
                "burgerlab_current_user",
                JSON.stringify(user)
            )


            onLogin(user)
        }
    }


    return (

        <div
            className="login-overlay"
            onClick={onClose}
        >

            <div
                className="login-modal"
                onClick={(e) =>
                    e.stopPropagation()
                }
            >

                <button
                    type="button"
                    className="login-close"
                    onClick={onClose}
                >
                    ×
                </button>


                <div className="login-icon">
                    🍔
                </div>


                <p className="login-eyebrow">
                    BURGERLAB
                </p>


                <h2>
                    {isSignup
                        ? "Create your account"
                        : "Welcome back"}
                </h2>


                <p className="login-subtitle">
                    {isSignup
                        ? "Save your burgers and order history."
                        : "Ready for another questionable burger?"}
                </p>


                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >

                    {isSignup && (

                        <label>

                            Name

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your name"
                            />

                        </label>

                    )}


                    <label>

                        Email

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                        />

                    </label>


                    <label>

                        Password

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                        />

                    </label>


                    {error && (

                        <p className="login-error">
                            {error}
                        </p>

                    )}


                    <button
                        type="submit"
                        className="login-submit"
                    >
                        {isSignup
                            ? "Create Account"
                            : "Login"}
                    </button>

                </form>


                <div className="login-switch">

                    <span>
                        {isSignup
                            ? "Already have an account?"
                            : "Don't have an account?"}
                    </span>

                    <button
                        type="button"
                        onClick={() => {
                            setIsSignup(!isSignup)
                            setError("")
                        }}
                    >
                        {isSignup
                            ? "Login"
                            : "Sign Up"}
                    </button>

                </div>

            </div>

        </div>
    )
}


export default LoginModal