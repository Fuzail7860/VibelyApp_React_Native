import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import navigationStrings from './navigationStrings';
import * as Screens from '../Screens';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const userData = useSelector(state => state.auth.userData);
  // console.log("userdata+++++++",userData);
  return (
    <NavigationContainer>
      <Stack.Navigator >
        {/* <Stack.Screen
          name={navigationStrings.SPLASH}
          component={Screens.Splash}
          options={{headerShown: false}}
        /> */}

        {/* {false ? MainStack(Stack) : AuthStack(Stack)} */}
        {!!userData?.token ? MainStack(Stack) : AuthStack(Stack)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
