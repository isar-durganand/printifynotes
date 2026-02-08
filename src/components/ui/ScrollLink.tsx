import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface ScrollLinkProps {
    to: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

/**
 * A Link component that handles scrolling to hash anchors properly.
 * Works both when navigating from a different page and when already on the target page.
 */
export const ScrollLink: React.FC<ScrollLinkProps> = ({ to, children, className, onClick }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Parse the target URL
        const [targetPath, hash] = to.split('#');
        const targetPathNormalized = targetPath || '/';

        // If we're on the same page and there's a hash, handle it manually
        if (location.pathname === targetPathNormalized && hash) {
            e.preventDefault();

            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Update the URL without triggering a navigation
                window.history.pushState(null, '', to);
            }
        }

        // Call optional onClick handler
        if (onClick) {
            onClick();
        }
    };

    return (
        <Link to={to} className={className} onClick={handleClick}>
            {children}
        </Link>
    );
};
