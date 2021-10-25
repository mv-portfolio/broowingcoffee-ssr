import {Separator, Text, View} from 'components';

import {getProperties} from 'utils/helper';
import {onComputePrice} from 'utils/strategies';
import Formatter from 'utils/Formatter';

import styles from './.module.css';

export default function ProductItem({isShow = true, defaultStyle, onClick, ...props}) {
  const products = getProperties(props)
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
          isShow ? '' : props.copied - 1 <= 0 ? '' : `x ${props.copied}`
        }`}</Text>
        <Text style={styles.price}>{onComputePrice(isShow, props)}</Text>
      </View>
      {isShow && (
        <View style={styles.bodyPane}>
          {products.map(({property, value}, index) =>
            Array.isArray(value) ? (
              value.length <= 0 ? null : (
                <View key={index}>
                  <Separator vertical={0.5} />
                  <Text style={styles.addons}>add-ons</Text>
                  {props.addons.map((addon, index) => (
                    <View style={styles.propertyPaneAddons} key={index}>
                      <Text style={styles.propertyName}>- {addon.name}</Text>
                      <Text style={styles.propertyValue}>
                        {Formatter.toMoney(addon.price)}
                      </Text>
                    </View>
                  ))}
                </View>
              )
            ) : (
              <View style={styles.propertyPane} key={index}>
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
