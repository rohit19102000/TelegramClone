import { useContext, useEffect, useState } from 'react';
import './app.css';
import LeftSection from './Components/LeftSection';
import RightSection from './Components/RightSection';
import { ChatContext } from './Context/UseChatContext';

function App() {
  const { chatsData, loading, error, fetchChatsData, curChatId } = useContext(ChatContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); 



  useEffect(() => {
    const handleResize = () => {
    setIsMobile(window.innerWidth < 768); 
  };


  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
  
}, []);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error fetching data: {error.message}
        <button onClick={fetchChatsData}>Retry</button>
      </div>
    );
  }

  return (
    <div className="app">
      {isMobile ? (
        <div className="app">
          {!curChatId ? <LeftSection /> : <RightSection   />}
        </div>
      ) : (
        <div className="app">
          <LeftSection />
          <RightSection />
        </div>
      )}
    </div>
  );
}

export default App;
