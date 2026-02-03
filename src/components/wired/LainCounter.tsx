import React, { useState, useEffect } from 'react';


const LainCounter: React.FC = () => {
    const [time, setTime] = useState<string>('');

    const birthDate = new Date(2010, 11, 18, 0, 0, 0);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const diff = now.getTime() - birthDate.getTime();

            const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
            const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
            const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            const ms = diff % 1000;

            setTime(`${years}Y ${months}M ${days}D ${hours}:${minutes}:${seconds}:${ms.toString().padStart(3, '0')}`);
        };

        const timer = setInterval(updateTime, 10);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="font-mono text-wired-dim text-xs select-none hover:text-wired-text transition-colors duration-500 cursor-crosshair">
            <span className="opacity-50">STATUS: </span>
            <span className="tracking-wider">{time}</span>
        </div>
    );
};

export default LainCounter;
