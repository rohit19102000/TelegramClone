import { useContext, forwardRef } from "react";
import { ChatContext } from "../Context/UseChatContext";

const ChatMessageData = forwardRef(({ chatData }, ref) => {
  const { setCurChatId } = useContext(ChatContext);
  const charUser = chatData.creator.name ? chatData.creator.name : `User${chatData.creator.id}`;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();

    if (isSameDay(date, today)) {
      return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;
    } else {
      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear().toString().slice(-2);
      return `${day}/${month}/${year}`;
    }
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  return (
    <div 
      ref={ref} 
      tabIndex="0" 
      className="chatLft" 
      onClick={() => setCurChatId(chatData.id)}
    >
      <div className="profilePic"></div>
      <div className="textLft">
        <div>
          <h2>{charUser}</h2>
          <span>{chatData.msg_count}</span>
        </div>
        <div>
          <p>chat message</p>
          <p className="ChatDateLft">{formatTime(chatData.created_at)}</p>
        </div>
      </div>
    </div>
  );
});

export default ChatMessageData;


