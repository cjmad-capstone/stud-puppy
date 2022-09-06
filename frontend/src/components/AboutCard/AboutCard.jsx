import React from 'react';
import { AiOutlineLinkedin } from "react-icons/ai";
import { AiOutlineGithub } from "react-icons/ai";

function AboutCard(props) {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={props.img} className="rounded-xl"/>
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{props.name}</h2>
                <p>{props.bio}</p>
                <div className="card-actions">
                    <a href={props.linkedIn}><AiOutlineLinkedin /></a>
                    <a href={props.githubLink}><AiOutlineGithub /></a>
                </div>
            </div>
        </div>

        // <div className="card w-96 bg-base-100 shadow-xl">
        //     <div className="card-body card w-60 bg-base-80 shadow-xl">
        //         <h2 className="card-title">{props.name}</h2>
        //         <div className="w-1/3">
        //             <figure><img src={props.img} /></figure>
        //         </div>
        //         <div className="card-actions justify-end">
        //             <p>{props.bio}</p>
        //             <br />
        //             <a href={props.linkedIn}><AiOutlineLinkedin /></a>
        //             <a href={props.githubLink}><AiOutlineGithub /></a>
        //         </div>
        //     </div>
        // </div>

    )
}

export default AboutCard;