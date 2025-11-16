import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import EventsStack from './EventsStack';
import SavedStack from './SavedStack';
import ClubsScreen from '../screens/ClubsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddEventScreen from '../screens/AddEventScreen';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';

const Tab = createBottomTabNavigator();

// Placeholder screen for future tabs
const PlaceholderScreen = ({ title }: { title: string }) => (
  <View className="flex-1 justify-center items-center bg-gray-50">
    <Text className="text-2xl font-bold text-black mb-2">{title}</Text>
    <Text className="text-base text-gray-600">Coming soon...</Text>
  </View>
);

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
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
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
            name="Add"
            component={AddEventScreen}
            options={{
              tabBarLabel: '',
              tabBarIcon: () => null,
              tabBarButton: (props) => (
                <TouchableOpacity
                  {...props}
                  style={{
                    top: -5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      backgroundColor: '#3b82f6',
                      justifyContent: 'center',
                      alignItems: 'center',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                    }}
                  >
                    <Ionicons name="add" size={28} color="#ffffff" />
                  </View>
                </TouchableOpacity>
              ),
            }}
          />
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
            component={ProfileScreen}
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

const AppNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigatorContent />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
