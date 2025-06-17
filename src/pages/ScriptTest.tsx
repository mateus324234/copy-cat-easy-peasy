
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Copy, Play, CheckCircle } from 'lucide-react';
import { getTrackingScript, getScriptInstructions } from '@/utils/generateScript';
import { toast } from 'sonner';

const ScriptTest = () => {
  const [copied, setCopied] = useState(false);
  const script = getTrackingScript();
  const instructions = getScriptInstructions();

  const copyScript = () => {
    navigator.clipboard.writeText(instructions);
    setCopied(true);
    toast.success('Script copiado para área de transferência!');
    setTimeout(() => setCopied(false), 2000);
  };

  const testScript = () => {
    // Simular o carregamento do script
    try {
      // Executar o script no contexto atual
      const scriptElement = document.createElement('script');
      scriptElement.textContent = script;
      document.head.appendChild(scriptElement);
      
      setTimeout(() => {
        if ((window as any).queridosAnalytics) {
          toast.success('Script carregado com sucesso! Verifique o console.');
          console.log('🎯 TESTE DO SCRIPT QUERIDOS ANALYTICS');
          (window as any).queridosAnalytics.test();
        } else {
          toast.error('Erro ao carregar o script');
        }
      }, 2000);
    } catch (error) {
      console.error('Erro ao testar script:', error);
      toast.error('Erro ao testar o script');
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Script de Tracking Atualizado</h1>
          <p className="text-muted-foreground">
            Novo script que conecta diretamente ao Firebase - funciona em qualquer deploy
          </p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          ✅ Independente de Deploy
        </Badge>
      </div>

      <div className="grid gap-6">
        {/* Instruções */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              Como Usar o Novo Script
            </CardTitle>
            <CardDescription>
              Siga estes passos para implementar o tracking no seu site externo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 text-sm">
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">1</Badge>
                <div>
                  <strong>Remova o script antigo</strong> do seu site externo (se houver)
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">2</Badge>
                <div>
                  <strong>Copie o script completo</strong> abaixo e cole no seu site
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">3</Badge>
                <div>
                  <strong>Cole antes do &lt;/body&gt;</strong> do seu HTML
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">4</Badge>
                <div>
                  <strong>Teste o funcionamento</strong> usando os comandos de exemplo
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Script Completo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Script Completo para Copiar</span>
              <Button 
                onClick={copyScript}
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
              >
                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado!' : 'Copiar'}
              </Button>
            </CardTitle>
            <CardDescription>
              Este script funciona independente de onde você faz deploy do seu projeto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={instructions}
              readOnly
              className="font-mono text-xs h-96 resize-none"
            />
          </CardContent>
        </Card>

        {/* Teste Local */}
        <Card>
          <CardHeader>
            <CardTitle>Testar Script Localmente</CardTitle>
            <CardDescription>
              Teste o script aqui mesmo para verificar se está funcionando
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={testScript} className="w-full">
              <Play className="w-4 h-4 mr-2" />
              Testar Script Agora
            </Button>
          </CardContent>
        </Card>

        {/* Comandos de Exemplo */}
        <Card>
          <CardHeader>
            <CardTitle>Comandos para Testar no Seu Site</CardTitle>
            <CardDescription>
              Após colar o script, use estes comandos no console do navegador
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
              <div className="text-green-600">// Testar funcionamento geral</div>
              <div>window.queridosAnalytics.test();</div>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
              <div className="text-green-600">// Rastrear pagamento</div>
              <div>window.queridosAnalytics.trackPayment("R$ 99,90", "PIX", "Produto Teste", "Pago");</div>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
              <div className="text-green-600">// Rastrear QR Code</div>
              <div>window.queridosAnalytics.trackQRCode("QR Teste", "https://site.com", "url");</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScriptTest;
