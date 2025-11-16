import axios, { AxiosInstance } from 'axios';
import Constants from 'expo-constants';
import { EventsResponse, EventsQueryParams, Event } from '../types/event';
import { ClubsResponse, ClubsQueryParams } from '../types/club';

const API_URL = Constants.expoConfig?.extra?.apiUrl || 'https://api.wat2do.ca/api';

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getEvents(params: EventsQueryParams = {}): Promise<EventsResponse> {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const endpoint = queryString ? `events/?${queryString}` : 'events/';
    const response = await this.client.get<EventsResponse>(endpoint);
    return response.data;
  }

  async getClubs(params: ClubsQueryParams = {}): Promise<ClubsResponse> {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const endpoint = queryString ? `clubs/?${queryString}` : 'clubs/';
    const response = await this.client.get<ClubsResponse>(endpoint);
    return response.data;
  }

  async getEventsByIds(ids: number[]): Promise<Event[]> {
    const events: Event[] = [];

    // Fetch each event by ID
    for (const id of ids) {
      try {
        const response = await this.client.get<Event>(`events/${id}/`);
        events.push(response.data);
      } catch (error) {
        console.warn(`Failed to fetch event ${id}:`, error);
      }
    }

    return events;
  }

  async submitEvent(data: {
    source_image_url?: string;
    title: string;
    description?: string;
    location: string;
    price?: number | null;
    food?: string;
    registration: boolean;
    occurrences: Array<{ dtstart_utc: string; dtend_utc?: string; tz?: string }>;
  }): Promise<any> {
    const response = await this.client.post('events/submit/', data);
    return response.data;
  }

  async extractEventFromScreenshot(imageUri: string): Promise<{
    source_image_url: string;
    title: string;
    description?: string;
    location: string;
    price?: number;
    food?: string;
    registration: boolean;
    occurrences: Array<{ dtstart_utc: string; dtend_utc?: string; tz?: string }>;
  }> {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'screenshot.jpg',
    } as any);

    const response = await this.client.post('events/extract/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

export const apiClient = new APIClient();
