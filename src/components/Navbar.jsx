const Navbar = ({
  cartCount,
  onCartClick,
  onOrdersClick,
  onLoginClick,
  currentUser,
  onLogout,
}) => {

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


        {/* Login / Logout */}

        {currentUser ? (

          <button
            type="button"
            className="login-button"
            onClick={onLogout}
          >
            Logout
          </button>

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