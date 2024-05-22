import styles from "../styles/NavBar.module.scss";
import Cart from "./Cart";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCartIsOpen } from "../state/slices/cartSlice";

const NavBar = () => {
  const [displayedMenu, setDisplayedMenu] = useState(true);
  const navListRef = useRef(null);

  const handleDisplayedMenu = () => {
    setDisplayedMenu(!displayedMenu);
    displayedMenu
      ? (navListRef.current.style.display = "flex")
      : (navListRef.current.style.display = "none");
  };

  const numberOfProductsToCart = useSelector(
    (state) => state.cart.totalOfProducts
  );
  const dispatch = useDispatch();
  const cartIsOpen = useSelector((state) => state.cart.cartIsOpen);

  return (
    <>
      <div className={!displayedMenu ? styles.container : undefined}>
        <nav className={styles.navBar}>
          <div className={styles.navContainer}>
            <div className={styles.hamburguerMenu}>
              <input
                onClick={handleDisplayedMenu}
                type="checkbox"
                id="buttonMenu"
                className={styles.buttonMenu}
              />
              <label className={styles.lblMenu} htmlFor="buttonMenu">
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
              </label>
            </div>

            <img src="images/logo.svg" />
            <div ref={navListRef} className={styles.navList}>
              <span className={styles.listItem}>Collections</span>
              <span className={styles.listItem}>Man</span>
              <span className={styles.listItem}>Woman</span>
              <span className={styles.listItem}>About</span>
              <span className={styles.listItem}>Contact</span>
            </div>
          </div>

          <div className={styles.cartUserContainer}>
            <span
              onClick={() => {
                dispatch(setCartIsOpen());
              }}
              className={styles.cart}
            >
              <svg
                className={styles.iconCart}
                width="22"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id={styles.path}
                  d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                  fill="#69707D"
                  fillRule="nonzero"
                />
              </svg>

              <span
                className={
                  !cartIsOpen && numberOfProductsToCart !== 0
                    ? styles.numberOfProducts
                    : undefined
                }
              >
                {!cartIsOpen &&
                  numberOfProductsToCart !== 0 &&
                  numberOfProductsToCart}
              </span>
            </span>
            {cartIsOpen && <Cart />}
            <img src="images/image-avatar.png" className={styles.userImage} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
