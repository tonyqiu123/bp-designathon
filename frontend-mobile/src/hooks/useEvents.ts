import { useInfiniteQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { apiClient } from '../api/client';
import { Event, EventsQueryParams } from '../types/event';

export const useEvents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<string>('');

  const queryParams = useMemo<EventsQueryParams>(() => {
    const params: EventsQueryParams = {};

    if (searchTerm) {
      params.search = searchTerm;
    }

    if (categories) {
      params.categories = categories;
    }

    return params;
  }, [searchTerm, categories]);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['events', queryParams],
    queryFn: ({ pageParam }) =>
      apiClient.getEvents({ ...queryParams, cursor: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    initialPageParam: undefined as string | undefined,
  });

  const events = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) || [];
  }, [data]);

  const totalCount = data?.pages[0]?.totalCount || 0;

  return {
    events,
    totalCount,
    isLoading,
    error: error as Error | null,
    searchTerm,
    setSearchTerm,
    categories,
    setCategories,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
