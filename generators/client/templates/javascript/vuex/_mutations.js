import * as types from './mutation-types'

export default {
  [types.SET_USER_INFO] (state, { info }) {
    setUserInfo(state, info)
  }
}

function setUserInfo (state, info) {
  state.userName = info.userName
  state.userRole = info.userRole
}
