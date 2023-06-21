import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values'


export type Note = {
  text: string;
  id: string;
}

export type NoteStore = {
  notes: Array<Note>;
}

const STORE_KEY = 'TAKE_NOTES_STORE_V2';

export const getAllNotes = async () => {
  const storeItem = await AsyncStorage.getItem(STORE_KEY);
  if (storeItem) {
    return JSON.parse(storeItem) as NoteStore;
  }
  return { notes: [] }
}

export const getNote = async (id: string) => {
  const noteStore = await getAllNotes();
  const note = noteStore.notes.find(note => note.id == id);
  return note;
}

export const saveNote = async (text: string) => {
  // AsyncStorage.clear();
  const noteStore = await getAllNotes();
  const notes = [...noteStore.notes, { id: uuidv4(), text: text }];
  try {
    console.log(' json value ', notes,Date.now);
    await AsyncStorage.setItem(STORE_KEY, JSON.stringify({ notes: notes }));
  } catch (error) {
    console.log('Error ', error);
  }
};