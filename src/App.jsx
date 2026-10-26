import { useState } from "react"

import Navbar from "./components/Navbar"
import CartDrawer from "./components/CartDrawer"
import BuildBurger from "./pages/BuildBurger"
import { Checkout } from "./pages/Checkout"
import { OrderSuccess } from "./pages/OrderSuccess"
import { MyOrders } from "./pages/MyOrders"
import LoginModal from "./components/LoginModal"


function App() {

  const [cartItems, setCartItems] = useState([])

  const [isCartOpen, setIsCartOpen] = useState(false)

  const [showCheckout, setShowCheckout] = useState(false)

  const [showOrders, setShowOrders] = useState(false)

  const [successOrder, setSuccessOrder] = useState(null)

  const [reorderBurger, setReorderBurger] = useState(null)

  const [showLogin, setShowLogin] = useState(false)

  const [currentUser, setCurrentUser] = useState(() => {

    try {

      const savedUser =
        localStorage.getItem(
          "burgerlab_current_user"
        )

      return savedUser
        ? JSON.parse(savedUser)
        : null

    } catch (error) {

      console.error(
        "Could not load current user:",
        error
      )

      return null
    }

  })

  // Load saved orders
  const [orders, setOrders] = useState(() => {

    try {

      const savedOrders =
        localStorage.getItem("burgerlab_orders")

      return savedOrders
        ? JSON.parse(savedOrders)
        : []

    } catch (error) {

      console.error(
        "Could not load orders:",
        error
      )

      return []

    }

  })
  const userOrders = currentUser
    ? orders.filter(
      (order) =>
        order.userId === currentUser.id
    )
    : []


  // ADD TO CART
  const addToCart = (burgerItem) => {

    setCartItems((currentItems) => {

      const existingItemIndex =
        currentItems.findIndex((item) =>
          JSON.stringify(item.burger) ===
          JSON.stringify(burgerItem.burger)
        )


      // Same burger already exists
      if (existingItemIndex !== -1) {

        return currentItems.map((item, index) => {

          if (index !== existingItemIndex) {
            return item
          }

          return {
            ...item,
            quantity: (item.quantity || 1) + 1,
          }

        })

      }


      // New burger
      return [
        ...currentItems,
        {
          ...burgerItem,
          id: Date.now() + Math.random(),
          quantity: 1,
        },
      ]

    })

  }


  // INCREASE CART QUANTITY
  const increaseCartQuantity = (id) => {

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
            ...item,
            quantity: (item.quantity || 1) + 1,
          }
          : item
      )
    )

  }


  // DECREASE CART QUANTITY
  const decreaseCartQuantity = (id) => {

    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? {
              ...item,
              quantity: Math.max(
                1,
                (item.quantity || 1) - 1
              ),
            }
            : item
        )
    )

  }


  // REMOVE ITEM COMPLETELY
  const removeFromCart = (id) => {

    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== id
      )
    )

  }


  // CLEAR CART
  const clearCart = () => {

    setCartItems([])

  }


  // OPEN CHECKOUT
  const openCheckout = () => {

    if (!currentUser) {

      setIsCartOpen(false)
      setShowLogin(true)

      return
    }

    setIsCartOpen(false)
    setShowCheckout(true)

  }


  // BACK TO CART
  const backToCart = () => {

    setShowCheckout(false)
    setIsCartOpen(true)

  }


  // OPEN ORDERS
  const openOrders = () => {

    if (!currentUser) {

      setShowLogin(true)

      return
    }

    setIsCartOpen(false)
    setShowCheckout(false)
    setShowOrders(true)

  }


  // BACK TO BUILDER
  const backToBuilder = () => {

      setShowOrders(false)
      setShowCheckout(false)
      setSuccessOrder(null)
      setReorderBurger(null)

  }


  // PAYMENT SUCCESS
  const handlePaymentSuccess = (paymentData) => {

    const newOrder = {

      ...paymentData,

      // Link order to logged-in user
      userId: currentUser?.id || null,

      customer: {
        ...paymentData.customer,
        name:
          paymentData.customer?.name ||
          currentUser?.name ||
          "Customer",
        email:
          paymentData.customer?.email ||
          currentUser?.email ||
          "",
      },

      amount: paymentData.total,

      rows: cartItems.flatMap((item) =>
        item.rows.map((row) => ({
          ...row,

          quantity:
            (row.quantity || 1) *
            (item.quantity || 1),

          price:
            row.price *
            (item.quantity || 1),
        }))
      ),

      burgers: cartItems.map((item) => ({
        ...item.burger,

        quantity:
          item.quantity || 1,

        toppings: {
          ...item.burger.toppings,
        },
      })),

      orderId:
        paymentData.orderId ||
        `BL${Date.now().toString().slice(-8)}`,

      createdAt:
        paymentData.createdAt ||
        new Date().toISOString(),

      paymentMethod: "Razorpay",

    }


    const updatedOrders = [
      newOrder,
      ...orders,
    ]


    setOrders(updatedOrders)

    localStorage.setItem(
      "burgerlab_orders",
      JSON.stringify(updatedOrders)
    )


    setSuccessOrder(newOrder)

    setCartItems([])

    setShowCheckout(false)

  }


  // REORDER
  const handleReorder = (order) => {

    if (!order?.burgers?.[0]) {

      alert("This order cannot be reordered.")

      return
    }


    const burgerToReorder = order.burgers[0]


    setReorderBurger({
      ...burgerToReorder,

      toppings: {
        ...burgerToReorder.toppings,
      },

    })


    setShowOrders(false)
    setShowCheckout(false)
    setSuccessOrder(null)
    setIsCartOpen(false)

  }


  // TOTAL NUMBER OF BURGERS
  const cartCount = cartItems.reduce(
    (sum, item) =>
      sum + (item.quantity || 1),
    0
  )

  const handleLogin = (user) => {

    setCurrentUser(user)

    setShowLogin(false)

    setShowOrders(false)

    setShowCheckout(false)

  }
  const handleLogout = () => {

    localStorage.removeItem(
      "burgerlab_current_user"
    )

    setCurrentUser(null)

    setShowOrders(false)
    setShowCheckout(false)
    setSuccessOrder(null)
    setReorderBurger(null)
    setIsCartOpen(false)

  }

  return (

    <>

      <Navbar
        cartCount={cartCount}
        onCartClick={() =>
          setIsCartOpen(true)
        }
        onOrdersClick={openOrders}
        onLoginClick={() =>
          setShowLogin(true)
        }
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      {showLogin && (

        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
        />

      )}


      {showOrders ? (

        <MyOrders
          orders={userOrders}
          onBack={backToBuilder}
          onReorder={handleReorder}
        />

      ) : showCheckout ? (

        <Checkout
          cartItems={cartItems}
          onBack={backToCart}
          onPaymentSuccess={handlePaymentSuccess}
        />

      ) : successOrder ? (

        <OrderSuccess
          order={successOrder}
          onBuildAnother={backToBuilder}
        />

      ) : (

        <BuildBurger
          onAddToCart={addToCart}
          reorderBurger={reorderBurger}
        />

      )}


      {isCartOpen && (

        <CartDrawer
          isOpen={true}
          cartItems={cartItems}
          onClose={() =>
            setIsCartOpen(false)
          }
          onRemove={removeFromCart}
          onClear={clearCart}
          onCheckout={openCheckout}
          onIncrease={increaseCartQuantity}
          onDecrease={decreaseCartQuantity}
        />

      )}

    </>

  )
}


export default App