"use client";

import { useState } from 'react';
import { Share2, Copy, Check, Twitter, Facebook, MessageCircle, X } from 'lucide-react';

type Props = {
  project: {
    slug: string;
    title: string;
    shortDescription?: string | null;
  };
};

export default function ShareProject({ project }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const baseUrl =
    typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL || 'https://backer-creator-dev.up.railway.app';

  const shareUrl = `${baseUrl}/projects/${project.slug}`;
  const shareText = `Check out "${project.title}" on GoSOW — support this amazing tech project! 🚀`;

  function copyLink() {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function shareTwitter() {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function shareWhatsApp() {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function shareFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        id="share-project-btn"
        className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group"
      >
        <Share2 size={16} className="text-gray-400 group-hover:text-[#7ED957] transition-colors" />
        Share this project
      </button>
    );
  }

  return (
    <div className="mt-3 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div>
          <p className="font-bold text-gray-900 text-sm">Share &amp; Spread the word</p>
          <p className="text-xs text-gray-400 mt-0.5">Help this project reach its goal</p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      {/* Copy link */}
      <div className="px-4 pb-3">
        <div
          className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl p-2.5 cursor-pointer group hover:border-[#7ED957]/50 hover:bg-[#7ED957]/5 transition-all"
          onClick={copyLink}
          title="Click to copy link"
        >
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Project Link</p>
            <p className="text-xs text-gray-600 truncate">{shareUrl}</p>
          </div>
          <div className={`shrink-0 p-1.5 rounded-lg transition-all ${copied ? 'bg-[#7ED957] text-white' : 'bg-white border border-gray-200 text-gray-400 group-hover:border-[#7ED957] group-hover:text-[#7ED957]'}`}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </div>
        </div>
        {copied && (
          <p className="text-[11px] text-[#7ED957] font-semibold mt-1.5 ml-1 animate-in fade-in">
            ✓ Link copied to clipboard!
          </p>
        )}
      </div>

      {/* Social buttons */}
      <div className="px-4 pb-4 grid grid-cols-3 gap-2">
        <button
          onClick={shareTwitter}
          id="share-twitter-btn"
          className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-gray-100 hover:border-gray-900 hover:bg-gray-900 hover:text-white text-gray-500 transition-all duration-200 group text-xs font-semibold"
        >
          <Twitter size={18} className="group-hover:text-white transition-colors" />
          Twitter / X
        </button>

        <button
          onClick={shareWhatsApp}
          id="share-whatsapp-btn"
          className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-gray-100 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white text-gray-500 transition-all duration-200 group text-xs font-semibold"
        >
          <MessageCircle size={18} className="group-hover:text-white transition-colors" />
          WhatsApp
        </button>

        <button
          onClick={shareFacebook}
          id="share-facebook-btn"
          className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-gray-100 hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white text-gray-500 transition-all duration-200 group text-xs font-semibold"
        >
          <Facebook size={18} className="group-hover:text-white transition-colors" />
          Facebook
        </button>
      </div>
    </div>
  );
}
