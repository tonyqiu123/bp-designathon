import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const SavedScreen = ({ navigation }: any) => {
  // Hardcoded saved events data
  const savedEvents = [
    {
      id: 1,
      title: 'Coffee & Networking',
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400',
      date: 'Thu, Mar 21',
      time: '3:00 PM',
      location: 'Student Center',
      organization: '@coffeclub',
    },
    {
      id: 2,
      title: 'Blueprint Tech Talk',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
      date: 'Fri, Mar 22',
      time: '6:00 PM',
      location: 'Soda Hall',
      organization: '@calblueprint',
    },
    {
      id: 3,
      title: 'Pokemon Tournament',
      image: 'https://images.unsplash.com/photo-1606503153255-59d7dcaeb14a?w=400',
      date: 'Sat, Mar 23',
      time: '2:00 PM',
      location: 'MLK Student Union',
      organization: '@pokemonclub',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      {/* Header */}
      <View className="px-4 pt-4 pb-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-black">Saved Events</Text>
        <Text className="text-sm text-gray-600 mt-1">{savedEvents.length} events saved</Text>
      </View>

      <ScrollView className="flex-1">
        {savedEvents.map((event) => (
          <TouchableOpacity
            key={event.id}
            className="flex-row bg-white border-b border-gray-100 p-4"
            activeOpacity={0.7}
          >
            {/* Event Image */}
            <Image
              source={{ uri: event.image }}
              className="w-24 h-24 rounded-lg bg-gray-200"
              resizeMode="cover"
            />

            {/* Event Info */}
            <View className="flex-1 ml-4">
              <Text className="text-base font-bold text-black mb-1" numberOfLines={2}>
                {event.title}
              </Text>
              <View className="flex-row items-center mb-1">
                <Ionicons name="calendar-outline" size={14} color="#6B7280" />
                <Text className="text-sm text-gray-600 ml-1">{event.date}</Text>
                <Text className="text-sm text-gray-600 mx-1">•</Text>
                <Text className="text-sm text-gray-600">{event.time}</Text>
              </View>
              <View className="flex-row items-center mb-1">
                <Ionicons name="location-outline" size={14} color="#6B7280" />
                <Text className="text-sm text-gray-600 ml-1" numberOfLines={1}>
                  {event.location}
                </Text>
              </View>
              <Text className="text-xs text-gray-500">{event.organization}</Text>
            </View>

            {/* Remove Button */}
            <TouchableOpacity className="ml-2 self-start">
              <Ionicons name="bookmark" size={24} color="#3B82F6" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        {/* Empty State (shown when no events) */}
        {savedEvents.length === 0 && (
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="bookmark-outline" size={64} color="#D1D5DB" />
            <Text className="text-lg font-semibold text-gray-600 mt-4">No Saved Events</Text>
            <Text className="text-sm text-gray-500 mt-2 text-center px-8">
              Tap the bookmark icon on any event to save it here
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavedScreen;
