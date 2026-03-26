"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Landmark, ArrowUpRight, Plus, CheckCircle2, AlertCircle, Loader2, Wallet, History } from 'lucide-react';
import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth-store';

export default function WithdrawalsPage() {
  const { user } = useAuthStore();
  const [projects, setProjects] = useState<any[]>([]);
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);
  const [payouts, setPayouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showAddBank, setShowAddBank] = useState(false);
  const [newBank, setNewBank] = useState({ accountNumber: '', bankCode: '', bankName: '', accountName: '' });
  
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    if (!user) return;
    loadData();
  }, [user]);

  async function loadData() {
    setLoading(true);
    try {
      const [p, b, pay] = await Promise.all([
        api<any[]>(`/users/${user?.id}/projects`),
        api<any[]>('/funding/bank-accounts/me'),
        api<any[]>('/funding/payouts/me'),
      ]);
      setProjects(p || []);
      setBankAccounts(b || []);
      setPayouts(pay || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddBank(e: any) {
    e.preventDefault();
    try {
      await api('/funding/bank-accounts/me', {
        method: 'POST',
        body: JSON.stringify(newBank),
      });
      setShowAddBank(false);
      loadData();
    } catch (err) {
      alert('Failed to add bank account');
    }
  }

  async function handleRequestPayout() {
    if (!selectedProject || amount <= 0) return;
    const defaultBank = bankAccounts.find(b => b.isDefault) || bankAccounts[0];
    if (!defaultBank) return alert('Please add a bank account first');

    try {
      await api('/funding/payouts', {
        method: 'POST',
        body: JSON.stringify({
          projectId: selectedProject.id,
          amountMinor: amount * 100,
          bankAccountId: defaultBank.id
        }),
      });
      alert('Payout requested successfully!');
      setSelectedProject(null);
      setAmount(0);
      loadData();
    } catch (err) {
      alert('Failed to request payout. Ensure you have sufficient balance.');
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="animate-spin text-[#7ED957]" size={32} />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
         <div>
            <h1 className="text-2xl font-black text-gray-900">Financial Hub</h1>
            <p className="text-gray-500 text-sm">Manage your earnings and transfers.</p>
         </div>
         <div className="flex gap-3">
            <div className="bg-white border border-gray-100 rounded-2xl px-6 py-3 shadow-sm flex items-center gap-3">
               <Wallet className="text-[#7ED957]" size={20} />
               <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Total Available</div>
                  <div className="text-lg font-black text-gray-900 leading-none mt-1">
                    {formatCurrency(projects.reduce((sum, p) => sum + p.currentAmount, 0))}
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            {/* Projects & Balances */}
            <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
               <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                 <ArrowUpRight className="text-[#7ED957]" size={20} />
                 Withdraw Funds
               </h2>
               
               <div className="space-y-4">
                  {projects.filter(p => p.currentAmount > 0).map(project => (
                    <div key={project.id} className="p-5 border border-gray-50 rounded-2xl hover:border-[#7ED957]/30 transition-all flex items-center justify-between group">
                       <div>
                          <div className="font-bold text-gray-900">{project.title}</div>
                          <div className="text-xs text-gray-400">Available: {formatCurrency(project.currentAmount)}</div>
                       </div>
                       <button 
                        onClick={() => { setSelectedProject(project); setAmount(project.currentAmount); }}
                        className="px-4 py-2 bg-gray-50 text-gray-900 rounded-xl text-xs font-bold hover:bg-[#7ED957] hover:text-white transition-all shadow-sm"
                       >
                         Widthdraw
                       </button>
                    </div>
                  ))}
                  {projects.filter(p => p.currentAmount > 0).length === 0 && (
                    <div className="py-12 text-center border-2 border-dashed border-gray-50 rounded-2xl">
                       <AlertCircle className="mx-auto text-gray-300 mb-2" />
                       <p className="text-gray-400 text-sm">No funds available for withdrawal yet.</p>
                    </div>
                  )}
               </div>

               {selectedProject && (
                 <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-8 pt-8 border-t border-gray-50 overflow-hidden">
                    <div className="bg-gray-50 rounded-2xl p-6">
                       <div className="flex justify-between items-center mb-6">
                          <h3 className="font-bold text-gray-900 underline decoration-[#7ED957] underline-offset-4">Withdrawal Request</h3>
                          <button onClick={() => setSelectedProject(null)} className="text-xs text-gray-400 hover:text-gray-600 font-bold uppercase tracking-widest">Cancel</button>
                       </div>
                       <div className="space-y-4">
                          <div>
                             <label className="text-xs font-bold text-gray-400 uppercase block mb-2 px-1">Amount to Transfer</label>
                             <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-400">$</span>
                                <input 
                                  type="number" 
                                  value={amount} 
                                  onChange={(e) => setAmount(Number(e.target.value))}
                                  className="w-full pl-8 pr-4 py-4 bg-white rounded-xl border border-gray-200 focus:border-[#7ED957] outline-none font-black text-xl text-gray-900 shadow-inner"
                                />
                             </div>
                             <p className="text-[10px] text-gray-400 mt-2 px-1 italic">Max available: {formatCurrency(selectedProject.currentAmount)}</p>
                          </div>
                          <button 
                            onClick={handleRequestPayout}
                            className="w-full py-4 bg-[#7ED957] text-white rounded-xl font-bold hover:shadow-lg hover:shadow-[#7ED957]/20 transition-all transform active:scale-[0.98]"
                          >
                            Confirm Withdrawal
                          </button>
                       </div>
                    </div>
                 </motion.div>
               )}
            </section>

            {/* Recent Payouts */}
            <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
               <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                 <History className="text-gray-400" size={20} />
                 Transaction History
               </h2>
               <div className="space-y-4">
                  {payouts.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                       <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${p.status === 'SUCCESSFUL' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                             {p.status === 'SUCCESSFUL' ? <CheckCircle2 size={14} /> : <Loader2 size={14} className="animate-spin" />}
                          </div>
                          <div>
                             <div className="text-xs font-bold text-gray-900">{formatCurrency(p.amountMinor / 100)}</div>
                             <div className="text-[10px] text-gray-400 uppercase tracking-tighter">{p.project?.title}</div>
                          </div>
                       </div>
                       <div className="text-[10px] font-bold text-gray-400">{new Date(p.createdAt).toLocaleDateString()}</div>
                    </div>
                  ))}
                  {payouts.length === 0 && (
                    <p className="text-center text-gray-400 text-xs py-8">No recent transactions.</p>
                  )}
               </div>
            </section>
         </div>

         <div className="space-y-8">
            {/* Linked Bank Account */}
            <section className="bg-gray-900 text-white rounded-3xl p-8 shadow-xl shadow-gray-200">
               <div className="flex items-center justify-between mb-6">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-[#7ED957]">Bank Setup</h2>
                  {!showAddBank && (
                    <button onClick={() => setShowAddBank(true)} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                       <Plus size={16} />
                    </button>
                  )}
               </div>

               {showAddBank ? (
                 <form onSubmit={handleAddBank} className="space-y-4">
                    <input 
                      placeholder="Account Number" 
                      className="w-full bg-white/10 border border-white/10 rounded-xl p-3 text-sm focus:bg-white/20 outline-none"
                      value={newBank.accountNumber}
                      onChange={e => setNewBank({...newBank, accountNumber: e.target.value})}
                    />
                    <select 
                      className="w-full bg-white/10 border border-white/10 rounded-xl p-3 text-sm focus:bg-white/20 outline-none appearance-none"
                      value={newBank.bankCode}
                      onChange={e => {
                        const s = e.target;
                        setNewBank({...newBank, bankCode: s.value, bankName: s.options[s.selectedIndex].text});
                      }}
                    >
                       <option value="">Select Bank</option>
                       <option value="044">Access Bank</option>
                       <option value="058">GTBank</option>
                       <option value="011">First Bank</option>
                       <option value="033">UBA</option>
                       <option value="057">Zenith Bank</option>
                    </select>
                    <input 
                      placeholder="Beneficiary Name" 
                      className="w-full bg-white/10 border border-white/10 rounded-xl p-3 text-sm focus:bg-white/20 outline-none"
                      value={newBank.accountName}
                      onChange={e => setNewBank({...newBank, accountName: e.target.value})}
                    />
                    <div className="flex gap-2 pt-2">
                       <button type="button" onClick={() => setShowAddBank(false)} className="flex-1 py-3 text-xs font-bold text-gray-400 uppercase tracking-widest">Cancel</button>
                       <button type="submit" className="flex-1 py-3 bg-[#7ED957] text-gray-900 rounded-xl text-xs font-bold uppercase tracking-widest">Link</button>
                    </div>
                 </form>
               ) : (
                 <div className="space-y-6">
                    {bankAccounts.map(bank => (
                      <div key={bank.id} className="relative group">
                         <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-3 mb-4">
                               <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                  <Landmark size={20} className="text-[#7ED957]" />
                               </div>
                               <div>
                                  <div className="font-bold text-sm">{bank.bankName}</div>
                                  <div className="text-[10px] text-gray-400 font-mono tracking-widest">{bank.accountNumber.replace(/.(?=.{4})/g, '*')}</div>
                               </div>
                            </div>
                            <div className="text-[10px] font-bold text-[#7ED957] uppercase tracking-widest">{bank.accountName}</div>
                         </div>
                      </div>
                    ))}
                    {bankAccounts.length === 0 && (
                      <div className="text-center py-8">
                         <p className="text-xs text-gray-500 mb-4">Link your direct deposit account to receive funds.</p>
                         <button onClick={() => setShowAddBank(true)} className="px-6 py-3 bg-white text-gray-900 rounded-xl text-xs font-bold uppercase tracking-widest">Add Bank</button>
                      </div>
                    )}
                 </div>
               )}
            </section>
         </div>
      </div>
    </div>
  );
}
