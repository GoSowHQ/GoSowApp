"use client";

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { X, CreditCard, Landmark, ChevronRight, CheckCircle2, Copy, Rocket } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

type Props = {
  project: any;
  isOpen: boolean;
  onClose: () => void;
  initialAmount?: number;
  initialRewardId?: string;
};

export default function DonationModal({ project, isOpen, onClose, initialAmount, initialRewardId }: Props) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(initialAmount || 50);
  const [method, setMethod] = useState<'CARD' | 'TRANSFER' | null>(null);
  const [loading, setLoading] = useState(false);
  const [virtualAccount, setVirtualAccount] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && method === 'TRANSFER') {
      loadVirtualAccount();
    }
  }, [isOpen, method]);

  async function loadVirtualAccount() {
    try {
      const acc = await api(`/funding/projects/${project.id}/virtual-account`);
      setVirtualAccount(acc);
    } catch (err) {
      console.error('Failed to load virtual account', err);
    }
  }

  async function handleCardPayment() {
    setLoading(true);
    try {
      const res: any = await api('/funding/checkout', {
        method: 'POST',
        body: JSON.stringify({ 
          projectId: project.id, 
          amount, 
          rewardId: initialRewardId,
          provider: 'INTERSWITCH'
        }),
      });
      if (res && res.url) window.location.href = res.url;
    } catch (err) {
      alert('Failed to initiate card payment');
    } finally {
      setLoading(false);
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-10">
          <X size={20} className="text-gray-400" />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-4 mb-8">
             <div className="w-12 h-12 bg-[#7ED957]/10 rounded-2xl flex items-center justify-center shrink-0">
                <Rocket className="text-[#7ED957]" size={24} />
             </div>
             <div>
                <h3 className="font-bold text-gray-900 leading-tight">Support {project.title}</h3>
                <p className="text-gray-500 text-sm">Empower tech innovation with your gift.</p>
             </div>
          </div>

          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
               <div>
                  <label className="text-sm font-bold text-gray-700 block mb-3">Contribution Amount</label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[25, 50, 100].map((val) => (
                      <button 
                        key={val}
                        onClick={() => setAmount(val)}
                        className={`py-3 rounded-xl border-2 font-bold transition-all ${
                          amount === val ? 'border-[#7ED957] bg-[#7ED957]/5 text-[#7ED957]' : 'border-gray-100 text-gray-400 hover:border-gray-200'
                        }`}
                      >
                        ${val}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">$</span>
                    <input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-4 rounded-xl border-2 border-gray-100 focus:border-[#7ED957] outline-none font-bold text-lg transition-all"
                      placeholder="Other amount"
                    />
                  </div>
               </div>

               <button 
                onClick={() => setStep(2)}
                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all group"
               >
                 Review Payment
                 <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
               <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <div className="flex justify-between items-center mb-1">
                     <span className="text-gray-500 text-sm">Your Contribution</span>
                     <span className="font-black text-xl text-gray-900">${amount.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-400">Securely processed by GoSOW & Interswitch</p>
               </div>

               <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700 block mb-2">Select Payment Method</label>
                  
                  {/* Card Method */}
                  <button 
                    onClick={() => setMethod('CARD')}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                      method === 'CARD' ? 'border-[#7ED957] bg-[#7ED957]/5' : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                       <CreditCard size={20} className={method === 'CARD' ? 'text-[#7ED957]' : 'text-gray-400'} />
                    </div>
                    <div className="text-left flex-1">
                       <div className="font-bold text-gray-900 text-sm">Pay with Card</div>
                       <div className="text-xs text-gray-400">Instant via Interswitch Webpay</div>
                    </div>
                    {method === 'CARD' && <CheckCircle2 className="text-[#7ED957]" size={20} />}
                  </button>

                  {/* Transfer Method */}
                  <button 
                    onClick={() => setMethod('TRANSFER')}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                      method === 'TRANSFER' ? 'border-[#7ED957] bg-[#7ED957]/5' : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                       <Landmark size={20} className={method === 'TRANSFER' ? 'text-[#7ED957]' : 'text-gray-400'} />
                    </div>
                    <div className="text-left flex-1">
                       <div className="font-bold text-gray-900 text-sm">Bank Transfer</div>
                       <div className="text-xs text-gray-400">Direct Virtual Account</div>
                    </div>
                    {method === 'TRANSFER' && <CheckCircle2 className="text-[#7ED957]" size={20} />}
                  </button>
               </div>

               <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 py-4 border-2 border-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-50 transition-all">
                    Back
                  </button>
                  <button 
                    disabled={!method || loading}
                    onClick={() => method === 'CARD' ? handleCardPayment() : setStep(3)}
                    className="flex-[2] py-4 bg-[#7ED957] text-white rounded-2xl font-bold hover:bg-[#6ec04a] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? 'Processing...' : 'Complete Contribution'}
                  </button>
               </div>
            </div>
          )}

          {step === 3 && method === 'TRANSFER' && (
             <div className="space-y-6 animate-in slide-in-from-right-4">
                <div className="text-center">
                   <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Landmark size={32} className="text-blue-500" />
                   </div>
                   <h4 className="font-bold text-gray-900">Virtual Account Details</h4>
                   <p className="text-gray-500 text-sm">Make a transfer to the account below</p>
                </div>

                {virtualAccount ? (
                  <div className="space-y-4">
                     <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                        <div className="flex justify-between items-center group cursor-pointer" onClick={() => copyToClipboard(virtualAccount.accountNumber)}>
                           <div>
                              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account Number</div>
                              <div className="text-xl font-black text-gray-900 tracking-tight">{virtualAccount.accountNumber}</div>
                           </div>
                           <div className="p-2 rounded-lg bg-white shadow-sm border border-gray-100 text-gray-400">
                              <Copy size={16} />
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Bank</div>
                              <div className="font-bold text-gray-900 text-sm">{virtualAccount.bankName}</div>
                           </div>
                           <div>
                              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Name</div>
                              <div className="font-bold text-gray-900 text-sm">{virtualAccount.accountName}</div>
                           </div>
                        </div>
                     </div>

                     <div className="p-4 bg-[#7ED957]/5 rounded-xl border border-[#7ED957]/20 flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-[#7ED957] shrink-0 mt-0.5" />
                        <p className="text-[11px] text-[#7ED957] font-medium leading-relaxed">
                          The project progress will update automatically once our system confirms your transfer from Interswitch.
                        </p>
                     </div>
                  </div>
                ) : (
                  <div className="py-12 text-center text-gray-400 text-sm">Loading account details...</div>
                )}

                <button onClick={onClose} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all">
                  Done
                </button>
                {copied && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white px-4 py-2 rounded-lg text-sm font-bold shadow-xl animate-in fade-in zoom-in">
                    Copied!
                  </div>
                )}
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
