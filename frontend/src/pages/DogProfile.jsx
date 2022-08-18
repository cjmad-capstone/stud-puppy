import { getCurrentUser } from '../utils/user/userActions.js';
import { withAuth } from '../utils/auth/withAuth.jsx';
import { pt } from '../utils/anim/pageTransitions.js';
import { motion } from 'framer-motion';
import Nav from '../components/Nav/Nav.jsx';
import Button from '../components/Button/Button.jsx';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const DogProfile = () => {
    const { id } = useParams();
    const { data: dog, error } = useQuery(['dog', id], () =>
        fetch(`/api/dogs/${id}`).then((res) => res.json())
    );

    if (!dog) return null;
    console.log(dog);

    return (
        <motion.main {...pt} className={`absolute top-0 left-0 md:static`}>
            <div>
                {/*Carousel*/}
                <div className="carousel w-full h-[600px]">
                    <div
                        id="slide1"
                        className="carousel-item relative w-full h-full "
                    >
                        <img
                            src="https://www.thestatesman.com/wp-content/uploads/2022/07/AmericanBullysobakabarobaka-4ce0d4dc0e144dccadb5159b222e275e-e1657808052501.jpg"
                            className="w-full h-full object-center object-cover"
                        />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a
                                href="#slide4"
                                className="btn btn-circle opacity-75"
                            >
                                ❮
                            </a>
                            <a
                                href="#slide2"
                                className="btn btn-circle opacity-75"
                            >
                                ❯
                            </a>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                        <img
                            src="https://placeimg.com/800/200/arch"
                            className="w-full"
                        />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a
                                href="#slide1"
                                className="btn btn-circle opacity-75"
                            >
                                ❮
                            </a>
                            <a
                                href="#slide3"
                                className="btn btn-circle opacity-75"
                            >
                                ❯
                            </a>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <img
                            src="https://placeimg.com/800/200/arch"
                            className="w-full"
                        />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a
                                href="#slide2"
                                className="btn btn-circle opacity-75"
                            >
                                ❮
                            </a>
                            <a
                                href="#slide4"
                                className="btn btn-circle opacity-75"
                            >
                                ❯
                            </a>
                        </div>
                    </div>
                    <div id="slide4" className="carousel-item relative w-full">
                        <img
                            src="https://placeimg.com/800/200/arch"
                            className="w-full"
                        />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a
                                href="#slide3"
                                className="btn btn-circle opacity-75"
                            >
                                ❮
                            </a>
                            <a
                                href="#slide1"
                                className="btn btn-circle opacity-75"
                            >
                                ❯
                            </a>
                        </div>
                    </div>
                </div>

                <div className="relative flex justify-between flex-wrap bg-base-100 rounded-3xl z-1 -top-14">
                    {/*Left card*/}
                    <div className="card w-full md:w-1/2">
                        <div className="card-body">
                            <h1 className="card-title text-5xl">
                                {dog?.name}, {dog?.age}
                            </h1>
                            <h2 className="text-3xl pb-4"></h2>
                            <p>{dog.description}</p>
                            <div className="card-actions justify-center pt-6">
                                <Button
                                    className={`text-sm w-full hover:from-pink-300 hover:to-red-400`}
                                >
                                    Schedule A Meetup
                                </Button>
                            </div>
                        </div>
                    </div>

                    <hr
                        className={
                            'block md:hidden border-t-2 border-secondary w-3/4 mx-auto'
                        }
                    />
                    {/*Right card*/}
                    <div className="card w-full  md:w-1/4 ">
                        <div className="card-body">
                            <h2 className="text-xl">Meet the Owner</h2>
                            <div className={`flex items-center`}>
                                <figure
                                    className={`min-w-16 min-h-16 w-16 h-16`}
                                >
                                    <img
                                        src="https://placeimg.com/400/225/arch"
                                        alt="User pic"
                                        className={`rounded-full w-full h-full object-cover`}
                                    />
                                </figure>
                                <h1 className="text-2xl pl-4">
                                    {dog.owner?.name ?? dog.owner?.username}
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
