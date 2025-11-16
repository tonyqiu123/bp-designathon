import React, { useCallback, useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useClubs } from '../hooks/useClubs';
import ClubCard from '../components/ClubCard';
import CategoryFilters from '../components/CategoryFilters';
import SearchScreen from './SearchScreen';
import AnimatedNumber from '../components/AnimatedNumber';
import { Club } from '../types/club';

const ClubsScreen = ({ navigation }: any) => {
  const [searchVisible, setSearchVisible] = useState(false);

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

  // Split clubs into two columns
  const leftColumn: Club[] = [];
  const rightColumn: Club[] = [];

  clubs.forEach((club, index) => {
    if (index % 2 === 0) {
      leftColumn.push(club);
    } else {
      rightColumn.push(club);
    }
  });

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 justify-center items-center px-5">
          <Text className="text-xl font-semibold text-red-500 mb-2">
            Error loading clubs
          </Text>
          <Text className="text-base text-gray-600 text-center">
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
        <View className="bg-white pb-2 border-b border-gray-100">
          <View className="flex-row items-center justify-between px-3 pt-2 pb-1">
            <View className="flex-row items-baseline">
              <AnimatedNumber value={totalCount} className="text-2xl font-bold text-black" />
              <Text className="text-2xl font-bold text-black"> Clubs</Text>
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
                <Text className="flex-1 text-base text-gray-900">{searchTerm}</Text>
                <TouchableOpacity onPress={() => setSearchTerm('')} className="ml-2">
                  <Ionicons name="close-circle" size={18} color="#9ca3af" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          <CategoryFilters
            selectedCategory={category}
            onSelectCategory={setCategory}
            categories={uniqueCategories}
          />
        </View>

        {/* Two Column Layout */}
        {clubs.length > 0 ? (
          <View className="flex-row px-2 pb-4">
            {/* Left Column */}
            <View className="flex-1 pr-1">
              {leftColumn.map((club) => (
                <ClubCard
                  key={club.id}
                  club={club}
                  onPress={() => {
                    // TODO: Navigate to club detail screen
                    console.log('Club pressed:', club.id);
                  }}
                />
              ))}
            </View>

            {/* Right Column */}
            <View className="flex-1 pl-1">
              {rightColumn.map((club) => (
                <ClubCard
                  key={club.id}
                  club={club}
                  onPress={() => {
                    // TODO: Navigate to club detail screen
                    console.log('Club pressed:', club.id);
                  }}
                />
              ))}
            </View>
          </View>
        ) : !isLoading ? (
          <View className="py-10 items-center">
            <Text className="text-lg text-gray-600">No clubs found</Text>
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

export default ClubsScreen;

