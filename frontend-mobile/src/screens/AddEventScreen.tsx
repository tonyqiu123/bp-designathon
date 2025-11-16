import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Switch,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { apiClient } from '../api/client';

// Conditionally import expo-image-picker if available
let ImagePicker: any = null;
try {
  ImagePicker = require('expo-image-picker');
} catch (e) {
  // expo-image-picker not installed
}

interface Occurrence {
  dtstart_local: string;
  dtend_local: string;
}

interface EventFormData {
  title: string;
  description: string;
  location: string;
  occurrences: Occurrence[];
  price: number | null;
  food: string;
  registration: boolean;
  source_url: string;
  source_image_url?: string;
}

const AddEventScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    location: '',
    occurrences: [{ dtstart_local: '', dtend_local: '' }],
    price: null,
    food: '',
    registration: false,
    source_url: '',
  });
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImagePick = async () => {
    if (!ImagePicker) {
      Alert.alert('Not Available', 'Image picker is not available. Please install expo-image-picker.');
      return;
    }

    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant camera roll permissions to upload images.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to pick image');
    }
  };

  const handleExtract = async () => {
    if (!imageUri) return;

    setIsExtracting(true);
    try {
      const extracted = await apiClient.extractEventFromScreenshot(imageUri);
      
      // Convert UTC occurrences to local datetime-local format
      const occurrences = extracted.occurrences && extracted.occurrences.length > 0
        ? extracted.occurrences.map((occ) => {
            const startDate = occ.dtstart_utc ? new Date(occ.dtstart_utc) : null;
            const endDate = occ.dtend_utc ? new Date(occ.dtend_utc) : null;
            
            const formatForInput = (date: Date | null) => {
              if (!date) return '';
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              const hours = String(date.getHours()).padStart(2, '0');
              const minutes = String(date.getMinutes()).padStart(2, '0');
              return `${year}-${month}-${day}T${hours}:${minutes}`;
            };

            return {
              dtstart_local: formatForInput(startDate),
              dtend_local: formatForInput(endDate),
            };
          })
        : [{ dtstart_local: '', dtend_local: '' }];

      setFormData({
        title: extracted.title || '',
        description: extracted.description || '',
        location: extracted.location || '',
        occurrences,
        price: extracted.price ?? null,
        food: extracted.food || '',
        registration: extracted.registration || false,
        source_url: '',
        source_image_url: extracted.source_image_url,
      });

      Alert.alert('Success', 'Event data extracted successfully!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to extract event data');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleAddOccurrence = () => {
    setFormData({
      ...formData,
      occurrences: [...formData.occurrences, { dtstart_local: '', dtend_local: '' }],
    });
  };

  const handleRemoveOccurrence = (index: number) => {
    if (formData.occurrences.length > 1) {
      const newOccurrences = formData.occurrences.filter((_, i) => i !== index);
      setFormData({ ...formData, occurrences: newOccurrences });
    }
  };

  const handleOccurrenceChange = (index: number, field: 'dtstart_local' | 'dtend_local', value: string) => {
    const newOccurrences = [...formData.occurrences];
    newOccurrences[index] = { ...newOccurrences[index], [field]: value };
    setFormData({ ...formData, occurrences: newOccurrences });
  };

  const formatLocalToUTC = (localDateTime: string): string => {
    if (!localDateTime) return '';
    const date = new Date(localDateTime);
    return date.toISOString();
  };

  const isFormValid = (): boolean => {
    const hasTitle = formData.title.trim().length > 0;
    const hasLocation = formData.location.trim().length > 0;
    const hasStartDate = formData.occurrences.length > 0 && 
      formData.occurrences.some(occ => occ.dtstart_local.trim().length > 0);
    return hasTitle && hasLocation && hasStartDate;
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.title.trim()) {
      Alert.alert('Validation Error', 'Title is required');
      return;
    }
    if (!formData.location.trim()) {
      Alert.alert('Validation Error', 'Location is required');
      return;
    }
    if (formData.occurrences.length === 0 || !formData.occurrences[0].dtstart_local) {
      Alert.alert('Validation Error', 'At least one start date/time is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const submissionData = {
        source_image_url: formData.source_image_url || '',
        title: formData.title,
        description: formData.description,
        location: formData.location,
        price: formData.price,
        food: formData.food,
        registration: formData.registration,
        occurrences: formData.occurrences.map((occ) => ({
          dtstart_utc: formatLocalToUTC(occ.dtstart_local),
          dtend_utc: occ.dtend_local ? formatLocalToUTC(occ.dtend_local) : undefined,
          tz: 'America/Toronto',
        })),
      };

      await apiClient.submitEvent(submissionData);
      setSuccess(true);
      Alert.alert('Success', 'Event submitted successfully!');
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          location: '',
          occurrences: [{ dtstart_local: '', dtend_local: '' }],
          price: null,
          food: '',
          registration: false,
          source_url: '',
        });
        setImageUri(null);
        setSuccess(false);
      }, 2000);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || error.message || 'Failed to submit event');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <SafeAreaView className="flex-1 bg-white" edges={['top']}>
        <View className="flex-1 justify-center items-center px-5">
          <Text className="text-2xl font-bold text-black mb-2">Event Submitted!</Text>
          <Text className="text-base text-gray-600 text-center">
            Thank you for contributing. We'll review your submission soon.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        className="bg-white"
      >
        {/* Header */}
        <View className="px-4 pt-4 pb-4">
          <Text className="text-2xl font-bold text-black">Add Event</Text>
        </View>

        {/* Image Upload Section */}
        <View className="px-4 pt-4 pb-4">
          <Text className="text-base font-semibold text-black mb-3">Event Image</Text>
          {imageUri ? (
            <View className="relative">
              <Image
                source={{ uri: imageUri }}
                className="w-full h-48 bg-gray-100"
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={() => setImageUri(null)}
                className="absolute top-4 right-4 bg-black/60 rounded-full p-2"
              >
                <Ionicons name="close" size={16} color="#ffffff" />
              </TouchableOpacity>
              {!formData.source_image_url && (
                <TouchableOpacity
                  onPress={handleExtract}
                  disabled={isExtracting}
                  className="absolute bottom-4 left-4 right-4 bg-black rounded-lg py-3 flex-row items-center justify-center"
                >
                  {isExtracting ? (
                    <>
                      <ActivityIndicator size="small" color="#FFD700" style={{ marginRight: 8 }} />
                      <Text className="text-white text-base font-semibold">Extracting...</Text>
                    </>
                  ) : (
                    <>
                      <Ionicons name="sparkles" size={16} color="#FFD700" style={{ marginRight: 8 }} />
                      <Text className="text-white text-base font-semibold">Extract Event Data</Text>
                    </>
                  )}
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleImagePick}
              className="border border-gray-200 py-12 items-center justify-center"
            >
              <Ionicons name="image-outline" size={32} color="#9ca3af" />
              <Text className="text-base text-gray-600 mt-2">Tap to upload image</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Title */}
        <View className="px-4 pt-4 pb-4">
          <Text className="text-base font-semibold text-black mb-3">
            Title <Text className="text-gray-400">*</Text>
          </Text>
          <TextInput
            className="bg-white border border-gray-200 px-4 py-2 text-lg text-black rounded"
            placeholder="Event title"
            placeholderTextColor="#9ca3af"
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
            textAlignVertical="center"
          />
        </View>

        {/* Description */}
        <View className="px-4 pt-4 pb-4">
          <Text className="text-base font-semibold text-black mb-3">Description</Text>
          <TextInput
            className="bg-white border border-gray-200 px-4 py-2 text-lg text-black rounded"
            placeholder="Event description"
            placeholderTextColor="#9ca3af"
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Location */}
        <View className="px-4 pt-4 pb-4">
          <Text className="text-base font-semibold text-black mb-3">
            Location <Text className="text-gray-400">*</Text>
          </Text>
          <TextInput
            className="bg-white border border-gray-200 px-4 py-2 text-lg text-black rounded"
            placeholder="Event location"
            placeholderTextColor="#9ca3af"
            value={formData.location}
            onChangeText={(text) => setFormData({ ...formData, location: text })}
            textAlignVertical="center"
          />
        </View>

        {/* Source URL */}
        <View className="px-4 pt-4 pb-4">
          <Text className="text-base font-semibold text-black mb-3">Source URL</Text>
          <TextInput
            className="bg-white border border-gray-200 px-4 py-2 text-lg text-black rounded"
            placeholder="https://example.com/event"
            placeholderTextColor="#9ca3af"
            value={formData.source_url}
            onChangeText={(text) => setFormData({ ...formData, source_url: text })}
            keyboardType="url"
            autoCapitalize="none"
            textAlignVertical="center"
          />
        </View>

        {/* Dates & Times */}
        <View className="px-4 pt-4 pb-4 border-t border-b border-gray-200">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-base font-semibold text-black">
              Dates & Times <Text className="text-gray-400">*</Text>
            </Text>
            <TouchableOpacity
              onPress={handleAddOccurrence}
              className="flex-row items-center"
            >
              <Ionicons name="add" size={20} color="#111827" style={{ marginRight: 4 }} />
              <Text className="text-base font-semibold text-black">Add</Text>
            </TouchableOpacity>
          </View>
          {formData.occurrences.map((occurrence, index) => (
            <View key={index} className="mb-3 px-4 py-3">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-sm font-medium text-gray-600">Occurrence {index + 1}</Text>
                {formData.occurrences.length > 1 && (
                  <TouchableOpacity onPress={() => handleRemoveOccurrence(index)}>
                    <Ionicons name="trash-outline" size={18} color="#4b5563" />
                  </TouchableOpacity>
                )}
              </View>
              <View className="mb-3">
                <Text className="text-sm text-gray-600 mb-2">Start Date & Time</Text>
                <TextInput
                  className="bg-white border border-gray-200 px-4 py-2 text-base text-black rounded"
                  placeholder="YYYY-MM-DDTHH:MM"
                  placeholderTextColor="#9ca3af"
                  value={occurrence.dtstart_local}
                  onChangeText={(text) => handleOccurrenceChange(index, 'dtstart_local', text)}
                  textAlignVertical="center"
                />
              </View>
              <View>
                <Text className="text-sm text-gray-600 mb-2">End Date & Time</Text>
                <TextInput
                  className="bg-white border border-gray-200 px-4 py-2 text-base text-black rounded"
                  placeholder="YYYY-MM-DDTHH:MM"
                  placeholderTextColor="#9ca3af"
                  value={occurrence.dtend_local}
                  onChangeText={(text) => handleOccurrenceChange(index, 'dtend_local', text)}
                  textAlignVertical="center"
                />
              </View>
            </View>
          ))}
        </View>

        {/* Price */}
        <View className="px-4 pt-4 pb-4">
          <Text className="text-base font-semibold text-black mb-3">Price</Text>
          <TextInput
            className="bg-white border border-gray-200 px-4 py-2 text-lg text-black rounded"
            placeholder="0.00"
            placeholderTextColor="#9ca3af"
            value={formData.price !== null ? String(formData.price) : ''}
            onChangeText={(text) => {
              const num = parseFloat(text);
              setFormData({ ...formData, price: text === '' ? null : isNaN(num) ? null : num });
            }}
            keyboardType="decimal-pad"
            textAlignVertical="center"
          />
          <Text className="text-sm text-gray-500 mt-2">Leave empty for free events</Text>
        </View>

        {/* Food */}
        <View className="px-4 pt-4 pb-4">
          <Text className="text-base font-semibold text-black mb-3">Food & Drinks</Text>
          <TextInput
            className="bg-white border border-gray-200 px-4 py-2 text-lg text-black rounded"
            placeholder="Free pizza and drinks"
            placeholderTextColor="#9ca3af"
            value={formData.food}
            onChangeText={(text) => setFormData({ ...formData, food: text })}
            textAlignVertical="center"
          />
        </View>

        {/* Registration */}
        <View className="px-4 pt-4 pb-4 flex-row items-center justify-between">
          <Text className="text-base font-semibold text-black">Registration Required</Text>
          <Switch
            value={formData.registration}
            onValueChange={(value) => setFormData({ ...formData, registration: value })}
            trackColor={{ false: '#e5e7eb', true: '#111827' }}
            thumbColor="#ffffff"
          />
        </View>

        {/* Submit Button */}
        <View className="px-4 pt-6 pb-4">
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isSubmitting || !isFormValid()}
            className={`rounded-lg py-4 items-center justify-center ${
              isSubmitting || !isFormValid() 
                ? 'bg-gray-400' 
                : 'bg-black'
            }`}
          >
            {isSubmitting ? (
              <View className="flex-row items-center">
                <ActivityIndicator size="small" color="#FFD700" style={{ marginRight: 8 }} />
                <Text className="text-white text-base font-semibold">Submitting...</Text>
              </View>
            ) : (
              <Text className={`text-base font-semibold ${
                isFormValid() ? 'text-white' : 'text-gray-600'
              }`}>
                Submit Event
              </Text>
            )}
          </TouchableOpacity>

     
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddEventScreen;

