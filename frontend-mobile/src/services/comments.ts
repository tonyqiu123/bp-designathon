import AsyncStorage from '@react-native-async-storage/async-storage';

const COMMENTS_KEY = '@event_comments';

export interface Comment {
  id: string;
  eventId: number;
  userId: string;
  userName: string;
  text: string;
  timestamp: number;
}

interface CommentsStorage {
  [eventId: number]: Comment[];
}

export const commentsService = {
  async getComments(eventId: number): Promise<Comment[]> {
    try {
      const storage = await AsyncStorage.getItem(COMMENTS_KEY);
      const comments: CommentsStorage = storage ? JSON.parse(storage) : {};
      return comments[eventId] || [];
    } catch (error) {
      console.error('Failed to get comments:', error);
      return [];
    }
  },

  async addComment(eventId: number, text: string): Promise<Comment> {
    try {
      const storage = await AsyncStorage.getItem(COMMENTS_KEY);
      const comments: CommentsStorage = storage ? JSON.parse(storage) : {};

      const newComment: Comment = {
        id: Date.now().toString(),
        eventId,
        userId: 'user1',
        userName: 'John Doe',
        text,
        timestamp: Date.now(),
      };

      if (!comments[eventId]) {
        comments[eventId] = [];
      }
      comments[eventId].unshift(newComment);

      await AsyncStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
      return newComment;
    } catch (error) {
      console.error('Failed to add comment:', error);
      throw error;
    }
  },

  async getCommentCount(eventId: number): Promise<number> {
    const comments = await this.getComments(eventId);
    return comments.length;
  },
};
