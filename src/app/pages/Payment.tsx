import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, CreditCard, Plus } from 'lucide-react';
import {
  addPaymentMethod,
  loadAppData,
  removePaymentMethod,
  setDefaultPaymentMethod,
} from '../utils/appStore';

export default function Payment() {
  const navigate = useNavigate();
  const [methods, setMethods] = useState(loadAppData().paymentMethods);
  const [holderName, setHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');

  const refresh = () => setMethods(loadAppData().paymentMethods);

  const handleAdd = () => {
    const cleanNumber = cardNumber.replace(/\s+/g, '');
    if (!holderName.trim() || cleanNumber.length < 4 || !expiry.trim()) {
      window.alert('请填写完整的持卡人、卡号和有效期。');
      return;
    }

    addPaymentMethod({
      brand: cleanNumber.startsWith('4') ? 'Visa' : 'Mastercard',
      holderName: holderName.trim(),
      last4: cleanNumber.slice(-4),
      expiry: expiry.trim(),
    });

    setHolderName('');
    setCardNumber('');
    setExpiry('');
    refresh();
  };

  const handleDelete = (id: string) => {
    removePaymentMethod(id);
    refresh();
  };

  const handleSetDefault = (id: string) => {
    setDefaultPaymentMethod(id);
    refresh();
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border">
        <div className="flex items-center gap-3 p-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">支付方式</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="rounded-2xl border border-border bg-card p-4">
          <h2 className="mb-3 text-base font-medium">添加支付方式</h2>
          <div className="space-y-3">
            <input
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              placeholder="持卡人姓名"
              className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-primary"
            />
            <input
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="卡号（至少4位）"
              className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-primary"
            />
            <input
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="有效期（MM/YY）"
              className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-primary"
            />
            <button onClick={handleAdd} className="w-full rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2 text-white flex items-center justify-center gap-2">
              <Plus className="h-4 w-4" />
              添加支付方式
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {methods.length === 0 ? (
            <p className="text-sm text-muted-foreground">暂无支付方式，请先添加。</p>
          ) : (
            methods.map((method) => (
              <div key={method.id} className="rounded-2xl border border-border bg-card p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    <span>{method.brand} **** {method.last4}</span>
                  </div>
                  {method.isDefault && <span className="text-xs text-green-400">默认</span>}
                </div>
                <p className="text-sm text-muted-foreground">{method.holderName} · {method.expiry}</p>
                <div className="mt-3 flex gap-2">
                  {!method.isDefault && (
                    <button onClick={() => handleSetDefault(method.id)} className="rounded-lg border border-primary/40 px-3 py-1 text-xs text-primary">
                      设为默认
                    </button>
                  )}
                  <button onClick={() => handleDelete(method.id)} className="rounded-lg border border-destructive/40 px-3 py-1 text-xs text-destructive">
                    删除
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-3 text-xs text-muted-foreground">
          这是本地演示支付管理流程，未接入真实扣款网关。
        </div>
      </div>
    </div>
  );
}
