import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }: any) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [eventReminders, setEventReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
      <ScrollView>
        {/* Header */}
        <View className="flex-row items-center px-4 pt-8 pb-2">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-black">Settings</Text>
        </View>
        {/* Account Section */}
        <View className="pt-4">
          <Text className="text-sm font-semibold text-gray-600 px-4 pb-2">Account</Text>
          
          <TouchableOpacity className="flex-row items-center justify-between px-4 py-4 border-t border-gray-200">
            <View className="flex-row items-center">
              <Ionicons name="person-outline" size={24} color="#374151" />
              <Text className="text-base text-black ml-3">Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between px-4 py-4 border-t border-gray-200">
            <View className="flex-row items-center">
              <Ionicons name="lock-closed-outline" size={24} color="#374151" />
              <Text className="text-base text-black ml-3">Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between px-4 py-4 border-t border-gray-200">
            <View className="flex-row items-center">
              <Ionicons name="mail-outline" size={24} color="#374151" />
              <Text className="text-base text-black ml-3">Email Preferences</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Notifications Section */}
        <View className="pt-8">
          <Text className="text-sm font-semibold text-gray-600 px-4 pb-2">Notifications</Text>
          
          <View className="flex-row items-center justify-between px-4 py-4 border-t border-gray-200">
            <View className="flex-row items-center flex-1">
              <Ionicons name="notifications-outline" size={24} color="#374151" />
              <Text className="text-base text-black ml-3">Enable Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E5E7EB', true: '#111827' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View className="flex-row items-center justify-between px-4 py-4 border-t border-gray-200">
            <View className="flex-row items-center flex-1">
              <Ionicons name="mail-outline" size={24} color="#374151" />
              <Text className="text-base text-black ml-3">Email Notifications</Text>
            </View>
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              trackColor={{ false: '#E5E7EB', true: '#111827' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View className="flex-row items-center justify-between px-4 py-4 border-t border-gray-200">
            <View className="flex-row items-center flex-1">
              <Ionicons name="phone-portrait-outline" size={24} color="#374151" />
              <Text className="text-base text-black ml-3">Push Notifications</Text>
            </View>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: '#E5E7EB', true: '#111827' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View className="flex-row items-center justify-between px-4 py-4 border-t border-gray-200">
            <View className="flex-row items-center flex-1">
              <Ionicons name="time-outline" size={24} color="#374151" />
              <Text className="text-base text-black ml-3">Event Reminders</Text>
            </View>
            <Switch
              value={eventReminders}
              onValueChange={setEventReminders}
              trackColor={{ false: '#E5E7EB', true: '#111827' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* App Settings Section */}
        <View className="pt-8">
          <Text className="text-sm font-semibold text-gray-600 px-4 pb-2">App Settings</Text>
          
          <View className="flex-row items-center justify-between px-4 py-4 border-t border-gray-200">
            <View className="flex-row items-center flex-1">
              <Ionicons name="moon-outline" size={24} color="#374151" />
              <Text className="text-base text-black ml-3">Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#E5E7EB', true: '#111827' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <TouchableOpacity className="flex-row items-center justify-between px-4 py-4 border-t border-gray-200">
            <View className="flex-row items-center">
              <Ionicons name="language-outline" size={24} color="#374151" />
              <Text className="text-base text-black ml-3">Language</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-sm text-gray-600 mr-2">English</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Privacy & Security Section */}
        <View className="pt-8">
          <Text className="text-sm font-semibold text-gray-600 px-4 pb-2">Privacy & Security</Text>
          
          <TouchableOpacity className="flex-row items-center justify-between px-4 py-4 border-t border-gray-200">
            <View className="flex-row items-center">
              <Ionicons name="shield-checkmark-outline" size={24} color="#374151" />
              <Text className="text-base text-black ml-3">Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between px-4 py-4 border-t border-gray-200">
            <View className="flex-row items-center">
              <Ionicons name="document-text-outline" size={24} color="#374151" />
              <Text className="text-base text-black ml-3">Terms of Service</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between px-4 py-4 border-t border-gray-200">
            <View className="flex-row items-center">
              <Ionicons name="trash-outline" size={24} color="#374151" />
              <Text className="text-base text-black ml-3">Delete Account</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View className="pt-8 pb-8">
          <Text className="text-sm font-semibold text-gray-600 px-4 pb-2">About</Text>
          
          <TouchableOpacity className="flex-row items-center justify-between px-4 py-4 border-t border-gray-200">
            <View className="flex-row items-center">
              <Ionicons name="information-circle-outline" size={24} color="#374151" />
              <Text className="text-base text-black ml-3">App Version</Text>
            </View>
            <Text className="text-sm text-gray-600">1.0.0</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between px-4 py-4 border-t border-gray-200">
            <View className="flex-row items-center">
              <Ionicons name="help-circle-outline" size={24} color="#374151" />
              <Text className="text-base text-black ml-3">Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between px-4 py-4 border-t border-gray-200">
            <View className="flex-row items-center">
              <Ionicons name="star-outline" size={24} color="#374151" />
              <Text className="text-base text-black ml-3">Rate App</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Log Out */}
        <View className="pt-8 pb-8">
          <TouchableOpacity className="flex-row items-center justify-between px-4 py-4">
            <View className="flex-row items-center">
              <Ionicons name="log-out-outline" size={24} color="#EF4444" />
              <Text className="text-base text-red-500 ml-3">Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

