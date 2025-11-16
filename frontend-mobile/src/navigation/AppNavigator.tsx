import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import EventsStack from './EventsStack';
import SavedStack from './SavedStack';
import ProfileStack from './ProfileStack';
import ClubsScreen from '../screens/ClubsScreen';
import AddEventScreen from '../screens/AddEventScreen';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Placeholder screen for future tabs
const PlaceholderScreen = ({ title }: { title: string }) => (
  <View className="flex-1 justify-center items-center bg-gray-50">
    <Text className="text-2xl font-bold text-black mb-2">{title}</Text>
    <Text className="text-base text-gray-600">Coming soon...</Text>
  </View>
);

// Custom Add Button Component
const AddButton = () => {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('AddEvent' as never)}
      style={{
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: '#3b82f6',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Ionicons name="add" size={24} color="#ffffff" />
      </View>
    </TouchableOpacity>
  );
};

const TabNavigatorContent = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: 48 + insets.bottom,
          paddingBottom: insets.bottom + 8,
          paddingTop: 8,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Events"
        component={EventsStack}
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size || 24}
              color={focused ? color : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Clubs"
        component={ClubsScreen}
        options={{
          tabBarLabel: 'Clubs',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'people' : 'people-outline'}
              size={size || 24}
              color={focused ? color : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddPlaceholder"
        options={{
          tabBarLabel: '',
          tabBarIcon: () => null,
          tabBarButton: () => <AddButton />,
        }}
      >
        {() => <PlaceholderScreen title="" />}
      </Tab.Screen>
      <Tab.Screen
        name="Saved"
        component={SavedStack}
        options={{
          tabBarLabel: 'Saved',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              size={size || 24}
              color={focused ? color : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size || 24}
              color={focused ? color : color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={TabNavigatorContent} />
      <Stack.Screen
        name="AddEvent"
        component={AddEventScreen}
        options={{
          presentation: 'modal',
          animationTypeForReplace: 'push',
        }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
