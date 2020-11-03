import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import QuickMessagesAction from "../ducks/quickMessages";

import api from "../../services/api";

export function* getQuickMessages() {
  try {
    const { data } = yield call(api.get, "quick-messages");
    const formatedData = data.map(msg => ({value: msg.id, label: msg.message}))
    yield put(QuickMessagesAction.getQuickMessagesSuccess(formatedData));
  } catch (error) {
    yield put(QuickMessagesAction.loadingFalse());
  }
}

export function* createQuickMessages({data}) {
  try {
    yield call(api.post, "quick-messages", {message: data});
    yield put(QuickMessagesAction.createQuickMessagesSuccess());
    yield call(getQuickMessages)
    return toast.success("Mensagem rapida criada com sucesso")
  } catch (error) {
    yield put(QuickMessagesAction.loadingFalse());
  }
}
