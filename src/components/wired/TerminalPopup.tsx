import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../../hooks/useSound';

interface TerminalPopupProps {
    isOpen: boolean;
    onClose: () => void;
    message?: string;
}

const TerminalPopup: React.FC<TerminalPopupProps> = ({ isOpen, onClose, message = "FATAL ERROR: i dont have achieves in my life" }) => {
    const [text, setText] = useState('');
    const { playError } = useSound();

    useEffect(() => {
        if (isOpen) {
            playError();
        }
    }, [isOpen, playError]);

    useEffect(() => {
        if (isOpen) {
            setText('');
            let i = 0;
            const timer = setInterval(() => {
                if (i < message.length) {
                    setText(prev => prev + message.charAt(i));
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, 50);
            return () => clearInterval(timer);
        }
    }, [isOpen, message]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-md bg-[#0a0a0a] border border-red-500 shadow-[0_0_30px_rgba(255,0,0,0.2)] font-mono overflow-hidden"
                    >
                        <div className="bg-red-900/20 border-b border-red-500/50 p-2 flex justify-between items-center">
                            <div className="text-xs text-red-500 font-bold tracking-widest uppercase flex items-center gap-2">
                                <span className="w-2 h-2 bg-red-500 animate-pulse rounded-full" />
                                SYSTEM_ALERT
                            </div>
                            <button
                                onClick={onClose}
                                className="text-red-500 hover:text-white hover:bg-red-500/20 px-2 py-0.5 text-xs transition-colors"
                            >
                                [X]
                            </button>
                        </div>

                        <div className="p-6 text-red-500 text-sm leading-relaxed min-h-[120px] flex flex-col justify-center items-center text-center">
                            <div className="mb-4 text-4xl opacity-50">
                                ⚠
                            </div>
                            <div>
                                <span className="mr-1">{">"}</span>
                                {text}
                                <span className="animate-pulse">_</span>
                            </div>
                        </div>

                        <div className="p-2 border-t border-red-500/20 text-[10px] text-red-500/50 flex justify-between font-mono">
                            <span>ERR_CODE: 404_LIFE_NOT_FOUND</span>
                            <span>UID: NULL</span>
                        </div>

                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default TerminalPopup;
