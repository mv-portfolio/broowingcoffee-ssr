import {Text, View} from 'components';
import {useParams} from 'react-router';
import styles from './.module.css';

export default function HomePage() {
  const {token} = useParams();

  console.log(token)

  return (
    <View style={styles.mainPane}>
      <Text style={styles.title}>Reset Password</Text>
    </View>
  );
}
