import {useState} from 'react';
import {Button, Icon, Separator, Text, View} from 'components';
import styles from './.module.css';

export default function Dropdown({
  items = [],
  style,
  placeholder,
  backgroundColor,
  accentColor,
  selected,
  onSelected,
}) {
  const [state, setState] = useState({
    isShow: false,
    value: selected || '',
  });

  const onClick = (actionType, value) => {
    if (actionType === 'on-click') {
      setState(prev => ({...prev, isShow: !prev.isShow}));
      return;
    }
    if (actionType === 'on-select') {
      onSelected(value);
      setState({
        isShow: false,
        value: value,
      });
      return;
    }
  };
  const getIcon = isShow => {
    if (isShow) {
      return <Icon font='AntDesign' name='caretup' color={accentColor} size='2vh' />;
    }
    return <Icon font='AntDesign' name='caretdown' color={accentColor} size='2vh' />;
  };

  return (
    <View>
      <Button style={style} onClick={() => onClick('on-click')}>
        <View style={`${styles.mainPane} ${style}`} defaultStyle={{backgroundColor}}>
          <Text style={styles.title}>
            {state.value || (
              <span className={styles.placeholder}>{placeholder || 'Select...'}</span>
            )}
          </Text>
          {getIcon(state.isShow)}
        </View>
      </Button>
      {state.isShow && (
        <View style={styles.pickerList}>
          {items
            .filter(type => type !== state.value)
            .map((type, index) => (
              <View key={index}>
                <Button
                  title={type}
                  style={styles.pickerItem}
                  onClick={() => onClick('on-select', type)}
                />
                {index + 1 !== items.filter(type => type !== state.value).length ? (
                  <Separator vertical={0.25} />
                ) : null}
              </View>
            ))}
        </View>
      )}
    </View>
  );
}
