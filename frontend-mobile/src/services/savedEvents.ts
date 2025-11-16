import AsyncStorage from '@react-native-async-storage/async-storage';

const SAVED_EVENTS_KEY = '@saved_events';

export const savedEventsService = {
  async getSavedEventIds(): Promise<number[]> {
    try {
      const saved = await AsyncStorage.getItem(SAVED_EVENTS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error getting saved events:', error);
      return [];
    }
  },

  async saveEvent(eventId: number): Promise<void> {
    try {
      const saved = await this.getSavedEventIds();
      if (!saved.includes(eventId)) {
        await AsyncStorage.setItem(SAVED_EVENTS_KEY, JSON.stringify([...saved, eventId]));
      }
    } catch (error) {
      console.error('Error saving event:', error);
    }
  },

  async unsaveEvent(eventId: number): Promise<void> {
    try {
      const saved = await this.getSavedEventIds();
      const filtered = saved.filter(id => id !== eventId);
      await AsyncStorage.setItem(SAVED_EVENTS_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error unsaving event:', error);
    }
  },

  async isEventSaved(eventId: number): Promise<boolean> {
    try {
      const saved = await this.getSavedEventIds();
      return saved.includes(eventId);
    } catch (error) {
      console.error('Error checking if event is saved:', error);
      return false;
    }
  },

  async toggleSaveEvent(eventId: number): Promise<boolean> {
    const isSaved = await this.isEventSaved(eventId);
    if (isSaved) {
      await this.unsaveEvent(eventId);
      return false;
    } else {
      await this.saveEvent(eventId);
      return true;
    }
  },
};
