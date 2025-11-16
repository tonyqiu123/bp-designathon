import React, { useCallback } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useClubs } from '../hooks/useClubs';
import ClubCard from '../components/ClubCard';
import SearchBar from '../components/SearchBar';
import CategoryFilters from '../components/CategoryFilters';
import { Club } from '../types/club';

const ClubsScreen = () => {
  const {
    clubs,
    totalCount,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    uniqueCategories,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useClubs();

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderClubCard = useCallback(
    ({ item }: { item: Club }) => (
      <ClubCard
        club={item}
        onPress={() => {
          // TODO: Navigate to club detail screen
          console.log('Club pressed:', item.id);
        }}
      />
    ),
    []
  );

  const renderHeader = useCallback(
    () => (
      <View className="bg-blue-bg pb-3 mb-2 pt-3">
        <Text className="text-2xl font-bold text-white px-4 pt-3 pb-2">
          {totalCount} Clubs
        </Text>
        <Text className="text-sm text-gray-300 px-4 pb-3">
          Explore student clubs and organizations
        </Text>
        <SearchBar
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Search clubs..."
        />
        <CategoryFilters
          selectedCategory={category}
          onSelectCategory={setCategory}
          categories={uniqueCategories}
        />
        {!isLoading && (
          <Text className="text-xs text-gray-300 px-4 pt-2 pb-1">
            Showing {clubs.length} of {totalCount} clubs
          </Text>
        )}
      </View>
    ),
    [totalCount, searchTerm, setSearchTerm, category, setCategory, uniqueCategories, clubs.length, isLoading]
  );

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return (
      <View className="py-5 items-center">
        <ActivityIndicator size="small" color="#ffffff" />
      </View>
    );
  }, [isFetchingNextPage]);

  const renderEmpty = useCallback(() => {
    if (isLoading) return null;
    return (
      <View className="py-10 items-center">
        <Text className="text-base text-white">No clubs found</Text>
      </View>
    );
  }, [isLoading]);

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-blue-bg" edges={['top']}>
        <View className="flex-1 justify-center items-center p-5">
          <Text className="text-lg font-semibold text-red-500 mb-2">
            Error loading clubs
          </Text>
          <Text className="text-sm text-white text-center">{error.message}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-blue-bg" edges={['top']}>
      <FlatList
        data={clubs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderClubCard}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 16 }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 4 }}
        refreshControl={
          <RefreshControl
            refreshing={isLoading && clubs.length === 0}
            colors={['#ffffff']}
            tintColor="#ffffff"
          />
        }
      />
    </SafeAreaView>
  );
};

export default ClubsScreen;

