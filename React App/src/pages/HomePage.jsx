import { useEffect, useRef } from "react";
import homepageImage1 from "../assets/homepage-1.jpeg";
import homepageImage2 from "../assets/homepage-2.jpeg";
import innisfreeLogo from "../assets/innisfree.svg";
import kimiyuLogo from "../assets/kimiyu.jpg";
import supergrainLogo from "../assets/supergrain.webp";
import netflixLogo from "../assets/netflix.png";
import appleLogo from "../assets/apple.png";
import ikeaLogo from "../assets/ikea.svg";
import resolLogo from "../assets/resol.jpeg";
import vogueLogo from "../assets/vogue.svg";


export default function HomePage() {
    // This ref points to the scrolling brand container without causing re-renders.
    const brandRowRef = useRef(null);

    // This ref remembers which brand should be shown next between timer calls.
    const brandIndexRef = useRef(0);

    // Reveal the homepage images when they become visible inside the main scroll area.
    useEffect(() => {
        const scrollContainer = document.querySelector(".main-page");
        if (!scrollContainer) return;

        // IntersectionObserver avoids running image animations until the images are visible.
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // The .active CSS class fades the image in and slides it into place.
                    entry.target.classList.add("active");

                    // Stop watching this image after its first reveal.
                    currentObserver.unobserve(entry.target);
                }
            });
        }, {
            // Use the app's scrolling area as the visibility boundary.
            root: scrollContainer,
            rootMargin: "0px 0px 0px 0px",
            threshold: 0.4
        });

        // Watch both homepage images, which have the .slide class.
        const slideElements = document.querySelectorAll(".slide");
        slideElements.forEach((element) => observer.observe(element));

        // Disconnect the observer when this page is removed.
        return () => observer.disconnect();
    }, []);

    // Automatically move through the brand logos and repeat from the beginning.
    useEffect(() => {
        const brandRow = brandRowRef.current;
        if (!brandRow) return;

        // Store the animation frame so it can be cancelled during cleanup.
        let returnAnimationFrameId;
        // This prevents the one-second timer from interrupting the return animation.
        let isReturningToStart = false;

        // Move quickly from the final scroll position back to the first brand.
        const scrollQuicklyToStart = () => {
            // Read the current horizontal position. This is normally the far right
            // edge of the row, but reading it makes the animation work from any position.
            const startingPosition = brandRow.scrollLeft;

            // Save the CSS snap setting so it can be restored when the animation ends.
            const originalScrollSnapType = brandRow.style.scrollSnapType;

            // Measure the distance between two cards. This includes the card width
            // and the gap, so the speed stays correct if the CSS dimensions change.
            const firstItem = brandRow.firstElementChild;
            const secondItem = firstItem?.nextElementSibling;
            const pixelsPerItem = secondItem
                ? secondItem.offsetLeft - firstItem.offsetLeft
                : firstItem.offsetWidth;

            // Returning at 2.5 card distances per second makes the loop-back quick,
            // while still leaving enough time for the movement to be seen.
            const returnSpeed = (pixelsPerItem || 266) * 2.5;

            // Convert the distance and speed into milliseconds for requestAnimationFrame.
            const animationDuration = (startingPosition / returnSpeed) * 1000;

            // All animation frames use the same starting timestamp to calculate progress.
            const animationStart = performance.now();
            isReturningToStart = true;

            // Snap points are useful for normal scrolling but would interrupt this animation.
            brandRow.style.scrollSnapType = "none";

            const animateReturn = (currentTime) => {
                // Progress moves from 0 to 1. It is capped at 1 so the animation
                // cannot overshoot its target if a frame takes longer than expected.
                const progress = Math.min((currentTime - animationStart) / animationDuration, 1);
                let distanceProgress;

                // Use three phases: accelerate, maintain speed, then decelerate.
                if (progress < 0.2) {
                    // The first 20% starts slowly and gains speed.
                    distanceProgress = 2.5 * Math.pow(progress, 2);
                } else if (progress < 0.8) {
                    // The middle 60% advances at a steady rate.
                    distanceProgress = 0.125 + 1.25 * (progress - 0.2);
                } else {
                    // The final 20% slows down so the row settles gently at the start.
                    const finalPhaseProgress = progress - 0.8;
                    distanceProgress = 0.875 + 1.25 * finalPhaseProgress - 3.125 * Math.pow(finalPhaseProgress, 2);
                }

                // Convert the progress through the return trip into a scroll position.
                // At progress 0 this stays at the old position; at progress 1 it is 0.
                brandRow.scrollLeft = startingPosition * (1 - distanceProgress);

                if (progress < 1) {
                    // Ask the browser for another frame so the movement appears continuous.
                    returnAnimationFrameId = window.requestAnimationFrame(animateReturn);
                } else {
                    // Force the exact starting position and restore normal snap behavior.
                    brandRow.scrollLeft = 0;
                    brandRow.style.scrollSnapType = originalScrollSnapType;
                    isReturningToStart = false;
                }
            };

            returnAnimationFrameId = window.requestAnimationFrame(animateReturn);
        };

        // Normal movement advances one card every second using smooth browser scrolling.
        const scrollToNextBrand = () => {
            // Do not let the regular timer issue a scroll command while the return
            // animation is controlling scrollLeft directly.
            if (isReturningToStart) return;

            // Convert the live HTML children into an array so we can choose the next card.
            const brandItems = Array.from(brandRow.children);

            // scrollWidth is the total content width; clientWidth is the visible width.
            // Their difference is the furthest horizontal position this row can reach.
            const maxScrollLeft = brandRow.scrollWidth - brandRow.clientWidth;
            if (brandItems.length === 0 || maxScrollLeft <= 0) return;

            // Once the row is at its right edge, start the special smooth return instead
            // of attempting to scroll beyond the browser's maximum allowed position.
            if (brandRow.scrollLeft >= maxScrollLeft - 1) {
                brandIndexRef.current = 0;
                scrollQuicklyToStart();
                return;
            }

            // Move the index forward and wrap it safely if the number of cards changes.
            brandIndexRef.current = (brandIndexRef.current + 1) % brandItems.length;
            const nextItem = brandItems[brandIndexRef.current];

            // Let the browser animate this normal card-to-card movement. The destination
            // is the card's real offset, so the existing gap and row padding are respected.
            brandRow.scrollTo({
                left: nextItem.offsetLeft,
                behavior: "smooth"
            });
        };

        // Start the repeating one-second timer after the component has mounted.
        const intervalId = window.setInterval(scrollToNextBrand, 1000);

        // Stop both kinds of animation when the page is unmounted.
        return () => {
            window.clearInterval(intervalId);
            window.cancelAnimationFrame(returnAnimationFrameId);
        };
    }, []);

    return(
        <div id="homepage">
            <div id="introduction-section">
                <div id="first-paragraph">
                    <h1 className="homepage-header">Hey, I'm Gabriella.</h1>
                    <p>I do this, this, and this. This text is a placeholder for how the real thing will look when fully implemented.</p>
                </div>
                <div className="homepage-image-wrapper slide" id="first-homepage-image">
                    <img className="homepage-image" src={homepageImage1} width="365px" height="547px" />
                </div>
                <div className="homepage-image-wrapper slide" id="second-homepage-image">
                    <img className="homepage-image" src={homepageImage2} width="365px" height="547px" />
                </div>
                <div id="second-paragraph">
                    <h1 className="homepage-header">Graphic Design. Done better.</h1>
                    <p>I do this, this, and this. This text is a placeholder for how the real thing will look when fully implemented.</p>
                </div>
            </div>
            <div id="client-section">
                <h1 className="homepage-header" id="client-header">Brands I Have Worked With</h1>
                <div className="brand-row" ref={brandRowRef}>
                    <div className="brand-item"><img src={innisfreeLogo} alt="Brand Logo" /></div>
                    <div className="brand-item"><img src={kimiyuLogo} alt="Brand Logo" /></div>
                    <div className="brand-item"><img src={supergrainLogo} alt="Brand Logo" /></div>
                    <div className="brand-item"><img src={netflixLogo} alt="Brand Logo" /></div>
                    <div className="brand-item"><img src={ikeaLogo} alt="Brand Logo" /></div>
                    <div className="brand-item"><img src={appleLogo} alt="Brand Logo" /></div>
                    <div className="brand-item"><img src={resolLogo} alt="Brand Logo" /></div>
                    <div className="brand-item"><img src={vogueLogo} alt="Brand Logo" /></div>
                </div>
            </div>
            <div id="latest-work-section">
                <h1 className="homepage-header">Check Out My Latest Work</h1>
            </div>
            <div id="reviews-section">
                <h1 className="homepage-header">Reviews</h1>
            </div>
        </div>
    )
}