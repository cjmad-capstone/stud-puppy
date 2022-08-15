import { useState } from 'react';

const Nav = () => {
    const [count, setCount] = useState(0);
    return (
        <nav>
            <div onClick={() => setCount(count + 1)}>{count}</div>
            Nav...
        </nav>
    );
};

export default Nav;