
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSite } from "@/context/SiteContext";
import { toast } from "@/hooks/use-toast";

interface SitesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SitesModal = ({ isOpen, onClose }: SitesModalProps) => {
  const [newDomain, setNewDomain] = useState("");
  const { sites, addSite } = useSite();

  const handleAddSite = async () => {
    if (!newDomain) {
      toast({
        title: "Campo vazio",
        description: "Por favor, insira um domínio válido.",
        variant: "destructive",
      });
      return;
    }

    try {
      await addSite(newDomain);
      setNewDomain("");
      toast({
        title: "Site adicionado",
        description: "O site foi adicionado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o site.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 border border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Gerenciamento de Sites</DialogTitle>
          <DialogDescription className="text-gray-400">
            Cadastre aqui os domínios que você administra. Assim, poderá acompanhar separadamente as visitas, 
            QR Codes e pagamentos de cada um de forma organizada e performática.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Digite o domínio (ex: meusite.com)"
              className="bg-gray-800 border-gray-700 text-white"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
            />
            <Button onClick={handleAddSite}>Adicionar</Button>
          </div>
          
          <div className="space-y-2 mt-4">
            <h3 className="text-sm font-medium text-gray-300">Sites cadastrados:</h3>
            {sites.length === 0 ? (
              <p className="text-sm text-gray-500">Nenhum site cadastrado</p>
            ) : (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {sites.map((site) => (
                  <div key={site.id} className="flex items-center justify-between rounded px-3 py-2 bg-gray-800/50">
                    <span>{site.domainName}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(site.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
