import { useState } from 'react';
import { getRecommendations, FormData, RecommendationResponse } from '@/utils/api';

export const useRecommendations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RecommendationResponse | null>(null);

  const fetchRecommendations = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getRecommendations(formData);
      setData(response);
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to get recommendations';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return {
    loading,
    error,
    data,
    fetchRecommendations,
    reset
  };
};
