import {useEffect, useReducer, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {ErrorPage, LoadingPage, SuccessPage} from 'pages';
import {Text, TextInput, View, Separator, Button} from 'components';
import styles from './.module.css';
import {resetPassword as resetPasswordReducer, resetPasswordInitState} from 'hooks';
import {
  hasLowerCaseLetter,
  hasNumber,
  hasSymbol,
  hasUpperCaseLetter,
} from 'utils/checker';
import {server} from 'network/service';

export default function HomePage() {
  const {token} = useParams();
  const history = useHistory();
  const [state, setState] = useReducer(resetPasswordReducer, resetPasswordInitState);

  const strength = val => {
    let strength = 0;
    if (hasUpperCaseLetter(val)) {
      if (val.length > 2) {
        strength += 15;
      }
      strength += 10;
    }
    if (hasLowerCaseLetter(val)) {
      if (val.length > 4) {
        strength += 15;
      }
      strength += 10;
    }
    if (hasSymbol(val)) {
      if (val.length > 6) {
        strength += 15;
      }
      strength += 10;
    }
    if (hasNumber(val)) {
      if (val.length > 8) {
        strength += 15;
      }
      strength += 10;
    }
    return strength;
  };
  const onChangeText = (component, val) => {
    if (component === 'new-password') {
      setState({
        type: 'set',
        newPassword: val,
        passwordStrength: strength(val),
        isMatched: val === state.confirmPassword,
      });
      return;
    }
    if (component === 'confirm-password') {
      setState({
        type: 'set',
        confirmPassword: val,
        isMatched: val === state.newPassword,
      });
      return;
    }
  };
  const onClickChange = () => {
    if (!state.isMatched) {
      setState({
        type: 'set',
        resetRequest: 'failed',
        messageRequest: 'Passwords does not matched',
      });
      return;
    }

    setState({type: 'set', isLoading: true});
    server
      .push(
        '/reset-password-decoder',
        {
          email: state.email,
          newPassword: state.newPassword,
        },
        {headers: {'reset-auth-token': state.token}},
      )
      .then(res => {
        setState({type: 'set', authRequest: 'success-done', isLoading: false});
        setTimeout(() => {
          history.replace('/');
        }, 4000);
      })
      .catch(({err}) => {
        setState({type: 'set', isLoading: false});
        if (err.includes('Password')) {
          setState({type: 'set', resetRequest: 'failed', messageRequest: err});
          return;
        }
        setState({type: 'set', authRequest: 'failed'});
      });
  };
  
  const screenInitListener = () => {
    server
      .peek('/reset-password-auth', {
        headers: {'reset-auth-token': token},
      })
      .then(res => {
        const {
          res: {email, token},
          status,
        } = res;
        if (status) {
          setState({type: 'set', authRequest: 'success', email, token});
        }
      })
      .catch(err => {
        setState({type: 'set', authRequest: 'failed'});
      });
  };
  useEffect(screenInitListener, []);


  if (state.authRequest === 'success') {
    document.title = 'Broowing Coffee | New Password';
    return (
      <View style={styles.mainPane}>
        <View style={styles.topPane}>
          <View style={styles.headerPane}>
            <Text style={styles.title}>New Password</Text>
            <Separator vertical={0.25} />
            <Text style={styles.subtitle}>
              Please be sure, the password you entered was not leaked to anyone
            </Text>
          </View>
        </View>
        <View style={styles.bodyPane}>
          <TextInput
            skinStyle={styles.inputSkin}
            placeholder='New Password'
            showIndicator={true}
            indicatorProgress={state.passwordStrength}
            isTextEncrypt={state.isEncrypt}
            value={state.newPassword}
            onChangeText={text => onChangeText('new-password', text)}
          />
          <Separator vertical={0.5} />
          <TextInput
            skinStyle={styles.inputSkin}
            placeholder='Confirm Password'
            isTextEncrypt={state.isEncrypt}
            onTextEncrypt={() => setState({type: 'set', isEncrypt: !state.isEncrypt})}
            value={state.confirmPassword}
            onChangeText={text => onChangeText('confirm-password', text)}
          />
          <Separator vertical={1} />
          <Button
            style={styles.button}
            isLoading={state.isLoading}
            title='Change'
            onClick={onClickChange}
          />
        </View>
        <View style={styles.bottomPane}>
          {state.resetRequest === 'failed' && (
            <View style={styles.errorPane}>
              <Text style={styles.errorTitle}>{state.messageRequest}</Text>
            </View>
          )}
          {state.resetRequest === 'success' && (
            <View style={styles.infoPane}>
              <Text style={styles.infoTitle}>{state.messageRequest}</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
  if (state.authRequest === 'success-done') {
    document.title = 'Broowing Coffee | Success';
    return (
      <SuccessPage
        title='Password Saved'
        subtitle='You may now use the new password you entered'
      />
    );
  }
  if (state.authRequest === 'failed') {
    document.title = 'Broowing Coffee | Error';
    return <ErrorPage />;
  }

  return <LoadingPage />;
}
