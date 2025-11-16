import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface SearchScreenProps {
  onClose: () => void;
  onSearch: (term: string) => void;
}

const TRENDING_SEARCHES = [
  'Career & Networking',
  'Free food',
  'Academic',
  'Social & Games',
  'Creative Arts',
  'Athletics',
];

const SearchScreen: React.FC<SearchScreenProps> = ({ onClose, onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const handleSearch = (term: string) => {
    if (term.trim()) {
      // Add to recent searches if not already there
      setRecentSearches(prev => {
        const filtered = prev.filter(s => s !== term);
        return [term, ...filtered].slice(0, 5);
      });
      onSearch(term);
      onClose();
    }
  };

  const handleSelectSuggestion = (term: string) => {
    setSearchText(term);
    handleSearch(term);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <View className="flex-1">
        {/* Header with search input */}
        <View className="px-4 py-3 border-b border-gray-200">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={onClose} className="mr-3">
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
            <View className="flex-1 flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
              <Ionicons name="search" size={18} color="#9ca3af" style={{ marginRight: 8 }} />
              <TextInput
                className="flex-1 text-base text-black"
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search events..."
                placeholderTextColor="#999"
                autoFocus
                returnKeyType="search"
                onSubmitEditing={() => handleSearch(searchText)}
              />
              {searchText.length > 0 && (
                <TouchableOpacity onPress={() => setSearchText('')} className="ml-2">
                  <Ionicons name="close-circle" size={20} color="#9ca3af" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        <ScrollView className="flex-1 px-4 py-4 pt-6">
          {/* Recent Searches */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-900 mb-3">Recent</Text>
            {recentSearches.length > 0 ? (
              recentSearches.map((search, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelectSuggestion(search)}
                  className="py-3 border-b border-gray-100"
                >
                  <View className="flex-row items-center">
                    <Text className="text-gray-400 mr-3">🕐</Text>
                    <Text className="text-base text-gray-900 flex-1">{search}</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text className="text-gray-400 text-sm py-3">No searches... yet</Text>
            )}
          </View>

          {/* Trending Searches */}
          <View>
            <Text className="text-sm font-semibold text-gray-900 mb-3">Trending</Text>
            {TRENDING_SEARCHES.map((search, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelectSuggestion(search)}
                className="py-3 border-b border-gray-100"
              >
                <View className="flex-row items-center">
                  <Text className="text-gray-400 mr-3">🔥</Text>
                  <Text className="text-base text-gray-900 flex-1">{search}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
