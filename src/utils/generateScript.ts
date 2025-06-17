
import { generateStandaloneScript } from './standaloneTrackingScript';

// Configuração do Firebase (mesma que você já usa)
const firebaseConfig = {
  apiKey: "AIzaSyDsGz4eMdK4AvSotMRubBA6hLZ9wLdTWlY",
  authDomain: "backend-69215.firebaseapp.com",
  databaseURL: "https://backend-69215-default-rtdb.firebaseio.com",
  projectId: "backend-69215",
  storageBucket: "backend-69215.firebasestorage.app",
  messagingSenderId: "939916254169",
  appId: "1:939916254169:web:749b10fe7817f82f2617c8"
};

export function getTrackingScript() {
  return generateStandaloneScript(firebaseConfig);
}

export function getScriptInstructions() {
  return `
<!-- QUERIDOS ANALYTICS - SCRIPT ATUALIZADO -->
<!-- Conecta diretamente ao Firebase - funciona em qualquer deploy -->

<script>
${generateStandaloneScript(firebaseConfig)}
</script>

<!-- Como usar: -->
<script>
// Rastrear pagamento
window.queridosAnalytics.trackPayment("R$ 99,90", "PIX", "Produto Teste", "Pago");

// Rastrear QR Code
window.queridosAnalytics.trackQRCode("QR Code Teste", "https://site.com", "url");

// Testar funcionamento
window.queridosAnalytics.test();
</script>
  `;
}
