import React, { useRef, useEffect } from "react";
import styles from "../styles/Carrousel.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { closedCarrousel } from "../state/slices/imageProductSlice";
import { imageSelected } from "../state/slices/carrouselSlice";

const Carrousel = () => {
  const dispatch = useDispatch();

  let indexCarrouselImage = useSelector(
    (state) => state.carrousel.indexCarrouselImage
  );

  const firstImageContainerRef = useRef(null);
  const firstImageRef = useRef(null);
  const secondImageContainerRef = useRef(null);
  const secondImageRef = useRef(null);
  const thirdImageContainerRef = useRef(null);
  const thirdImageRef = useRef(null);
  const fourthImageContainerRef = useRef(null);
  const fourthImageRef = useRef(null);

  const images = [
    [firstImageContainerRef, firstImageRef],
    [secondImageContainerRef, secondImageRef],
    [thirdImageContainerRef, thirdImageRef],
    [fourthImageContainerRef, fourthImageRef],
  ];

  useEffect(() => {
    if (indexCarrouselImage !== null && indexCarrouselImage !== undefined) {
      for (let image of images) {
        image[0].current.style.border = "";
        image[0].current.style.borderRadius = "";
        image[1].current.style.opacity = "";
      }
    }
    // images = array de refs [[contenedor, imagen], ...]
    images[indexCarrouselImage - 1][0].current.style.border =
      "0.2rem solid hsl(26, 100%, 55%)";
    images[indexCarrouselImage - 1][0].current.style.borderRadius = "10%";
    images[indexCarrouselImage - 1][1].current.style.opacity = "0.5";
  }, [indexCarrouselImage]);

  const handleSelectImage = (e) => {
    const index = e.target.id;

    dispatch(imageSelected(index));
  };

  const handleNextImage = () => {
    const newIndex = indexCarrouselImage >= 4 ? 1 : indexCarrouselImage + 1;

    dispatch(imageSelected(newIndex));
  };

  const handlePrevImage = () => {
    const newIndex = indexCarrouselImage <= 1 ? 4 : indexCarrouselImage - 1;

    dispatch(imageSelected(newIndex));
  };

  const handleClosedCarrousel = () => {
    dispatch(closedCarrousel());
  };

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.imagesProduct}>
          <div className={styles.activeImage}>
            <button
              onClick={handleClosedCarrousel}
              className={styles.buttonOfClosed}
            >
              <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg">
                <path
                  id={styles.path}
                  d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
                  fill="#ffffff"
                  fillRule="evenodd"
                />
              </svg>
            </button>
            <img
              src={`images/image-product-${indexCarrouselImage}.jpg`}
              className={styles.shownImage}
              alt="shoes"
            />
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
          </div>

          <span className={styles.previewImage}>
            <span ref={firstImageContainerRef} className={styles.image}>
              <img
                ref={firstImageRef}
                onClick={(e) => {
                  handleSelectImage(e);
                }}
                id={1}
                src="images/image-product-1.jpg"
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
                src="images/image-product-2.jpg"
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
                src="images/image-product-3.jpg"
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
                src="images/image-product-4.jpg"
                alt="shoes4"
              />
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default Carrousel;
