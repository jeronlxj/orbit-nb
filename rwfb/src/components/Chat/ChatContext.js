import { createContext, useContext, useReducer,} from "react";
import { UserAuthentication } from "../../LoginContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { user } = UserAuthentication();

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
          user.email.split('@')[0] > action.payload.displayName
          ? user.email.split('@')[0] + action.payload.displayName
          : action.payload.displayName + user.email.split('@')[0],
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{  data:state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};