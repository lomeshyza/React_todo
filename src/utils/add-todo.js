import {NEW_TODO_ID } from '../constants'

export const addTodo = (todos, todo) => {
	const newTodo = todo || { id: NEW_TODO_ID, title: '', isEditing:true}
	return[newTodo,...todos]}
