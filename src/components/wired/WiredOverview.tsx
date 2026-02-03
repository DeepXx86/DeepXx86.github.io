import React from 'react';
import { useWired } from '../../context/WiredContext';
import { motion } from 'framer-motion';
import { useSound } from '../../hooks/useSound';
import TerminalPopup from './TerminalPopup';

const WiredOverview: React.FC = () => {
    const { navigate } = useWired();
    const { playClick, playHover } = useSound();
    const [showArchivePopup, setShowArchivePopup] = React.useState(false);

    const tiles = [
        {
            id: 'identity',
            label: 'Who Am I?',
            sub: 'Subject_Profile',
            col_span: 'col-span-2'
        },
        {
            id: 'signal',
            label: 'SIGNAL',
            sub: 'Encryption_Key',
            col_span: 'col-span-1'
        },
        {
            id: 'archives',
            label: 'ARCHIVES',
            sub: 'Data_Corrupted',
            col_span: 'col-span-3',
            disabled: false
        }
    ];

    return (
        <div className="h-full w-full flex items-center justify-center">
            <div className="grid grid-cols-3 gap-4 w-full max-w-4xl h-[60vh]">
                {tiles.map((tile, i) => (
                    <motion.button
                        key={tile.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05, duration: 0.2 }}
                        whileHover={!tile.disabled ? { scale: 0.99, backgroundColor: 'rgba(255, 255, 255, 0.02)' } : {}}
                        whileTap={!tile.disabled ? { scale: 0.98 } : {}}
                        onMouseEnter={() => !tile.disabled && playHover()}
                        onClick={() => {
                            if (!tile.disabled) {
                                playClick();
                                if (tile.id === 'archives') {
                                    setShowArchivePopup(true);
                                } else {
                                    navigate(tile.id as any);
                                }
                            }
                        }}
                        className={`
              relative border border-wired-fg bg-wired-bg/80 backdrop-blur-sm p-6 flex flex-col justify-between text-left group overflow-hidden
              ${tile.col_span}
              ${tile.disabled ? 'opacity-30 cursor-not-allowed border-dashed' : 'cursor-pointer hover:border-wired-fg-light'}
            `}
                    >
                        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-wired-text/20 group-hover:border-wired-accent transition-colors duration-200" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-wired-text/20 group-hover:border-wired-accent transition-colors duration-200" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-wired-text/20 group-hover:border-wired-accent transition-colors duration-200" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-wired-text/20 group-hover:border-wired-accent transition-colors duration-200" />

                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        <div className="font-mono text-xs text-wired-dim uppercase tracking-widest group-hover:text-wired-accent transition-colors">
                            0{i + 1} // {tile.sub}
                        </div>

                        <div className="font-serif text-3xl font-light italic text-wired-text group-hover:text-white transition-colors">
                            {tile.label}
                        </div>
                    </motion.button>
                ))}
            </div>
            <TerminalPopup
                isOpen={showArchivePopup}
                onClose={() => setShowArchivePopup(false)}
            />
        </div>
    );
};

export default WiredOverview;
