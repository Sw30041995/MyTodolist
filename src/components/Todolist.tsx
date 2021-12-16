import React, {useState} from "react";
import {FilterTasksType} from "../App";

export type TaskType = {
    id: number
    isDone: boolean
    title: string
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    // filteredTask: (value: FilterTasksType) => void
}

export const Todolist = (props: PropsType) => {

    let [filterTasks, setFilterTasks] = useState<FilterTasksType>('all')

    let tasksForTodolist = props.tasks
    if (filterTasks === 'active') {
        tasksForTodolist = props.tasks.filter(t => !t.isDone)
    } else if (filterTasks === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone)
    }

    function filteredTask(value: FilterTasksType) {
        setFilterTasks(value);
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksForTodolist.map(t => <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => props.removeTask(t.id)}>X</button>
                </li>)}
            </ul>
            <div>
                <button onClick={() => filteredTask('all')}>All</button>
                <button onClick={() => filteredTask('active')}>Active</button>
                <button onClick={() => filteredTask('completed')}>Completed</button>
            </div>
        </div>
    )
}
