import { useState, useEffect } from 'react';

// Dynamically discover all images in the backgrounds folder
// import.meta.glob is a Vite feature that lets us scan the filesystem at build time
const BACKGROUND_IMAGES_MAP = import.meta.glob('../assets/backgrounds/*.{jpg,jpeg,png,webp,svg}', {
    eager: true,
    import: 'default'
});

const BACKGROUND_IMAGES = Object.values(BACKGROUND_IMAGES_MAP);

const useRandomBackground = () => {
    const [bgImage, setBgImage] = useState('');

    useEffect(() => {
        if (BACKGROUND_IMAGES.length > 0) {
            const randomImg = BACKGROUND_IMAGES[Math.floor(Math.random() * BACKGROUND_IMAGES.length)];
            setBgImage(randomImg);
        }
    }, []);

    return bgImage;
};

export default useRandomBackground;
