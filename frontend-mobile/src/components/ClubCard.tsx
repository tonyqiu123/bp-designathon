import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Club } from '../types/club';
import BadgeMask from './BadgeMask';

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
      className="bg-gray-50 rounded-xl mb-2 overflow-hidden flex-1 mx-1 border border-gray-200" 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View className="p-3.5 flex-1 relative">
        {/* Icon buttons in top right with clipped corner styling */}
        {(club.club_page || club.ig || club.discord) && (
          <BadgeMask variant="top-right">
            <View className="flex-row gap-1">
              {club.club_page && (
                <TouchableOpacity
                  onPress={handleWebsitePress}
                  className="bg-gray-700 px-2 py-1 rounded-lg flex-row items-center justify-center"
                >
                  <Ionicons name="globe-outline" size={14} color="#ffffff" />
                </TouchableOpacity>
              )}

              {club.ig && (
                <TouchableOpacity
                  onPress={handleInstagramPress}
                  className="bg-gray-700 px-2 py-1 rounded-lg flex-row items-center justify-center"
                >
                  <Ionicons name="logo-instagram" size={14} color="#ffffff" />
                </TouchableOpacity>
              )}

              {club.discord && (
                <TouchableOpacity
                  onPress={handleDiscordPress}
                  className="bg-blue-bg px-2 py-1 rounded-lg flex-row items-center justify-center"
                >
                  <Ionicons name="logo-discord" size={14} color="#ffffff" />
                </TouchableOpacity>
              )}
            </View>
          </BadgeMask>
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

