import clsx from "clsx";
import styles from "@site/src/css/BulletBox.module.css";

function BulletContainer({ children }) {
	return <div className={styles.bulletContainer}>{children}</div>;
}

function BulletBox({ children, secondary, ...props }) {
	let boxClass = secondary ? "button--secondary" : "button--primary";
	let customStyle = {};

	Object.keys(props).forEach((key) => {
		if (key !== "children" && key !== "secondary" && key !== "boxClass") {
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
			{children}
		</div>
	);
}

export { BulletContainer, BulletBox };
