import React from 'react';
import {FilterValueType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    id: string
    heading: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    installFilterForTasks: (filter: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeCheckbox: (isDone: boolean, taskId: string, todolistId: string) => void
    changeTaskTitle: (newTitle: string, taskId: string, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export const TodoList = (props: PropsType) => {

    const onAllClickHandler = () => props.installFilterForTasks('all', props.id)
    const onActiveClickHandler = () => props.installFilterForTasks('active', props.id)
    const onCompletedClickHandler = () => props.installFilterForTasks('completed', props.id)

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.heading} changeTitle={changeTodolistTitle} />
                <button onClick={() => props.removeTodolist(props.id)}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map(t => {

                    const changeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(newTitle, t.id, props.id)
                    }

                    return <li className={t.isDone ? 'isDone' : ''} key={t.id}><input
                        onChange={(e) => props.changeCheckbox(e.currentTarget.checked, t.id, props.id)}
                        type="checkbox" checked={t.isDone}/> <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                        <button onClick={() => props.removeTask(t.id, props.id)}>X</button>
                    </li>
                })}
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