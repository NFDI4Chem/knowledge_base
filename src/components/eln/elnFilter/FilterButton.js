import styles from "@site/src/components/eln/ElnStyles";
import clsx from "clsx";

function FilterButton(props) {
  const handleClick = () => {
    if (props.label === "All") {
      props.setFilter((draft) => {
        delete draft[props.type];
      });
    } else {
      props.setFilter((draft) => {
        draft[props.type] = props.label;
      });
    }
  };

  // Conditional styling for button

  let buttonClass = clsx(styles.lbeFilterbutton, {
    [styles.elnFilterbuttonSecondary]: props.secondary,
    [styles.lbeFilterbuttonActive]: props.active,
  });

  return (
    <button className={buttonClass} onClick={handleClick}>
      {props.label}
    </button>
  );
}

export default FilterButton;
