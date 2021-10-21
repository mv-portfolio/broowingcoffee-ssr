import * as Progress from 'components/Progress';
import {WHITE} from 'constants/colors';
import {hp} from 'utils/responsive';
import styles from './.module.css';

export default function Button({isLoading, children, style, title, ...props}) {
  return (
    <button className={`${styles.button} ${style}`} disabled={isLoading} {...props}>
      {isLoading ? (
        <Progress.CircleSnail size={hp(3)} thickness={hp(0.4)} color={WHITE} />
      ) : title ? (
        title
      ) : (
        children
      )}
    </button>
  );
}
