import {Text, View} from 'components';
import {useState} from 'react';
import {getOrganizedPurchasedProducts} from 'utils/strategies';
import ProductItem from '../ProductItem';
import styles from './.module.css';

export default function PurchasedItemList({products = []}) {
  const [selected, setSelected] = useState({index: 0, isShow: false});

  const onShowDetails = index => {
    setSelected(prev => {
      if (prev.index === index) {
        return {index, isShow: !prev.isShow};
      }
      return {index, isShow: true};
    });
  };

  return (
    <View style={styles.mainPane}>
      {products.map((product, index) => (
        <ProductItem
          key={index}
          isShow={selected.index == index && selected.isShow}
          defaultStyle={{marginBottom: index + 1 !== products.length ? '1vh' : '0'}}
          onClick={() => onShowDetails(index)}
          {...product}
        />
      ))}
    </View>
  );
}
