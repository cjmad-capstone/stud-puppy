import { getCurrentUser } from '../utils/user/userActions.js';
import { withAuth } from '../utils/auth/withAuth.jsx';
import { pt } from '../utils/anim/pageTransitions.js';
import { motion } from 'framer-motion';

const Profile = () => {
    return (
        <motion.main {...pt}>
            <div>Test</div>
        </motion.main>
    );
};

export default withAuth(Profile, '/login');
