import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import SavedScreen from '../screens/SavedScreen';
import EventDetailScreen from '../screens/EventDetailScreen';

const Stack = createStackNavigator();

const SavedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        gestureEnabled: true,
        gestureDirection: 'vertical',
      }}
    >
      <Stack.Screen name="SavedList" component={SavedScreen} />
      <Stack.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default SavedStack;
