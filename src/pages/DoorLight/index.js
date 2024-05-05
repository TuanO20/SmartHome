import DeviceCard1 from '../../components/DeviceCard/Type1';
import './DoorLight.scss';
import DoorOpen from '../../assets/images/door-open.svg';
import DoorClose from '../../assets/images/door-close.svg';
import LightOn from '../../assets/images/light-on.svg';
import LightOff from '../../assets/images/light-off.svg';


function DoorLight(){
    
    return (
        <>
            <h3>Door & Light</h3>
            <div className='doorLight__list'>
                <DeviceCard1 device="Door" imgOn = {DoorOpen} imgOff={DoorClose}></DeviceCard1>
                <DeviceCard1 device="Light" imgOn = {LightOn} imgOff={LightOff}></DeviceCard1>
            </div>
        </>

    );
}

export default DoorLight;