import React from "react";

type TaskType = {
    id: number
    isDone: boolean
    title: string
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
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
                {props.tasks.map(item => <li key={item.id}><input type="checkbox" checked={item.isDone}/>
                    <span>{item.title}</span></li>)}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}
