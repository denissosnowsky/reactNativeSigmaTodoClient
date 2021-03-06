import { Button } from 'native-base';
import React, { useContext, useEffect, useState, VFC } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Input } from '~components/common/input';
import { Theme } from '~components/containers/theme';
import { Header } from '~components/header';
import { ThemeContext } from '~contexts';
import { Confirm } from '~screens/confirm';
import authSelectors from '~store/auth/auth.selectors';
import { useKeybord } from '~hooks/useKeybord';
import { Reset } from '~screens/reset';
import styles from './auth.style';
import { ButtonQuestion } from './components/button-question/button-question';
import { onEraseAll } from './utils/onEraseAll';
import { onSignIn } from './utils/onSignIn';
import { onSignUp } from './utils/onSignUp';
import { ButtonTry } from './components/button-try/button-try';
import { onTestMode } from './utils/onTestMode';
import { ButtonSubmit } from './components/button-submit/button-submit';
import { ButtonReset } from './components/button-reset/button-reset';

export const Auth: VFC = () => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isInputsFocused, setIsInputsFocused] = useState(false);
  const [haveAccount, setHaveAccount] = useState(true);
  const [isConfirmPageShown, setIsConfirmPageShown] = useState(false);
  const [isResetPageShown, setIsResetPageShown] = useState(false);

  const isLoading = useSelector(authSelectors.isLoading);
  const isUserActivated = useSelector(authSelectors.user).isActivated;
  const isUserLogged = useSelector(authSelectors.isLogged);

  const isKeyBoardOpened = useKeybord(setIsInputsFocused);

  const onPressChangeAuth = () => {
    setHaveAccount(!haveAccount);
    onEraseAll(setEmail, setPassword, setName, setConfirmPassword);
  };

  const onSignInHandler = () => {
    onSignIn(email, password, dispatch);
  };

  const onSignUpHandler = () => {
    onSignUp(name, email, password, confirmPassword, dispatch);
  };

  const onTestModeHandler = () => {
    onTestMode(dispatch);
  };

  const onResetHandler = () => {
    setIsResetPageShown(true);
    onEraseAll(setEmail, setPassword, setName, setConfirmPassword);
  };

  useEffect(() => {
    if (!isUserActivated && isUserLogged && !isLoading) {
      setIsConfirmPageShown(true);
      setHaveAccount(true);
    }
  }, [isUserActivated, isUserLogged, isLoading]);

  if (isResetPageShown) {
    return <Reset onPress={() => setIsResetPageShown(false)} />;
  }

  if (isConfirmPageShown) {
    return <Confirm onPress={() => setIsConfirmPageShown(false)} />;
  }

  return (
    <Theme scaleAndOpacity={1}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}
        >
          <Header style={styles.logo} />
          <View style={styles.form}>
            {!haveAccount && (
              <Input
                value={name}
                onChange={setName}
                placeholder="Enter name"
                isUnderlined
                style={styles.input}
                onFocus={() => setIsInputsFocused(true)}
              />
            )}
            <Input
              value={email}
              onChange={setEmail}
              placeholder="Enter email"
              isUnderlined
              style={styles.input}
              onFocus={() => setIsInputsFocused(true)}
            />
            <Input
              value={password}
              onChange={setPassword}
              placeholder="Enter password"
              isUnderlined
              style={styles.input}
              onFocus={() => setIsInputsFocused(true)}
              secureTextEntry
            />
            {!haveAccount && (
              <Input
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="Confirms password"
                isUnderlined
                style={styles.input}
                onFocus={() => setIsInputsFocused(true)}
                secureTextEntry
              />
            )}
            <ButtonSubmit
              isLoading={isLoading}
              haveAccount={haveAccount}
              onSignInHandler={onSignInHandler}
              onSignUpHandler={onSignUpHandler}
            />
          </View>
          {haveAccount && (
            <ButtonReset onPress={onResetHandler} isHide={isKeyBoardOpened || isInputsFocused} />
          )}
          <ButtonTry onPress={onTestModeHandler} isHide={isKeyBoardOpened || isInputsFocused} />
          <ButtonQuestion
            isHide={isKeyBoardOpened || isInputsFocused}
            onPress={onPressChangeAuth}
            haveAccount={haveAccount}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </Theme>
  );
};
