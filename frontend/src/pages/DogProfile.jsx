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
            <div className={`flex flex-wrap md:flex-nowrap p-4`}>
                <div
                    className={`flex flex-wrap md:flex-nowrap md:justify-[unset] justify-center gap-3`}
                >
                    {dog.images.map((image, idx) => (
                        <div
                            className="min-w-1/3 basis-1/3  rounded-2xl overflow-hidden"
                            key={idx}
                        >
                            <a
                                href={`${FILESTACK_ENDPOINT}/${image.url}`}
                                target={'_blank'}
                                rel="noreferrer"
                            >
                                <img
                                    alt={`Photo of ${dog?.name}`}
                                    src={`${FILESTACK_ENDPOINT}/${image.url}`}
                                    className={`w-full h-full object-cover object-center`}
                                />
                            </a>
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

                <div
                    className="relative m-4
                bg-base-100 rounded-3xl z-1 px-4"
                >
                    {/*Left card*/}
                    <div className="w-full mb-6 ">
                        <div className={`flex justify-center`}>
                            <h1 className="card-title text-5xl md:text-7xl font-bold py-4 font-brand">
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
                        <div className="flex flex-wrap items-center gap-4">
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
                                <p className={`text-2xl font-light`}>
                                    {dog.description}
                                </p>
                            </DogEditableField>
                        </div>
                        {user?.id !== dog?.owner?.id && user && (
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

                    <hr
                        className={
                            'block md:hidden border-t-2 border-secondary  mx-auto'
                        }
                    />
                    {/*Right card*/}
                    <div className=" w-full pt-8">
                        <div className="flex flex-col gap-3">
                            <h2 className="text-xl">Meet the Owner</h2>
                            <div className={`flex items-center`}>
                                <figure
                                    className={`min-w-16 min-h-16 w-16 h-16`}
                                >
                                    <img
                                        src={
                                            dog?.owner?.img
                                                ? `${FILESTACK_ENDPOINT}/${dog.owner.img}`
                                                : '/img/placholder-img.jpeg'
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
