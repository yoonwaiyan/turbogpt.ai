import { PayloadAction } from '@reduxjs/toolkit';
import {} from './types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { chatOptionsSaga } from './saga';
import { ChatOptionsState } from './types';
import { getOpenAiKeyFromStorage, saveOpenAiKey } from '../utils';

export const initialState: ChatOptionsState = {
  selectedCharacter: 'Default AI',
  chatMood: 50,
  openAiApiKey: getOpenAiKeyFromStorage() || '',
  openAiKeyStatus: false,
};

const slice = createSlice({
  name: 'chatOptions',
  initialState,
  reducers: {
    changeSelectedCharacter(state, action: PayloadAction<string>) {
      state.selectedCharacter = action.payload;
    },
    changeMood(state, action: PayloadAction<number>) {
      state.chatMood = action.payload;
    },
    changeOpenAiApiKey(state, action: PayloadAction<string>) {
      state.openAiApiKey = action.payload;
      console.log('--- 🧨 Saving OpenAI Key to LocalStorage ---');
      saveOpenAiKey(action.payload);
    },
    setOpenAiKeyStatus(state, action: PayloadAction<boolean>) {
      state.openAiKeyStatus = action.payload;
    },
  },
});

export const { actions: chatOptionsActions } = slice;

export const useChatOptionsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: chatOptionsSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useChatOptionsSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */