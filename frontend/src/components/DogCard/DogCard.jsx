<<<<<<< Updated upstream

const DogCard = ({ imgPath, name, className, children, ...rest }) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src="https://placeimg.com/400/225/arch" /*src={imgPath} */ alt="Dog Photo"/></figure>
            <div className="card-body">
                <h2 className="card-title">
                    I'm a Dog!
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">User Profile</div>
                    <div className="badge badge-outline">Dog Profile</div>
=======
function DogCard({ dog }) {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
                <img
                    src="https://source.unsplash.com/random/?dog"
                    alt="Shoes"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {dog?.name}, {dog?.age}
                </h2>
                <p>{dog?.description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
>>>>>>> Stashed changes
                </div>
            </div>
        </div>
    );
<<<<<<< Updated upstream
};

export default DogCard;
=======
}

export default DogCard;
>>>>>>> Stashed changes
