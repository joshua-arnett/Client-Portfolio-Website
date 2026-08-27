import { useEffect } from "react";
import homepageImage1 from "../assets/homepage-1.jpeg";
import homepageImage2 from "../assets/homepage-2.jpeg";

export default function HomePage() {
    // Set up the scroll animation after the page elements have been added to the DOM.
    useEffect(() => {
        // .main-page is the element that actually scrolls in the app layout.
        const scrollContainer = document.querySelector(".main-page");
        if (!scrollContainer) return;

        // Watch for images entering the visible area of the scroll container.
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // CSS uses .active to fade and slide the image into position.
                    entry.target.classList.add("active");

                    // Each image should animate only once during this page visit.
                    currentObserver.unobserve(entry.target);
                }
            });
        }, {
            // Measure visibility against .main-page instead of the browser viewport.
            root: scrollContainer,
            // Trigger when the image reaches the upper half of the scroll area.
            // This keeps the second image from activating during the first paint
            // when it is visible only near the bottom of the initial layout.
            rootMargin: "0px 0px 0px 0px",
            threshold: 0.4
        });

        // querySelectorAll returns a NodeList, which supports forEach.
        const slideElements = document.querySelectorAll(".slide");
        slideElements.forEach((element) => observer.observe(element));

        // Stop observing when HomePage is removed or before the effect runs again.
        return () => observer.disconnect();
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
                <h1 className="homepage-header">Brands I Have Worked With</h1>
                {/* Put scrollable list here */}
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