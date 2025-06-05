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
    <div 
      className="desktop-icon flex flex-col items-center justify-center p-2 rounded-md transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="w-16 h-16 flex items-center justify-center bg-blue-500 bg-opacity-20 rounded-lg mb-1 backdrop-blur-sm">
        <IconComponent className="w-8 h-8 text-white" />
      </div>
      <span className="text-white text-sm font-medium text-center px-1 py-0.5 rounded bg-black bg-opacity-50 max-w-[80px] truncate">
        {label}
      </span>
    </div>
  );
};

export default DesktopIcon;