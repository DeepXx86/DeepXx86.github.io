import React from 'react';
import { useWired } from '../../context/WiredContext';
import Typewriter from './Typewriter';
import { motion } from 'framer-motion';
import { config } from '../../data/config';
import { useSound } from '../../hooks/useSound';

const IdentityNode: React.FC = () => {
    const { setActiveNode } = useWired();
    const { playClick, playHover } = useSound();
    const { identity } = config;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-4xl mx-auto h-full overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-wired-fg scrollbar-track-wired-bg"
        >
            <div className="font-serif text-lg leading-relaxed space-y-8 text-wired-text/90 pb-20">

                <header className="mb-12 border-b border-wired-fg pb-4 flex justify-between items-end">
                    <div>
                        <h1 className="font-mono text-xs text-wired-dim mb-2 uppercase tracking-widest">Subject: {identity.name}</h1>
                        <div className="text-3xl font-light italic">
                            <Typewriter text={`I am ${identity.name}.`} speed={80} />
                        </div>
                    </div>
                    <div className="text-right hidden sm:block">
                        <div className="font-mono text-[10px] text-wired-dim mb-1">CURRENT_SCHOOL</div>
                        <div className="font-mono text-sm text-wired-accent">{identity.school}</div>
                    </div>
                </header>

                <section>
                    <h2 className="font-mono text-xs text-wired-dim mb-4 uppercase tracking-wider">[ Bio_Data ]</h2>
                    {identity.bio.map((line, i) => (
                        <p key={i} className="indent-8 mb-2">
                            <Typewriter
                                text={line}
                                delay={500 + (i * 1000)}
                                speed={20}
                            />
                        </p>
                    ))}
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-12">

                    <div>
                        <h2 className="font-mono text-xs text-wired-dim mb-4 uppercase tracking-wider">[ Skill ]</h2>
                        <ul className="space-y-2 font-mono text-sm text-wired-text/80">
                            {identity.skills.map((skill, i) => (
                                <motion.li
                                    key={skill}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1 + (i * 0.1) }}
                                    className="flex items-center gap-2 group cursor-default"
                                    onMouseEnter={playHover}
                                >
                                    <span className="text-wired-dim group-hover:text-wired-accent transition-colors">::</span>
                                    <span className="group-hover:text-white transition-colors">{skill}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-mono text-xs text-wired-dim mb-4 uppercase tracking-wider">[ Languages ]</h2>
                        <ul className="space-y-2 font-mono text-sm text-wired-text/80">
                            {identity.languages.map((lang, i) => (
                                <motion.li
                                    key={lang}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.5 + (i * 0.1) }}
                                    className="flex items-center gap-2 group cursor-default"
                                    onMouseEnter={playHover}
                                >
                                    <span className="text-wired-dim group-hover:text-wired-accent transition-colors">::</span>
                                    <span className="group-hover:text-white transition-colors">{lang}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h2 className="font-mono text-xs text-wired-dim mb-4 uppercase tracking-wider">[ Current_Target ]</h2>
                        <div
                            className="border border-wired-fg p-6 bg-wired-fg/5 text-sm hover:border-wired-accent/50 transition-colors group cursor-crosshair"
                            onMouseEnter={playHover}
                        >
                            <div className="mb-2 text-wired-accent opacity-75 animate-pulse">Processing...</div>
                            <div className="text-xl font-light italic group-hover:text-white transition-colors">{identity.currentTarget}</div>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <h2 className="font-mono text-xs text-wired-dim mb-4 uppercase tracking-wider">[ GOAT ]</h2>
                        <div className="flex flex-wrap gap-3">
                            {identity.likes.map((like) => (
                                <span
                                    key={like}
                                    className="px-3 py-1 border border-wired-fg text-xs font-mono text-wired-dim rounded-full hover:border-wired-accent hover:text-wired-accent transition-colors cursor-default"
                                    onMouseEnter={playHover}
                                >
                                    {like}
                                </span>
                            ))}
                        </div>
                    </div>

                </section>

                <footer className="mt-24 pt-12 border-t border-wired-fg flex justify-between items-center text-xs font-mono text-wired-dim">
                    <span>ID: 20101218</span>
                    <button
                        onClick={() => { playClick(); setActiveNode(null); }}
                        className="hover:text-wired-accent transition-colors flex items-center gap-2 group"
                        onMouseEnter={playHover}
                    >
                        <span className="group-hover:animate-pulse">●</span> [ CLOSE STREAM ]
                    </button>
                </footer>
            </div>
        </motion.div>
    );
};

export default IdentityNode;
