import {Button, View} from 'components';
import styles from './.module.css';
export default function Modal({
  isVisible,
  component,
  disabledTouchOutside,
  onTouchOutSide,
}) {
  return isVisible ? (
    <View style={styles.modal}>
      <Button
        style={styles.touchOutside}
        disabled={disabledTouchOutside}
        onClick={() => !disabledTouchOutside && onTouchOutSide()}
      />
      {component}
    </View>
  ) : null;
}
