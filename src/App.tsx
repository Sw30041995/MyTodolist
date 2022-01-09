import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'completed' | 'active'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValueType>('all')
    const [titleForTask, setTitleForTask] = useState('')

    const removeTask = (taskId: string) => {
        const filteredTasks = tasks.filter(t => t.id !== taskId)
        setTasks(filteredTasks)
    }

    let tasksForTodoLost = tasks
    if (filter === 'active') {
        tasksForTodoLost = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodoLost = tasks.filter(t => t.isDone)
    }

    const installFilterForTasks = (filter: FilterValueType) => {
        setFilter(filter)
    }

    const addTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }

    const changeCheckbox = (isDone: boolean, taskId: string) => {
        // let task = tasks.find(t => t.id === taskId)
        // if (task) {
        //     task.isDone = isDone
        // }
        // setTasks([...tasks])
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone} : t))
    }

    return (
        <div className="App">
            <TodoList heading={'What to learn'}
                      tasks={tasksForTodoLost}
                      removeTask={removeTask}
                      installFilterForTasks={installFilterForTasks}
                      addTask={addTask}
                      titleForTask={titleForTask}
                      setTitleForTask={setTitleForTask}
                      changeCheckbox={changeCheckbox}
                      filter={filter}
            />
        </div>
    );
}

export default App;
