import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";

function App() {

    const task1 = [
        {id: 1, isDone: true, title: 'HTML&CSS'},
        {id: 2, isDone: true, title: 'JS'},
        {id: 3, isDone: false, title: 'React'}
    ]

    const task2 = [
        {id: 1, isDone: false, title: 'Whiskey'},
        {id: 2, isDone: false, title: 'Beer'},
        {id: 3, isDone: true, title: 'Water'}
    ]

    return (
        <div>
            <Todolist title='What to learn' tasks={task1}/>
            <Todolist title='What to drink' tasks={task2}/>
        </div>
    )
}

export default App;