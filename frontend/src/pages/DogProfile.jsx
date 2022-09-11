import { pt } from '../utils/anim/global.js';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../components/Button/Button.jsx';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { differenceInYears, parseISO } from 'date-fns';
import { FILESTACK_ENDPOINT } from '../utils/consts.js';
import LinkDogs from '../components/LinkDogs/LinkDogs.jsx';
import { UserContext } from '../context/UserContext.jsx';
import EditableText from '../components/EditableText/EditableText.jsx';
import { dogSchema } from '../utils/dogSchema.js';
import { authHeader } from '../utils/auth/authHeader.js';

const DogProfile = () => {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const {
        data: dog,
        error,
        refetch: refetchDog,
    } = useQuery(['dog', id], () =>
        fetch(`/api/dogs/${id}`).then((res) => res.json())
    );

    const { mutate: updateDog } = useMutation(
        (data) =>
            fetch(`/api/dogs/${id}/edit`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    ...authHeader(),
                },
                body: JSON.stringify({ ...dog, ...data }),
            }).then((res) => res.json()),
        {
            onSuccess: async (data) => {
                await refetchDog();
            },
        }
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
                    className={`flex basis-full md:basis-2/3 flex-wrap  md:flex-nowrap md:justify-[unset] justify-center gap-3`}
                >
                    {dog.images.map((image, idx) => (
                        <div
                            className={`min-w-1/3 basis-1/3 flex-grow rounded-2xl overflow-hidden `}
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
                    className="relative m-4 px-4
                bg-base-100 rounded-3xl z-1 "
                >
                    {/*Left card*/}
                    <div className="w-full mb-6">
                        <div className={`flex `}>
                            <h1 className="flex flex-wrap md:flex-nowrap card-title text-6xl md:text-6xl font-bold py-4 font-brand">
                                <EditableText
                                    defaultValue={dog?.name}
                                    editable={dog?.owner.id === user?.id}
                                    validation={dogSchema.name}
                                    onEdit={({ value }) =>
                                        updateDog({ name: value })
                                    }
                                />
                                ,&nbsp;
                                <EditableText
                                    type={'date'}
                                    displayValue={differenceInYears(
                                        new Date(),
                                        parseISO(dog?.dob)
                                    )}
                                    defaultValue={dog?.age}
                                    editable={dog?.owner.id === user?.id}
                                    validation={dogSchema.dob}
                                    onEdit={({ value }) =>
                                        updateDog({ dob: value })
                                    }
                                />
                            </h1>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            {dog?.breeds?.map((breed, idx) => (
                                <div
                                    key={idx}
                                    className="badge badge-secondary py-3 px-2 my-3"
                                >
                                    {breed.breedName}
                                </div>
                            ))}
                            <EditableText
                                type="number"
                                className={`badge badge-primary py-3 px-2 my-3`}
                                displayValue={`${dog?.weight}lbs`}
                                defaultValue={dog?.weight}
                                editable={dog?.owner.id === user?.id}
                                validation={dogSchema.weight}
                                onEdit={({ value }) =>
                                    updateDog({ weight: value })
                                }
                            />
                        </div>
                        <div>
                            <EditableText
                                type="textarea"
                                className={`text-2xl font-light`}
                                defaultValue={dog?.description}
                                editable={dog?.owner.id === user?.id}
                                validation={dogSchema.description}
                                onEdit={({ value }) =>
                                    updateDog({ description: value })
                                }
                            />
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
