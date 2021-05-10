import './Message.css';
import ReactEmoji from 'react-emoji';

function Message({message:{ text, user }, name}) {
  let isSendByCurrentUser = false;
    const trimmedName = user.trim().toLowerCase();

    if(user == trimmedName) {
      isSendByCurrentUser = true;

    }
  return(  
    isSendByCurrentUser 
    ? (
      <div className="messageContainer justifyEnd" >
        <p className="sentText pr-10">{trimmedName}</p>
        <div className="messageBox backgroundBlue">
          <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
        </div>
      </div>
    )
    : (
      <div className="messageContainer justifyStart" >
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="sentText pl-10">{trimmedName}</p>
    </div>
    )
  )
}

export default Message;