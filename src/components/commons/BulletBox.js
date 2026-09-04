import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "@site/src/css/BulletBox.module.css";

function BulletContainer({ children }) {
	return <div className={styles.bulletContainer}>{children}</div>;
}

function BulletBox({ children, secondary, ...props }) {
	let boxClass = secondary ? "button--secondary" : "button--primary";
	let customStyle = {};
	let link = props.link ?? null;

	Object.keys(props).forEach((key) => {
		if (
			key !== "children" &&
			key !== "secondary" &&
			key !== "boxClass" &&
			key !== "link"
		) {
			customStyle[key] = props[key];
		}
	});

	return (
		<div
			className={clsx("col", "button", "button--lg", boxClass)}
			style={{
				padding: "0.75em",
				margin: "0.4em",
				flexGrow: 1,
				...customStyle,
			}}
		>
			{link ? (
				<Link to={link} className={styles.bulletBox_Link}>
					{children}
				</Link>
			) : (
				{ children }
			)}
		</div>
	);
}

export { BulletContainer, BulletBox };
