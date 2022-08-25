
import Button from '../components/Button/Button.jsx';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import { authHeader } from '../utils/auth/authHeader.js';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import { pt } from '../utils/anim/pageTransitions.js';
import {motion} from "framer-motion";

const CreateEvent = () => {



    return (
        <div className={'flex flex-col items-center'}>
        <h1 className={`text-6xl font-brand font-bold`}>Create Event</h1>
            <form className={`w-1/2`}>
                <div className={`flex flex-col items-center`}>
                    <label htmlFor="name" className={`text-2xl font-brand font-bold`}>Name</label>
                    <input type="text" name="name" id="name" className={`w-full p-2 border border-brand rounded-lg`} />
                </div>
                <div className={`flex flex-col items-center`}>
                    <label htmlFor="description" className={`text-2xl font-brand font-bold`}>Description</label>
                    <input type="text" name="description" id="description" className={`w-full p-2 border border-brand rounded-lg`} />
                </div>
                <div className={`flex flex-col items-center`}>
                    <label htmlFor="date" className={`text-2xl font-brand font-bold`}>Date</label>
                    <input type="text" name="date" id="date" className={`w-full p-2 border border-brand rounded-lg`} />
                </div>
                <div className={`flex flex-col items-center`}>
                    <label htmlFor="time" className={`text-2xl font-brand font-bold`}>Time</label>
                    <input type="text" name="time" id="time" className={`w-full p-2 border border-brand rounded-lg`} />
                </div>
                <div className={`flex flex-col items-center`}>
                    <label htmlFor="location" className={`text-2xl font-brand font-bold`}>Location</label>
                    <input type="text" name="location" id="location" className={`w-full p-2 border border-brand rounded-lg`} />
                </div>
                <Button type="submit" className={`w-full p-2 border border-brand rounded-lg`}>Create Event</Button>
            </form>
        </div>
    );

}

export default CreateEvent;






