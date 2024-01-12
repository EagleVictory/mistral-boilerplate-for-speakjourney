import about1 from "../../assets/images/about.png";
import Image from "next/image";
import classes from "./about.module.css";
export default function About() {
  return (
    <div className="conatiner-fluid" style={{ backgroundColor: "#FDF0E6" }}>
      <div className={`container pt-5 ${classes.firstSec}`}>
        <div className="row">
          <div className="col-12 col-md-6 order-2 order-md-1">
            <h1>Welcome to Speakjourney</h1>
            <p className="mt-5 mx-5 mx-md-2">
              At Speakjourney, we believe that language learning is not just
              about mastering words; it’s about immersing yourself in cultures,
              connecting with people, and embarking on a transformative journey.
              Our innovative web3 language learning platform offers more than
              just language lessons; it offers an immersive experience where
              language and culture intersect, creating a vibrant space for
              exploration, learning, and personal growth.
            </p>

            <h1 className="mt-5">Our Vision</h1>
            <p className="mt-5 mx-5 mx-md-2">
              Speakjourney was born from a vision to revolutionize the way
              languages are learned. We understand the struggles faced by
              learners — the challenge of moving from textbook proficiency to
              confident real-world communication. That’s why we’ve crafted an
              environment that goes beyond the traditional classroom, allowing
              you to step into a world where language is a living, breathing
              entity.
            </p>
          </div>
          <div className="col-12 my-auto col-md-6 order-1 order-md-2">
            <Image style={{ width: "100%", height: "100%" }} src={about1} />
          </div>
        </div>
      </div>
    </div>
  );
}
