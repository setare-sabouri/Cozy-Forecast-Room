import { useEffect, useRef, useState } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import styles from './WeathersAudio.module.scss'

const WeathersAudio = ({ src = './Audios/Sunny.mp3'}) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audio = new Audio(src);
        audio.loop = true;
        audio.volume = 0.3;  // ............temporary.........
        audioRef.current = audio;

        //To play requires user interaction
        const handleFirstClick = () => {
            audio.play().then(() => setIsPlaying(true)).catch(console.warn);
            window.removeEventListener('click', handleFirstClick);
        };
        window.addEventListener('click', handleFirstClick);

        return () => {
            window.removeEventListener('click', handleFirstClick);
            audio.pause();
        };
    }, [src]);

    const toggleAudio = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className={styles.backAudio} onClick={toggleAudio}>
            {isPlaying ? <FaVolumeUp size={35} color='#e4b467' /> : <FaVolumeMute size={35} color='#dfdd57'/>}
        </div>
    );
};

export default WeathersAudio;