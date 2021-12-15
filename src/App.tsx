import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, isDone: true, title: 'HTML&CSS'},
        {id: 2, isDone: true, title: 'JS'},
        {id: 3, isDone: false, title: 'React'}
    ])

    function removeTask(id: number) {
        setTasks(tasks.filter(t => t.id !== id))
    }

    let [filterTasks, setFilterTasks] = useState('all')

    let tasksForTodolist = tasks
    if (filterTasks === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    } else if (filterTasks === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    function filteredTask(value: string) {
        setFilterTasks(value);
    }

    return (
        <div>
            <Todolist title='What to learn' tasks={tasksForTodolist} removeTask={removeTask} filteredTask={filteredTask}/>
        </div>
    )
}

export default App;