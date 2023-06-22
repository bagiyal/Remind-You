import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
export type RootStackParamList = {
    Home: undefined;
    EditNote: {noteId : string | undefined}; 
}


export type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type EditScreenRouteProp = RouteProp<RootStackParamList, 'EditNote'> 