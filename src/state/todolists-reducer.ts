import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type ActionType =
    ChangeFilterActionType
    | ChangeTodoListTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

export type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    todoListTitle: string
    todoListId: string
}
export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    todoListId: string
}
type ChangeFilterActionType = {
    type: "CHANGE-FILTER"
    todoListId: string
    filter: FilterValuesType
}
type ChangeTodoListTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    todoListId: string
    newTitle: string
}

const initialState: Array<TodoListType> = []


export const todoListsReducer = (state = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return [{id: action.todoListId, title: action.todoListTitle, filter: 'all'}, ...state]
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListId)
        case "CHANGE-FILTER":
            return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.newTitle} : tl)
        default:
            return state
    }
}

export const changeFilterAC = (todoListId: string, filter: FilterValuesType): ChangeFilterActionType => ({
    type: "CHANGE-FILTER",
    todoListId: todoListId,
    filter: filter
})

export const changeTodoListTitleAC = (todoListId: string, newTitle: string): ChangeTodoListTitleActionType => ({
    type: "CHANGE-TODOLIST-TITLE",
    todoListId: todoListId,
    newTitle: newTitle
})

export const removeTodoListAC = (todoListId: string): RemoveTodoListActionType => ({
    type: "REMOVE-TODOLIST",
    todoListId,
})

export const addTodoListAC = (todoListTitle: string): AddTodoListActionType => ({
    type: "ADD-TODOLIST",
    todoListTitle,
    todoListId: v1(),
})

