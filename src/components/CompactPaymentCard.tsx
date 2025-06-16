
import { CreditCard, Clock } from "lucide-react";

interface CompactPaymentCardProps {
  payment: {
    id: string;
    amount: string;
    status: string;
    method: string;
    product: string;
    date: string;
  };
}

export const CompactPaymentCard = ({ payment }: CompactPaymentCardProps) => {
  return (
    <div className="bg-gray-700/30 border-l-4 border-purple-500 px-3 py-2 text-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
            <CreditCard className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-white font-semibold">{payment.amount || 'R$ 0,00'}</p>
            <p className="text-gray-400 text-xs">{payment.method || 'PIX'} - {payment.product || 'Produto'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
            {payment.status || 'Aprovado'}
          </div>
          <div className="flex items-center space-x-1 text-gray-400">
            <Clock className="h-3 w-3" />
            <span className="text-xs">
              {payment.date ? new Date(payment.date).toLocaleDateString('pt-BR') + ' ' + new Date(payment.date).toLocaleTimeString('pt-BR') : 'Agora'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
