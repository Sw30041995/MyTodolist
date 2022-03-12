import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = (props: PropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTitle(e.currentTarget.value)
        setTitle(e.currentTarget.value)
    }

    const enableEditMode = () => {
        setEditMode(true)
    }

    const turnOffEditMode = () => {
        setEditMode(false)
    }

    return (
        <span onDoubleClick={enableEditMode}>
        {editMode ? <input type='text' value={title} onChange={changeTitle} onBlur={turnOffEditMode}
                           autoFocus/> : props.title}
        </span>
    );
};