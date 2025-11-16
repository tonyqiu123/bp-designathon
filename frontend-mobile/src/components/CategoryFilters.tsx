import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { EVENT_EMOJIS_CATEGORIES } from '../constants/events';

interface CategoryFiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories?: string[];
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  categories,
}) => {
  // If categories prop is provided, use it (for clubs)
  // Otherwise, use event categories
  if (categories) {
    return (
      <View className="bg-transparent py-2">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
        >
          {categories.map((category) => {
            const isActive = selectedCategory === category ||
              (category === 'All categories' && selectedCategory === 'all');

            return (
              <TouchableOpacity
                key={category}
                className={`flex-row items-center px-3 py-2 rounded-full mr-2 ${
                  isActive ? 'bg-gray-700' : 'bg-gray-100'
                }`}
                onPress={() => onSelectCategory(category === 'All categories' ? 'all' : category)}
              >
                <Text className={`text-xs ${
                  isActive ? 'text-white font-medium' : 'text-black font-medium'
                }`}>
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  // Default event categories - text only
  return (
    <View className="bg-transparent py-2">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12, gap: 16 }}
      >
        {EVENT_EMOJIS_CATEGORIES.map(([emoji, category]) => {
          const isActive = selectedCategory === category;

          return (
            <TouchableOpacity
              key={category}
              onPress={() => onSelectCategory(isActive ? '' : category)}
              className="py-2 px-1"
            >
              <Text className={`text-sm ${
                isActive ? 'text-gray-900 font-semibold' : 'text-gray-400 font-medium'
              }`}>
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CategoryFilters;
