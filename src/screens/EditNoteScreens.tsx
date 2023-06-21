import React, {useState} from 'react';
import {NoteTakingInput} from '../NoteTakingInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveNote} from '../services/noteStoreServices';
export const EditNoteScreens: React.FC = () => {
  return <NoteTakingInput saveNote={saveNote}/>;
};
