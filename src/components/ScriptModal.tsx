
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScriptModal = ({ isOpen, onClose }: ScriptModalProps) => {
  const [domain, setDomain] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generatedScript = domain.trim() 
    ? `<script>window.location.replace("${domain.trim()}");</script>`
    : '<script>window.location.replace("meusite");</script>';

  const handleCopyScript = async () => {
    try {
      await navigator.clipboard.writeText(generatedScript);
      setCopied(true);
      toast({
        title: "Script copiado!",
        description: "O script foi copiado para a área de transferência.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o script.",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    setDomain("");
    setCopied(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">Configurar Script de Redirecionamento</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="domain" className="block text-sm font-medium text-gray-300 mb-2">
              Domínio de destino:
            </label>
            <Input
              id="domain"
              type="text"
              placeholder="https://meusite.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 rounded-xl"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Script gerado:
            </label>
            <div className="relative">
              <div className="bg-gray-800 border border-gray-600 rounded-2xl p-3 pr-12">
                <code className="text-sm text-green-400 break-all">
                  {generatedScript}
                </code>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-2 top-2 h-8 w-8 p-0 text-gray-400 hover:text-white rounded-lg"
                onClick={handleCopyScript}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleClose} className="border-gray-600 text-gray-300 hover:bg-gray-800 rounded-xl">
              Fechar
            </Button>
            <Button onClick={handleCopyScript} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
              {copied ? "Copiado!" : "Copiar Script"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
