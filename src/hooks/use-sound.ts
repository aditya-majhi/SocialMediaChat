import { useEffect, useRef } from "react";
import { Howl } from "howler";

// Sound library with predefined sound effects
const sounds = {
    messageReceived: new Howl({
        src: ["https://assets.mixkit.co/active_storage/sfx/2356/2356-preview.mp3"],
        volume: 0.3,
    }),
    messageSent: new Howl({
        src: ["https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3"],
        volume: 0.3,
    }),
    notification: new Howl({
        src: ["https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3"],
        volume: 0.3,
    }),
    selectConversation: new Howl({
        src: ["https://assets.mixkit.co/active_storage/sfx/2361/2361-preview.mp3"],
        volume: 0.2,
    }),
    mediaPreview: new Howl({
        src: ["https://assets.mixkit.co/active_storage/sfx/1111/1111-preview.mp3"],
        volume: 0.3,
    }),
};

type SoundType = keyof typeof sounds;

export function useSound() {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    const play = (type: SoundType) => {
        if (isMounted.current) {
            sounds[type].play();
        }
    };

    return { play };
}
