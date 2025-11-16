import React, { useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEvents } from '../hooks/useEvents';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';
import CategoryFilters from '../components/CategoryFilters';
import { Event } from '../types/event';

const EventsScreen = () => {
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

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderEventCard = useCallback(
    ({ item }: { item: Event }) => (
      <EventCard
        event={item}
        onPress={() => {
          // TODO: Navigate to event detail screen
          console.log('Event pressed:', item.id);
        }}
      />
    ),
    []
  );

  const renderHeader = useCallback(
    () => (
      <View style={styles.header}>
        <Text style={styles.title}>{totalCount} Upcoming Events</Text>
        <SearchBar
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Search events..."
        />
        <CategoryFilters
          selectedCategory={categories}
          onSelectCategory={setCategories}
        />
      </View>
    ),
    [totalCount, searchTerm, setSearchTerm, categories, setCategories]
  );

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#374151" />
      </View>
    );
  }, [isFetchingNextPage]);

  const renderEmpty = useCallback(() => {
    if (isLoading) return null;
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No events found</Text>
      </View>
    );
  }, [isLoading]);

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.error}>
          <Text style={styles.errorText}>Error loading events</Text>
          <Text style={styles.errorSubtext}>{error.message}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEventCard}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isLoading && events.length === 0}
            colors={['#374151']}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#fff',
    paddingBottom: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold' as any,
    color: '#1a1a1a',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  empty: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600' as any,
    color: '#ef4444',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default EventsScreen;
