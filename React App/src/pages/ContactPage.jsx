import aboutMeImage from "../assets/about-me.jpg";
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { TbBrandLinkedin } from "react-icons/tb";

// Contact page content.
export default function ContactPage() {
    return(
        <>
            {/* <img className="about-me-image" src={aboutMeImage} alt="About me" /> */}
            <p>Contact me through these platforms:</p>
            {/* <ul>
                <li>Instagram</li>
                <li>Whatsapp</li>
                <li>Email</li>
            </ul> */}

            <div className="social-container">
                <a href="https://wa.me/6287731777090" className="social whatsapp" target="_blank" rel="noreferrer">
                    <FaWhatsapp />
                </a>
                <a href="https://www.instagram.com/gabriellagiovanni/" className="social instagram" target="_blank" rel="noreferrer">
                    <FaInstagram />
                </a>
                <a href="https://www.linkedin.com/in/gabriella-giovanni-b511791b7/" className="social linkedin" target="_blank" rel="noreferrer">
                    <TbBrandLinkedin />
                </a>
                <a href="mailto:by.gabriellagiovanni@gmail.com" className="social email" target="_blank" rel="noreferrer">
                    <HiOutlineMail />
                </a>
            </div>
        </>
    )
}