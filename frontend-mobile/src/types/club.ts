export interface Club {
  id: number;
  club_name: string;
  categories: string[];
  club_page: string;
  ig: string;
  discord: string;
}

export interface ClubsResponse {
  results: Club[];
  nextCursor: string | null;
  hasMore: boolean;
  totalCount: number;
}

export interface ClubsQueryParams {
  search?: string;
  category?: string;
  cursor?: string;
}

