import { Carousel } from "nuka-carousel";
import styles from "@site/src/css/ChemotionCarousel.module.css";
import { useCarousel } from "nuka-carousel";

function CustomDots() {
  const { totalPages, currentPage, goToPage } = useCarousel();

  const className = (index) => {
    let value = styles.chemotionCarouselDot;
    if (currentPage === index) {
      value += " " + styles.chemotionCarouselDotActive;
    }
    return value;
  };

  return (
    <div className={styles.chemotionCarouselDots}>
      {[...Array(totalPages)].map((_, index) => (
        <span
          key={index}
          onClick={() => goToPage(index)}
          className={className(index)}
        >
          &#8226;
        </span>
      ))}
    </div>
  );
}

function ChemotionCarousel({ icon, images }) {
  return (
    <div className={styles.chemotionCarousel}>
      <img
        className={styles.chemotionCarouselIcon}
        src={icon.src}
        alt={icon.alt}
      />
      <div className={styles.chemotionCarouselContainer}>
        <Carousel
          showDots
          showArrows
          autoplay
          wrapMode="wrap"
          dots={<CustomDots />}
        >
          {images.map((image, index) => (
            <img
              className={styles.chemotionCarouselImage}
              key={index}
              src={image.src}
              alt={image.alt}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default ChemotionCarousel;
