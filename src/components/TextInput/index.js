import {View} from 'components';
import {forwardRef} from 'react';
import styles from './.module.css';
export default forwardRef(
  (
    {
      id,
      skinStyle,
      bodyStyle,
      value,
      onChangeText,
      prefixComponent,
      suffixComponent,
      ...props
    },
    ref,
  ) => {
    return (
      <View style={`${styles.inputPane} ${skinStyle}`}>
        {prefixComponent && (
          <View style={styles.prefixComponentPane}>{prefixComponent}</View>
        )}
        <input
          id={id}
          ref={ref}
          className={`${styles.input} ${bodyStyle}`}
          value={value}
          onChange={evt => (onChangeText ? onChangeText(evt.target.value) : evt)}
          {...props}
        />
      </View>
    );
  },
);
