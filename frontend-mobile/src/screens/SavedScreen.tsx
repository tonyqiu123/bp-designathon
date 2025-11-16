import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { apiClient } from '../api/client';
import { Event } from '../types/event';
import EventCard from '../components/EventCard';
import { savedEventsService } from '../services/savedEvents';

const SavedScreen = ({ navigation }: any) => {
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSavedEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const eventIds = await savedEventsService.getSavedEventIds();
      if (eventIds.length > 0) {
        const events = await apiClient.getEventsByIds(eventIds);
        setSavedEvents(events);
      } else {
        setSavedEvents([]);
      }
    } catch (error) {
      console.error('Failed to fetch saved events:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchSavedEvents();
    }, [fetchSavedEvents])
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      {/* Header */}
      <View className="px-4 pt-4 pb-4 bg-white border-b border-gray-100">
        <Text className="text-2xl font-bold text-black">Saved Events</Text>
        <Text className="text-sm text-gray-600 mt-1">{savedEvents.length} events saved</Text>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#374151" />
        </View>
      ) : (
        <ScrollView className="flex-1" contentContainerStyle={{ paddingTop: 8 }}>
          {/* Two Column Layout */}
          {savedEvents.length > 0 ? (
            <View className="flex-row px-2 pb-4">
              {/* Left Column */}
              <View className="flex-1 pr-1">
                {savedEvents
                  .filter((_, index) => index % 2 === 0)
                  .map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onPress={() => navigation.navigate('EventDetail', { event })}
                    />
                  ))}
              </View>

              {/* Right Column */}
              <View className="flex-1 pl-1">
                {savedEvents
                  .filter((_, index) => index % 2 === 1)
                  .map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onPress={() => navigation.navigate('EventDetail', { event })}
                    />
                  ))}
              </View>
            </View>
          ) : (
            <View className="flex-1 items-center justify-center py-20">
              <Ionicons name="bookmark-outline" size={64} color="#D1D5DB" />
              <Text className="text-lg font-semibold text-gray-600 mt-4">No Saved Events</Text>
              <Text className="text-sm text-gray-500 mt-2 text-center px-8">
                Tap the bookmark icon on any event to save it here
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default SavedScreen;
