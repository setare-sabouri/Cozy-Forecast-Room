import { motion, AnimatePresence } from "framer-motion";
import styles from "./Interface.module.scss";

export default function RotateOverlay({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.rotateOverlay} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.rotateOverlay__icon}
            animate={{ rotate: [0, 90, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            📱
          </motion.div>
          <h2 className={styles.rotateOverlay__title}>
            Please rotate your device
          </h2>
          <p className={styles.rotateOverlay__subtitle}>
            For the best experience, use landscape mode.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}