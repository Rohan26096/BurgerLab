import { useEffect, useState } from "react"

import BurgerControls from "../components/BurgerBuilder/BurgerControls"
import BurgerPreview from "../components/BurgerBuilder/BurgerPreview"
import OrderSummary from "../components/BurgerBuilder/OrderSummary"


const initialBurger = {
    bunIndex: 0,
    bottomBunIndex: 0,

    pattyIndex: 1,
    pattyQuantity: 1,

    cheeseIndex: 0,
    cheeseQuantity: 1,

    onionTypeIndex: 0,

    sauceIndex: 0,
    sauceQuantity: 1,

    toppings: {
        Lettuce: 1,
        Tomato: 1,
        Onion: 1,
        Pickles: 0,
        Jalapeño: 0,
        Bacon: 0,
    },
}


const BuildBurger = ({
    onAddToCart,
    reorderBurger,
}) => {

    const [burger, setBurger] =
        useState(
            reorderBurger || initialBurger
        )

    const [savedBurgers, setSavedBurgers] =
        useState(() => {
            try {
                const saved =
                    localStorage.getItem(
                        "burgerlab_saved_burgers"
                    )

                return saved
                    ? JSON.parse(saved)
                    : []
            } catch {
                return []
            }
        })

    const [showSaved, setShowSaved] =
        useState(false)

    const [showSaveName, setShowSaveName] =
        useState(false)

    const [burgerName, setBurgerName] =
        useState("")


    // =========================
    // REORDER BURGER
    // =========================

    useEffect(() => {

        if (reorderBurger) {

            setBurger({
                ...reorderBurger,

                toppings: {
                    ...reorderBurger.toppings,
                },
            })

        }

    }, [reorderBurger])


    // =========================
    // SAVE TO LOCAL STORAGE
    // =========================

    useEffect(() => {

        localStorage.setItem(
            "burgerlab_saved_burgers",
            JSON.stringify(savedBurgers)
        )

    }, [savedBurgers])


    // =========================
    // RESET
    // =========================

    const clearBurger = () => {

        setBurger({
            ...initialBurger,

            toppings: {
                ...initialBurger.toppings,
            },
        })

    }


    // =========================
    // OPEN SAVE BOX
    // =========================

    const openSaveBurger = () => {

        setBurgerName("")

        setShowSaveName(true)

    }


    // =========================
    // SAVE BURGER
    // =========================

    const saveBurger = () => {

        const name =
            burgerName.trim() ||
            `My Burger ${savedBurgers.length + 1}`


        const newBurger = {

            id: Date.now(),

            name,

            burger: {
                ...burger,

                toppings: {
                    ...burger.toppings,
                },
            },

            savedAt:
                new Date().toISOString(),

        }


        setSavedBurgers(prev => [
            newBurger,
            ...prev,
        ])


        setBurgerName("")

        setShowSaveName(false)

        setShowSaved(true)

    }


    // =========================
    // LOAD BURGER
    // =========================

    const loadBurger = (savedBurger) => {

        setBurger({

            ...savedBurger.burger,

            toppings: {
                ...savedBurger.burger.toppings,
            },

        })

        setShowSaved(false)

    }


    // =========================
    // DELETE BURGER
    // =========================

    const deleteBurger = (id) => {

        setSavedBurgers(prev =>
            prev.filter(
                burger => burger.id !== id
            )
        )

    }


    return (

        <main className="page-shell">


            {/* =========================
                SAVED BURGER BAR
            ========================= */}

            <div className="saved-burger-bar">

                <div>

                    <strong>
                        ❤️ Saved Burgers
                    </strong>

                    <span>
                        {savedBurgers.length === 0
                            ? "Save your favorite creations"
                            : `${savedBurgers.length} saved burger${
                                  savedBurgers.length > 1
                                      ? "s"
                                      : ""
                              }`}
                    </span>

                </div>


                <button
                    type="button"
                    className="saved-burgers-button"
                    onClick={() =>
                        setShowSaved(prev => !prev)
                    }
                >
                    {showSaved
                        ? "Hide Saved"
                        : "View Saved"}
                </button>

            </div>


            {/* =========================
                SAVE NAME MODAL
            ========================= */}

            {showSaveName && (

                <div className="save-burger-overlay">

                    <div className="save-burger-modal">

                        <div className="save-burger-icon">
                            ❤️
                        </div>

                        <h2>
                            Save Your Burger
                        </h2>

                        <p>
                            Give your creation a name.
                        </p>


                        <input
                            type="text"
                            value={burgerName}
                            onChange={(e) =>
                                setBurgerName(
                                    e.target.value
                                )
                            }
                            placeholder="e.g. Chicken Cheese Bomb"
                            maxLength="30"
                            autoFocus
                            onKeyDown={(e) => {
                                if (
                                    e.key === "Enter"
                                ) {
                                    saveBurger()
                                }

                                if (
                                    e.key === "Escape"
                                ) {
                                    setShowSaveName(
                                        false
                                    )
                                }
                            }}
                        />


                        <div className="save-burger-actions">

                            <button
                                type="button"
                                className="save-cancel-button"
                                onClick={() =>
                                    setShowSaveName(
                                        false
                                    )
                                }
                            >
                                Cancel
                            </button>


                            <button
                                type="button"
                                className="save-confirm-button"
                                onClick={saveBurger}
                            >
                                ❤️ Save Burger
                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* =========================
                SAVED BURGERS
            ========================= */}

            {showSaved && (

                <section className="saved-burgers-section">

                    <div className="saved-burgers-header">

                        <div>

                            <span className="about-label">
                                YOUR COLLECTION
                            </span>

                            <h2>
                                Saved Burgers
                            </h2>

                        </div>


                        <button
                            type="button"
                            className="saved-close-button"
                            onClick={() =>
                                setShowSaved(false)
                            }
                        >
                            ✕
                        </button>

                    </div>


                    {savedBurgers.length === 0 ? (

                        <div className="saved-empty">

                            <div>
                                🍔
                            </div>

                            <h3>
                                No saved burgers yet.
                            </h3>

                            <p>
                                Build something delicious
                                and save it here.
                            </p>

                        </div>

                    ) : (

                        <div className="saved-burgers-grid">

                            {savedBurgers.map(
                                (savedBurger) => (

                                    <div
                                        className="saved-burger-card"
                                        key={
                                            savedBurger.id
                                        }
                                    >

                                        <div className="saved-card-icon">
                                            🍔
                                        </div>


                                        <div className="saved-card-content">

                                            <strong>
                                                {
                                                    savedBurger.name
                                                }
                                            </strong>

                                            <span>
                                                Saved{" "}
                                                {new Date(
                                                    savedBurger.savedAt
                                                ).toLocaleDateString(
                                                    "en-IN"
                                                )}
                                            </span>

                                        </div>


                                        <div className="saved-card-actions">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    loadBurger(
                                                        savedBurger
                                                    )
                                                }
                                            >
                                                Load
                                            </button>


                                            <button
                                                type="button"
                                                className="saved-delete-button"
                                                onClick={() =>
                                                    deleteBurger(
                                                        savedBurger.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </section>

            )}


            {/* =========================
                BURGER BUILDER
            ========================= */}

            <div className="builder-grid">

                <BurgerControls
                    burger={burger}
                    setBurger={setBurger}
                />


                <BurgerPreview
                    burger={burger}
                />


                <OrderSummary
                    burger={burger}
                    onAddToCart={onAddToCart}
                    onClear={clearBurger}
                />

            </div>


            {/* =========================
                SAVE BURGER BUTTON
            ========================= */}

            <div className="save-current-burger">

                <div>

                    <strong>
                        ❤️ Love this burger?
                    </strong>

                    <span>
                        Save the exact recipe and
                        build it again anytime.
                    </span>

                </div>


                <button
                    type="button"
                    onClick={openSaveBurger}
                >
                    ❤️ Save Burger
                </button>

            </div>


            {/* =========================
                ABOUT BURGERLAB
            ========================= */}

            <section
                id="about"
                className="about-section"
            >

                <div className="about-content">

                    <div className="about-burger">
                        🍔
                    </div>


                    <div className="about-text">

                        <span className="about-label">
                            ABOUT BURGERLAB
                        </span>


                        <h2>
                            You came here because
                            <br />
                            you were hungry.
                        </h2>


                        <p className="about-main">
                            We don't judge.
                        </p>


                        <p>
                            BurgerLab lets you build your
                            burger exactly how you want it.
                        </p>


                        <div className="about-questions">

                            <div className="about-question">
                                <strong>
                                    Extra patty?
                                </strong>

                                <span>
                                    Obviously.
                                </span>
                            </div>


                            <div className="about-question">
                                <strong>
                                    More cheese?
                                </strong>

                                <span>
                                    Correct answer.
                                </span>
                            </div>


                            <div className="about-question">
                                <strong>
                                    Extra bacon?
                                </strong>

                                <span>
                                    We support your decisions.
                                </span>
                            </div>


                            <div className="about-question">
                                <strong>
                                    Too many jalapeños?
                                </strong>

                                <span>
                                    There is no such thing.
                                </span>
                            </div>


                            <div className="about-question">
                                <strong>
                                    Six servings?
                                </strong>

                                <span>
                                    That's between you and
                                    your stomach. 😂
                                </span>
                            </div>

                        </div>


                        <p>
                            Pick your ingredients, adjust the
                            quantities, and create something
                            you'll probably call{" "}

                            <strong>
                                "the perfect burger."
                            </strong>
                        </p>


                        <div className="about-joke">

                            <span>
                                🍔
                            </span>

                            <div>

                                <strong>
                                    No judgment. Just burgers.
                                </strong>

                                <small>
                                    Built with React. Powered by
                                    questionable burger decisions.
                                </small>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    )
}


export default BuildBurger