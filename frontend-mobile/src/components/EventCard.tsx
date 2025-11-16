import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Event } from '../types/event';

interface EventCardProps {
  event: Event;
  onPress: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <TouchableOpacity className="bg-white rounded-xl mb-4 overflow-hidden border border-gray-200" onPress={onPress}>
      {event.source_image_url && (
        <Image
          source={{ uri: event.source_image_url }}
          className="w-full h-44 bg-gray-100"
          resizeMode="cover"
        />
      )}
      <View className="p-3">
        <Text className="text-base font-semibold text-black mb-2" numberOfLines={2}>
          {event.title}
        </Text>
        <Text className="text-sm text-gray-600 mb-1">{formatDate(event.dtstart_utc)}</Text>
        {event.location && (
          <Text className="text-sm text-gray-500 mb-1" numberOfLines={1}>
            📍 {event.location}
          </Text>
        )}
        {event.price !== null && event.price > 0 && (
          <Text className="text-sm font-semibold text-yellow-500">${event.price}</Text>
        )}
        {event.price === 0 && (
          <Text className="text-sm font-semibold text-yellow-500">Free</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;
