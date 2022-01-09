import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TaskType} from "./App";

type PropsType = {
    heading: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    installFilterForTasks: (filter: FilterValueType) => void
    addTask: (title: string) => void
    titleForTask: string
    setTitleForTask: (titleForTask: string) => void
    changeCheckbox: (isDone: boolean, taskId: string) => void
    filter: FilterValueType
}

export const TodoList = (props: PropsType) => {

    let [error, setError] = useState<string>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        props.setTitleForTask(e.currentTarget.value)
    }

    const addTask = () => {
        if (props.titleForTask.trim() !== '') {
            props.addTask(props.titleForTask.trim())
            props.setTitleForTask('')
        } else {
            error = 'The field cannot be empty!'
            setError(error)
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            addTask()
        }
    }

    const onAllClickHandler = () => props.installFilterForTasks('all')
    const onActiveClickHandler = () => props.installFilterForTasks('active')
    const onCompletedClickHandler = () => props.installFilterForTasks('completed')

    return (
        <div>
            <h3>{props.heading}</h3>
            <div>
                <input className={error ? 'error' : ''} value={props.titleForTask} type='text' onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
                {error && <div className={error ? 'error-message' : ''}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => <li className={t.isDone ? 'isDone' : ''} key={t.id}><input
                    onChange={(e) => props.changeCheckbox(e.currentTarget.checked, t.id)}
                    type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                    <button onClick={() => props.removeTask(t.id)}>X</button>
                </li>)}
            </ul>
            <div>
                <button className={props.filter === 'all' ?'activeFilter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ?'activeFilter' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ?'activeFilter' : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};
