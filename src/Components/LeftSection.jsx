
import React, {
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import NavBar from "./NavBar";
import ChatMessageData from "./ChatMessage";
import { ChatContext } from "../Context/UseChatContext";
import darkMode from '../Pngs/darkMode.png';
import lightMode from '../Pngs/lightMode.png';
function LeftSection() {
  const { chatsData, isDarkMode, setIsDarkMode, setPage, hasMore, loading } =
    useContext(ChatContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const sidebarRef = useRef(null);
  const observer = useRef();

  const lastChatElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const filteredChatsData = chatsData.filter((chatData) =>
    chatData?.creator?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="left"
      style={{
        backgroundColor: isDarkMode ? "rgb(28, 36, 47)" : "rgb(210, 233, 238)",
        color: isDarkMode ? "white" : "rgba(0, 0, 0, 0.8)",
      }}
    >
      <NavBar
        toggleSidebar={toggleSidebar}
        setSearchQuery={setSearchQuery}
        isRight={false}
      />

      {isSidebarOpen && (
        <div className="sidebar" ref={sidebarRef} style={{backgroundColor:isDarkMode? "rgb(0, 23, 34)" :"rgb(0 136 204)"}}>
          <div className="sidebar-content">
            <button>New group</button>
            <button>New channel</button>
            <button>Contacts</button>
            <button>Calls</button>
            <button>Saved messages</button>
            <button>Settings</button>
              <button  className="btnMode" onClick={() =>setIsDarkMode(!isDarkMode)}>

              <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
              <img
                src={isDarkMode ? lightMode : darkMode}
                alt={isDarkMode ? "Light Mode" : "Dark Mode"}
                style={{ marginLeft: "10px", height: "30px", width: "30px" }}
                />
                </button>
          </div>
        </div>
      )}
      <div className="chatContainer">
        {filteredChatsData.map((chatData, index) => (
          <ChatMessageData
            key={chatData.id}
            chatData={chatData}
            ref={
              filteredChatsData.length === index + 1 ? lastChatElementRef : null
            } 
          />
        ))}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default LeftSection;
