import { all, takeLatest } from "redux-saga/effects";

import { ChatsTypes } from "../ducks/chat";
import { getChats, sendMessage, noteChat, sendFileMessage, getFilesChat } from "./chat";

import { QuickMessagesType } from "../ducks/quickMessages";
import { createQuickMessages, getQuickMessages } from "./quickMessages";

export default function* rootSaga() {
  yield all([
    takeLatest(ChatsTypes.GET_CHATS_REQUEST, getChats),
    takeLatest(ChatsTypes.GET_CHAT_FILES_REQUEST, getFilesChat),
    takeLatest(ChatsTypes.GET_SEND_MESSAGE_REQUEST, sendMessage),
    takeLatest(ChatsTypes.SEND_FILE_MESSAGE_REQUEST, sendFileMessage),
    takeLatest(ChatsTypes.GET_NOTE_CHAT_REQUEST, noteChat),
    takeLatest(QuickMessagesType.GET_QUICK_MESSAGES_REQUEST, getQuickMessages),
    takeLatest(
      QuickMessagesType.CREATE_QUICK_MESSAGES_REQUEST,
      createQuickMessages
    ),
  ]);
}
