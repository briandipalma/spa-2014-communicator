export function greet() {
    alert('Hello world');
}

export function loadData() {
	get('/data/login-user-pass1.json')
		.then(function(response) {
			console.log(response);
		})
		.catch(function(error) {
			console.error(error);
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