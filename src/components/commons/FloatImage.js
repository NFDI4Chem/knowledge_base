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
	const containerClass = clsx(styles.FloatImage, {
		[styles["FloatImage--noFloat"]]: float === "none" || noFloat,
		[styles["FloatImage--floatLeft"]]: float === "left",
	});

	const imgClass = clsx(styles.imgStyle, {
		[styles["imgStyle--shadow"]]: shadow,
	});

	const image = (
		<img
			className={imgClass}
			alt={alt}
			src={useBaseUrl(url)}
		/>
	);

	const linkedImage = link ? <Link href={link}>{image}</Link> : image;

	const imgGroup = caption !== undefined ? (
		<div className={styles.imgGroup}>
			{linkedImage}
			<p
				className={styles.captionStyle}
				style={textAlign ? { textAlign } : undefined}
			>
				{caption}
			</p>
		</div>
	) : (
		linkedImage
	);


	return (
		<div id={id ?? null} className={containerClass} style={props}>
			{imgGroup}
		</div>
	);
}
export default FloatImage;
