import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventsScreen from '../screens/EventsScreen';
import { View, Text, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

// Placeholder screen for future tabs
const PlaceholderScreen = ({ title }: { title: string }) => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>{title}</Text>
    <Text style={styles.placeholderSubtext}>Coming soon...</Text>
  </View>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#374151',
          tabBarInactiveTintColor: '#9ca3af',
          tabBarStyle: {
            borderTopWidth: 1,
            borderTopColor: '#e5e7eb',
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600' as any,
          },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Events"
          component={EventsScreen}
          options={{
            tabBarLabel: 'Events',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ fontSize: size, color }}>📅</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Clubs"
          options={{
            tabBarLabel: 'Clubs',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ fontSize: size, color }}>🏢</Text>
            ),
          }}
        >
          {() => <PlaceholderScreen title="Clubs" />}
        </Tab.Screen>
        <Tab.Screen
          name="Saved"
          options={{
            tabBarLabel: 'Saved',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ fontSize: size, color }}>❤️</Text>
            ),
          }}
        >
          {() => <PlaceholderScreen title="Saved Events" />}
        </Tab.Screen>
        <Tab.Screen
          name="Profile"
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ fontSize: size, color }}>👤</Text>
            ),
          }}
        >
          {() => <PlaceholderScreen title="Profile" />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold' as any,
    color: '#1a1a1a',
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 16,
    color: '#666',
  },
});

export default AppNavigator;
