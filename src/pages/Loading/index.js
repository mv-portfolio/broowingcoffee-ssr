import * as Progress from 'components/Progress';
import {ACCENT_COLOR} from 'constants/colors';
import {hp} from 'utils/responsive';
import styles from './.module.css';

export default function LoadingPage() {
  return (
    <div className={styles.mainPane}>
      <Progress.CircleSnail color={ACCENT_COLOR} size={hp(5)} thickness={hp(0.5)} />
    </div>
  );
}
