import React from 'react';
import { useWired } from '../../context/WiredContext';
import LainCounter from './LainCounter';
import { AnimatePresence } from 'framer-motion';


interface WiredLayoutProps {
    children: React.ReactNode;
}

const WiredLayout: React.FC<WiredLayoutProps> = ({ children }) => {
    const { mode } = useWired();

    return (
        <div className="relative w-screen h-screen bg-wired-bg text-wired-text overflow-hidden selection:bg-wired-accent selection:text-black font-mono">
            <svg className="pointer-events-none fixed inset-0 w-full h-full opacity-[0.03] z-50">
                <filter id="noiseFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>

            <div className="scanlines fixed inset-0 pointer-events-none z-40" />
            <div className="crt-overlay fixed inset-0 pointer-events-none z-40" />

            {/* Main Content Area */}
            <div className="relative z-10 w-full h-full flex flex-col p-8 sm:p-12">
                <div className="flex justify-between items-start mb-8 opacity-80 uppercase tracking-widest text-[10px]">
                    <div>
                        <div>Protocol: Earth_Layer_Capitalism</div>
                        <div>Connect: Secure</div>
                    </div>
                    <LainCounter />
                </div>

                <div className="flex-1 relative">
                    <AnimatePresence mode="wait">
                        {children}
                    </AnimatePresence>
                </div>

                <div className="absolute bottom-4 right-8 text-[10px] text-wired-dim opacity-50">
                    {mode === 'overview' ? 'PRESS [CMD] OR SELECT NODE' : 'PRESS [ESC] TO DISCONNECT'}
                </div>
            </div>
        </div>
    );
};

export default WiredLayout;
