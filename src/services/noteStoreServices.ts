import AsyncStorage from '@react-native-async-storage/async-storage';
import {v4 as uuidv4} from 'uuid';
import 'react-native-get-random-values';

export type Note = {
  text: string;
  headtext: string;
  id: string;
};

export type NoteStore = {
  notes: Array<Note>;
};

const STORE_KEY = 'TAKE_NOTES_STORE_V2';

export const getAllNotes = async () => {
  const storeItem = await AsyncStorage.getItem(STORE_KEY);
  if (storeItem) {
    return JSON.parse(storeItem) as NoteStore;
  }
  return {notes: []};
};

export const getNote = async (id: string) => {
  const noteStore = await getAllNotes();
  const note = noteStore.notes.find(note => note.id == id);
  console.log(" get note ",note)
  return note;
};

export const saveNote = async (text: string, headtext: string ,noteId: string | undefined) => {
  // AsyncStorage.clear();
  console.log(" save note  ",headtext,text)
  const noteStore = await getAllNotes();
  if (noteId) {
    const noteIndex = noteStore.notes.findIndex(note => note.id == noteId);
    noteStore.notes.splice(noteIndex, 1, {id: noteId, headtext:headtext ,text: text});
  } else {
    noteStore.notes.push({id: uuidv4(), text: text,headtext:headtext});
  }

  try {
    console.log(" in a try to store notestore ",noteStore)
    await AsyncStorage.setItem(STORE_KEY, JSON.stringify(noteStore));
  } catch (error) {
    console.log('Error ', error);
  }
};

export const deleteNotes = async (noteId: string) => {
  const noteStore = await getAllNotes();
  const noteIndex = noteStore.notes.findIndex(note => note.id == noteId);
  noteStore.notes.splice(noteIndex, 1);
  console.log(' this ', noteId);
  await AsyncStorage.setItem(STORE_KEY, JSON.stringify(noteStore));
};
