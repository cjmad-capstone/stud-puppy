import React from 'react';
import { AiOutlineLinkedin } from "react-icons/ai";
import { AiOutlineGithub } from "react-icons/ai";

function AboutCard(props) {
    return (
        <div className="card-body card w-60 bg-base-80 shadow-xl">
            <img src="" />
            <h2 className="card-title">{props.name}</h2>
            <div className="w-1/3">
                <img src={props.img} />
            </div>
            <div className="card-actions justify-end">
                <p>{props.bio}</p>
                <br />
                <a href={props.linkedIn}><AiOutlineLinkedin /></a>
                <a href={props.githubLink}><AiOutlineGithub /></a>
            </div>
        </div>

    )
}

export default AboutCard;