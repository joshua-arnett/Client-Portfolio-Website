import aboutMeImage from "../assets/about-me.jpg";

// About page content.
export default function AboutPage() {
    return(
        <>
            <img className="about-me-image" src={aboutMeImage} alt="About me" />
            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
            <p>Contact me on</p>
            <ul>
                <li>Instagram</li>
                <li>Whatsapp</li>
                <li>Email</li>
            </ul>
        </>
    )
}