import '../styles/About.css';
import ProfilePic from '../img/Stonehagen.png'

const About = () => {

const p1 = `I'm excited to share my adventures and love for exploring the 
world with you. My website is designed using the MERN stack, which includes 
MongoDB, Express, React, and Node.js. This stack enables me to provide you 
with a seamless and responsive experience so that you can easily access my 
content from any device.`

const p2 = `My blog covers a variety of destinations, 
from exotic beaches to bustling cities, and everything in between. 
I provide in-depth reviews of hotels, restaurants, and tourist attractions, 
along with tips and tricks to help you get the most out of your travels.`

const p3 = `One unique feature of my blog is the 
use of AI-generated posts. These entertaining and informative 
posts cover a wide range of destinations and topics. Whether you're an 
experienced traveler or a novice, my blog is the perfect resource for 
anyone looking to explore the world.`

const p4 = `As an avid traveler myself, 
I believe that travel is not just about visiting tourist attractions 
but also about immersing oneself in the local community and gaining a 
deeper understanding of the world around us. Join me on my journey as 
I discover the wonders of the world and share my experiences with you. 
Thank you for visiting my website, and I hope you enjoy my content!`

return (
  <div className="About">
    <img src={ProfilePic} alt='Tobias Steinhagen'></img>
    <h1>Welcome to my travel blog!</h1>
    <p>{p1}</p>
    <p>{p2}</p>
    <p>{p3}</p>
    <p>{p4}</p>
  </div>
);
};

export default About;