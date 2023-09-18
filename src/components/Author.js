import styles from './Author.module.css';

function Author({ quoteAuthor, quoteGenre }) {
  return (
    <button className={styles.authorBox}>
      <div className={styles.author}>{quoteAuthor}</div>
      <div className={styles.genre}>{quoteGenre}</div>
    </button>
  );
}

export default Author;
