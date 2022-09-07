import { pt } from '../utils/anim/pageTransitions.js';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../components/Button/Button.jsx';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { differenceInYears, parse, parseISO } from 'date-fns';
import { FILESTACK_ENDPOINT } from '../utils/consts.js';
import LinkDogs from '../components/LinkDogs/LinkDogs.jsx';
import { UserContext } from '../context/UserContext.jsx';
import { fetchUser, getCurrentUser } from '../utils/user/userActions.js';
import DogEditableField from '../components/Edit/EditDog/DogEditableField.jsx';
import EditName from '../components/Edit/EditDog/EditName.jsx';
import EditDescription from '../components/Edit/EditDog/EditDescription.jsx';
import EditWeight from '../components/Edit/EditDog/EditWeight.jsx';

const DogProfile = () => {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const { data: dog, error } = useQuery(['dog', id], () =>
        fetch(`/api/dogs/${id}`).then((res) => res.json())
    );

    const [linkUpDialog, setLinkUpDialog] = useState(false);

    const openLinkUpDialog = (e) => {
        e.preventDefault();
        console.log(e);
        setLinkUpDialog(true);
    };

    if (!dog) return <main></main>;

    return (
        <motion.main {...pt}>
            <div>
                {/*Carousel*/}
                <div className="carousel w-full h-[600px]">
                    {dog.images.map((image, idx) => (
                        <div
                            key={idx}
                            id={`slide${idx}`}
                            className="carousel-item relative w-full h-full "
                        >
                            <img
                                alt={`Photo of ${dog?.name}`}
                                src={`${FILESTACK_ENDPOINT}/${image.url}`}
                                className="w-full h-full object-center object-cover"
                            />
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                {idx !== 0 && (
                                    <a
                                        href={`#slide${idx - 1}`}
                                        className="btn btn-circle opacity-75"
                                    >
                                        ❮
                                    </a>
                                )}
                                {idx !== dog.images.length - 1 && (
                                    <a
                                        href={`#slide${idx + 1}`}
                                        className="btn btn-circle opacity-75"
                                    >
                                        ❯
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <AnimatePresence>
                    {linkUpDialog && (
                        <LinkDogs
                            dogToLinkWith={dog}
                            setOpen={setLinkUpDialog}
                        />
                    )}
                </AnimatePresence>

                <div className="relative flex justify-between flex-wrap bg-base-100 rounded-3xl z-1 -top-14">
                    {/*Left card*/}
                    <div className="card w-full flex-grow md:w-1/2 lg:pl-10">
                        <div className="card-body">
                            <div className={`flex justify-between`}>
                                <h1 className="card-title text-5xl font-brand">
                                    <DogEditableField
                                        dog={dog}
                                        EditComponent={EditName}
                                        defaultValue={dog?.name}
                                    >
                                        {dog?.name}
                                    </DogEditableField>
                                    ,&nbsp;
                                    {differenceInYears(
                                        new Date(),
                                        parseISO(dog?.dob)
                                    )}
                                </h1>
                            </div>
                            <div className="flex items-center gap-4">
                                {dog?.breeds?.map((breed, idx) => (
                                    <div
                                        key={idx}
                                        className="badge badge-secondary py-3 px-2 my-3"
                                    >
                                        {breed.breedName}
                                    </div>
                                ))}
                                <div className="badge badge-primary py-3 px-2">
                                    <DogEditableField
                                        defaultValue={dog?.weight}
                                        dog={dog}
                                        EditComponent={EditWeight}
                                    >
                                        {dog?.weight}lbs
                                    </DogEditableField>
                                </div>
                            </div>
                            <div>
                                <DogEditableField
                                    dog={dog}
                                    defaultValue={dog.description}
                                    EditComponent={EditDescription}
                                >
                                    {dog.description}
                                </DogEditableField>
                            </div>
                            {user?.id !== dog?.owner?.id && (
                                <div className="card-actions justify-center pt-6">
                                    <Button
                                        className={`text-sm w-full hover:from-pink-300 hover:to-red-400`}
                                        onClick={openLinkUpDialog}
                                    >
                                        Schedule A Meetup
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    <hr
                        className={
                            'block md:hidden border-t-2 border-secondary w-3/4 mx-auto'
                        }
                    />
                    {/*Right card*/}
                    <div className="card w-full  md:w-1/4 ">
                        <div className="card-body md:px-0">
                            <h2 className="text-xl">Meet the Owner</h2>
                            <div className={`flex items-center`}>
                                <figure
                                    className={`min-w-16 min-h-16 w-16 h-16`}
                                >
                                    <img
                                        src={
                                            dog.owner?.img
                                                ? `${FILESTACK_ENDPOINT}/${dog.owner.img}`
                                                : 'https://placeimg.com/192/192/people'
                                        }
                                        alt="User pic"
                                        className={`rounded-full w-full h-full object-cover`}
                                    />
                                </figure>
                                <h1 className="text-2xl pl-4">
                                    <Link to={`/users/${dog?.owner?.id}`}>
                                        {dog.owner?.name ?? dog.owner?.username}
                                    </Link>
                                </h1>
                            </div>
                            <div className={`text-sm`}>
                                <h6>
                                    <a href={`mailto:${dog.owner?.email}`}>
                                        {dog.owner?.email}
                                    </a>
                                </h6>
                                <h6 className={`py-6`}>
                                    {dog.owner.description}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.main>
    );
};

export default DogProfile;
