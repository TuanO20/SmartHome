import FanOff from '../../assets/images/fan-off.svg';
import FanOn from '../../assets/images/fan-on.svg';
import DeviceCard2 from "../../components/DeviceCard/Type2";
import './Fan.scss';

function Fan(){
    return (
        <>
            <h3>Fan</h3>
            <div className='device__list'>
                <DeviceCard2 device="Fan" imgOn={FanOn} imgOff={FanOff}></DeviceCard2>
                
            </div>
        </>

    );
}

export default Fan;