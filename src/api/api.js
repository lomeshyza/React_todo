const fetchServer = (method, { id, ...payload } = {}) => {
	let url = `http://localhost:3000/todos`
	let options = {
		method,
		headers: { "Content-Type": "application/json;charset=utf-8" },
	}
	if (method === 'GET') {
		const { isSorted } = payload
		const sortingParams = isSorted
			? '_sort=title&_order=asc'
			: '_sort=id&_order=desc'
			url += `?${sortingParams}`
		//url+=`?${sortingParams}&title_like=${searchedPhrase}`
	} else {
		if (method !== 'POST') {
		url += `/${id}`
	}
		if (method !== 'DELETE') {
		options.body = JSON.stringify(payload)
	}
	}
		return fetch(url, options).then((rawResponse) => rawResponse.json())
}
export const createTodo = (newTodo) => fetchServer('POST',newTodo)
export const readTodos = (isSorted=false) => fetchServer('GET',{isSorted})
export const updateTodo = (todoData) => fetchServer('PATCH',todoData)
export const deleteTodo = (todoId) => fetchServer('DELETE',{id:todoId})
