import {motion} from "framer-motion";
import {pt} from "../utils/anim/pageTransitions.js";
import AboutCard from "../components/AboutCard/AboutCard.jsx";

const AboutPage = () => {

    return (
        <motion.main {...pt} className={`p-12`}>
            {/*<div className="hero min-h-screen" style="background-image: url(https://placeimg.com/1000/800/arch);">*/}


            <h1 className="m-10 text-8xl font-bold">About Us.</h1>
                        <p className="decoration-8 w-fit mb-5 mt-5 text-center">A full-stack web application that allows you to find your best buddy, a play date. It’s complete with a modern design made using React.js, styled with TailwindCSS, animated with Framer Motion. The user can sign up for an account then get to creating their dog’s profile. It allows dog-owners to collaborate in an effort to help their furry friend live their best life. My team and I were able to design and implement a RESTful API using Spring Boot with full CRUD functionality that communicates with the frontend to authenticate with JWTs.</p>


            {/*</div>*/}
            {/*<div>*/}
            {/*    <h2 className="h-20">About Us.</h2>*/}
            {/*    <p className="w-50">A full-stack web application that allows you to find your best buddy, a play date. It’s complete with a modern design made using React.js, styled with TailwindCSS, animated with Framer Motion. The user can sign up for an account then get to creating their dog’s profile. It allows dog-owners to collaborate in an effort to help their furry friend live their best life. My team and I were able to design and implement a RESTful API using Spring Boot with full CRUD functionality that communicates with the frontend to authenticate with JWTs.</p>*/}

            {/*</div>*/}
            <div className={`flex gap-1 flex-wrap justify-center`}>
                <AboutCard
                    img="../img/D. Miller.jpg"
                    name="Dalton"
                    bio="Would you like me to park your car?"
                    linkedIn="https://www.linkedin.com/in/daltonkyemiller/"
                    githubLink="https://github.com/daltonkyemiller"
                />

                <AboutCard
                    img="../img/C. Gallagos.jpg"
                    name="Cynthia"
                    bio="Bring me borgar"
                    linkedIn="https://www.linkedin.com/in/cynthialgallegos/"
                    githubLink="https://github.com/CGALLE39"
                />
                <AboutCard
                    img="../img/M. Jio.jpg"
                    name="Matt"
                    bio="Here in my car.."
                    linkedIn="https://www.linkedin.com/in/matt-jio/"
                    githubLink="https://github.com/mattjio"
                />
                <AboutCard
                    img="../img/J. Welsh.jpg"
                    name="Justin"
                    bio="Very nice!"
                    linkedIn="https://www.linkedin.com/in/justin-welsh/"
                    githubLink="https://github.com/JustinWelsh"
                />
                <AboutCard
                    img="../img/A. Rodriguez.jpg"
                    name="Alex"
                    bio="Oi, you gotta get on this TRT bro !"
                    linkedIn="www.linkedin.com/in/alexanderjrodriguez"
                    githubLink="https://github.com/ajrod-dev"

                />
            </div>
        </motion.main>
    );
}

export default AboutPage;