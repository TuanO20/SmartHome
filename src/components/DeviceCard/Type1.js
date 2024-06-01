import { onValue, ref, update } from 'firebase/database';
import { db } from '../../firebase';
import './Type1.scss';
import { useEffect, useState } from 'react';

function DeviceCard1(props) {
    const { device, imgOn, imgOff, initValue } = props;
    const [isOn, setIsOn] = useState(initValue);

    useEffect(() => {
        setIsOn(initValue);
    }, [initValue]);

    const handleOn = (e) => {
        const toggle = e.target;
        const newState = toggle.checked;
        setIsOn(newState);

        // Save state to localStorage
        if (device === "Door") {
            localStorage.setItem('doorState', JSON.stringify(newState));
        } 
        else if (device === "Light") {
            localStorage.setItem('lightState', JSON.stringify(newState));
        }

        // Write data to Firebase
        if (device === "Door") {
            update(ref(db, '/door/door-1'), { state: newState });
        } 
        else if (device === "Light") {
            update(ref(db, '/light/light-1'), { state: newState });
        }
    }

    useEffect(() => {
        // Sync the state with Firebase
        if (device === "Door") {
            const doorRef = ref(db, '/door/door-1/state');
            onValue(doorRef, (snapshot) => {
                const value = snapshot.val();
                setIsOn(value);
                localStorage.setItem('doorState', JSON.stringify(value));
            });
        } else if (device === "Light") {
            const lightRef = ref(db, '/light/light-1/state');
            onValue(lightRef, (snapshot) => {
                const value = snapshot.val();
                setIsOn(value);
                localStorage.setItem('lightState', JSON.stringify(value));
            });
        }
    }, [device]);

    return (
        <div className="card__container">
            <div className='card__center'>
                <img src={isOn ? imgOn : imgOff} alt="Device" />
                <p>{device}</p>
            </div>
            <div className='card__bottom'>
                {device === "Door" ? (isOn ? <div>UNLOCKED</div> : <div>LOCKED</div>) 
                : (isOn ? <div>ON</div> : <div>OFF</div>)}
                <label className="switch">
                    <input type="checkbox" onChange={handleOn} checked={isOn} />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    );
}

export default DeviceCard1;
