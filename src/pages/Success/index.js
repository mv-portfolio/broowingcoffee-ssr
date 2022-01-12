import {Icon, Separator, Text, View} from 'components';
import {ACCENT_COLOR} from 'constants/colors';
import styles from './.module.css';

export default function SuccessPage({title, subtitle}) {
  return (
    <View style={styles.mainPane}>
      <Icon font='AntDesign' name='check' size='8vh' color={ACCENT_COLOR} />;
      <Separator vertical={1} />
      <Text style={styles.title}>{title}</Text>
      <Separator vertical={0.5} />
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}
