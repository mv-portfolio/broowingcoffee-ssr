import {Separator, Text, View} from 'components';
import {useEffect} from 'react';
import {useHistory} from 'react-router-dom/cjs/react-router-dom.min';
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
      <Separator vertical={2} />
      <a className={styles.link} href='https://broowing-coffee-web.herokuapp.com'>
        Go to Broowing Coffee
      </a>
    </View>
  );
}
