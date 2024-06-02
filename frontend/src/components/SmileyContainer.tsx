import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import smileyImage from '../img/smiley.png';

const SmileyContainer: React.FC = () => {
  const smileysRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    // Funktioner för att hantera rotation
    const handleMouseEnter = (smiley: HTMLImageElement) => {
      gsap.to(smiley, { rotation: 360, duration: 2, ease: "none", repeat: -1 });
    };

    const handleMouseLeave = (smiley: HTMLImageElement) => {
      gsap.to(smiley, { rotation: 0, duration: 2, ease: "none", overwrite: true });
    };

    smileysRef.current.forEach((smiley, index) => {
      smiley.addEventListener('mouseenter', () => handleMouseEnter(smiley));
      smiley.addEventListener('mouseleave', () => handleMouseLeave(smiley));
    });

    return () => {
      smileysRef.current.forEach(smiley => {
        if (smiley) { 
          smiley.removeEventListener('mouseenter', () => handleMouseEnter(smiley));
          smiley.removeEventListener('mouseleave', () => handleMouseLeave(smiley));
        }
      });
    };
  }, []);

  const positions = Array.from({ length: 50 }, (_, index) => ({
    top: `${Math.random() * 120}%`,
    left: `${Math.random() * 120}%`,
    rotate: `rotate(${Math.random() * 360}deg)`
  }));

  return (
    <div style={{
      position: 'relative',
      width: '150vw',
      height: '150vh',
      overflow: 'viseble',
      zIndex: 0
    }}>
      {positions.map((pos, index) => (
        <img
          ref={el => smileysRef.current[index] = el as HTMLImageElement}
          key={index}
          src={smileyImage}
          alt="Smiley"
          style={{
            width: '40vw',
            height: '53vw',
            position: 'absolute',
            top: pos.top,
            left: pos.left,
            transform: pos.rotate
          }}
        />
      ))}
    </div>
  );
};

export default SmileyContainer;
