export default class UserInfo {
  constructor({ userName, userOccupation }) {
    this._userOccupation = document.querySelector(userOccupation);
    this._userName = document.querySelector(userName);
  }

  // получаем значения из профайла
  getUserInfo() {
    this._userInfo = {};
    this._userInfo.name = this._userName.textContent;
    this._userInfo.occupation = this._userOccupation.textContent;
    return this._userInfo;
  }

  // устанавливаем значения в профайл
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userOccupation.textContent = data.occupation;
  }
}
