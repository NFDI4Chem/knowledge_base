import clsx from "clsx";
import styles from "@site/src/css/BulletBox.module.css";

function BulletContainer({ children }) {
  return <div className={styles.bulletContainer}>{children}</div>;
}

function BulletBox({ children, secondary }) {
  let boxStyle = secondary ? "button--secondary" : "button--primary";

  return (
    <div
      className={clsx("col", "button", "button--lg", boxStyle)}
      style={{ padding: "0.75em", margin: "0.4em", flexGrow: 1 }}
    >
      {children}
    </div>
  );
}

export { BulletContainer, BulletBox };
