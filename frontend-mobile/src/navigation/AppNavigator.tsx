import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import EventsScreen from '../screens/EventsScreen';
import ClubsScreen from '../screens/ClubsScreen';
import { View, Text } from 'react-native';
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
        tabBarActiveTintColor: COLORS.ACCENT,
        tabBarInactiveTintColor: COLORS.GRAY_400,
        tabBarStyle: {
          backgroundColor: COLORS.GRAY_900,
          borderTopWidth: 1,
          borderTopColor: COLORS.GRAY_600,
          height: COLORS.SPACING_16 + insets.bottom,
          paddingBottom: 0,
          paddingTop: COLORS.SPACING_2,
        },
        tabBarLabelStyle: {
          fontSize: 12, // text-xs equivalent
          fontWeight: '600' as any, // font-semibold
        },
        headerShown: false,
      }}
    >
          <Tab.Screen
            name="Events"
            component={EventsScreen}
            options={{
              tabBarLabel: 'Events',
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                  name={focused ? 'calendar' : 'calendar-outline'}
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
                  name={focused ? 'business' : 'business-outline'}
                  size={size || 24}
                  color={focused ? color : color}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Saved"
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
          >
            {() => <PlaceholderScreen title="Saved Events" />}
          </Tab.Screen>
          <Tab.Screen
            name="Profile"
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
          >
            {() => <PlaceholderScreen title="Profile" />}
          </Tab.Screen>
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
