import React from 'react';
import {FilterValueType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";

type PropsType = {
    id: string
    heading: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    installFilterForTasks: (filter: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeCheckbox: (isDone: boolean, taskId: string, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
}

export const TodoList = (props: PropsType) => {

    const onAllClickHandler = () => props.installFilterForTasks('all', props.id)
    const onActiveClickHandler = () => props.installFilterForTasks('active', props.id)
    const onCompletedClickHandler = () => props.installFilterForTasks('completed', props.id)

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3>{props.heading}
                <button onClick={() => props.removeTodolist(props.id)}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map(t => <li className={t.isDone ? 'isDone' : ''} key={t.id}><input
                    onChange={(e) => props.changeCheckbox(e.currentTarget.checked, t.id, props.id)}
                    type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                    <button onClick={() => props.removeTask(t.id, props.id)}>X</button>
                </li>)}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'activeFilter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'activeFilter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'activeFilter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
};
