import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {
    addTodoListAC,
    changeFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from "./state/todoLists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)

    const removeTask = (todoListId: string, taskId: string) => {
        dispatch(removeTaskAC(todoListId, taskId))
    }

    const addTask = (todoListId: string, title: string) => {
        dispatch(addTaskAC(todoListId, title))
    }

    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todoListId, taskId, isDone))
    }

    const changeTaskTitle = (todoListId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todoListId, taskId, newTitle))
    }

    const changeFilter = (todoListId: string, filter: FilterValuesType) => {
        dispatch(changeFilterAC(todoListId, filter))
    }

    const changeTodoListTitle = (todoListId: string, newTitle: string) => {
        dispatch(changeTodoListTitleAC(todoListId, newTitle))
    }

    const addTodoList = (todoListTitle: string) => {
        dispatch(addTodoListAC(todoListTitle))
    }

    const removeTodoList = (todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todoLists.map(tl => {

                let tasksForTodoList = tasks[tl.id]
                if (tl.filter === 'completed') {
                    tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                }
                if (tl.filter === 'active') {
                    tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                }

                return <TodoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}/>
            })}
        </div>
    );
}

export default AppWithRedux;
