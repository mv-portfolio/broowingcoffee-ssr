import {Button, Separator, Text, View} from 'components';
import styles from './.module.css';
export default function Dialog({
  title,
  subtitle,
  positiveText,
  onClickPositive,
  negativeText,
  onClickNegative,
}) {
  return (
    <View style={styles.mainPane}>
      <View style={styles.centerPane}>
        <Text style={styles.title}>{title || 'THE TITLE OF MODAL'}</Text>
        <Separator vertical={0.5} />
        <Text style={styles.subtitle}>
          {subtitle || 'Welcome on using modal, this dialog is our default design'}
        </Text>
      </View>
      <View style={styles.bottomPane}>
        <Button
          title={positiveText || 'OKAY'}
          style={styles.button}
          onClick={onClickPositive}
        />
        {negativeText && (
          <Button
            title={negativeText || 'NO'}
            style={styles.button}
            onClick={onClickNegative}
          />
        )}
      </View>
    </View>
  );
}
