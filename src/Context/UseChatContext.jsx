
import { createContext, useState, useCallback, useEffect } from "react";
import axios from "axios";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [chatsData, setChatsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [curChatId, setCurChatId] = useState(null);
  const [curChatDetails, setCurChatDetails] = useState(null);
  
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true);

  const fetchChatsData = useCallback(async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://devapi.beyondchats.com/api/get_all_chats?page=${page}`
      );
      setChatsData((prevChats) => [...prevChats, ...response.data.data.data]);
      setHasMore(response.data.data.data.length > 0); // Check if there are more chats
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (curChatId) {
      const selectedChat = chatsData.find((chat) => chat.id === curChatId);
      setCurChatDetails(selectedChat);
    } else {
      setCurChatDetails(null); // Reset curChatDetails if curChatId is null
    }
  }, [curChatId, chatsData]);

  useEffect(() => {
    fetchChatsData(page);
  }, [fetchChatsData, page]);

  return (
    <ChatContext.Provider
      value={{
        chatsData,
        loading,
        error,
        fetchChatsData,
        curChatId,
        setCurChatId,
        curChatDetails,
        setCurChatDetails,
        isDarkMode,
        setIsDarkMode,
        setPage, // Expose setPage to context consumers
        hasMore,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
