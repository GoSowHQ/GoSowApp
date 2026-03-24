"use client";

import React from 'react';
import { formatCurrency } from '@/lib/utils';
import type { Reward } from '@/types';

export default function RewardTier({ reward, onSelect }: { reward: Reward; onSelect: (amount: number, rewardId?: string) => void }) {
  return (
    <div className="border rounded-lg p-4 flex items-center justify-between">
      <div>
        <div className="font-medium">{reward.title}</div>
        <div className="text-sm text-gray-500">{reward.description}</div>
      </div>
      <div className="text-right">
        <div className="font-semibold">{formatCurrency(reward.amount)}</div>
        <button onClick={() => onSelect(reward.amount, reward.id)} className="mt-2 px-4 py-2 bg-[#7ED957] text-white rounded-lg">Select</button>
      </div>
    </div>
  );
}
