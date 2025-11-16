import React, { useCallback, useState } from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useEvents } from '../hooks/useEvents';
import EventCard from '../components/EventCard';
import CategoryFilters from '../components/CategoryFilters';
import SearchScreen from './SearchScreen';
import AnimatedNumber from '../components/AnimatedNumber';

const EventsScreen = ({ navigation }: any) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const {
    events,
    totalCount,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    categories,
    setCategories,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useEvents();

  const handleScroll = useCallback(
    ({ nativeEvent }: any) => {
      const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
      const paddingToBottom = 20;
      const isCloseToBottom =
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;

      if (isCloseToBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  // Split events into two columns
  const leftColumn: Event[] = [];
  const rightColumn: Event[] = [];

  events.forEach((event, index) => {
    if (index % 2 === 0) {
      leftColumn.push(event);
    } else {
      rightColumn.push(event);
    }
  });

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 justify-center items-center px-5">
          <Text className="text-lg font-semibold text-red-500 mb-2">
            Error loading events
          </Text>
          <Text className="text-sm text-gray-600 text-center">
            {error.message}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={false}
            colors={['#374151']}
          />
        }
      >
        {/* Header */}
        <View className="bg-white pb-2 mb-1">
          <View className="flex-row items-center justify-between px-3 pt-2 pb-1">
            <View className="flex-row items-baseline">
              <AnimatedNumber value={totalCount} className="text-2xl font-bold text-black" />
              <Text className="text-2xl font-bold text-black"> Upcoming Events</Text>
            </View>
            <TouchableOpacity onPress={() => setSearchVisible(true)} className="p-2">
              <Ionicons name="search" size={22} color="#374151" />
            </TouchableOpacity>
          </View>

          {/* Active Search Display */}
          {searchTerm && (
            <View className="mx-3 mb-2 mt-1">
              <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
                <Ionicons name="search" size={16} color="#9ca3af" style={{ marginRight: 8 }} />
                <Text className="flex-1 text-sm text-gray-900">{searchTerm}</Text>
                <TouchableOpacity onPress={() => setSearchTerm('')} className="ml-2">
                  <Ionicons name="close-circle" size={18} color="#9ca3af" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          <CategoryFilters
            selectedCategory={categories}
            onSelectCategory={setCategories}
          />
        </View>

        {/* Two Column Layout */}
        {events.length > 0 ? (
          <View className="flex-row px-2 pb-4">
            {/* Left Column */}
            <View className="flex-1 pr-1">
              {leftColumn.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onPress={() => navigation.navigate('EventDetail', { event })}
                />
              ))}
            </View>

            {/* Right Column */}
            <View className="flex-1 pl-1">
              {rightColumn.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onPress={() => navigation.navigate('EventDetail', { event })}
                />
              ))}
            </View>
          </View>
        ) : !isLoading ? (
          <View className="py-10 items-center">
            <Text className="text-base text-gray-600">No events found</Text>
          </View>
        ) : null}

        {/* Loading Footer */}
        {isFetchingNextPage && (
          <View className="py-5 items-center">
            <ActivityIndicator size="small" color="#374151" />
          </View>
        )}
      </ScrollView>

      <Modal
        visible={searchVisible}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <SearchScreen
          onClose={() => setSearchVisible(false)}
          onSearch={(term) => setSearchTerm(term)}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default EventsScreen;
