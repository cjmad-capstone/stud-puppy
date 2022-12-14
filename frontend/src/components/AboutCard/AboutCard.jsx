import React from 'react';
import { AiOutlineLinkedin } from 'react-icons/ai';
import { AiOutlineGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

function AboutCard(props) {
    return (
        <motion.div
            className="card w-96 bg-base-100 shadow-xl"
            initial={{ opacity: 0, scale: 0.75, rotateZ: 10 }}
            animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
            transition={{ delay: 0.1 * props.idx }}
        >
            <figure className="px-10 pt-10">
                <img src={props.img} className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title text-3xl font-brand">{props.name}</h2>
                <h3 className={`font-bold `}>Full Stack Developer</h3>
                <p>{props.bio}</p>
                <div className="card-actions justify-center">
                    <a href={props.linkedIn}>
                        <AiOutlineLinkedin className={`text-2xl`} />
                    </a>
                    <a href={props.githubLink}>
                        <AiOutlineGithub className={`text-2xl`} />
                    </a>
                    <a href={props.alumniPortalLink}>
                        <img
                            className={'text-2Xl mt-0.5 h-5 w-5 contrast-[80%]'}
                            src="/img/codeup_black_icon.webp"
                        />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

export default AboutCard;
