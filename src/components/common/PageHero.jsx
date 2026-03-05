import React from 'react';
import useRandomBackground from '../../hooks/useRandomBackground';

/**
 * Reusable full-width hero section with an animated background image,
 * gradient overlay, badge, title, and optional subtitle / children.
 *
 * Props:
 *   badge       - small uppercase label above the title
 *   title       - main heading text (plain part)
 *   titleItalic - italic/light part appended on a second line
 *   subtitle    - descriptive paragraph below the title
 *   children    - any additional content rendered below subtitle
 */
const PageHero = ({ badge, title, titleItalic, subtitle, children }) => {
    const bgImage = useRandomBackground();

    return (
        <header className="relative overflow-hidden pt-32 pb-24 text-center mb-12 px-4 shadow-sm">
            {/* Animated Background */}
            <div
                className="absolute inset-0 bg-cover bg-center animate-slow-pan opacity-60"
                style={{ backgroundImage: `url('${bgImage}')` }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-bg-base/30 via-bg-base/70 to-bg-base" />

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                {badge && (
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary bg-bg-base/80 px-4 py-2 rounded-full inline-block backdrop-blur-sm mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
                        {badge}
                    </span>
                )}

                <h1 className="text-5xl md:text-7xl font-serif text-text-base mb-8 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    {title}
                    {titleItalic && (
                        <>
                            <br />
                            <span className="italic font-light">{titleItalic}</span>
                        </>
                    )}
                </h1>

                {subtitle && (
                    <p className="text-lg md:text-xl text-text-base font-light italic mb-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        {subtitle}
                    </p>
                )}

                {children}
            </div>
        </header>
    );
};

export default PageHero;
