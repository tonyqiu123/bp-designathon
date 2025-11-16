import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { EVENT_EMOJIS_CATEGORIES, getEmojiUrl } from '../constants/events';

interface CategoryFiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {EVENT_EMOJIS_CATEGORIES.map(([emojiCategory, emoji, category]) => {
          const isActive = selectedCategory === category;

          return (
            <TouchableOpacity
              key={category}
              style={[styles.filterButton, isActive && styles.filterButtonActive]}
              onPress={() => onSelectCategory(isActive ? '' : category)}
            >
              <Image
                source={{ uri: getEmojiUrl([emojiCategory, emoji]) }}
                style={styles.emoji}
              />
              <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#374151',
  },
  emoji: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  filterText: {
    fontSize: 13,
    color: '#1a1a1a',
    fontWeight: '500' as any,
  },
  filterTextActive: {
    color: '#fff',
  },
});

export default CategoryFilters;
