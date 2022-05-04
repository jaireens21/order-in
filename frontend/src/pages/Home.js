import React from "react";
import "./Home.css";
import {IoIosStar} from 'react-icons/io';

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
                <div id="history">
                    <img id="chef" src="https://images.unsplash.com/photo-1598762888384-ef5fd4345ef7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80" alt="chef preparing a meal"/>
                
                    <p><strong>THE ETYMOLOGY OF <br/>RESTAURANT</strong><br/>Restaurant: "an eating-house, establishment where meals may be bought and eaten," 1821, from French restaurant "a restaurant," originally "food that restores," noun use of present participle of restaurer "to restore or refresh," from Old French restorer.</p>
                </div>
                
                
                
            </div>
            
            <div id="reviewSection">
                <h2>What people say about our food</h2>
                <div id="reviews">
                    <div className="card">
                        <p><IoIosStar/><IoIosStar/><IoIosStar/><IoIosStar/></p>
                        <p>I cannot rave enough about the quality of food. My new favorite restaurant. The food is absolutely delicious and the service outstanding. Love love love this place.</p>
                        <p>M Kramer, Google Review</p>
                        
                    </div>
                    <div className="card">
                        <p><IoIosStar/><IoIosStar/><IoIosStar/><IoIosStar/><IoIosStar/></p>
                        <p>This place is the real deal! I tried it based on the recommendation of a friend and I have never looked back. </p>
                        <p>Jerry S, Google Review</p>
                    </div>
                    <div className="card">
                        <p><IoIosStar/><IoIosStar/><IoIosStar/><IoIosStar/></p>
                        <p>Highly recommended! Love all their dishes. Food portions are amazing, taste is scrumptious!</p>
                        <p>George K, Google Review</p>
                    </div>
                </div>
                <a id="readMore" href="link_to_google_reviews" target="_blank" rel="nofollow noreferrer noopener" className="btn btn-danger">Read More Reviews</a>
            </div>

            

        </div>
         
     )
 }