import React from 'react';
import EventHero from '../hero/EventHero';
import Hero from '../hero/Hero';
import ServiceHero from '../hero/ServiceHero';
import './HeroSlider.scss';

const numHero: number = 3;
const HeroSlider: React.FC = () => {
    const [heroIdx, setHeroIdx]: [number, React.Dispatch<React.SetStateAction<number>>] = React.useState(0);
    React.useEffect(() => {
        const slide: NodeJS.Timeout = setInterval(() => {
            setHeroIdx((heroIdx + 1) % numHero);
        }, 4000);
        return () => clearInterval(slide);
    });
    const heros: JSX.Element[] = [<Hero />, <ServiceHero />, <EventHero />];
    return (
        <div className="HeroSlider">
            {heros.map((cur: JSX.Element, idx: number) => {
                if (idx === heroIdx) {
                    return (
                        <div className="HeroSlider__element active fade">
                            {cur}
                        </div>
                    );
                }
                return (
                    <div className="HeroSlider__element">
                        {cur}
                    </div>
                );
            })}
        </div>
    );
};

export default HeroSlider;
