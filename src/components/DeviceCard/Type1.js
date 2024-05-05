import './Type1.scss';
import { useState } from 'react';

function DeviceCard1(props) {
    const {device, imgOn, imgOff} = props;

    // On -> On(Light) or Unlock(Door)
    const [isOn, setIsOn] = useState(false);

    const handleOn = (e) => {
        const toggle = e.target;
        setIsOn(toggle.checked);
    }

    

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