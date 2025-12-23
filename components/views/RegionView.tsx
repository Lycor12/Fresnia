import React from 'react';
import { REGIONS } from '../../constants/regions';
import { Card } from '../ui/Card';

export const RegionView: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar">
      <h2 className="text-3xl font-display font-bold text-fresnia-dark mb-8 border-b pb-4 border-stone-300">
        Regional Overview
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Placeholder Map Visualization */}
        <div className="bg-stone-200 border-2 border-dashed border-stone-400 rounded-lg h-96 flex items-center justify-center">
          <p className="text-stone-500 font-header uppercase tracking-widest">Interactive Map Module Loading...</p>
        </div>

        <div className="space-y-4">
          {REGIONS.map(region => (
            <Card key={region.id} className="hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-display font-bold text-xl text-ink">{region.name}</h3>
                  <p className="text-sm font-serif text-stone-600">{region.economy}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${region.colorCode.replace('bg-', 'bg-')}`}></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <div>
                  <span className="block text-xs font-bold text-stone-400 uppercase">Population</span>
                  {region.population}
                </div>
                <div>
                  <span className="block text-xs font-bold text-stone-400 uppercase">Politics</span>
                  {region.politicalLean}
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                {region.issues.map(issue => (
                  <span key={issue} className="text-[10px] uppercase font-bold text-accent bg-red-50 px-2 py-1 border border-red-100">
                    ! {issue}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
