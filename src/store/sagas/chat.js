import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import ChatsAction from "../ducks/chat";

import api from "../../services/api";

export function* getChats() {
  try {
    const { data } = yield call(api.get, "chats");
    yield put(ChatsAction.getChatsSuccess(data));
  } catch (error) {
    yield put(ChatsAction.loadingFalse());
  }
}

export function* getFilesChat({ chatId}) {
  try {
    const { data } = yield call(api.get, `/message-file-history/${chatId}`);
    yield put(ChatsAction.getChatFilesSuccess(data));
  } catch (error) {
    yield put(ChatsAction.loadingFalse());
  }
}

export function* sendMessage({ data }) {
  try {
    yield call(api.post, "messages", data);
    yield call(getChats);
    yield put(ChatsAction.getSendMessageSuccess());
  } catch (error) {
    yield put(ChatsAction.loadingFalse());
  }
}

export function* sendFileMessage({ file, chatId }) {
  try {
    const fileForm = new FormData();
    fileForm.append("file", file);

    console.log(file, chatId);

    yield call(api.post, `file-message/${chatId}`, fileForm);
    yield call(getChats);
    yield put(ChatsAction.sendFileMessageSuccess());
  } catch (error) {
    yield put(ChatsAction.loadingFalse());
  }
}

export function* noteChat({ data }) {
  try {
    yield call(api.post, `note-chat/${data.chatId}`, { note: data.note });
    yield call(getChats);
    yield put(ChatsAction.getNoteChatSuccess());
    return toast.success("Nota atualizada com sucesso");
  } catch (error) {
    yield put(ChatsAction.loadingFalse());
  }
}
