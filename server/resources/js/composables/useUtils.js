const isMobile = () => {
    return window.matchMedia('(max-width: 320px)').matches
};

export function useUtils() {
    return {
        isMobile
    }
};