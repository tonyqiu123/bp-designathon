import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { savedEventsService } from '../services/savedEvents';

const ProfileScreen = ({ navigation }: any) => {
  const [savedCount, setSavedCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const fetchSavedCount = async () => {
        const eventIds = await savedEventsService.getSavedEventIds();
        setSavedCount(eventIds.length);
      };
      fetchSavedCount();
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <ScrollView>
        {/* Header */}
        <View className="px-4 pt-4 pb-6">
          <Text className="text-2xl font-bold text-black">Profile</Text>
        </View>

        {/* Profile Info */}
        <View className="items-center pb-6 border-b border-gray-200">
          <View className="w-24 h-24 rounded-full bg-blue-600 items-center justify-center mb-4">
            <Text className="text-4xl font-bold text-white">JD</Text>
          </View>
          <Text className="text-xl font-bold text-black mb-1">John Doe</Text>
          <Text className="text-sm text-gray-600">johndoe@uwaterloo.ca</Text>
        </View>

        {/* Stats */}
        <View className="flex-row justify-around py-6 border-b border-gray-200">
          <View className="items-center">
            <Text className="text-2xl font-bold text-black">42</Text>
            <Text className="text-sm text-gray-600">Events Attended</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-black">{savedCount}</Text>
            <Text className="text-sm text-gray-600">Saved</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-black">8</Text>
            <Text className="text-sm text-gray-600">Following</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View className="py-4">
          <TouchableOpacity
            className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100"
            onPress={() => navigation.navigate('Saved')}
          >
            <View className="flex-row items-center">
              <Ionicons name="bookmark-outline" size={24} color="#374151" />
              <Text className="text-base text-black ml-3">Saved Events</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100"
            onPress={() => navigation.navigate('Saved')}
          >
            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={24} color="#374151" />
              <Text className="text-base text-black ml-3">My Events</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100"
            onPress={() => navigation.navigate('Saved')}
          >
            <View className="flex-row items-center">
              <Ionicons name="heart-outline" size={24} color="#374151" />
              <Text className="text-base text-black ml-3">Interests</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100"
            onPress={() => navigation.navigate('Notifications')}
          >
            <View className="flex-row items-center">
              <Ionicons name="notifications-outline" size={24} color="#374151" />
              <Text className="text-base text-black ml-3">Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100"
            onPress={() => navigation.navigate('Settings')}
          >
            <View className="flex-row items-center">
              <Ionicons name="settings-outline" size={24} color="#374151" />
              <Text className="text-base text-black ml-3">Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
            <View className="flex-row items-center">
              <Ionicons name="help-circle-outline" size={24} color="#374151" />
              <Text className="text-base text-black ml-3">Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
