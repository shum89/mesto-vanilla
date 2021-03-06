export default class UserInfo {
  constructor({ userName, userOccupation, userAvatar }) {
    this._userOccupation = document.querySelector(userOccupation);
    this._userName = document.querySelector(userName);
    this._userAvatar = document.querySelector(userAvatar)
  }

  // получаем значения из профайла
  getUserInfo() {
    return {
      name: this._userName.textContent,
      occupation: this._userOccupation.textContent,
    };
  }
// устанавливаем id пользователя
  _setUserId(data)  {
    this._userId = data._id;
  }
// получаем id пользователя
  getUserId () {
    return this._userId;
  }

  // устанавливаем значения в профайл
  setUserInfo(data) {
    this._setUserId(data);
    this._userName.textContent = data.name;
    this._userOccupation.textContent = data.about;
    this.setUserAvatar(data);
  }
// ставим аватар пользователя
  setUserAvatar(data) {
    this._userAvatar.src = data.avatar;
  }
}