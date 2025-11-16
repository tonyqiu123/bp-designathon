import { useInfiniteQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { apiClient } from '../api/client';
import { Club, ClubsQueryParams } from '../types/club';

export const useClubs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<string>('all');

  const queryParams = useMemo<ClubsQueryParams>(() => {
    const params: ClubsQueryParams = {};

    if (searchTerm) {
      params.search = searchTerm;
    }

    if (category && category !== 'all') {
      params.category = category;
    }

    return params;
  }, [searchTerm, category]);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['clubs', queryParams],
    queryFn: ({ pageParam }) =>
      apiClient.getClubs({ ...queryParams, cursor: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    initialPageParam: undefined as string | undefined,
  });

  const clubs = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) || [];
  }, [data]);

  const totalCount = data?.pages[0]?.totalCount || 0;

  const uniqueCategories = useMemo(() => {
    return [
      'All categories',
      'Academic',
      'Athletics',
      'Business and Entrepreneurial',
      'Charitable, Community Service & International Development',
      'Creative Arts, Dance and Music',
      'Cultural',
      'Environmental and Sustainability',
      'Games, Recreational and Social',
      'Health Promotion',
      'Media, Publications and Web Development',
      'Political and Social Awareness',
      'Religious and Spiritual',
    ];
  }, []);

  return {
    clubs,
    totalCount,
    isLoading,
    error: error as Error | null,
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    uniqueCategories,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

