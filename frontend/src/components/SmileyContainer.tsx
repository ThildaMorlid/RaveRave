import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const SmileyContainer: React.FC = () => {
  const smileysRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    // Kopiera den aktuella referensen till en lokal variabel för att undvika ändringar
    const currentSmileys = smileysRef.current;

    // Funktioner för att hantera rotation
    const handleMouseEnter = (smiley: HTMLImageElement) => {
      gsap.to(smiley, { rotation: 360, duration: 2, ease: "none", repeat: -1 });
    };

    const handleMouseLeave = (smiley: HTMLImageElement) => {
      gsap.to(smiley, { rotation: 0, duration: 2, ease: "none", overwrite: true });
    };

    // Lägg till eventlyssnare
    currentSmileys.forEach((smiley) => {
      smiley.addEventListener('mouseenter', () => handleMouseEnter(smiley));
      smiley.addEventListener('mouseleave', () => handleMouseLeave(smiley));
    });

    // Cleanup-funktion för att ta bort eventlyssnare
    return () => {
      smileysRef.current.forEach(smiley => {
        if (smiley) {
          smiley.removeEventListener('mouseenter', () => handleMouseEnter(smiley));
          smiley.removeEventListener('mouseleave', () => handleMouseLeave(smiley));
        }
      });
    };
  }, []); // Notera att beroendelistan är tom, vilket betyder att detta bara körs en gång vid mount

  const positions = Array.from({ length: 50 }, (_, index) => ({
    top: `${(Math.random() * 100) - 50}%`,
    left: `${Math.random() * 120}%`,
    rotate: `rotate(${Math.random() * 360}deg)`
  }));

  return (
    <div style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: '150vw',
      height: '150vh',
      overflow: 'visible',
      zIndex: 0
    }}>
      {positions.map((pos, index) => (
        <img
          ref={el => smileysRef.current[index] = el as HTMLImageElement}
          key={index}
          src="/img/smiley.png"
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
