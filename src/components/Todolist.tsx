import React from "react";

type TaskType = {
    id: number
    isDone: boolean
    title: string
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    filteredTask: (value: string) => void
}

export const Todolist = (props: PropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(t => <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => props.removeTask(t.id)}>X</button>
                </li>)}
            </ul>
            <div>
                <button onClick={() => props.filteredTask('all')}>All</button>
                <button onClick={() => props.filteredTask('active')}>Active</button>
                <button onClick={() => props.filteredTask('completed')}>Completed</button>
            </div>
        </div>
    )
}
