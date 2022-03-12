import {TasksType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todoLists-reducer";

type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todoListId: string
    taskId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    todoListId: string
    title: string
    newTaskId: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todoListId: string
    taskId: string
    isDone: boolean
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todoListId: string
    taskId: string
    newTitle: string
}

export const tasksReducer = (state: TasksType, action: ActionType): TasksType => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return {...state, [action.todoListId]: []}
        case "REMOVE-TODOLIST":
            delete state[action.todoListId]
            return {...state}
        case "REMOVE-TASK":
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}
        case "ADD-TASK":
            return {
                ...state,
                [action.todoListId]: [{
                    id: action.newTaskId,
                    title: action.title,
                    isDone: false
                }, ...state[action.todoListId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.newTitle
                } : t)
            }
        default:
            return state
    }
}

export const removeTaskAC = (todoListId: string, taskId: string): RemoveTaskActionType => ({
    type: 'REMOVE-TASK',
    todoListId,
    taskId,
})

export const addTaskAC = (todoListId: string, title: string): AddTaskActionType => ({
    type: 'ADD-TASK',
    todoListId,
    title,
    newTaskId: v1(),
})

export const changeTaskStatusAC = (todoListId: string, taskId: string, isDone: boolean): ChangeTaskStatusActionType => ({
    type: 'CHANGE-TASK-STATUS',
    todoListId,
    taskId,
    isDone,
})

export const changeTaskTitleAC = (todoListId: string, taskId: string, newTitle: string): ChangeTaskTitleActionType => ({
    type: 'CHANGE-TASK-TITLE',
    todoListId,
    taskId,
    newTitle,
})