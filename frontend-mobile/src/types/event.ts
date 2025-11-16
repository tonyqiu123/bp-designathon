export interface EventDate {
  dtstart_utc: string;
  dtend_utc: string | null;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  dtstart_utc: string;
  dtend_utc: string | null;
  price: number | null;
  food: string | null;
  registration: boolean;
  source_image_url: string | null;
  club_type: string | null;
  added_at: string;
  school: string | null;
  status: string;
  ig_handle: string | null;
  discord_handle: string | null;
  x_handle: string | null;
  tiktok_handle: string | null;
  fb_handle: string | null;
  source_url: string | null;
  display_handle: string;
  interest_count: number;
  occurrences?: EventDate[];
  is_submitter?: boolean;
}

export interface EventsResponse {
  results: Event[];
  nextCursor: string | null;
  hasMore: boolean;
  totalCount: number;
}

export interface EventsQueryParams {
  search?: string;
  categories?: string;
  dtstart_utc?: string;
  added_at?: string;
  cursor?: string;
}
