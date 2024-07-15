
import React, { useContext, useState } from 'react';
import { ChatContext } from '../Context/UseChatContext';

function NavBar({ isRight, toggleSidebar, setSearchQuery }) {
  const { setCurChatId, curChatDetails, isDarkMode } = useContext(ChatContext);

  return (
    <nav className="nav" 
    style={{backgroundColor:isDarkMode ? "rgb(0, 23, 34)" :"rgb(0 136 204)",color:isDarkMode ? "white" :"rgba(0, 0, 0, 0.8)" }}>
    
      {!isRight && (
        <>
          <button className="burgerMenu" onClick={toggleSidebar}>≡</button>
          <input 
            type="text" 
            className='navInp' 
            style={{backgroundColor:isDarkMode ? "rgb(28, 36, 47)" :"wheat"}} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Search..."
          />
        </>
      )}
      {isRight && (
        <div className="chatUserName">
          <h4>{curChatDetails ? curChatDetails.creator.name : "user"}</h4>
          <p>last seen recently</p>
        </div>
      )}
      {isRight && (
        <div className="sideBtns" >
          <button onClick={() => setCurChatId(null)}>X</button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
