

import React, { useContext } from "react";
import NavBar from "./NavBar";
import { ChatContext } from "../Context/UseChatContext";
import UseFetchChat from "../Hooks/UseFetchChat";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

function RightSection() {
  const { curChatId,isDarkMode } = useContext(ChatContext);
  const { chatMessages, loading, error } = UseFetchChat(curChatId);

  if (!curChatId) {
    return (
      <div className="right" style={{backgroundColor:isDarkMode ?"rgb(11, 18, 28)" :"white", color:isDarkMode? "white":"rgb(0,0,0,0.8" }} >
        <NavBar isRight />
        <div className="dfc">Please select a chat to start messages</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="right" style={{backgroundColor:isDarkMode ?"rgb(11, 18, 28)" :"white", color:isDarkMode? "white":"rgb(0,0,0,0.8"}}> 
        <NavBar isRight />
        <div className="dfc">Loading messages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="right" style={{backgroundColor:isDarkMode ?"rgb(11, 18, 28)" :"white", color:isDarkMode? "white":"rgb(0,0,0,0.8"}}>
        <NavBar isRight />
        <div className="dfc">Error fetching messages: {error.message}</div>
      </div>
    );
  }

  const preprocessMessage = (message) => {
    const escapedMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return escapedMessage.replace(/\n/g, "<br />");
  };

  return (
    <div className="right" style={{backgroundColor:isDarkMode ?"rgb(11, 18, 28)" :"white", color:isDarkMode? "white":"rgb(0,0,0,0.8"}}>
      <NavBar isRight />
      <div className="chatMessagesR" >
        {chatMessages.map((message) => (
          <div key={message.id} className={`message ${message.role_id === 4 ? 'role-4' : 'role-9'}`}>
            <div className="messageContent">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {preprocessMessage(message.message)}
              </ReactMarkdown>
            </div>
            <div className="messageTimestamp">
              {new Date(message.updated_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <input placeholder=" Write a message..." className="messageInput"  style={{backgroundColor:isDarkMode?"rgb(0, 23, 34,0.8)":"rgb(0 136 204)"}}></input>
    </div>
  );
}

export default RightSection;