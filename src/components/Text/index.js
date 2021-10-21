import styles from './.module.css';

export default function Text({children, style, defaultStyle, ...props}) {
  return (
    <p className={`${style} ${styles.p}`} style={defaultStyle} {...props}>
      {children}
    </p>
  );
}
