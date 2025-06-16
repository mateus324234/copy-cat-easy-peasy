
import { QrCode, Clock } from "lucide-react";

interface CompactQRCardProps {
  qr: {
    id: string;
    product: string;
    value: string;
    type: string;
    date: string;
  };
}

export const CompactQRCard = ({ qr }: CompactQRCardProps) => {
  return (
    <div className="bg-gray-700/30 border-l-4 border-orange-500 px-3 py-2 text-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
            <QrCode className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-white font-medium">{qr.product || 'QR Code'}</p>
            <p className="text-gray-400 text-xs">{qr.type || 'produto'} - {qr.value || 'N/A'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-gray-400">
          <Clock className="h-3 w-3" />
          <span className="text-xs">
            {qr.date ? new Date(qr.date).toLocaleDateString('pt-BR') + ' ' + new Date(qr.date).toLocaleTimeString('pt-BR') : 'Agora'}
          </span>
        </div>
      </div>
    </div>
  );
};
