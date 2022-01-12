import {Icon, Separator, Text, View} from 'components';
import {ACCENT_COLOR} from 'constants/colors';
import styles from './.module.css';

export default function ErrorPage() {
  return (
    <View style={styles.mainPane}>
      <Icon font='AntDesign' name='disconnect' size='7.5vh' color={ACCENT_COLOR} />
      <Separator vertical={1} />
      <Text style={styles.title}>Page Not Found</Text>
      <Separator vertical={0.5} />
      <Text style={styles.subtitle}>
        The link you provide is broken, Please be sure the link is correct
      </Text>
    </View>
  );
}
