import homepageImage1 from "../assets/homepage-1.jpeg";
import homepageImage2 from "../assets/homepage-2.jpeg";

// Temporary home page content.
export default function HomePage() {
    return(
        <div id="home-page">
            <div id="introduction-section">
                <div id="first-paragraph">
                    <h1 className="home-page-header">Hey, I'm Gabriella.</h1>
                    <p>I do this, this, and this. This text is a placeholder for how the real thing will look when fully implemented.</p>
                </div>
                <div className="homepage-image-wrapper" id="first-homepage-image">
                    <img className="homepage-image" src={homepageImage1} />
                </div>
                <div className="homepage-image-wrapper" id="second-homepage-image">
                    <img className="homepage-image" src={homepageImage2} />
                </div>
                <div id="second-paragraph">
                    <h1 className="home-page-header">Graphic Design. Done better.</h1>
                    <p>I do this, this, and this. This text is a placeholder for how the real thing will look when fully implemented.</p>
                </div>
            </div>
            <div id="client-section">
                <h1 className="home-page-header">Brands I Have Worked With</h1>
                {/* Put scrollable list here */}
            </div>
            <div id="latest-work-section">
                <h1 className="home-page-header">Check Out My Latest Work</h1>
            </div>
            <div id="reviews-section">
                <h1 className="home-page-header">Reviews</h1>
            </div>
        </div>
    )
}