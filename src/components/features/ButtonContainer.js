import styles from "@site/src/css/Features.module.css";

function ButtonContainer({ children }) {
  return <div className={styles.features}>{children}</div>;
}

export default ButtonContainer;
