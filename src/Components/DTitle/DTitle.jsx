import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DTitle = () => {
    const location = useLocation();
    useEffect(() => {
        // Extract the last part of the path as the title
        const title = location.pathname.split('/').pop();
        // Replace dashes with spaces
        const formattedTitle = title.replace(/-/g, ' ');
        // Capitalize the first letter of each word
        const capitalizedTitle = formattedTitle.replace(/\b\w/g, (match) => match.toUpperCase());
        // Set the title
        title ? document.title = `AI Health - ${capitalizedTitle}`
              : document.title = 'AI Health';
    }, [location.pathname]);

    return null;
};

export default DTitle;
