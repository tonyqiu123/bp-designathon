import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  PanResponder,
  Dimensions,
  Linking,
} from 'react-native';
import { Event } from '../types/event';

interface EventDetailModalProps {
  visible: boolean;
  event: Event | null;
  onClose: () => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const EventDetailModal: React.FC<EventDetailModalProps> = ({
  visible,
  event,
  onClose,
}) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible && event) {
      translateY.setValue(0);
    }
  }, [visible, event]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            onClose();
            translateY.setValue(0);
          });
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (!visible || !event) {
    return null;
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch (e) {
      return dateString;
    }
  };

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      });
    } catch (e) {
      return '';
    }
  };

  const handleOpenLink = (url: string) => {
    if (url) {
      Linking.openURL(url).catch(err => console.error('Error opening URL:', err));
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' }}>
        <TouchableOpacity
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={{
            transform: [{ translateY }],
            maxHeight: SCREEN_HEIGHT * 0.9,
            backgroundColor: 'white',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          <View {...panResponder.panHandlers} style={{ alignItems: 'center', paddingVertical: 12 }}>
            <View style={{ width: 40, height: 4, backgroundColor: '#d1d5db', borderRadius: 2 }} />
          </View>

          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {event.source_image_url ? (
              <Image
                source={{ uri: event.source_image_url }}
                style={{ width: '100%', height: 250, backgroundColor: '#f3f4f6' }}
                resizeMode="cover"
              />
            ) : (
              <View style={{ width: '100%', height: 250, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 64 }}>📅</Text>
              </View>
            )}

            <View style={{ padding: 20 }}>
              {/* Title */}
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#000', marginBottom: 20 }}>
                {event.title}
              </Text>

              {/* Date & Time */}
              <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <Text style={{ fontSize: 20, marginRight: 12, marginTop: 2 }}>📅</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 11, fontWeight: '600', color: '#6b7280', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    DATE & TIME
                  </Text>
                  <Text style={{ fontSize: 16, color: '#000', lineHeight: 22 }}>
                    {formatDate(event.dtstart_utc)}
                  </Text>
                  <Text style={{ fontSize: 16, color: '#000', lineHeight: 22 }}>
                    {formatTime(event.dtstart_utc)}
                    {event.dtend_utc && ` - ${formatTime(event.dtend_utc)}`}
                  </Text>
                </View>
              </View>

              {/* Location */}
              {event.location && event.location.trim() !== '' && (
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                  <Text style={{ fontSize: 20, marginRight: 12, marginTop: 2 }}>📍</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 11, fontWeight: '600', color: '#6b7280', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      LOCATION
                    </Text>
                    <Text style={{ fontSize: 16, color: '#000', lineHeight: 22 }}>
                      {event.location}
                    </Text>
                  </View>
                </View>
              )}

              {/* Description */}
              {event.description && event.description.trim() !== '' && (
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                  <Text style={{ fontSize: 20, marginRight: 12, marginTop: 2 }}>📝</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 11, fontWeight: '600', color: '#6b7280', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      DESCRIPTION
                    </Text>
                    <Text style={{ fontSize: 16, color: '#000', lineHeight: 22 }}>
                      {event.description}
                    </Text>
                  </View>
                </View>
              )}

              {/* Price and Food Info */}
              <View style={{ flexDirection: 'row', marginBottom: 20, gap: 16 }}>
                {event.price !== null && event.price !== undefined && (
                  <View style={{ flex: 1, backgroundColor: '#f9fafb', padding: 16, borderRadius: 12 }}>
                    <Text style={{ fontSize: 11, fontWeight: '600', color: '#6b7280', marginBottom: 4, textTransform: 'uppercase' }}>
                      PRICE
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#FFD700' }}>
                      {event.price === 0 ? 'Free' : `$${event.price}`}
                    </Text>
                  </View>
                )}

                {event.food && event.food.trim() !== '' && (
                  <View style={{ flex: 1, backgroundColor: '#f9fafb', padding: 16, borderRadius: 12 }}>
                    <Text style={{ fontSize: 11, fontWeight: '600', color: '#6b7280', marginBottom: 4, textTransform: 'uppercase' }}>
                      FOOD
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#FFD700' }}>
                      {event.food}
                    </Text>
                  </View>
                )}
              </View>

              {/* Registration Badge */}
              {event.registration && (
                <View style={{ backgroundColor: '#dbeafe', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 20 }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#1e40af' }}>
                    ✓ Registration Required
                  </Text>
                </View>
              )}

              {/* Organizer */}
              {event.display_handle && event.display_handle.trim() !== '' && (
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                  <Text style={{ fontSize: 20, marginRight: 12, marginTop: 2 }}>🏢</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 11, fontWeight: '600', color: '#6b7280', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      ORGANIZER
                    </Text>
                    <Text style={{ fontSize: 16, color: '#000', lineHeight: 22 }}>
                      {event.display_handle}
                    </Text>
                  </View>
                </View>
              )}

              {/* View Original Post Button */}
              {event.source_url && event.source_url.trim() !== '' && (
                <TouchableOpacity
                  style={{ backgroundColor: '#000', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 12, alignItems: 'center', marginBottom: 20 }}
                  onPress={() => handleOpenLink(event.source_url!)}
                >
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>
                    View Original Post
                  </Text>
                </TouchableOpacity>
              )}

              {/* Interest Count */}
              <View style={{ paddingTop: 16, borderTopWidth: 1, borderTopColor: '#e5e7eb', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, color: '#6b7280' }}>
                  ❤️ {event.interest_count || 0} {event.interest_count === 1 ? 'person' : 'people'} interested
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Footer Close Button */}
          <View style={{ padding: 16, borderTopWidth: 1, borderTopColor: '#e5e7eb' }}>
            <TouchableOpacity
              style={{ backgroundColor: '#f3f4f6', paddingVertical: 14, borderRadius: 12, alignItems: 'center' }}
              onPress={onClose}
            >
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#374151' }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default EventDetailModal;
