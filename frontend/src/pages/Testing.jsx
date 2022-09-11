import React from 'react';
import AnimatedCard from '../components/AnimatedCard/AnimatedCard.jsx';
import { Card } from 'react-daisyui';
import Button from '../components/Button/Button.jsx';
const Testing = () => {
    return (
        <div>
            <AnimatedCard>
                <Card.Body>
                    <Card.Title className={`font-brand font-bold`}>
                        Card title
                    </Card.Title>
                    <Card.Actions>
                        <Button>Ho</Button>
                    </Card.Actions>
                </Card.Body>
            </AnimatedCard>
        </div>
    );
};

export default Testing;
