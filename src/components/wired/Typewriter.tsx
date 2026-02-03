import React, { useState, useEffect } from 'react';

interface TypewriterProps {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
    onComplete?: () => void;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 50, delay = 0, className = '', onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimer = setTimeout(() => {
            setStarted(true);
        }, delay);
        return () => clearTimeout(startTimer);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        if (displayedText.length < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length + 1));
            }, speed + (Math.random() * 20));
            return () => clearTimeout(timer);
        } else if (onComplete) {
            onComplete();
        }
    }, [started, displayedText, text, speed, onComplete]);

    return (
        <span className={className}>
            {displayedText}
            {displayedText.length < text.length && (
                <span className="animate-pulse inline-block w-2 h-4 bg-wired-accent ml-1 align-middle"></span>
            )}
        </span>
    );
};

export default Typewriter;
