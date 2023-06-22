import React, {useState} from 'react';
import {NoteTakingInput} from '../NoteTakingInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { EditScreenRouteProp } from '../../types';
export const EditNoteScreens: React.FC = () => {
  const route = useRoute<EditScreenRouteProp>()
  const noteId = route.params.noteId;
  return <NoteTakingInput noteId={noteId} />;
};
