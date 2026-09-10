import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import clsx from "clsx";

import styles from "@site/src/css/FloatImage.module.css";

function FloatImage({
	url,
	alt,
	caption,
	float,
	noFloat,
	shadow,
	textAlign,
	link,
	id,
	...props
}) {
	let containerClass = styles.FloatImage;

	containerClass = clsx(containerClass, {
		[styles["FloatImage--noFloat"]]: float === "none" || noFloat,
		[styles["FloatImage--floatLeft"]]: float === "left",
	});

	const imgClass = clsx(styles.FloatImage, {
		[styles["imgStyle--shadow"]]: shadow,
	});

	const image = (
		<img
			className={imgClass}
			alt={alt}
			src={useBaseUrl(url)}
			style={props}
		/>
	);

	const linkedImage = link ? <Link href={link}>{image}</Link> : image;

	return (
		<div id={id ?? null} className={containerClass} style={props}>
			<div className={styles.imgGroup}>
				{linkedImage}
				{caption !== undefined && (
					<p
						className={styles.captionStyle}
						style={textAlign ? { textAlign } : undefined}
					>
						{caption}
					</p>
				)}
			</div>
		</div>
	);
}
export default FloatImage;
