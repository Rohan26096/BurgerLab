import { useState } from "react"

const Navbar = ({
    cartCount,
    onCartClick,
    onOrdersClick,
    onLoginClick,
    currentUser,
    onLogout,
}) => {

    const [showProfileMenu, setShowProfileMenu] =
        useState(false)


    const handleAboutClick = (e) => {

        e.preventDefault()

        const aboutSection =
            document.getElementById("about")

        if (aboutSection) {

            aboutSection.scrollIntoView({
                behavior: "smooth",
            })

        }

    }


    const handleOrdersClick = () => {

        setShowProfileMenu(false)

        onOrdersClick()

    }


    const handleLogout = () => {

        setShowProfileMenu(false)

        onLogout()

    }


    return (

        <header className="navbar">

            {/* Logo */}

            <a
                href="#"
                className="brand"
            >

                <span className="brand-icon">
                    🍔
                </span>

                <strong>
                    BurgerLab
                </strong>

            </a>


            {/* Navigation */}

            <nav className="navbar-links">

                <a
                    href="#"
                    className="active"
                >
                    Build Your Burger
                </a>


                <a
                    href="#about"
                    onClick={handleAboutClick}
                >
                    About
                </a>


                <button
                    type="button"
                    className="nav-orders"
                    onClick={onOrdersClick}
                >
                    My Orders
                </button>

            </nav>


            {/* Right side */}

            <div className="nav-actions">

                {/* Cart */}

                <button
                    type="button"
                    className="nav-cart"
                    onClick={onCartClick}
                    aria-label="Shopping cart"
                >

                    🛒

                    {cartCount > 0 && (

                        <span>
                            {cartCount}
                        </span>

                    )}

                </button>


                {/* Account */}

                {currentUser ? (

                    <div className="profile-wrapper">

                        <button
                            type="button"
                            className="profile-button"
                            onClick={() =>
                                setShowProfileMenu(
                                    (current) => !current
                                )
                            }
                        >

                            <span className="profile-name">
                                {currentUser.name}
                            </span>

                            <span className="profile-arrow">
                                ▾
                            </span>

                        </button>


                        {showProfileMenu && (

                            <div className="profile-menu">

                                <div className="profile-menu-header">

                                    <strong>
                                        {currentUser.name}
                                    </strong>

                                    <span>
                                        {currentUser.email}
                                    </span>

                                </div>


                                <div className="profile-menu-divider" />


                                <button
                                    type="button"
                                    onClick={handleOrdersClick}
                                >
                                    <span>📦</span>
                                    My Orders
                                </button>


                                <button
                                    type="button"
                                    onClick={handleLogout}
                                >
                                    <span>🚪</span>
                                    Logout
                                </button>

                            </div>

                        )}

                    </div>

                ) : (

                    <button
                        type="button"
                        className="login-button"
                        onClick={onLoginClick}
                    >
                        Login
                    </button>

                )}

            </div>

        </header>

    )

}


export default Navbar