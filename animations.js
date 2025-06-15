document.addEventListener("DOMContentLoaded", () => {
    const fadeIns = document.querySelectorAll('.fade-in');

    const options = { threshold: 0.1 }; // You can adjust the threshold value if needed
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay to each element based on its index
                entry.target.style.transitionDelay = `${index * 0.2}s`;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, options);

    fadeIns.forEach(el => {
        observer.observe(el);

        // ✅ Make sure animations trigger even if already visible on load
        if (isElementInViewport(el)) {
            el.style.transitionDelay = `${Array.from(fadeIns).indexOf(el) * 0.2}s`;
            el.classList.add('visible');
            observer.unobserve(el);
        }
    });

    // Function to check if the element is in the viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top < window.innerHeight &&
            rect.bottom > 0 &&
            rect.left < window.innerWidth &&
            rect.right > 0
        );
    }
});
