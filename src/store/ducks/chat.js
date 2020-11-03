import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
/* Types & Action Creators */

const { Types, Creators } = createActions({
  getChatsRequest: null,
  getChatsSuccess: ["data"],
  getSendMessageRequest: ["data"],
  getSendMessageSuccess: null,
  sendFileMessageRequest: ["file", "chatId"],
  sendFileMessageSuccess: null,
  getNoteChatRequest: ["data"],
  getNoteChatSuccess: null,
  getChatFilesRequest: ["chatId"],
  getChatFilesSuccess: ["data"],
  loadingFalse: null,
});

export const ChatsTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  chats: [],
  filesChat: [],
  selectedChat: {},
  loading: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_CHATS_REQUEST]: (state) => state.merge({ loading: true }),
  [Types.GET_CHATS_SUCCESS]: (state, action) => {
    return state.merge({ loading: false, chats: action.data });
  },
  [Types.GET_SEND_MESSAGE_REQUEST]: (state) => state.merge({ loading: true }),
  [Types.GET_SEND_MESSAGE_SUCCESS]: (state) => state.merge({ loading: false }),
  [Types.SEND_FILE_MESSAGE_REQUEST]: (state) => state.merge({ loading: true }),
  [Types.SEND_FILE_MESSAGE_SUCCESS]: (state) => state.merge({ loading: false }),
  [Types.GET_NOTE_CHAT_REQUEST]: (state) => state.merge({ loading: true }),
  [Types.GET_NOTE_CHAT_SUCCESS]: (state) => state.merge({ loading: false }),
  [Types.GET_CHAT_FILES_REQUEST]: (state) => state.merge({ loading: true  }),
  [Types.GET_CHAT_FILES_SUCCESS]: (state, action) => state.merge({ loading: false, filesChat: action.data }),
  [Types.LOADING_FALSE]: (state) => state.merge({ loading: false }),
});
