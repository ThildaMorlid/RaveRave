import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const eventRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      eventRef.current,
      { scale: 1 },
      {
        scale: 1.05,
        duration: 0.3,
        paused: true,
        ease: 'power1.inOut',
        onHover: {
          enter: () => gsap.to(eventRef.current, { scale: 1.05 }),
          leave: () => gsap.to(eventRef.current, { scale: 1 }),
        },
      }
    );

  }, []);

  return (
    <div className="home">
      <div className="home-text" ref={textRef}>
        <h1>WHAT CAN WE MAKE NEXT</h1>
      </div>
      <div className="event" ref={eventRef}>
        <img src="/src/assets/images/event_poster.png" alt="Event Poster" />
        <button className="register-button">Register</button>
      </div>
    </div>
  );
};

export default Home;
