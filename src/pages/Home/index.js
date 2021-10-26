import {Text, View} from 'components';
import {useEffect} from 'react';
import styles from './.module.css';

export default function HomePage() {
  const screenInitListener = () => {
    document.title = 'Broowing Coffee | Welcome';
  };
  useEffect(screenInitListener, []);

  return (
    <View style={styles.mainPane}>
      <Text style={styles.title}>WELCOME</Text>
      <Text style={styles.subtitle}>Broowing Coffee | Server</Text>
    </View>
  );
}
