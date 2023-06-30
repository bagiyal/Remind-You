import React, {useEffect, useLayoutEffect, useState} from 'react';
import {NoteTakingInput} from '../NoteTakingInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import {EditScreenRouteProp, ScreenNavigationProp} from '../../types';
import { Button } from 'react-native';
import { DeleteNote } from './DeleteNote';
export const EditNoteScreens: React.FC = () => {
  const route = useRoute<EditScreenRouteProp>();
  const navigation = useNavigation<ScreenNavigationProp>();
  const noteId = route.params.noteId;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: noteId ? '   Note' : 'New Note',
      headerRight:() => (noteId ? <DeleteNote noteId={noteId} /> : <></>) 
    })
  }, [navigation]);
  return <NoteTakingInput noteId={noteId} />;
};
