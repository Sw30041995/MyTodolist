import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: PropsType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string>('')

    const taskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError('')
    }

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }

    const addTaskWhenPressingEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }
    return (
            <div>
                <input className={error ? 'error' : ''} onKeyPress={addTaskWhenPressingEnter} value={title}
                       onChange={taskTitleChangeHandler}/>
                <button onClick={addItem}>+</button>
                {error && <div className='errorMessage'>{error}</div>}
            </div>
    );
};