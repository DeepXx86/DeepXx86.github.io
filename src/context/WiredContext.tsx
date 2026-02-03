import React, { createContext, useContext, useState, type ReactNode } from 'react';

type WiredMode = 'overview' | 'focus';
type WiredNode = 'identity' | 'signal' | 'archives' | null;

interface WiredState {
    mode: WiredMode;
    activeNode: WiredNode;
    noiseLevel: number;
}

interface WiredContextType extends WiredState {
    setMode: (mode: WiredMode) => void;
    setActiveNode: (node: WiredNode) => void;
    navigate: (node: WiredNode) => void;
}

const WiredContext = createContext<WiredContextType | undefined>(undefined);

export const WiredProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<WiredMode>('overview');
    const [activeNode, setActiveNode] = useState<WiredNode>(null);
    const [noiseLevel] = useState(0.05);

    const navigate = (node: WiredNode) => {
        setActiveNode(node);
        setMode(node ? 'focus' : 'overview');
    };

    return (
        <WiredContext.Provider value={{
            mode,
            activeNode,
            noiseLevel,
            setMode,
            setActiveNode,
            navigate
        }}>
            {children}
        </WiredContext.Provider>
    );
};

export const useWired = () => {
    const context = useContext(WiredContext);
    if (!context) {
        throw new Error('useWired must be used within a WiredProvider');
    }
    return context;
};
