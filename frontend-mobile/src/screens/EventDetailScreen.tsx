import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Event } from '../types/event';
import { Ionicons } from '@expo/vector-icons';

interface EventDetailScreenProps {
  route: {
    params: {
      event: Event;
    };
  };
  navigation: any;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const EventDetailScreen: React.FC<EventDetailScreenProps> = ({ route, navigation }) => {
  const { event } = route.params;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch (e) {
      return dateString;
    }
  };

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      });
    } catch (e) {
      return '';
    }
  };

  return (
    <View className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />

      {/* Full-screen image background */}
      {event.source_image_url ? (
        <Image
          source={{ uri: event.source_image_url }}
          style={{ width: '100%', height: '100%', position: 'absolute' }}
          resizeMode="cover"
        />
      ) : (
        <View className="w-full h-full absolute bg-gray-800 items-center justify-center">
          <Text className="text-6xl">📅</Text>
        </View>
      )}

      {/* Dark gradient overlay for readability */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: SCREEN_HEIGHT * 0.5,
          background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
        }}
        className="bg-gradient-to-t from-black/90 to-transparent"
      />

      {/* Back button */}
      <SafeAreaView edges={['top']} className="absolute top-0 left-0 right-0 z-10">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-4"
        >
          <Ionicons name="chevron-back" size={28} color="#ffffff" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Right side action buttons (TikTok-style) */}
      <View className="absolute right-4 bottom-32 items-center">
        {/* Like */}
        <View className="mb-6 items-center">
          <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mb-1">
            <Ionicons name="heart-outline" size={28} color="#ffffff" />
          </View>
          <Text className="text-white text-xs font-semibold">{event.interest_count || 0}</Text>
        </View>

        {/* Comment */}
        <View className="mb-6 items-center">
          <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mb-1">
            <Ionicons name="chatbubble-outline" size={26} color="#ffffff" />
          </View>
          <Text className="text-white text-xs font-semibold">0</Text>
        </View>

        {/* Star/Bookmark */}
        <View className="mb-6 items-center">
          <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mb-1">
            <Ionicons name="star-outline" size={28} color="#ffffff" />
          </View>
        </View>

        {/* Share */}
        <View className="items-center">
          <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mb-1">
            <Ionicons name="share-outline" size={26} color="#ffffff" />
          </View>
        </View>
      </View>

      {/* Bottom information section */}
      <View className="absolute bottom-0 left-0 right-0 pr-20 pb-8">
        <ScrollView
          className="px-4"
          showsVerticalScrollIndicator={false}
          style={{ maxHeight: SCREEN_HEIGHT * 0.4 }}
        >
          {/* Organization/Handle */}
          {event.display_handle && (
            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center mr-3">
                <Text className="text-white font-bold text-lg">
                  {event.display_handle[0].toUpperCase()}
                </Text>
              </View>
              <Text className="text-white font-bold text-base">
                {event.ig_handle && event.display_handle === event.ig_handle
                  ? `@${event.display_handle}`
                  : event.display_handle}
              </Text>
            </View>
          )}

          {/* Title */}
          <Text className="text-white font-bold text-2xl mb-3">
            {event.title}
          </Text>

          {/* Description */}
          {event.description && event.description.trim() !== '' && (
            <Text className="text-white text-base mb-3 leading-5">
              {event.description}
            </Text>
          )}

          {/* Event details */}
          <View className="space-y-2 mb-4">
            {/* Date & Time */}
            <View className="flex-row items-start">
              <Ionicons name="calendar-outline" size={18} color="#ffffff" style={{ marginRight: 8, marginTop: 2 }} />
              <View className="flex-1">
                <Text className="text-white text-sm">
                  {formatDate(event.dtstart_utc)}
                </Text>
                <Text className="text-white text-sm">
                  {formatTime(event.dtstart_utc)}
                  {event.dtend_utc && ` - ${formatTime(event.dtend_utc)}`}
                </Text>
              </View>
            </View>

            {/* Location */}
            {event.location && event.location.trim() !== '' && (
              <View className="flex-row items-center">
                <Ionicons name="location-outline" size={18} color="#ffffff" style={{ marginRight: 8 }} />
                <Text className="text-white text-sm flex-1">{event.location}</Text>
              </View>
            )}

            {/* Price */}
            {event.price !== null && (
              <View className="flex-row items-center">
                <Ionicons name="cash-outline" size={18} color="#ffffff" style={{ marginRight: 8 }} />
                <Text className="text-white text-sm font-semibold">
                  {event.price === 0 ? 'Free' : `$${event.price}`}
                </Text>
              </View>
            )}

            {/* Food */}
            {event.food && event.food.trim() !== '' && (
              <View className="flex-row items-center">
                <Ionicons name="restaurant-outline" size={18} color="#ffffff" style={{ marginRight: 8 }} />
                <Text className="text-white text-sm">{event.food}</Text>
              </View>
            )}

            {/* Registration */}
            {event.registration && (
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle-outline" size={18} color="#ffffff" style={{ marginRight: 8 }} />
                <Text className="text-white text-sm">Registration required</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default EventDetailScreen;
