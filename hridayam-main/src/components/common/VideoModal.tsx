import React, { useRef, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, BookOpen } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  videoUrl: string;
  subtitle?: string;
  categoryName?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  title,
  videoUrl,
  subtitle,
  categoryName
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-950 rounded-2xl max-w-4xl w-full border border-slate-800 shadow-2xl overflow-hidden text-white flex flex-col my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C2185B]/20 text-[#E83E8C] flex items-center justify-center border border-[#C2185B]/40">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                {categoryName && (
                  <span className="text-[10px] font-mono uppercase text-[#E83E8C] font-semibold tracking-wider">
                    {categoryName}
                  </span>
                )}
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300 font-semibold">
                  Preview Video
                </span>
              </div>
              <h3 className="text-sm font-bold text-white truncate max-w-lg mt-0.5">
                {title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Canvas */}
        <div className="relative aspect-16/9 bg-black flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src={videoUrl}
            autoPlay
            controls
            playsInline
            className="w-full h-full object-contain"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </div>

        {/* Bottom Details Footer */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E83E8C]" />
            <span>Hridayam High-Definition Agency Stream</span>
          </div>
          {subtitle && <p className="text-slate-300 italic max-w-sm truncate">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};
