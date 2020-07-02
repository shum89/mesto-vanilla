import  {urlPath} from '../constants/constants';
export default class Api {
    constructor({baseUrl, headers}) {
        this._url = baseUrl;
        this._headers = headers;
    }
// запрос
    _fetchData(path, params) {
        return fetch(`${this._url}${path}`, params).then(res => {
            if (res.ok) {
                return res.json()
            }
           return Promise.reject(`Oh my, ошибочка вышла:${res.status}`)
        })
    }
// получаем информация о пользователе
    getUserInfo() {
        return this._fetchData(urlPath.userInfo, {headers: this._headers})
    }

// меняем данные пользователя
    updateUserInfo(data) {
        return this._fetchData(urlPath.userInfo, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(data),
        })
    }
// меняем аватар
    updateUserAvatar(data) {
        return this._fetchData(`${urlPath.userInfo}${urlPath.avatar}`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(data),
        })
    }
// получаем карточки изначальные
    getInitialCards() {
        return this._fetchData(urlPath.cards, {headers: this._headers})
    }
// добавляем карточку
    postNewCard(data) {
        return this._fetchData(urlPath.cards, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(data)
        })
    }
// удаляем карточку
    deleteCard(id) {
        return this._fetchData(`${urlPath.cards}${id}`, {
            method: 'DELETE',
            headers: this._headers,
        });
    }
    // ставим лайк или убираем
    like(id, isLiked) {
        let method;
        if (isLiked) {
            method = 'DELETE';
        } else {
            method = 'PUT';
        }
        return this._fetchData(`${urlPath.cards}${urlPath.likes}${id}`, {
            method: method,
            headers: this._headers,
        });
    }
}
