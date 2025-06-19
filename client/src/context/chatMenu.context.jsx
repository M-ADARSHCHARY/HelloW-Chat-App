import { createContext , useState } from 'react';

export const ChatMenuContext = createContext();

export const ChatMenuProvider = ({ children }) => {
  const [isChatMenuOpen,setIsChatMenuOpen] = useState(false);

  return (
    <ChatMenuContext.Provider value={{isChatMenuOpen,setIsChatMenuOpen}}>
      {children}
    </ChatMenuContext.Provider>
  );
};