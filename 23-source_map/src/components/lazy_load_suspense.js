import React, { useEffect, useRef, useState, Suspense } from 'react';

const LazyLoadSuspense = ({ children }) => {
    const [isView, setIsView] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsView(true);
                    observer.disconnect();
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            }
        );
        observer.observe(element);
        return () => {
            observer.unobserve(element);
        };
    }, []);

    return (
        <div ref={elementRef}>
            {isView ? <Suspense fallback={<div>Loading...</div>}>
                {children}
            </Suspense> : null}
        </div>
    );
};

export default LazyLoadSuspense;