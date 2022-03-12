import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    addTodoListAC,
    changeFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./state/todoLists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

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

function AppWithReducer() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListId_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'REACT', isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: 'MILK', isDone: true},
            {id: v1(), title: 'MEAT', isDone: false},
            {id: v1(), title: 'WATER', isDone: true},
            {id: v1(), title: 'CHEESE', isDone: false}
        ]
    })

    const removeTask = (todoListId: string, taskId: string) => {
        dispatchToTasks(removeTaskAC(todoListId, taskId))
    }

    const addTask = (todoListId: string, title: string) => {
        dispatchToTasks(addTaskAC(todoListId, title))
    }

    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC(todoListId, taskId, isDone))
    }

    const changeTaskTitle = (todoListId: string, taskId: string, newTitle: string) => {
        dispatchToTasks(changeTaskTitleAC(todoListId, taskId, newTitle))
    }

    const changeFilter = (todoListId: string, filter: FilterValuesType) => {
        dispatchToTodoLists(changeFilterAC(todoListId, filter))
    }

    const changeTodoListTitle = (todoListId: string, newTitle: string) => {
        dispatchToTodoLists(changeTodoListTitleAC(todoListId, newTitle))
    }

    const addTodoList = (todoListTitle: string) => {
        const action = addTodoListAC(todoListTitle)
        dispatchToTasks(action)
        dispatchToTodoLists(action)
    }

    const removeTodoList = (todoListId: string) => {
        const action = removeTodoListAC(todoListId)
        dispatchToTasks(action)
        dispatchToTodoLists(action)
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

export default AppWithReducer;
