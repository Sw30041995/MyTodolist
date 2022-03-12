import React from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string, filter: FilterValuesType) => void
    addTask: (todoListId: string, titleForTask: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
}

export const TodoList = (props: PropsType) => {

    const addTask = (taskTitle: string) => {
        props.addTask(props.id, taskTitle)
    }

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={() => props.removeTodoList(props.id)}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map(t => {

                    const changeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(props.id, t.id, newTitle)
                    }

                    return <li className={t.isDone ? 'isDone' : ''} key={t.id}>
                            <button onClick={() => props.removeTask(props.id, t.id)}>X</button>
                            <input type="checkbox" onChange={(e) => {
                                props.changeTaskStatus(props.id, t.id, e.currentTarget.checked)
                            }} checked={t.isDone}/>
                            <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                        </li>
                    }
                )}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'activeFilter' : ''} onClick={() => {
                    props.changeFilter(props.id, 'all')
                }}>All
                </button>
                <button className={props.filter === 'active' ? 'activeFilter' : ''} onClick={() => {
                    props.changeFilter(props.id, 'active')
                }}>Active
                </button>
                <button className={props.filter === 'completed' ? 'activeFilter' : ''} onClick={() => {
                    props.changeFilter(props.id, 'completed')
                }}>Completed
                </button>
            </div>
        </div>
    );
};
