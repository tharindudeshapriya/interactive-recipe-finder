import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const ScrollManager = () => {
    const location = useLocation();
    const navType = useNavigationType();

    useEffect(() => {
        // Scroll to top only on new navigations (PUSH or REPLACE).
        // If navigating backwards (POP), allow the browser to restore the previous scroll position.
        if (navType !== 'POP') {
            window.scrollTo(0, 0);
        }
    }, [location.pathname, navType]);

    return null;
};

export default ScrollManager;
