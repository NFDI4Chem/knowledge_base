import {Carousel} from "nuka-carousel";
import style from "./ChemotionCarousel.module.css";
import {useCarousel} from "nuka-carousel";

export const CustomDots = () => {
	const {totalPages, currentPage, goToPage} = useCarousel();

	const className = (index) => {
		let value = style.chemotionCarouselDot;
		if (currentPage === index) {
			value += " " + style.chemotionCarouselDotActive;
		}
		return value;
	};

	return (
		<div className={style.chemotionCarouselDots}>
			{[...Array(totalPages)].map((_, index) => (
				<button
					key={index}
					onClick={() => goToPage(index)}
					className={className(index)}
				/>
			))}
		</div>
	);
};

function ChemotionCarousel({icon, images}) {
	return (
		<div className={style.chemotionCarousel}>
			<img
				className={style.chemotionCarouselIcon}
				src={icon.src}
				alt={icon.alt}
			/>
			<div className={style.chemotionCarouselContainer}>
				<Carousel
					showDots
					showArrows
					autoplay
					wrapAround
					dots={<CustomDots />}
				>
					{images.map((image, index) => (
						<img
							className={style.chemotionCarouselImage}
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
