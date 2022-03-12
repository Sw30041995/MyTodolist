import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

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

function App() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TasksType>({
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
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
        // setTasks(tasks.filter(t => t.id !== taskId))
    }

    const addTask = (todoListId: string, title: string) => {
        setTasks({...tasks, [todoListId]: [{id: v1(), title, isDone: false}, ...tasks[todoListId]]})
        // setTasks([{id: v1(), title: titleForTask, isDone: false}, ...tasks])
    }

    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone} : t)})
        // setTasks(tasks.map(t => t.id === taskId ? {...t, isDone} : t))
    }

    const changeTaskTitle = (todoListId: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
    }

    const changeFilter = (todoListId: string, filter: FilterValuesType) => {
        setTodoList(todoLists.map(tl => tl.id === todoListId ? {...tl, filter} : tl))
        // setFilter(filter)
    }

    const changeTodoListTitle = (todoListId: string, newTitle: string) => {
        setTodoList(todoLists.map(tl => tl.id === todoListId ? {...tl, title: newTitle} : tl))
    }

    const addTodoList = (todoListTitle: string) => {
        const newTodoListId = v1()
        setTodoList([{id: newTodoListId, title: todoListTitle, filter: 'all'}, ...todoLists])
        setTasks({...tasks, [newTodoListId]: []})
    }

    const removeTodoList = (todoListId: string) => {
        setTodoList(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
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

export default App;
