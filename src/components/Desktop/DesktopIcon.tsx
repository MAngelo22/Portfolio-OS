import * as Icons from 'lucide-react';

interface DesktopIconProps {
  id: string;
  icon: keyof typeof Icons;
  label: string;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onClick }) => {
  const IconComponent = Icons[icon];

  return (
    <button
      type="button"
      className="desktop-icon group flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl transition-all duration-200 cursor-pointer w-[88px] sm:w-[96px]"
      onClick={onClick}
    >
      <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-cyan-500/20 border border-cyan-300/30 rounded-xl mb-1.5 backdrop-blur-sm group-hover:bg-cyan-400/30 group-hover:scale-105 transition-all">
        <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-100" />
      </div>
      <span className="text-white text-xs sm:text-sm font-medium text-center px-2 py-0.5 rounded bg-black/50 max-w-full truncate">
        {label}
      </span>
    </button>
  );
};

export default DesktopIcon;
