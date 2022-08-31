import {motion} from "framer-motion";
import {pt} from "../utils/anim/pageTransitions.js";
import AboutCard from "../components/AboutCard/AboutCard.jsx";

const AboutPage = () => {

    return (
        <motion.main {...pt} className={`p-4`}>
            <div>
                <h2 className="h-20">About Us.</h2>
                <p>A full-stack web application that allows you to find your best buddy, a play date. It’s complete with a modern design made using React.js, styled with TailwindCSS, animated with Framer Motion. The user can sign up for an account then get to creating their dog’s profile. It allows dog-owners to collaborate in an effort to help their furry friend live their best life. My team and I were able to design and implement a RESTful API using Spring Boot with full CRUD functionality that communicates with the frontend to authenticate with JWTs.</p>

            </div>
            <div className={`flex gap-1 flex-wrap justify-center`}>
                <AboutCard
                    img="../public/img/D. Miller.jpg"
                    name="Dalton"
                    bio="Would you like me to park your car?"
                    linkedIn="https://www.linkedin.com/in/daltonkyemiller/"
                />
                <AboutCard  img="../public/img/C. Gallagos.jpg" name="Cynthia" bio="Bring me borgar"/>
                <AboutCard  img="../public/img/M. Jio.jpg" name="Matt" bio="Here in my car.."/>
                <AboutCard  img="../public/img/J. Welsh.jpg" name="Justin" bio="Very nice!"/>
                <AboutCard  img="../public/img/A. Rodriguez.jpg" name="Alex" bio="Oi !"/>
            </div>
        </motion.main>
    );
}

export default AboutPage;