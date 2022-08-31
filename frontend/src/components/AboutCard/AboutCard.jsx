import React from 'react';
import { AiOutlineLinkedin } from "react-icons/ai";

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
                <AiOutlineLinkedin /><p>{props.linkedIn}</p>
            </div>
        </div>

    )
}

export default AboutCard;