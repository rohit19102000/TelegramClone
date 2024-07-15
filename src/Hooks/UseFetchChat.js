import { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { ChatContext } from '../Context/UseChatContext';

const UseFetchChat = () => {
  const { curChatId } =  useContext(ChatContext);
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChatMessages = useCallback(async () => {
    if (!curChatId) return;
    try {
      setLoading(true);
      const response = await axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${curChatId}`);
      setChatMessages(response.data.data); 
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [curChatId]);

  useEffect(() => {
    fetchChatMessages();
  }, [fetchChatMessages]);

  return { chatMessages, loading, error };
};

export default UseFetchChat;
