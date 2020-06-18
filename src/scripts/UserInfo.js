export default class UserInfo {
  constructor({ userName, userOccupation }) {
    this._userOccupation = document.querySelector(userOccupation);
    this._userName = document.querySelector(userName);
  }

  // получаем значения из профайла
  getUserInfo() {
    return {
      name: this._userName.textContent,
      occupation: this._userOccupation.textContent,
    };
  }

  // устанавливаем значения в профайл
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userOccupation.textContent = data.occupation;
  }
}
