import React from "react";
import styles from "../styles/Cart.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { deleteToCart } from "../state/slices/cartSlice";

const Cart = () => {
  const products = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleDeleteProductToCart = () => {
    dispatch(deleteToCart());
  };

  const totalOfProducts = useSelector((state) => state.cart.totalOfProducts);

  return (
    <div className={styles.cartContainer}>
      <h3>Cart</h3>
      <hr />

      {totalOfProducts === 0 ? (
        <h3 className={styles.emptyCart}>Your cart is empty.</h3>
      ) : (
        <>
          <span className={styles.product}>
            <img className={styles.imageOfProduct} src={products.img} />
            <span className={styles.infoOfProduct}>
              <p className={styles.nameOfProduct}>{products.name}</p>
              <span className={styles.price}>
                ${`${products.price} X ${products.totalOfProducts}`}
                <p className={styles.totalPrice}>
                  {products.price * products.totalOfProducts}
                </p>
              </span>
            </span>
            <button
              onClick={handleDeleteProductToCart}
              className={styles.delete}
            >
              <img src="../../public/images/icon-delete.svg" />
            </button>
          </span>
          <button className={styles.checkout}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;
