export function loadData() {
	get('data/login-user-pass.json')
		.then((loginJSON) => {
			console.log(JSON.parse(loginJSON));
		})
		.catch((error) => {
			console.error(error);
		})
		.then(() => {
			return get('data/contacts-user.json');
	  	})
		.then((contactsJSON) => {
			console.log(JSON.parse(contactsJSON));

			return get('data/chat-messages.json');
		})
		.then((messagesJSON) => {
			console.log(JSON.parse(messagesJSON));

			return get('data/recent-messages-user.json');
		})
		.then((recentMessages) => {
			console.log(JSON.parse(recentMessages));
		});
}

function get(url) {
	var xhr = new XMLHttpRequest();
	var promise = new Promise((resolve, reject) => {
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 && xhr.status === 200) {
				resolve(xhr.response);
			} else if (xhr.readyState === 4 && xhr.status === 404) {
				reject(new Error(`Requested URL (${url}) unavailable`));
			}
		}
	});

	xhr.open('GET', url);
	xhr.send();

	return promise;
}