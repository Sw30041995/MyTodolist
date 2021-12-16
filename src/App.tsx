import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";

export type FilterTasksType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, isDone: true, title: 'HTML&CSS'},
        {id: 2, isDone: true, title: 'JS'},
        {id: 3, isDone: false, title: 'React'}
    ])

    function removeTask(id: number) {
        setTasks(tasks.filter(t => t.id !== id))
    }

    return (
        <div>
            <Todolist title='What to learn' tasks={tasks} removeTask={removeTask}/>
        </div>
    )
}

export default App;