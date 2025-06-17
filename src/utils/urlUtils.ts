
export const formatCleanUrl = (url: string | undefined): string => {
  if (!url) return '';
  
  try {
    // Remove protocolo se existir
    let cleanUrl = url.replace(/^https?:\/\//, '');
    
    // Remove www.
    cleanUrl = cleanUrl.replace(/^www\./, '');
    
    // Remove parâmetros de query e hash
    cleanUrl = cleanUrl.split('?')[0].split('#')[0];
    
    // Remove trailing slash
    cleanUrl = cleanUrl.replace(/\/$/, '');
    
    // Se for apenas um domínio, extrair nome principal
    if (cleanUrl.includes('.')) {
      const parts = cleanUrl.split('/');
      const domain = parts[0];
      const path = parts.slice(1).join('/');
      
      // Extrair nome principal do domínio (ex: beachpark.com -> beachpark)
      const domainParts = domain.split('.');
      const mainName = domainParts[0];
      
      // Se tem path, mostrar nome + path resumido
      if (path) {
        return `${mainName}/${path}`;
      }
      
      return mainName;
    }
    
    return cleanUrl;
  } catch (error) {
    return url.slice(0, 20) + (url.length > 20 ? '...' : '');
  }
};

export const getDisplayUrl = (page?: string, referrer?: string): string => {
  // Priorizar página atual, depois referrer
  const url = page || referrer;
  return formatCleanUrl(url);
};
