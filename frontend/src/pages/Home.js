import React from "react";
import "./Home.css";

 export default function Home(){
     return(
         <div className="Home">
            <div id="heroSection">
                {/* <p>Show animated pictures of food and resto here</p>
                <p>With overlay of resto name , phone number and online order link</p> */}
                 
                <ul class="slideshow">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <div id="heroText" >
                    <p id="welcome">Welcome to <br/> ORDER -IN</p> 
                    <p><a href="/orderonline">Order Online</a></p>
                    <p>OR call at: <a href="tel:(123) 456-7890">(123) 456-7890</a></p>
                </div>
               
                
            </div>

            <div id="historySection">
                <p>tell about the resto history/ chef history</p>
                <p>with 1 pic of chef/ team</p>
            </div>
            
            <div id="reviewSection">
                <h2>What people say about our food</h2>
                <div id="reviews">
                    <div className="card">
                        <p>number of stars</p>
                        <p>Review Text</p>
                        <p>Name of user, Google Review</p>
                        
                    </div>
                    <div className="card">
                        <p>number of stars</p>
                        <p>Review Text</p>
                        <p>Name of user, Google Review</p>
                    </div>
                    <div className="card">
                        <p>number of stars</p>
                        <p>Review Text</p>
                        <p>Name of user, Google Review</p>
                    </div>
                </div>
                <a href="link_to_google_reviews" target="_blank" rel="nofollow noreferrer noopener" className="btn btn-danger">Read More Reviews</a>
            </div>

            

        </div>
         
     )
 }