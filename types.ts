import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
export type RootStackParamList = {
    Home: undefined;
    EditNote: undefined; 
}

export type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;