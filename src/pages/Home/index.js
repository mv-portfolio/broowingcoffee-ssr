import {Button, Text, View} from 'components';
import {useHistory} from 'react-router';
import styles from './.module.css';

export default function HomePage() {
  const history = useHistory();
  return (
    <View style={styles.mainPane}>
      <Text style={styles.title}>WELCOME</Text>
      <Text style={styles.subtitle}>Broowing Coffee | Server</Text>
    </View>
  );
}
