
import { useMemo } from 'react';
import { getDisplayUrl } from '@/utils/urlUtils';

export const useSiteGrouping = (items: any[]) => {
  return useMemo(() => {
    const grouped = items.reduce((acc, item) => {
      const displayUrl = getDisplayUrl(item.page, item.referrer);
      const site = displayUrl || 'Direto';
      
      if (!acc[site]) {
        acc[site] = [];
      }
      acc[site].push(item);
      
      return acc;
    }, {} as Record<string, any[]>);

    const sites = Object.keys(grouped).sort((a, b) => {
      // 'Direto' sempre por último
      if (a === 'Direto') return 1;
      if (b === 'Direto') return -1;
      return a.localeCompare(b);
    });

    return { grouped, sites };
  }, [items]);
};
