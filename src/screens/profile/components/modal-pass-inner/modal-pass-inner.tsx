import React, { useState, VFC } from 'react';
import { View } from 'react-native';

import { Input } from '~components/common/input';
import { Loading } from '~components/common/loading';
import styles from './modal-pass-inner.style';

export const ModalPassInner: VFC<Props> = ({
  oldPass,
  newPass,
  confirmPass,
  isChangePasswordLoading,
  onChangeOldPass,
  onChangeNewPass,
  onChangeConfirmPass,
}) => {
  if (isChangePasswordLoading) {
    return (
      <View style={styles.loading}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Input
        placeholder="Enter old password"
        value={oldPass}
        onChange={onChangeOldPass}
        style={styles.input}
        isUnderlined
        secureTextEntry
      />
      <Input
        placeholder="Enter new password"
        value={newPass}
        onChange={onChangeNewPass}
        style={styles.input}
        isUnderlined
        secureTextEntry
      />
      <Input
        placeholder="Confirm new password"
        value={confirmPass}
        onChange={onChangeConfirmPass}
        style={styles.input}
        isUnderlined
        secureTextEntry
      />
    </View>
  );
};

type Props = {
  oldPass: string;
  newPass: string;
  confirmPass: string;
  isChangePasswordLoading: boolean;
  onChangeOldPass: (e: string) => void;
  onChangeNewPass: (e: string) => void;
  onChangeConfirmPass: (e: string) => void;
};
