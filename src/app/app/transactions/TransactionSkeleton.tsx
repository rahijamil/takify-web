import { useEffect, useRef } from 'react';
import styles from './TransactionSkeleton.module.css'; // Assuming you have Tailwind CSS set up with a CSS module

const TransactionSkeleton = () => {
    const animatedValue = useRef(0.5);

    useEffect(() => {
        const animateSkeleton = () => {
            animatedValue.current = 0.5;

            const animate = () => {
                animatedValue.current = 1;
                setTimeout(() => {
                    animatedValue.current = 0.5;
                    animate();
                }, 1000);
            };

            animate();
        };

        animateSkeleton();
    }, []);

    const skeletonStyle = {
        opacity: animatedValue.current,
    };

    return (
        <div className={styles.skeletonContainer}>
            <div className={`${styles.skeletonRectangle} ${styles.skeletonAnimation}`} style={skeletonStyle} />
            <div className={`${styles.skeletonRectangle} ${styles.skeletonAnimation}`} style={skeletonStyle} />
            <div className={`${styles.skeletonRectangle} ${styles.skeletonAnimation}`} style={skeletonStyle} />
        </div>
    );
};

export default TransactionSkeleton;
