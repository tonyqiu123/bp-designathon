import axios, { AxiosInstance } from 'axios';
import Constants from 'expo-constants';
import { EventsResponse, EventsQueryParams } from '../types/event';

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
}

export const apiClient = new APIClient();
