"use client";

import { useState } from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { api } from '@/lib/api';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'next/navigation';
import { Check, ChevronRight, ChevronLeft, Image as ImageIcon, Rocket, Target, FileText, Gift } from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Basics', icon: Target, description: 'Project identity' },
  { id: 2, title: 'Story', icon: FileText, description: 'Tell your tale' },
  { id: 3, title: 'Rewards', icon: Gift, description: 'Backer perks' },
  { id: 4, title: 'Preview', icon: Rocket, description: 'Launch ready' },
];

export default function NewProjectPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    description: '',
    goalAmount: 1000,
    category: 'OPEN_SOURCE',
    imageUrl: '',
    endDate: '',
  });
  const [rewards, setRewards] = useState<{title: string, amount: number, description: string}[]>([]);
  
  const { user } = useAuthStore();
  const router = useRouter();

  const updateFormData = (fields: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const addReward = () => {
    setRewards([...rewards, { title: '', amount: 10, description: '' }]);
  };

  async function handleCreate() {
    if (!user) return router.push('/auth/login');
    try {
      const p = await api('/projects', {
        method: 'POST',
        body: JSON.stringify({ 
          ...formData,
          rewards 
        }),
      });
      router.push(`/projects/${p.slug}`);
    } catch (err) {
      alert('Failed to create project. Please check all fields.');
    }
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  if (!user) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-16 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center bg-white p-12 rounded-3xl shadow-xl max-w-md mx-auto">
             <div className="w-16 h-16 bg-[#7ED957]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Rocket className="text-[#7ED957]" size={32} />
             </div>
             <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to launch?</h2>
             <p className="text-gray-500 mb-8">Sign in to GoSOW to start building your tech project and reach thousands of backers.</p>
             <button onClick={() => router.push('/auth/login')} className="w-full py-3 bg-[#7ED957] text-white rounded-xl font-semibold hover:bg-[#6ec04a] transition-colors">
               Sign in to Continue
             </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          {/* Progress Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between max-w-2xl mx-auto relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
              {STEPS.map((step) => (
                <div key={step.id} className="relative z-10 flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentStep >= step.id ? 'bg-[#7ED957] text-white shadow-lg shadow-[#7ED957]/20' : 'bg-white text-gray-400 border-2 border-gray-200'
                  }`}>
                    {currentStep > step.id ? <Check size={20} /> : <step.icon size={20} />}
                  </div>
                  <span className={`absolute -bottom-7 text-xs font-medium whitespace-nowrap ${currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'}`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 min-h-[500px] flex flex-col">
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Project Basics</h2>
                      <p className="text-gray-500 text-sm">Set the core infrastructure for your tech project.</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-700">Project Title</label>
                        <input 
                          type="text"
                          value={formData.title} 
                          onChange={(e) => updateFormData({ title: e.target.value })} 
                          placeholder="e.g. OpenSource Cloud Infrastructure"
                          className="w-full border-gray-200 focus:border-[#7ED957] focus:ring-[#7ED957] rounded-xl p-3 mt-1.5 border transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-semibold text-gray-700">Goal Amount (USD)</label>
                          <div className="relative mt-1.5 font-bold text-gray-900 border rounded-xl overflow-hidden px-14 py-3 bg-gray-50 border-gray-200 border transition-all focus-within:border-[#7ED957] focus-within:ring-1 focus-within:ring-[#7ED957]">
                             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                             <input 
                              type="number" 
                              value={formData.goalAmount} 
                              onChange={(e) => updateFormData({ goalAmount: Number(e.target.value) })}
                              className="w-full bg-transparent border-none p-0 focus:ring-0 outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-gray-700">Category</label>
                          <select 
                            value={formData.category} 
                            onChange={(e) => updateFormData({ category: e.target.value })} 
                            className="w-full border-gray-200 focus:border-[#7ED957] focus:ring-[#7ED957] rounded-xl p-3 mt-1.5 border appearance-none bg-white transition-all font-semibold"
                          >
                            <option value="AI_ML">AI / Machine Learning</option>
                            <option value="SAAS">SaaS</option>
                            <option value="DEVELOPER_TOOLS">Developer Tools</option>
                            <option value="OPEN_SOURCE">Open Source</option>
                            <option value="WEB3">Web3 / Crypto</option>
                            <option value="TECH_EVENTS">Hardware</option>
                          </select>
                        </div>
                      </div>
                      <div>
                         <label className="text-sm font-semibold text-gray-700">Target Launch Date</label>
                         <input 
                            type="date"
                            value={formData.endDate} 
                            onChange={(e) => updateFormData({ endDate: e.target.value })} 
                            className="w-full border-gray-200 focus:border-[#7ED957] focus:ring-[#7ED957] rounded-xl p-3 mt-1.5 border transition-all"
                          />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Project Story</h2>
                      <p className="text-gray-500 text-sm">Explain why backers should support your vision.</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-700">Project Image URL</label>
                        <div className="mt-1.5 flex items-center gap-3">
                           <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-200 overflow-hidden">
                              {formData.imageUrl ? <img src={formData.imageUrl} className="w-full h-full object-cover" /> : <ImageIcon className="text-gray-300" />}
                           </div>
                           <input 
                              type="text"
                              value={formData.imageUrl} 
                              onChange={(e) => updateFormData({ imageUrl: e.target.value })} 
                              placeholder="Paste a link to your cover image"
                              className="flex-1 border-gray-200 focus:border-[#7ED957] focus:ring-[#7ED957] rounded-xl p-3 border transition-all"
                            />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-700">Short Pitch</label>
                        <textarea 
                          value={formData.shortDescription} 
                          onChange={(e) => updateFormData({ shortDescription: e.target.value })} 
                          placeholder="A one-sentence summary of your project."
                          className="w-full border-gray-200 focus:border-[#7ED957] focus:ring-[#7ED957] rounded-xl p-3 mt-1.5 border transition-all"
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-700">Detailed Description</label>
                        <textarea 
                          value={formData.description} 
                          onChange={(e) => updateFormData({ description: e.target.value })} 
                          placeholder="Describe your roadmap, technical stack, and why you're building this..."
                          className="w-full border-gray-200 focus:border-[#7ED957] focus:ring-[#7ED957] rounded-xl p-3 mt-1.5 border transition-all" 
                          rows={10} 
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Perks & Rewards</h2>
                        <p className="text-gray-500 text-sm">Offer exclusive benefits to your backers.</p>
                      </div>
                      <button onClick={addReward} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors">
                        Add Reward
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {rewards.length === 0 && (
                        <div className="py-12 text-center border-2 border-dashed border-gray-100 rounded-2xl">
                           <Gift className="text-gray-300 mx-auto mb-3" size={32} />
                           <p className="text-gray-500 text-sm">Offer early access or digital perks.</p>
                        </div>
                      )}
                      {rewards.map((reward, i) => (
                        <div key={i} className="p-5 border border-gray-100 rounded-2xl bg-gray-50 relative animate-in fade-in slide-in-from-bottom-2">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <input 
                                placeholder="Reward Name" 
                                className="border-gray-200 rounded-lg p-2 text-sm"
                                value={reward.title}
                                onChange={(e) => {
                                  const newRew = [...rewards];
                                  newRew[i].title = e.target.value;
                                  setRewards(newRew);
                                }}
                              />
                              <div className="flex items-center gap-2 border bg-white rounded-lg px-3 overflow-hidden">
                                 <span className="text-gray-400 text-xs">$</span>
                                 <input 
                                  type="number"
                                  placeholder="Amount" 
                                  className="w-full border-none p-2 text-sm focus:ring-0"
                                  value={reward.amount}
                                  onChange={(e) => {
                                    const newRew = [...rewards];
                                    newRew[i].amount = Number(e.target.value);
                                    setRewards(newRew);
                                  }}
                                />
                              </div>
                           </div>
                           <textarea 
                              placeholder="Describe the perk..." 
                              className="w-full mt-3 border-gray-200 rounded-lg p-2 text-sm"
                              rows={2}
                              value={reward.description}
                              onChange={(e) => {
                                const newRew = [...rewards];
                                newRew[i].description = e.target.value;
                                setRewards(newRew);
                              }}
                           />
                           <button 
                            onClick={() => setRewards(rewards.filter((_, idx) => idx !== i))}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-xs hover:bg-red-200"
                           >
                             ×
                           </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                   <div className="space-y-8">
                      <div className="text-center py-6">
                        <div className="w-20 h-20 bg-[#7ED957]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                           <Rocket className="text-[#7ED957]" size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Review & Launch</h2>
                        <p className="text-gray-500 text-sm max-w-sm mx-auto">Double check everything. Once launched, some details can't be changed.</p>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                           <span className="text-gray-500 text-sm underline decoration-[#7ED957]">Title</span>
                           <span className="font-bold text-gray-900">{formData.title}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                           <span className="text-gray-500 text-sm underline decoration-[#7ED957]">Goal</span>
                           <span className="font-bold text-gray-900">${formData.goalAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                           <span className="text-gray-500 text-sm underline decoration-[#7ED957]">Rewards</span>
                           <span className="font-bold text-gray-900">{rewards.length} Tiers</span>
                        </div>
                      </div>
                   </div>
                )}

                <div className="mt-auto pt-12 flex justify-between items-center">
                  <button 
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                      currentStep === 1 ? 'text-gray-300 pointer-events-none' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <ChevronLeft size={20} />
                    Back
                  </button>
                  
                  {currentStep < 4 ? (
                    <button 
                      onClick={nextStep}
                      disabled={!formData.title || !formData.goalAmount}
                      className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all disabled:opacity-50"
                    >
                      Continue
                      <ChevronRight size={20} />
                    </button>
                  ) : (
                    <button 
                      onClick={handleCreate}
                      className="flex items-center gap-2 px-10 py-3 bg-[#7ED957] text-white rounded-xl font-bold hover:bg-[#6ec04a] shadow-lg shadow-[#7ED957]/20 transition-all"
                    >
                      Launch Project
                      <Rocket size={20} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-gray-900 font-bold mb-4 flex items-center gap-2">
                  <Target size={18} className="text-[#7ED957]" />
                  Creator Tips
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Step {currentStep}</p>
                    {currentStep === 1 && (
                      <p className="text-sm text-gray-600">Choose a catchy title and a realistic goal. Projects reaching 10% of their goal in the first day are 4x more likely to succeed.</p>
                    )}
                    {currentStep === 2 && (
                      <p className="text-sm text-gray-600">Be transparent about your technical stack. Tech backers love knowing what's "under the hood." Use high-quality diagrams if possible.</p>
                    )}
                    {currentStep === 3 && (
                      <p className="text-sm text-gray-600">Good rewards are early access to betas, credits in README, or exclusive technical sessions.</p>
                    )}
                    {currentStep === 4 && (
                      <p className="text-sm text-gray-600">Ready to go live? Our team will review your project within 24 hours of submission.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
