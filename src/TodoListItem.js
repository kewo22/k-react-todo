import React, { useRef, useState, useEffect } from "react";
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TodoListItem({ todo, onDeleteClickEmit, onEditClickEmit, onSaveClickEmit, onCancelClickEmit, onTodoCompleteToggleEmit }) {

    const [newDesc, setNewDesc] = useState(todo.desc);
    const saveBtn = useRef();
    const todoInput = useRef();

    function onDeleteClick(todoNo) {
        onDeleteClickEmit(todoNo)
    }

    function onEditClick(todoNo) {
        todoInput.current.focus()
        onEditClickEmit(todoNo)
    }

    function onSaveClick(todoNo, newDesc) {
        onSaveClickEmit(todoNo, newDesc)
    }

    function getTodoActionButtons(todo) {
        if (!todo.isEditing)
            return (
                <button className="todo-action-btns edit-btn" onClick={e => onEditClick(todo.no)} disabled={todo.isCompleted}>
                    <FontAwesomeIcon icon={["fas", "edit"]} />
                </button>
            )
        else
            return (
                <button ref={saveBtn} className="todo-action-btns save-btn" onClick={e => onSaveClick(todo.no, newDesc)} disabled={todo.isCompleted}>
                    <FontAwesomeIcon icon={["fas", "save"]} />
                </button>
            )
    }

    function onDescChange(desc) {
        setNewDesc(desc);
    }

    function onInputBlur(e) {
        if (saveBtn.current && saveBtn.current.contains(e.relatedTarget)) {
            // clicked saved
            todo.isEditing = false;
            return;
        } else {
            onCancelClickEmit();
            setNewDesc(todo.desc); // setting old desc

        }
    }

    function onClickTodo() {
        if (todo.isEditing) return;
        onTodoCompleteToggleEmit(todo);
    }

    return (
        <React.Fragment>
            <span className="no">{todo.no} {todo.isCompleted} </span>
            <input type="text" readOnly={!todo.isEditing} value={newDesc}
                onChange={e => onDescChange(e.target.value)}
                onClick={e => onClickTodo()}
                onBlur={e => onInputBlur(e)}
                className={`
                    todo-input
                    ${todo.isEditing ? 'is-editing' : ''}
                    ${todo.isCompleted ? 'strike-through' : ''}
                `}
                ref={todoInput} />
            {getTodoActionButtons(todo)}
            <button className="todo-action-btns" onClick={e => onDeleteClick(todo.no)}>
                <FontAwesomeIcon icon={["fas", "trash"]} />
            </button>
        </React.Fragment>
    )
}

//className={todo.isEditing && !todo.isCompleted ? 'todo-input is-editing' : 'todo-input' + todo.isCompleted && !todo.isEditing ? 'todo-input strike-through' : 'todo-input'}
