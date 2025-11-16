import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Event } from '../types/event';

interface EventCardProps {
  event: Event;
  onPress: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {event.source_image_url && (
        <Image
          source={{ uri: event.source_image_url }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {event.title}
        </Text>
        <Text style={styles.date}>{formatDate(event.dtstart_utc)}</Text>
        {event.location && (
          <Text style={styles.location} numberOfLines={1}>
            📍 {event.location}
          </Text>
        )}
        {event.price !== null && event.price > 0 && (
          <Text style={styles.price}>${event.price}</Text>
        )}
        {event.price === 0 && (
          <Text style={styles.free}>Free</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600' as any,
    color: '#1a1a1a',
    marginBottom: 6,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  location: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '600' as any,
    color: '#10b981',
  },
  free: {
    fontSize: 14,
    fontWeight: '600' as any,
    color: '#10b981',
  },
});

export default EventCard;
