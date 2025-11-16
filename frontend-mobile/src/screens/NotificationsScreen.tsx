import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface Notification {
  id: string;
  type: 'event' | 'reminder' | 'update' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const NotificationsScreen = ({ navigation }: any) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'event',
      title: 'New Event: Tech Talk',
      message: 'A new event "Tech Talk" has been added to your saved events',
      time: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Event Reminder',
      message: 'Design Workshop starts in 1 hour',
      time: '3 hours ago',
      read: false,
    },
    {
      id: '3',
      type: 'update',
      title: 'Event Updated',
      message: 'The location for "Hackathon Kickoff" has been changed',
      time: '1 day ago',
      read: true,
    },
    {
      id: '4',
      type: 'system',
      title: 'Welcome!',
      message: 'Thanks for joining our community. Start exploring events!',
      time: '2 days ago',
      read: true,
    },
    {
      id: '5',
      type: 'event',
      title: 'New Event: Networking Night',
      message: 'A new event "Networking Night" matches your interests',
      time: '3 days ago',
      read: true,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'event':
        return 'calendar-outline';
      case 'reminder':
        return 'time-outline';
      case 'update':
        return 'refresh-outline';
      case 'system':
        return 'information-circle-outline';
      default:
        return 'notifications-outline';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'event':
        return '#374151';
      case 'reminder':
        return '#4b5563';
      case 'update':
        return '#6b7280';
      case 'system':
        return '#9ca3af';
      default:
        return '#374151';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
      <ScrollView>
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-8 pb-2">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
              <Ionicons name="arrow-back" size={24} color="#111827" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-black">Notifications</Text>
          </View>
          {unreadCount > 0 && (
            <TouchableOpacity onPress={markAllAsRead}>
              <Text className="text-sm text-gray-600">Mark all read</Text>
            </TouchableOpacity>
          )}
        </View>
        {notifications.length === 0 ? (
          <View className="flex-1 justify-center items-center py-20">
            <Ionicons name="notifications-off-outline" size={64} color="#9CA3AF" />
            <Text className="text-lg font-semibold text-black mt-4 mb-2">No notifications</Text>
            <Text className="text-sm text-gray-600 text-center px-8">
              You're all caught up! New notifications will appear here.
            </Text>
          </View>
        ) : (
          <View>
            {notifications.map((notification, index) => (
              <TouchableOpacity
                key={notification.id}
                onPress={() => markAsRead(notification.id)}
                className={`flex-row px-4 py-4 border-t border-gray-200 ${
                  !notification.read ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mr-3">
                  <Ionicons
                    name={getIcon(notification.type) as any}
                    size={24}
                    color={getIconColor(notification.type)}
                  />
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    <Text className="text-base font-semibold text-black flex-1">
                      {notification.title}
                    </Text>
                    {!notification.read && (
                      <View className="w-2 h-2 rounded-full bg-black ml-2" />
                    )}
                  </View>
                  <Text className="text-sm text-gray-600 mb-2">
                    {notification.message}
                  </Text>
                  <Text className="text-xs text-gray-400">
                    {notification.time}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;

