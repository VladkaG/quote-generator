
import styles from './Quote.module.css';

function Quote({ quoteText }) {

  return (
    <div className={styles.quoteBox}>
      <div className={styles.quoteText}>"{quoteText}"</div>
    </div>
  );
}
export default Quote;
