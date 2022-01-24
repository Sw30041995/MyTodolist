import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: PropsType) => {

    let [error, setError] = useState<string>('')
    const [titleForTask, setTitleForTask] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setTitleForTask(e.currentTarget.value)
    }

    const addItem = () => {
        if (titleForTask.trim() !== '') {
            props.addItem(titleForTask.trim())
            setTitleForTask('')
        } else {
            error = 'Task name cannot be empty!'
            setError(error)
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            <input className={error ? 'error' : ''} value={titleForTask} type='text' onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}/>
            <button onClick={addItem}>+</button>
            {error && <div className={error ? 'error-message' : ''}>{error}</div>}
        </div>
    );
};

