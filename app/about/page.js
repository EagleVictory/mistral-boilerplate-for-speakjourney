// import { getServerSession } from "next-auth";
import about1 from "@/assets/images/about1.png";
import Image from "next/image";
import classes from "./about.module.css";
export default async function About() {
  // const user = await getServerSession();
  // console.log(user);

  return (
    <div className="conatiner-fluid" style={{ backgroundColor: "#FDF0E6" }}>
      <div className={`container pt-5 ${classes.firstSec}`}>
        <div className="row">
          <div className="col-6">
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
          </div>
          <div className="col-6">
            <Image
              style={{ width: "100%", height: "100vh" }}
              src={about1}
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
}
