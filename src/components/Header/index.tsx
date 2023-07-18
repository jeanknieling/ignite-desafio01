import rocket from "../../assets/rocket.svg";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <h1>
        <img src={rocket} />
        <p>
          <span>to</span>
          <span>do</span>
        </p>
      </h1>
    </header>
  );
};
