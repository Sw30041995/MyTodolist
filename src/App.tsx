import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type FilterValueType = 'all' | 'completed' | 'active'
type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false}
        ],
        [todolistId_2]: [
            {id: v1(), title: 'WATER', isDone: false},
            {id: v1(), title: 'MEAT', isDone: false},
            {id: v1(), title: 'MILK', isDone: true}
        ]
    })

    const removeTask = (taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const installFilterForTasks = (filter: FilterValueType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    }

    const addTask = (title: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: [{id: v1(), title, isDone: false}, ...tasks[todolistId]]})
    }

    const changeCheckbox = (isDone: boolean, taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    const removeTodolist = (todolisId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolisId))
        delete tasks[todolisId]
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        const todolist: TodolistType = {id: v1(), title, filter: 'all'}
        setTodolists([todolist, ...todolists])
        setTasks({...tasks, [todolist.id]: []})
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(tl => {

                let tasksForTodoLost = tasks[tl.id]
                if (tl.filter === 'active') {
                    tasksForTodoLost = tasks[tl.id].filter(t => !t.isDone)
                }
                if (tl.filter === 'completed') {
                    tasksForTodoLost = tasks[tl.id].filter(t => t.isDone)
                }

                return <TodoList
                    key={tl.id}
                    id={tl.id}
                    heading={tl.title}
                    tasks={tasksForTodoLost}
                    removeTask={removeTask}
                    installFilterForTasks={installFilterForTasks}
                    addTask={addTask}
                    changeCheckbox={changeCheckbox}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                />
            })}
        </div>
    );
}

export default App;
