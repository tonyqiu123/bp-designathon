import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { Event } from '../types/event';
import { getEventStatus, isEventNew } from '../utils/eventUtils';
import BadgeMask from './BadgeMask';

interface EventCardProps {
  event: Event;
  onPress: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

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

  const status = getEventStatus(event);
  const isNew = isEventNew(event);

  // Pulsating animation for LIVE badge
  useEffect(() => {
    if (status === 'live') {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [status, pulseAnim]);

  return (
    <TouchableOpacity className="bg-white rounded-xl mb-2 overflow-hidden border border-gray-200" onPress={onPress}>
      <View className="relative">
        {event.source_image_url && (
          <Image
            source={{ uri: event.source_image_url }}
            className="w-full h-40 bg-gray-100"
            resizeMode="cover"
          />
        )}

        {/* Event Status Badge (top-right) */}
        {status === 'live' && (
          <BadgeMask variant="top-right">
            <Animated.View
              className="bg-red-600 px-2 py-1 rounded-lg"
              style={{ transform: [{ scale: pulseAnim }] }}
            >
              <Text className="text-xs font-extrabold text-white">LIVE</Text>
            </Animated.View>
          </BadgeMask>
        )}
        {status === 'soon' && (
          <BadgeMask variant="top-right">
            <View className="bg-orange-500 px-2 py-1 rounded-lg">
              <Text className="text-xs font-extrabold text-white">Starting soon</Text>
            </View>
          </BadgeMask>
        )}

        {/* New Event Badge (top-left) */}
        {isNew && (
          <BadgeMask variant="top-left">
            <View className="bg-blue-600 px-2 py-1 rounded-lg">
              <Text className="text-xs font-extrabold text-white">NEW</Text>
            </View>
          </BadgeMask>
        )}

        {/* Organization Badge (bottom-left) */}
        {event.display_handle && (
          <BadgeMask variant="bottom-left">
            <View className="bg-gray-100 px-2 py-1 rounded-lg">
              <Text className="text-xs font-extrabold text-gray-900">
                {event.ig_handle && event.display_handle === event.ig_handle
                  ? `@${event.display_handle}`
                  : event.display_handle}
              </Text>
            </View>
          </BadgeMask>
        )}
      </View>
      <View className="p-2.5">
        <Text className="text-sm font-semibold text-black mb-1.5" numberOfLines={2}>
          {event.title}
        </Text>
        <Text className="text-xs text-gray-600 mb-1">{formatDate(event.dtstart_utc)}</Text>
        {event.location && (
          <Text className="text-xs text-gray-500 mb-1" numberOfLines={1}>
            📍 {event.location}
          </Text>
        )}
        {event.price !== null && event.price > 0 && (
          <Text className="text-sm font-semibold text-yellow-500">${event.price}</Text>
        )}
        {event.price === 0 && (
          <Text className="text-sm font-semibold text-yellow-500">Free</Text>
        )}
        {event.food && event.food.trim() !== '' && (
          <Text className="text-xs text-gray-500 mb-1" numberOfLines={1}>
            🍴 {event.food}
          </Text>
        )}
        {event.registration && (
          <Text className="text-xs text-gray-500 italic">
            Registration required
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;
