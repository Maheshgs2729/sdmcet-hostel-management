'use client';

export default function TabBar({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="flex gap-2 bg-luxury-navy/5 rounded-xl p-2 mb-8 overflow-x-auto">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 min-w-max px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-500 flex items-center justify-center gap-3 ${
            activeTab === tab.id
              ? 'bg-luxury-gold text-white shadow-lg transform scale-100'
              : 'text-luxury-navy/60 hover:text-luxury-navy hover:bg-white/60 transform scale-95'
          }`}
        >
          <span className="text-lg">{tab.icon}</span>{tab.label}
          {tab.count !== undefined && (
            <span className={`px-2 py-0.5 rounded-sm text-[10px] tracking-widest ${
              activeTab === tab.id ? 'bg-luxury-navy/20 text-white' : 'bg-luxury-navy/10 text-luxury-navy'
            }`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
