import {Button, Icon, View} from 'components';
import * as Progress from 'components/Progress';
import {ACCENT_COLOR} from 'constants/colors';
import {forwardRef} from 'react';
import {hp} from 'utils/responsive';
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
      placeholder,
      isTextEncrypt,
      onTextEncrypt,
      showIndicator,
      indicatorProgress,
      ...props
    },
    ref,
  ) => {
    const onEncrypt = (status, onClick) => {
      if (status) {
        return (
          <Button onClick={onClick}>
            <Icon font='Feather' name='eye-off' size='2.75vh' color={ACCENT_COLOR} />
          </Button>
        );
      }
      return (
        <Button onClick={onClick}>
          <Icon font='Feather' name='eye' size='2.75vh' color={ACCENT_COLOR} />
        </Button>
      );
    };

    return (
      <View style={`${styles.inputPane} ${skinStyle}`}>
        {prefixComponent && (
          <View style={styles.prefixComponentPane}>{prefixComponent}</View>
        )}
        <input
          id={id}
          ref={ref}
          type={isTextEncrypt ? 'password' : 'text'}
          className={`${styles.input} ${bodyStyle}`}
          style={{
            width: prefixComponent && hp(28.75),
          }}
          value={value}
          onChange={evt => (onChangeText ? onChangeText(evt.target.value) : evt)}
          placeholder={placeholder}
          {...props}
        />
        {showIndicator ? (
          <Progress.Circle
            size={hp(3)}
            color={ACCENT_COLOR}
            progress={indicatorProgress}
          />
        ) : (
          placeholder.toLowerCase().includes('password') &&
          onEncrypt(isTextEncrypt, onTextEncrypt)
        )}
      </View>
    );
  },
);
