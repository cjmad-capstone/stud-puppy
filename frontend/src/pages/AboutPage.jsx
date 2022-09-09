import { motion } from 'framer-motion';
import { pt } from '../utils/anim/pageTransitions.js';
import AboutCard from '../components/AboutCard/AboutCard.jsx';
import React from 'react';

const AboutPage = () => {
    return (
        <motion.main {...pt}>
            <div className={`px-6`}>
                <h1 className="text-7xl font-bold ">About Us.</h1>

                <div
                    className={`flex pb-6 flex-wrap gap-3 justify-center justify-center md:flex-nowrap`}
                >
                    <AboutCard
                        img="../img/D. Miller.jpg"
                        name="Dalton"
                        bio='"Everything that irritates us about others can lead to an understanding of ourselves." - Carl Jung'
                        linkedIn="https://www.linkedin.com/in/daltonkyemiller/"
                        githubLink="https://github.com/daltonkyemiller"
                        alumniPortalLink="https://alumni.codeup.com/students/1528"
                    />

                    <AboutCard
                        img="../img/C. Gallagos.jpg"
                        name="Cynthia"
                        bio="“Intellectual growth should commence at birth and cease only at death.” ― Albert Einstein"
                        linkedIn="https://www.linkedin.com/in/cynthialgallegos/"
                        githubLink="https://github.com/CGALLE39"
                        alumniPortalLink="https://alumni.codeup.com/students/1543"
                    />

                    <AboutCard
                        img="../img/M. Jio.jpg"
                        name="Matt"
                        bio="“If you cannot do great things, do small things in a great way.” – Napoleon Hill"
                        linkedIn="https://www.linkedin.com/in/matt-jio/"
                        githubLink="https://github.com/mattjio"
                        alumniPortalLink="https://alumni.codeup.com/students/1539"
                    />

                    <AboutCard
                        img="../img/J. Welsh.jpg"
                        name="Justin"
                        bio='"A comfort zone is a beautiful place, but nothing ever grows there"'
                        linkedIn="https://www.linkedin.com/in/justin-welsh/"
                        githubLink="https://github.com/JustinWelsh"
                        alumniPortalLink="https://alumni.codeup.com/students/1545"
                    />

                    <AboutCard
                        img="../img/A. Rodriguez.jpg"
                        name="Alex"
                        bio={`"The most damaging phrase in the language is: 'It's always been done that way.'" - Grace Hopper`}
                        linkedIn="https://www.linkedin.com/in/alexanderjrodriguez"
                        githubLink="https://github.com/ajrod-dev"
                        alumniPortalLink="https://alumni.codeup.com/students/1529"
                    />
                </div>
                <p className="decoration-8 w-fit mb-5 mt-5 mx-auto">
                    <span className={`font-bold text-xl font-brand`}>
                        Pugs 'n' Kisses
                    </span>{' '}
                    is a full-stack web application that allows you to find your
                    best buddy, a play date. It's complete with a modern design
                    made using React.js, styled with TailwindCSS, animated with
                    Framer Motion. The user can sign up for an account then get
                    to creating their dog's profile. It allows dog-owners to
                    collaborate in an effort to help their furry friend live
                    their best life. Our team was able to design and implement a
                    RESTful API using Spring Boot with full CRUD functionality
                    that communicates with the frontend authenticated with JSON
                    Web Tokens.
                </p>
            </div>
        </motion.main>
    );
};

export default AboutPage;
