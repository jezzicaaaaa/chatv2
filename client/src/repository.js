import axios from 'axios';

const BASE_URL = 'http://localhost:3100';

export function getRegularTips() {
	return axios.get(`${BASE_URL}/api/tips/regular`).then((response) => response.data);
}

export function getSpecialTips() {
	return axios
		.get(`${BASE_URL}/api/tips/special`, { params: { 'x-access-token': localStorage.getItem('x-access-token') } })
		.then((response) => response.data)
		.catch((err) => Promise.reject('Request Not Authenticated!'));
}
export function getEventHistory() {
	return axios
		.get(`${BASE_URL}/events`, { params: { 'x-access-token': localStorage.getItem('x-access-token') } })
		.then((response) => response.data)
		.catch((err) => Promise.reject('Request Not Authenticated!'));
}

export function getChatHistory() {
	return axios
		.get(`${BASE_URL}/chat`, { params: { 'x-access-token': localStorage.getItem('x-access-token') } })
		.then((response) => response.data)
		.catch((err) => Promise.reject('Request Not Authenticated!'));
}
export function getRooms() {
	return axios
		.get(`${BASE_URL}/rooms`, { params: { 'x-access-token': localStorage.getItem('x-access-token') } })
		.then((response) => response.data)
		.catch((err) => Promise.reject('Request Not Authenticated!'));
}
export function editRoom(roomname, status, id) {
	return axios.patch(`${BASE_URL}/rooms/${id}`, {
		roomname: roomname,
		status: status
	});
}

export function deleteRoom(id) {
	return axios
		.delete(`${BASE_URL}/rooms/${id}`)
		.then((response) => response.data)
		.catch((err) => Promise.reject('Request Not Authenticated!'));
}

export function login(data) {
	return axios
		.post(`${BASE_URL}/api/auth`, { username: data.username, password: data.password })
		.then((response) => {
			localStorage.setItem('x-access-token', response.data.token);
			localStorage.setItem('x-access-token-expiration', Date.now() + 2 * 60 * 60 * 1000);
			return response.data;
		})
		.catch((err) => Promise.reject('Authentication Failed!'));
}

export function isAuthenticated() {
	return localStorage.getItem('x-access-token') && localStorage.getItem('x-access-token-expiration') > Date.now();
}
