import { FaAngleUp } from "react-icons/fa";
import styles from "./ButtonLeadsToTop.module.css";

export const ButtonLeadsToTop = () => {
  return (
    <button
      className={styles.leadsToTop}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      title="Levar ao topo da página"
    >
      <FaAngleUp className={styles.buttonIcon} />
    </button>
  );
};
