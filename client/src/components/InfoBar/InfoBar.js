import './InfoBar.css';
import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';

function InfoBar({ room }) {
  return(
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online image" />
        <h3>{room}</h3>
      </div>
      <div className="rightInnerConatiner">
        <a href="/"><img src={closeIcon} alt="close icon" /></a>
      </div>
    </div>
  )

}

export default InfoBar;