import React, {useState, useEffect} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Note, getAllNotes, getNote} from '../services/noteStoreServices';
import { SavedNotesList } from './SavedNotesList';
type Props = {
  toggleNewNote: (toggle: boolean) => void;
};

export const HomeScreen: React.FC<Props> = () => {
  const [noteText, setNoteText] = useState<Note[]>([]);

  useFocusEffect(() => {
    getAllNotes().then(result => setNoteText(result.notes));
    // getNote().then(result => setNoteText(result ?? "") );
  });
  useEffect(() => {}, []);

  return (
    <>
    <SavedNotesList />
    </>
  );
};
