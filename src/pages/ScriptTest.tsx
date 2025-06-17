
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Copy, Play, CheckCircle, AlertTriangle, Bug, BookOpen, Zap } from 'lucide-react';
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
    try {
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
      }, 3000);
    } catch (error) {
      console.error('Erro ao testar script:', error);
      toast.error('Erro ao testar o script');
    }
  };

  const testPaymentOnly = () => {
    if ((window as any).queridosAnalytics) {
      console.log('💰 TESTE ESPECÍFICO DE PAGAMENTO');
      (window as any).queridosAnalytics.trackPayment("R$ 150,00", "PIX", "Produto de Teste", "Aprovado");
      toast.success('Teste de pagamento enviado! Verifique o console e dashboard.');
    } else {
      toast.error('Script não está carregado. Teste o script primeiro.');
    }
  };

  const checkScriptStatus = () => {
    if ((window as any).queridosAnalytics) {
      const status = (window as any).queridosAnalytics.getStatus();
      console.log('📊 STATUS DO SCRIPT:', status);
      toast.success('Status exibido no console');
    } else {
      toast.error('Script não está carregado');
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Script de Tracking Atualizado</h1>
          <p className="text-muted-foreground">
            Script que não detecta páginas administrativas como online
          </p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          ✅ Páginas Admin Excluídas
        </Badge>
      </div>

      <div className="grid gap-6">
        {/* Tutorial de Implementação de Pagamentos */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <BookOpen className="w-5 h-5" />
              Tutorial: Como Fazer os Pagamentos Funcionarem
            </CardTitle>
            <CardDescription className="text-blue-700">
              Passo a passo completo para implementar detecção de pagamentos no seu site
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                  Implementar o Script no Seu Site
                </h4>
                <div className="space-y-2 text-sm text-blue-700">
                  <p>• Cole o script atualizado antes do &lt;/body&gt;</p>
                  <p>• Aguarde 2-3 segundos para o Firebase inicializar</p>
                  <p>• Teste com window.queridosAnalytics.test()</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                  Identificar o Botão de Pagamento
                </h4>
                <div className="space-y-2 text-sm text-blue-700">
                  <p>• Encontre o botão que gera o PIX/pagamento</p>
                  <p>• Pode ser um onclick, addEventListener ou função</p>
                  <p>• Exemplo: &lt;button onclick="gerarPIX()"&gt;Pagar&lt;/button&gt;</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                  Adicionar o Tracking
                </h4>
                <div className="space-y-3">
                  <p className="text-sm text-blue-700">Adicione esta linha na função do botão:</p>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                    window.queridosAnalytics.trackPayment("R$ 99,90", "PIX", "Produto", "Gerado");
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">4</span>
                  Exemplos Práticos
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-blue-800 mb-1">Exemplo 1: Botão simples</p>
                    <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                      &lt;button onclick="gerarPagamento(); window.queridosAnalytics.trackPayment('R$ 50,00', 'PIX', 'Curso', 'Gerado');"&gt;
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-800 mb-1">Exemplo 2: Função JavaScript</p>
                    <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                      function processarPagamento() {<br />
                      &nbsp;&nbsp;// seu código existente<br />
                      &nbsp;&nbsp;window.queridosAnalytics.trackPayment("R$ 199,90", "CARTAO", "Produto Premium", "Processando");<br />
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Novidades do Script */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Zap className="w-5 h-5" />
              ✨ Novidades do Script Atualizado
            </CardTitle>
            <CardDescription className="text-green-700">
              Melhorias implementadas na nova versão
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 text-sm">
              <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div className="text-green-800">
                  <strong>Páginas Administrativas Excluídas:</strong> /dashboard, /login, /script-test e /admin não contam como visitas
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div className="text-green-800">
                  <strong>Logs Detalhados:</strong> Todos os eventos são logados no console para debug
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div className="text-green-800">
                  <strong>Pagamentos Sempre Funcionam:</strong> Tracking de pagamentos funciona em qualquer página
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div className="text-green-800">
                  <strong>Melhor Estabilidade:</strong> Firebase inicialização mais robusta
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Diagnóstico de Problemas */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <Bug className="w-5 h-5" />
              Diagnóstico de Problemas nos Pagamentos
            </CardTitle>
            <CardDescription className="text-yellow-700">
              Use estes passos para identificar por que os pagamentos não aparecem
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 text-sm">
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs bg-yellow-100">1</Badge>
                <div className="text-yellow-800">
                  <strong>Teste o script aqui primeiro</strong> - Clique em "Testar Script" e veja se aparecem erros no console
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs bg-yellow-100">2</Badge>
                <div className="text-yellow-800">
                  <strong>Teste pagamento específico</strong> - Use o botão "Testar Pagamento" para ver se funciona
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs bg-yellow-100">3</Badge>
                <div className="text-yellow-800">
                  <strong>Verifique o console</strong> - Todos os passos são logados detalhadamente
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs bg-yellow-100">4</Badge>
                <div className="text-yellow-800">
                  <strong>Implemente no site externo</strong> - Cole o script novo no seu site
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button onClick={testScript} variant="outline" className="border-yellow-400 text-yellow-800 hover:bg-yellow-100">
                <Play className="w-4 h-4 mr-2" />
                Testar Script
              </Button>
              <Button onClick={testPaymentOnly} variant="outline" className="border-orange-400 text-orange-800 hover:bg-orange-100">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Testar Pagamento
              </Button>
              <Button onClick={checkScriptStatus} variant="outline" className="border-blue-400 text-blue-800 hover:bg-blue-100">
                <Bug className="w-4 h-4 mr-2" />
                Ver Status
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Script Completo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Script Completo Atualizado (Sem Dashboard)</span>
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
              ⚠️ SUBSTITUA o script antigo por este novo no seu site externo
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

        {/* Comandos de Teste Detalhados */}
        <Card>
          <CardHeader>
            <CardTitle>Como Testar no Seu Site Externo</CardTitle>
            <CardDescription>
              Use estes comandos no console do navegador após colar o novo script
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
              <div className="text-green-600">// 1. Verificar se o script carregou</div>
              <div className="text-blue-600">window.queridosAnalytics.getStatus();</div>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
              <div className="text-green-600">// 2. Testar funcionamento geral</div>
              <div className="text-blue-600">window.queridosAnalytics.test();</div>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
              <div className="text-green-600">// 3. Testar pagamento específico</div>
              <div className="text-blue-600">window.queridosAnalytics.trackPayment("R$ 99,90", "PIX", "Produto Teste", "Aprovado");</div>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
              <div className="text-green-600">// 4. Testar QR Code</div>
              <div className="text-blue-600">window.queridosAnalytics.trackQRCode("QR Teste", "https://site.com", "url");</div>
            </div>

            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">Se os pagamentos ainda não aparecerem:</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Verifique se há erros no console (F12)</li>
                <li>• Confirme que o Firebase está conectado (deve aparecer "✅ Conexão com Firebase confirmada")</li>
                <li>• Teste primeiro aqui nesta página antes de implementar no site</li>
                <li>• Use window.queridosAnalytics.getStatus() para ver o status</li>
                <li>• Verifique se a função trackPayment está sendo chamada no botão correto</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Instruções de Implementação */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              Como Implementar no Seu Site
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 text-sm">
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">1</Badge>
                <div>
                  <strong>Remova o script antigo completamente</strong> do seu site
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">2</Badge>
                <div>
                  <strong>Cole o novo script</strong> antes do &lt;/body&gt;
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">3</Badge>
                <div>
                  <strong>Aguarde 2-3 segundos</strong> para o Firebase inicializar
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">4</Badge>
                <div>
                  <strong>Teste com os comandos acima</strong> no console
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">5</Badge>
                <div>
                  <strong>Adicione trackPayment</strong> nos botões de pagamento do seu site
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">6</Badge>
                <div>
                  <strong>Teste os pagamentos</strong> para confirmar que aparecem no dashboard
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScriptTest;
