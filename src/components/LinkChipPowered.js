import React, { useState, useEffect, useCallback } from 'react';
import { Power } from 'lucide-react';

const LinkChipPowered = () => {
  const [power, setPower] = useState(false);
  const [ascended, setAscended] = useState(false);
  const [corruption, setCorruption] = useState(0);
  const [spirits, setSpirits] = useState([]);
  const [activeNodes, setActiveNodes] = useState(new Set());

  const ASCII_SPIRITS = [
    `  ,     ,
    (҂'_')
    <,︻╦╤─ ҉ `,
    `▀▄▀▄▀▄
    ▄▀▄▀▄▀
    ▀▄▀▄▀▄`
  ];

  const summonSpirit = useCallback(() => {
    if (!power) return;
    const newSpirit = {
      id: Date.now(),
      text: ASCII_SPIRITS[Math.floor(Math.random() * ASCII_SPIRITS.length)],
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10
    };
    setSpirits(prev => [...prev, newSpirit]);
    setTimeout(() => {
      setSpirits(prev => prev.filter(s => s.id !== newSpirit.id));
    }, 2000);
  }, [power]);

  useEffect(() => {
    if (!power) {
      setActiveNodes(new Set());
      return;
    }

    const interval = setInterval(() => {
      const newNodes = new Set();
      const nodeCount = Math.floor(Math.random() * 20);
      for (let i = 0; i < nodeCount; i++) {
        newNodes.add(Math.floor(Math.random() * 100));
      }
      setActiveNodes(newNodes);
    }, 1000);

    return () => clearInterval(interval);
  }, [power]);

  useEffect(() => {
    if (power) {
      const interval = setInterval(() => {
        setCorruption(prev => (prev + 0.1) % 1);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [power]);

  return (
    <div className="w-96 h-48 relative select-none">
      <div className="absolute inset-0 bg-black border border-[#ff00ff33] overflow-hidden">
        <div 
          className="absolute inset-0 transition-all duration-300"
          style={{
            background: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(255, 0, 255, 0.1) 2px,
              rgba(255, 0, 255, 0.1) 4px
            )`,
            opacity: power ? 0.2 : 0
          }}
        />

        <div className="absolute inset-2 bg-black border border-[#ffffff11]">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-40 h-8 flex justify-around items-center">
            {[0, 1].map(i => (
              <div
                key={`eye-${i}`}
                className={`w-14 h-4 bg-black overflow-hidden transition-all duration-300 ${
                  ascended ? 'animate-pulse' : ''
                }`}
                style={{
                  boxShadow: power ? '0 0 10px #00ffff' : 'none'
                }}
              >
                <div
                  className="absolute inset-0 transition-all duration-300"
                  style={{
                    background: power ? 
                      'radial-gradient(circle at center, #00ffff 0%, #00ffff80 40%, #00ffff40 70%, #00ffff20 85%, transparent 100%)' : 
                      'none',
                    opacity: power ? 0.8 + (corruption * 0.2) : 0
                  }}
                />
              </div>
            ))}
          </div>

          <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-0.5 p-2 pointer-events-none">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={`led-${i}`}
                className="w-0.5 h-0.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: '#ff00ff',
                  opacity: activeNodes.has(i) ? 0.5 : 0
                }}
              />
            ))}
          </div>

          {spirits.map(spirit => (
            <pre
              key={spirit.id}
              className="absolute text-[#00ffff] opacity-30 pointer-events-none text-xs"
              style={{
                left: `${spirit.x}%`,
                top: `${spirit.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {spirit.text}
            </pre>
          ))}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
            <button
              onClick={() => power && setAscended(!ascended)}
              className="w-6 h-6 bg-black border border-[#ff00ff] transition-all duration-300"
              style={{
                boxShadow: power ? '0 0 5px #ff00ff60' : 'none',
                opacity: power ? 1 : 0.5
              }}
            />
            <button
              onClick={() => power && summonSpirit()}
              className="w-6 h-6 bg-black border border-[#ff00ff] transition-all duration-300"
              style={{
                boxShadow: power ? '0 0 5px #ff00ff60' : 'none',
                opacity: power ? 1 : 0.5
              }}
            />
            <button
              onClick={() => power && setCorruption(Math.random())}
              className="w-6 h-6 bg-black border border-[#ff00ff] transition-all duration-300"
              style={{
                boxShadow: power ? '0 0 5px #ff00ff60' : 'none',
                opacity: power ? 1 : 0.5
              }}
            />
          </div>

          <button
            onClick={() => setPower(!power)}
            className="absolute -right-1 top-1/2 -translate-y-1/2 w-6 h-12 
                     bg-black transition-all duration-300 flex items-center justify-center"
            style={{
              borderLeft: `1px solid ${power ? '#ff00ff' : '#333'}`,
              boxShadow: power ? '0 0 10px #ff00ff40' : 'none'
            }}
          >
            <Power 
              className="w-3 h-3"
              style={{ 
                color: power ? '#ff00ff' : '#333'
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkChipPowered;
