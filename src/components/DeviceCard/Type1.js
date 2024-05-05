import { ref, update } from 'firebase/database';
import { db } from '../../firebase';
import './Type1.scss';
import { useEffect, useState } from 'react';


function DeviceCard1(props) {
    const {device, imgOn, imgOff} = props;

    // On -> On(Light) or Unlock(Door)
    const [isOn, setIsOn] = useState(false);

    const handleOn = (e) => {
        const toggle = e.target;
        setIsOn(toggle.checked);

        
    }

    // Write data to Firebase 
    useEffect(() => {
        if (device == "Door") {
            update(ref(db,'/devices/door/door-1'), {
                state: isOn
            });
        }
        else if (device == "Light") {
            update(ref(db,'/devices/light/light-1'), {
                state: isOn
            });
        }
    }, [isOn]);


    

    return (
        <>
            <div className="card__container">
                <div className='card__center'>
                    <img src={isOn ? imgOn : imgOff}></img>
                    <p>{device}</p>
                </div>

                <div className='card__bottom'>
                    {(device == "Door") ? (isOn ? <div>UNLOCKED</div> : <div>LOCKED</div>) 
                    : (isOn ? <div>ON</div> : <div>OFF</div>)}
                    {/* Rounded switch */}
                    <label class="switch">
                        <input type="checkbox" onChange={handleOn}/>
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
        </>
    );
}

export default DeviceCard1;