import { useEffect, useState } from "react";
import './Type2.scss';
import { ref, update } from "firebase/database";
import { db } from "../../firebase";


function DeviceCard2(props) {
    const { device, imgOn, imgOff} = props;
    
    const [levelFan, setLevelFan] = useState(0);

    const handleChangeLevel = (e) => {
        const level = e.target.value;

        const btnArr = document.querySelectorAll('.round-btn');
        for (let i = 0 ; i < btnArr.length; i++) {
            if (i == level) 
                btnArr[i].classList.add('active-btn');
            else 
                btnArr[i].classList.remove('active-btn');
        }

        setLevelFan(level);
    }   

    // Write data to Firebase 
    useEffect(() => {
        update(ref(db,'/devices/fan/fan-1'), {
            level: levelFan
        });
    }, [levelFan]);

    return (
        <>
            <div className="card2__container">
                <div className='card2__center'>
                    <img src={(levelFan > 0) ? imgOn : imgOff}></img>
                    <p>{device}</p>
                </div>

                <div className='card2__bottom'>
                    <button className="round-btn active-btn" value={0} onClick={handleChangeLevel}>0</button>
                    <button className="round-btn" value={1} onClick={handleChangeLevel}>1</button>
                    <button className="round-btn" value={2} onClick={handleChangeLevel}>2</button>
                    <button className="round-btn" value={3} onClick={handleChangeLevel}>3</button>
                </div>
            </div>
        </>
    );
}

export default DeviceCard2;