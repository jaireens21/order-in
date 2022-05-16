//footer for customer website

import React from "react";
import "./Footer.css";
import { AiFillFacebook } from 'react-icons/ai';
import { AiFillInstagram } from 'react-icons/ai';
import { FaYelp } from 'react-icons/fa';

export default function Footer(){
 return(
    <div className="Footer">
        <div id="sectionTop">
            <div>
                <a href="https://goo.gl/maps/Mkd1KUTXr1U2drWr9" target="_blank" rel="noreferrer nofollow noopener" aria-label="click here to see us on google maps">7430 Kingston Rd, Scarborough, ON</a>
                <a href="tel:(123) 456-7890" aria-label="click here to call us">(123) 456-7890</a>
                <a href="mailto:xxx@g.ca" aria-label="click here to send us an email at xxx@g.ca">Email Us</a>
            </div>
            <div>
                <p id="opHours">Operating Hours</p>
                <p><strong>Mon-Sun</strong>: 11 am to 10pm</p>
            </div>
            <div>
                <p>brand image </p>
                <div id="socialMedia">
                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer nofollow noopener" aria-label="go to our facebook page"><AiFillFacebook/></a>
                    <a href="https://www.instagram.com/?hl=en" target="_blank" rel="noreferrer nofollow noopener" aria-label="go to our instagram page"><AiFillInstagram/></a>
                    <a href="https://www.yelp.ca/toronto" target="_blank" rel="noreferrer nofollow noopener" aria-label="go to our yelp page"><FaYelp/></a>
                </div>
                
            </div>
        </div>
        <div id="sectionBottom">
        <p>Copyright &copy;2022 Order-In</p>
        </div>
    </div>
 )
}