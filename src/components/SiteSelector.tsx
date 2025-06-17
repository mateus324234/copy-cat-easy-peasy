
import React from "react";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSite } from "@/context/SiteContext";

export const SiteSelector = () => {
  const { sites, activeSite, setActiveSite, isLoading } = useSite();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-gray-900/50 border border-gray-800 px-3 h-9">
        <Globe className="h-4 w-4 text-gray-400" />
        <span className="text-sm text-gray-400">Carregando...</span>
      </div>
    );
  }

  return (
    <Select value={activeSite} onValueChange={setActiveSite}>
      <SelectTrigger className="w-[180px] bg-gray-900/50 border-gray-800 text-white">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <SelectValue placeholder="Selecione um site" />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-gray-900 border-gray-800 text-white">
        <SelectGroup>
          <SelectItem value="all" className="hover:bg-gray-800">Todos os sites</SelectItem>
          {sites.map((site) => (
            <SelectItem key={site.id} value={site.domainName} className="hover:bg-gray-800">
              {site.domainName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
