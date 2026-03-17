import React from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: string;
  onSelectTheme: (theme: string) => void;
}

export const SettingsModal = ({ isOpen, onClose, currentTheme, onSelectTheme }: SettingsModalProps) => {
  if (!isOpen) {
    return null;
  }

  const themes = [
    { id: 'midnight', label: 'Midnight Blue' },
    { id: 'crimson', label: 'Crimson Red' },
    { id: 'forest', label: 'Emerald Forest' },
    { id: 'monochrome', label: 'Monochrome' }
  ];

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300">
      <div className="w-full max-w-md bg-secondary border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] rounded-3xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
          ✕
        </button>
        <h2 className="text-xl font-light text-white mb-6">
          Appearance Settings
        </h2>
        <div className="mb-4">
          <label className="text-[10px] text-white/50 tt-u tracking-[0.2em] mb-4 block font-semibold">
            Aurora Theme
          </label>
          <div className="grid grid-cols-2 gap-3">
            {themes.map(theme => (
              <button key={theme.id} onClick={() => onSelectTheme(theme.id)} className={`py-3 px-4 rounded-2xl border transition-all duration-300 text-sm font-light tracking-wide ${currentTheme === theme.id ? 'bg-white/10 border-white/30 text-white shadow-inner scale-[0.98]' : 'bg-primary border-transparent text-white/50 hover:bg-white/5 hover:text-white/80'}`}>
                {theme.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
