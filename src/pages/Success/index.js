import {Text, View} from 'components';
import styles from './.module.css';

export default function SuccessPage({title, subtitle}) {
  return (
    <View style={styles.mainPane}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}
