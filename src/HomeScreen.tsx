import React from 'react';
import {Button, Text} from 'react-native';

type Props = {
    toggleNewNote: (toggle : boolean) => void
}

export const HomeScreen: React.FC<Props> = ({toggleNewNote}) => {
  return (
    <>
      <Text>Home Screen</Text>
      <Button onPress={() => toggleNewNote(true)} title="New Note" />
    </>
  );
};
