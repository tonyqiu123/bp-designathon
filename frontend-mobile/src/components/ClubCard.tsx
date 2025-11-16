import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Club } from '../types/club';

interface ClubCardProps {
  club: Club;
  onPress: () => void;
}

const ClubCard: React.FC<ClubCardProps> = ({ club, onPress }) => {
  const handleWebsitePress = async () => {
    if (!club.club_page) return;
    
    const isInteger = /^\d+$/.test(club.club_page);
    const url = isInteger
      ? `https://clubs.wusa.ca/clubs/${club.club_page}`
      : club.club_page;
    
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Failed to open URL:', error);
    }
  };

  const handleInstagramPress = async () => {
    if (!club.ig) return;
    
    try {
      await Linking.openURL(`https://www.instagram.com/${club.ig}/`);
    } catch (error) {
      console.error('Failed to open Instagram:', error);
    }
  };

  const handleDiscordPress = async () => {
    if (!club.discord) return;
    
    try {
      await Linking.openURL(club.discord);
    } catch (error) {
      console.error('Failed to open Discord:', error);
    }
  };

  return (
    <TouchableOpacity 
      className="bg-white rounded-xl mb-2 overflow-hidden flex-1 mx-1 border border-gray-200" 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View className="p-3.5 flex-1 relative">
        {/* Icon buttons in top right */}
        {(club.club_page || club.ig || club.discord) && (
          <View className="absolute top-2 right-2 flex-row gap-1 z-10">
            {club.club_page && (
              <TouchableOpacity
                onPress={handleWebsitePress}
                className="bg-gray-700 rounded-md py-1 px-1.5 flex-row items-center justify-center"
              >
                <Ionicons name="globe-outline" size={14} color="#ffffff" />
              </TouchableOpacity>
            )}

            {club.ig && (
              <TouchableOpacity
                onPress={handleInstagramPress}
                className="bg-gray-700 rounded-md py-1 px-1.5 flex-row items-center justify-center"
              >
                <Ionicons name="logo-instagram" size={14} color="#ffffff" />
              </TouchableOpacity>
            )}

            {club.discord && (
              <TouchableOpacity
                onPress={handleDiscordPress}
                className="bg-blue-bg rounded-md py-1 px-1.5 flex-row items-center justify-center"
              >
                <Ionicons name="logo-discord" size={14} color="#ffffff" />
              </TouchableOpacity>
            )}
          </View>
        )}

        <Text className="text-base font-semibold text-black mb-2 leading-tight pr-16" numberOfLines={2}>
          {club.club_name}
        </Text>
        
        {club.categories && club.categories.length > 0 && (
          <View className="flex-row items-start mb-3 gap-1.5">
            <Text className="text-sm text-gray-600 leading-4" numberOfLines={2}>
              {club.categories.join(' | ')}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ClubCard;

