import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
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
      className="bg-gray-900 rounded-xl mb-2 overflow-hidden flex-1 mx-1" 
      style={{ borderWidth: 0.5, borderColor: '#e5e7eb' }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View className="p-3.5 flex-1">
        <Text className="text-sm font-semibold text-white mb-2 leading-tight" numberOfLines={2}>
          {club.club_name}
        </Text>
        
        {club.categories && club.categories.length > 0 && (
          <View className="flex-row items-start mb-3 gap-1.5">
            <Text className="text-xs text-gray-400 leading-4" numberOfLines={2}>
              {club.categories.join(' | ')}
            </Text>
          </View>
        )}

        <View className="mt-auto">
          {club.club_page ? (
            <TouchableOpacity
              onPress={handleWebsitePress}
              className="bg-blue-bg rounded-lg py-2 px-3 mb-2 flex-row items-center justify-center gap-1.5"
            >
              <Text className="text-xs font-medium text-white">Website</Text>
            </TouchableOpacity>
          ) : (
            <View className="py-2 mb-2">
              <Text className="text-xs text-gray-400 text-center">No website available</Text>
            </View>
          )}

          {(club.ig || club.discord) && (
            <View className="flex-row gap-2">
              {club.ig && (
                <TouchableOpacity
                  onPress={handleInstagramPress}
                  className="flex-1 bg-gray-700 rounded-lg py-2 px-3 flex-row items-center justify-center gap-1.5"
                >
                  <Text className="text-xs font-medium text-white">Instagram</Text>
                </TouchableOpacity>
              )}

              {club.discord && (
                <TouchableOpacity
                  onPress={handleDiscordPress}
                  className="flex-1 bg-blue-bg rounded-lg py-2 px-3 flex-row items-center justify-center gap-1.5"
                >
                  <Text className="text-xs font-medium text-white">Discord</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ClubCard;

