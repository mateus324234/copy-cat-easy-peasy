
import React, { createContext, useContext, useState, useEffect } from 'react';
import { database } from '@/services/firebase';
import { onValue, ref, set, push, serverTimestamp } from 'firebase/database';

type Site = {
  id: string;
  domainName: string;
  createdAt: number;
  active: boolean;
};

interface SiteContextType {
  sites: Site[];
  activeSite: string;
  setActiveSite: (site: string) => void;
  addSite: (domainName: string) => Promise<void>;
  isLoading: boolean;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sites, setSites] = useState<Site[]>([]);
  const [activeSite, setActiveSite] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Load sites from Firebase
  useEffect(() => {
    const sitesRef = ref(database, 'sites');
    const unsubscribe = onValue(sitesRef, (snapshot) => {
      const sitesData = snapshot.val() || {};
      const sitesList = Object.keys(sitesData).map(id => ({
        id,
        ...sitesData[id]
      }));
      setSites(sitesList);
      setIsLoading(false);
    });

    // Load active site from localStorage
    const savedSite = localStorage.getItem('activeSite');
    if (savedSite) {
      setActiveSite(savedSite);
    }

    return () => unsubscribe();
  }, []);

  // Save active site to localStorage
  useEffect(() => {
    localStorage.setItem('activeSite', activeSite);
  }, [activeSite]);

  // Add a new site to Firebase
  const addSite = async (domainName: string) => {
    if (!domainName) return;
    
    // Clean up domain (remove protocol, www, trailing slashes)
    domainName = domainName.trim().toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/$/, '');
    
    // Check if site already exists
    if (sites.some(site => site.domainName === domainName)) {
      console.log('Site already exists');
      return;
    }

    const sitesRef = ref(database, 'sites');
    const newSiteRef = push(sitesRef);
    await set(newSiteRef, {
      domainName,
      createdAt: serverTimestamp(),
      active: true
    });
  };

  const value = {
    sites,
    activeSite,
    setActiveSite,
    addSite,
    isLoading
  };

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};
