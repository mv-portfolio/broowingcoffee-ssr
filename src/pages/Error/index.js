import {Separator, Text, View} from 'components';
import styles from './.module.css';

export default function ErrorPage() {


  return (
    <View style={styles.mainPane}>
      <Text style={styles.title}>Page Not Found</Text>
      <Separator vertical={1}/>
      <Text style={styles.subtitle}>
        The link you provide is broken, Please be sure the link is correct
      </Text>
    </View>
  );
}
