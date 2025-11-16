import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { commentsService, Comment } from '../services/comments';

interface CommentsScreenProps {
  eventId: number;
  onClose: () => void;
}

const CommentsScreen: React.FC<CommentsScreenProps> = ({ eventId, onClose }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    loadComments();
  }, [eventId]);

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const loadComments = async () => {
    setIsLoading(true);
    const fetchedComments = await commentsService.getComments(eventId);
    setComments(fetchedComments);
    setIsLoading(false);
  };

  const handleSubmitComment = async () => {
    if (!commentText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const newComment = await commentsService.addComment(eventId, commentText.trim());
      setComments([newComment, ...comments]);
      setCommentText('');
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    } catch (error) {
      console.error('Failed to submit comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <View className="border-b border-gray-200 px-4 py-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-bold text-black">Comments</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Comments List */}
      <ScrollView
        ref={scrollViewRef}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: keyboardHeight > 0 ? keyboardHeight + 80 : 80 }}
        keyboardShouldPersistTaps="handled"
      >
        {isLoading ? (
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" color="#374151" />
          </View>
        ) : comments.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="chatbubble-outline" size={64} color="#D1D5DB" />
            <Text className="text-lg font-semibold text-gray-600 mt-4">No comments yet</Text>
            <Text className="text-sm text-gray-500 mt-2">Be the first to comment!</Text>
          </View>
        ) : (
          comments.map((comment) => (
            <View key={comment.id} className="px-4 py-3 border-b border-gray-100">
              <View className="flex-row items-start">
                <View className="w-9 h-9 rounded-full bg-blue-600 items-center justify-center mr-3">
                  <Text className="text-sm font-bold text-white">
                    {comment.userName.split(' ').map((n) => n[0]).join('')}
                  </Text>
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    <Text className="text-sm font-semibold text-black mr-2">
                      {comment.userName}
                    </Text>
                    <Text className="text-xs text-gray-500">
                      {formatTimestamp(comment.timestamp)}
                    </Text>
                  </View>
                  <Text className="text-sm text-gray-900 leading-5">{comment.text}</Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Comment Input - Fixed position above keyboard */}
      <View
        className="border-t border-gray-200 px-4 bg-white absolute left-0 right-0"
        style={{
          bottom: keyboardHeight,
          paddingBottom: keyboardHeight > 0 ? 12 : (insets.bottom || 12),
          paddingTop: 12
        }}
      >
        <View className="flex-row items-center">
          <View className="w-9 h-9 rounded-full bg-blue-600 items-center justify-center mr-3">
            <Text className="text-sm font-bold text-white">JD</Text>
          </View>
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-2">
            <TextInput
              className="flex-1 text-base text-black"
              style={{ paddingVertical: 4 }}
              value={commentText}
              onChangeText={setCommentText}
              placeholder="Add a comment..."
              placeholderTextColor="#999"
              multiline
              maxLength={500}
            />
            {commentText.trim().length > 0 && (
              <TouchableOpacity
                onPress={handleSubmitComment}
                disabled={isSubmitting}
                className="ml-2"
              >
                {isSubmitting ? (
                  <ActivityIndicator size="small" color="#3b82f6" />
                ) : (
                  <Ionicons name="send" size={20} color="#3b82f6" />
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CommentsScreen;
