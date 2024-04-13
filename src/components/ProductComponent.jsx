import styles from "../styles/ProductComponent.module.scss";
import Carrousel from "./Carrousel";
import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectImage,
  openCarrousel,
  incrementProducts,
  decrementProducts,
} from "../state/slices/imageProductSlice";
import { addToCart } from "../state/slices/cartSlice";
import { initializingImage } from "../state/slices/carrouselSlice";

const ProductComponent = () => {
  const [higher, setHigher] = useState(window.innerWidth >= 880);
  const carrousel = useSelector((state) => state.imageProduct.carrousel);
  const indexImage = useSelector((state) => state.imageProduct.indexImage);
  const selectedImage = useSelector(
    (state) => state.imageProduct.imageSelected
  );
  const numberOfProducts = useSelector(
    (state) => state.imageProduct.numberOfProducts
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const manejarResize = () => {
      if (window.innerWidth >= 880) {
        setHigher(true);
      } else {
        setHigher(false);
      }
    };

    window.addEventListener("resize", manejarResize);

    return () => {
      window.removeEventListener("resize", manejarResize);
    };
  }, []);

  const firstImageContainerRef = useRef(null);
  const firstImageRef = useRef(null);
  const secondImageContainerRef = useRef(null);
  const secondImageRef = useRef(null);
  const thirdImageContainerRef = useRef(null);
  const thirdImageRef = useRef(null);
  const fourthImageContainerRef = useRef(null);
  const fourthImageRef = useRef(null);

  // cada sub array contiene primero la referencia del contenedor (0) y segundo la referencia a la imagen(1)
  const images = [
    [firstImageContainerRef, firstImageRef],
    [secondImageContainerRef, secondImageRef],
    [thirdImageContainerRef, thirdImageRef],
    [fourthImageContainerRef, fourthImageRef],
  ];

  const handleMainImageClick = (e) => {
    dispatch(openCarrousel());
    dispatch(initializingImage(parseInt(e.target.id, 10)));
  };
  const handleSelectImage = (e) => {
    const index = e.target.id;
    dispatch(selectImage(parseInt(index, 10)));
    if (selectedImage !== null) {
      for (let image of images) {
        image[0].current.style.border = "";
        image[0].current.style.borderRadius = "";
        image[1].current.style.opacity = "";
      }
    }
    // images = array de referencias [[contenedor, imagen], ...]
    images[index - 1][0].current.style.border =
      "0.2rem solid hsl(26, 100%, 55%)";
    images[index - 1][0].current.style.borderRadius = "10%";
    images[index - 1][1].current.style.opacity = "0.5";
  };

  const handleIncrement = () => {
    const numberProduct = numberOfProducts + 1;
    dispatch(incrementProducts(numberProduct));
  };

  const handleDecrement = () => {
    if (numberOfProducts === 1) {
      return;
    }
    const numberProduct = numberOfProducts - 1;
    dispatch(decrementProducts(numberProduct));
  };

  const handleAddToCart = () => {
    dispatch(addToCart(numberOfProducts));
  };

  const handleNextImage = () => {
    const newIndex = indexImage >= 4 ? 1 : indexImage + 1;

    dispatch(selectImage(newIndex));
  };

  const handlePrevImage = () => {
    const newIndex = indexImage <= 1 ? 4 : indexImage - 1;

    dispatch(selectImage(newIndex));
  };

  return (
    <>
      {carrousel && <Carrousel />}
      <main>
        <div className={styles.imagesProduct}>
          <img
            onClick={(e) => {
              handleMainImageClick(e);
            }}
            src={`../../public/images/image-product-${indexImage}.jpg`}
            id={indexImage}
            className={`${styles.shownImage}`}
            alt="shoes"
          />

          {!higher && (
            <>
              <button onClick={handlePrevImage} className={styles.prevButton}>
                <svg
                  className={styles.iconButton}
                  width="12"
                  height="18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id={styles.path}
                    d="M11 1 3 9l8 8"
                    stroke="#1D2026"
                    strokeWidth="3"
                    fill="none"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
              <button onClick={handleNextImage} className={styles.nextButton}>
                <svg
                  className={styles.iconButton}
                  width="13"
                  height="18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id={styles.path}
                    d="m2 1 8 8-8 8"
                    stroke="#1D2026"
                    strokeWidth="3"
                    fill="none"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
            </>
          )}

          {higher && (
            <span className={styles.previewImage}>
              <span ref={firstImageContainerRef} className={styles.image}>
                <img
                  ref={firstImageRef}
                  onClick={(e) => {
                    handleSelectImage(e);
                  }}
                  id={1}
                  src="../../public/images/image-product-1.jpg"
                  alt="shoes1"
                />
              </span>
              <span ref={secondImageContainerRef} className={styles.image}>
                <img
                  ref={secondImageRef}
                  onClick={(e) => {
                    handleSelectImage(e);
                  }}
                  id={2}
                  src="../../public/images/image-product-2.jpg"
                  alt="shoes2"
                />
              </span>
              <span ref={thirdImageContainerRef} className={styles.image}>
                <img
                  ref={thirdImageRef}
                  onClick={(e) => {
                    handleSelectImage(e);
                  }}
                  id={3}
                  src="../../public/images/image-product-3.jpg"
                  alt="shoes3"
                />
              </span>
              <span ref={fourthImageContainerRef} className={styles.image}>
                <img
                  ref={fourthImageRef}
                  onClick={(e) => {
                    handleSelectImage(e);
                  }}
                  id={4}
                  src="../../public/images/image-product-4.jpg"
                  alt="shoes4"
                />
              </span>
            </span>
          )}
        </div>
        <div className={styles.productDescriptionContainer}>
          <span className={styles.companyName}>SNEAKER COMPANY</span>
          <h1 className={styles.productTitle}>Fall Limited Edition Sneakers</h1>
          <p className={styles.productDescription}>
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they’ll withstand everything
            the weather can offer.
          </p>
          <div className={styles.priceDiscount}>
            <h2 className={styles.price}>$125.00</h2>
            <span className={styles.discount}>50%</span>
          </div>
          <span className={styles.previousPrice}>$250.00</span>
          <div className={styles.buyButtons}>
            <div className={styles.buttonsContainer}>
              <button
                onClick={handleDecrement}
                className={styles.decrementToProduct}
              >
                <img alt="minus" src="../../public/images/icon-minus.svg" />
              </button>
              <span className={styles.totalProducts}>{numberOfProducts}</span>
              <button
                onClick={handleIncrement}
                className={styles.incrementToProduct}
              >
                <img alt="plus" src="../../public/images/icon-plus.svg" />
              </button>
            </div>
            <button onClick={handleAddToCart} className={styles.addToCart}>
              <img alt="cart" src="../../public/cart.svg" />
              Add to cart
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductComponent;
