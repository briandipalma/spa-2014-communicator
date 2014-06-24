export function greet() {
    alert('Hello world');
}

export function loadData() {
	get('/data/login-user-pass.json')
		.then((response) => {
			return Promise.all([
				get('/data/contacts-user.json'),
				get('/data/chat-messages.json'),
				get('/data/recent-messages-user.json')
			]);
		})
		.catch((error) => {
			console.error(error);
		})
		.then((response) => {
			console.log(response);
		});
}

function get(url) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.send();

	var promise = new Promise((resolve, reject) => {
		xhr.onload = () => {
			if (xhr.status === 200) {
				resolve(xhr.response);
			} else if (xhr.status === 404) {
				reject(new Error(`Requested URL (${url}) unavailable`));
			}
		}
	});

	return promise;
}