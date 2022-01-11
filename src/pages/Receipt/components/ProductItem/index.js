import {Separator, Text, View} from 'components';

import {getPropsValues} from 'utils/helper';
import {onComputePrice} from 'utils/strategies';
import Formatter from 'utils/Formatter';

import styles from './.module.css';

export default function ProductItem({isShow = true, defaultStyle, onClick, ...props}) {
  const products = getPropsValues(props)
    .filter(({property}) => property !== 'name')
    .filter(({property}) => property !== 'copied');

  const onFormat = (property, value) => {
    if (property.includes('price')) {
      return `${Formatter.toMoney(value)}`;
    }
    if (property.includes('date')) {
      return `${Formatter.getDateDifference(value)}`;
    }
    if (property.includes('discount')) {
      return `${value}%`;
    }
    return value;
  };

  return (
    <View style={styles.mainPane} defaultStyle={defaultStyle} onClick={onClick}>
      <View style={styles.topPane}>
        <Text style={styles.name}>{`${Formatter.toName(props.name)} ${
          props.copied - 1 <= 0 ? '' : `x ${props.copied}`
        }`}</Text>
        {!isShow && <Text style={styles.price}>{onComputePrice(props)}</Text>}
      </View>
      {isShow && (
        <View style={styles.bodyPane}>
          {products.map(({property, value}, index) =>
            Array.isArray(value) ? (
              value.length <= 0 ? null : (
                <View key={index} defaultStyle={{paddingTop: '0.5vh'}}>
                  <Text style={styles.addons}>Add-ons</Text>
                  {props.addons.map((addon, index) => (
                    <View key={index} style={styles.propertyPaneAddons}>
                      <Text style={styles.propertyName}>{addon.name}</Text>
                      <Text style={styles.propertyValue}>
                        {Formatter.toMoney(addon.price)}
                      </Text>
                    </View>
                  ))}
                </View>
              )
            ) : (
              <View
                key={index}
                style={styles.propertyPane}
                defaultStyle={{
                  paddingBottom: index + 1 !== products.length ? '0.15vh' : '0',
                }}>
                <Text style={styles.propertyName}>{property}</Text>
                <Text style={styles.propertyValue}>{onFormat(property, value)}</Text>
              </View>
            ),
          )}
        </View>
      )}
    </View>
  );
}
