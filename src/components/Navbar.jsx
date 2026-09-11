const Navbar = ({ cartCount }) => (
  <header className="navbar">
    <div className="brand"><span className="brand-icon">🍔</span><strong>BurgerLab</strong></div>
    <nav>
      <a href="#">Home</a>
      <a href="#" className="active">Build Your Burger</a>
      <a href="#">Menu</a>
      <a href="#">About</a>
    </nav>
    <div className="nav-actions">
      <button type="button" className="nav-cart">🛒<span>{cartCount}</span></button>
      <button type="button" className="login-button">Login</button>
    </div>
  </header>
);

export default Navbar;
