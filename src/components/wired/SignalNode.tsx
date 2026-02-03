import React from 'react';
import { useWired } from '../../context/WiredContext';
import { motion } from 'framer-motion';

const links = [
    { label: 'GitHub', url: 'https://github.com' },
    { label: 'Discord', url: 'https://discord.com' },
    { label: 'YouTube', url: 'https://youtube.com' },
];

const SignalNode: React.FC = () => {
    const { setActiveNode } = useWired();

    return (
        <div className="h-full flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="text-center space-y-12"
            >
                <div className="font-mono text-xs text-wired-dim uppercase tracking-[0.2em] mb-8">
                    [ ESTABLISH_CONNECTION ]
                </div>

                <div className="flex flex-col gap-6">
                    {links.map((link, i) => (
                        <motion.a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            className="group relative inline-block text-4xl font-serif italic text-wired-text hover:text-wired-accent transition-colors duration-300"
                        >
                            <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-sm font-mono text-wired-dim opacity-0 group-hover:opacity-100 transition-opacity">
                                &gt;
                            </span>
                            {link.label}
                        </motion.a>
                    ))}
                </div>

                <button
                    onClick={() => setActiveNode(null)}
                    className="mt-12 text-xs font-mono text-wired-dim hover:text-wired-text transition-colors uppercase tracking-widest"
                >
                    [ Terminate Signal ]
                </button>
            </motion.div>
        </div>
    );
};

export default SignalNode;
