import { useState, useEffect } from 'react';

const BACKGROUND_IMAGES = [
    '/foodiesfeed.com_cozy-dinner-table-with-delicious-meals.jpg',
    '/foodiesfeed.com_colorful-bowl-of-deliciousness-with-fried-egg.jpg',
    '/foodiesfeed.com_delicious-hot-pot-with-fresh-ingredients.jpg',
    '/foodiesfeed.com_hearty-beef-stew-with-vegetables.jpg',
    '/foodiesfeed.com_colorful-taco-platter-with-eggs-and-sides.jpg',
    '/foodiesfeed.com_delicious-crispy-samosas-with-dipping-sauces.jpg',
    '/foodiesfeed.com_fresh-tacos-being-assembled-in-busy-kitchen.jpg',
    '/foodiesfeed.com_spicy-hot-pot-feast-with-beer.jpg',
    '/foodiesfeed.com_steak-cooked-on-fire.jpg'
];

const useRandomBackground = () => {
    const [bgImage, setBgImage] = useState('');

    useEffect(() => {
        const randomImg = BACKGROUND_IMAGES[Math.floor(Math.random() * BACKGROUND_IMAGES.length)];
        setBgImage(randomImg);
    }, []);

    return bgImage;
};

export default useRandomBackground;
