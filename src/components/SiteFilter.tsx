
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SiteFilterProps {
  sites: string[];
  selectedSite: string;
  onSiteChange: (site: string) => void;
  grouped: Record<string, any[]>;
  totalCount: number;
}

export const SiteFilter = ({ sites, selectedSite, onSiteChange, grouped, totalCount }: SiteFilterProps) => {
  if (sites.length <= 1) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 pb-4 border-b border-gray-700">
      <Button
        variant={selectedSite === 'todos' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSiteChange('todos')}
        className={`${
          selectedSite === 'todos' 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-gray-700 hover:bg-gray-600 text-gray-300 border-gray-600'
        }`}
      >
        Todos
        <Badge 
          variant="secondary" 
          className="ml-2 bg-gray-800 text-gray-300"
        >
          {totalCount}
        </Badge>
      </Button>
      
      {sites.map((site) => (
        <Button
          key={site}
          variant={selectedSite === site ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSiteChange(site)}
          className={`${
            selectedSite === site 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300 border-gray-600'
          }`}
        >
          {site}
          <Badge 
            variant="secondary" 
            className="ml-2 bg-gray-800 text-gray-300"
          >
            {grouped[site]?.length || 0}
          </Badge>
        </Button>
      ))}
    </div>
  );
};
