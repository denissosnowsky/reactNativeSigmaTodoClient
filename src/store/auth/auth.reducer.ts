import { createSlice } from '@reduxjs/toolkit';

import { UserDAO } from '~types/auth.types';

import {
  authErrorReducer,
  authUserReducer,
  authEmptifyErrorReducer,
  authOutUserReducer,
  authTestModeOnReducer,
  authTestModeOffReducer,
  userNameChangeReducer,
  userPhotoChangeReducer,
  authActivateLinkReducer,
  authEmptifySuccessReducer,
  userPassChangeReducer,
  authResetPasswordReducer,
  userGetPhotosReducer,
} from './reducers';
import { userEmailChangeReducer } from './reducers/userEmailChange.reducer';

export type AuthState = {
  user: Omit<UserDAO, 'token'>;
  tempUserPhoto: string;
  userNameEditing: string;
  userEmailEditing: string;
  userPhotoEditing: string;
  isLogged: boolean;
  isLoading: boolean;
  isInitializing: boolean;
  error: string;
  successAlert: string;
  testMode: boolean;
  isActivationLinkLoading: boolean;
  isResetPasswordLoading: boolean;
  isChangePasswordLoading: boolean;
  avatars: Array<{ url: string; _id: string }> | null;
};

const initialState: AuthState = {
  user: {
    name: '',
    photo: '',
    id: '',
    email: '',
    isActivated: false,
    activationLink: '',
  },
  tempUserPhoto: '',
  userNameEditing: '',
  userEmailEditing: '',
  userPhotoEditing: '',
  isLogged: false,
  isLoading: false,
  isInitializing: true,
  error: '',
  successAlert: '',
  testMode: false,
  isActivationLinkLoading: false,
  isResetPasswordLoading: false,
  isChangePasswordLoading: false,
  avatars: null,
};

export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    ...authUserReducer,
    ...authEmptifyErrorReducer,
    ...authErrorReducer,
    ...authOutUserReducer,
    ...authTestModeOnReducer,
    ...authTestModeOffReducer,
    ...userNameChangeReducer,
    ...userPhotoChangeReducer,
    ...authActivateLinkReducer,
    ...authEmptifySuccessReducer,
    ...userPassChangeReducer,
    ...userEmailChangeReducer,
    ...authResetPasswordReducer,
    ...userGetPhotosReducer,
  },
});

export default counterSlice.reducer;
