import React, {ChangeEvent, useState} from "react";

type PropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = (props: PropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode ? <input onChange={onChangeTitleHandler} autoFocus onBlur={offEditMode} value={title}/> : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}