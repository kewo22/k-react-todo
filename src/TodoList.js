import React, { useState, useRef } from "react";
import TodoListItem from "./TodoListItem";
import './App.css';
import { text } from "@fortawesome/fontawesome-svg-core";

export default function TodoList({ todos, onAddNewTodo }) {

    const [desc, setDesc] = useState('');
    const todoAddInput = useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
        if (!desc) return;
        const newTodo = {
            no: 0,
            desc: desc,
            date: new Date(),
            isCompleted: false,
            isEditing: false
        };
        const existingTodos = todos;
        Object.assign(newTodo, { no: existingTodos.length + 1 });
        existingTodos.push(newTodo);
        onAddNewTodo(existingTodos);
        setDesc('');
        todoAddInput.current.focus();
    }

    function onDescChange(desc) {
        setDesc(desc);
    }

    function handelDeleteClick(totoNo) {
        const tempTodos = JSON.parse(JSON.stringify(todos));
        const index = Array.from(tempTodos).findIndex(obj => {
            return obj.no === totoNo;
        });
        if (index !== -1) {
            tempTodos.splice(index, 1);
            tempTodos.map((obj, i) => {
                return obj.no = i + 1;
            })
        }
        onAddNewTodo(tempTodos);
    }

    function handelEditClick(totoNo) {
        const tempTodos = JSON.parse(JSON.stringify(todos));
        // Resetting isEdit flag
        tempTodos.map((obj) => {
            return obj.isEditing = false;
        });
        // Find todo to set isEdit flag
        const todo = Array.from(tempTodos).find(obj => {
            return obj.no === totoNo;
        });
        todo.isEditing = !todo.isEditing; // Set isEdit flag
        // Find todo index
        const index = Array.from(tempTodos).findIndex(obj => {
            return obj.no === totoNo;
        });
        if (index !== -1) {
            // replace todo with updated flag value
            tempTodos.splice(index, 1, todo);
        }
        onAddNewTodo(tempTodos);
    }

    function handelSaveClick(totoNo, newDesc) {
        const tempTodos = JSON.parse(JSON.stringify(todos));
        // Find todo to set isEdit flag
        const todo = Array.from(tempTodos).find(obj => {
            return obj.no === totoNo;
        });
        todo.desc = newDesc; // Set newDesc
        // Find todo index
        const index = Array.from(tempTodos).findIndex(obj => {
            return obj.no === totoNo;
        });
        if (index !== -1) {
            // replace todo with updated flag value
            tempTodos.splice(index, 1, todo);
        }
        tempTodos.map((obj) => {
            return obj.isEditing = false;
        });
        onAddNewTodo(tempTodos);
    }

    function handelCancelClick() {
        const tempTodos = JSON.parse(JSON.stringify(todos));
        tempTodos.map((obj) => {
            return obj.isEditing = false;
        });
        const x = [...tempTodos]
        onAddNewTodo(x);
    }

    function handelCompleteToggle(toDo) {
        const tempTodos = JSON.parse(JSON.stringify(todos));
        // Find todo index
        const index = Array.from(tempTodos).findIndex(obj => {
            return obj.no === toDo.no;
        });
        // Find todo to set isEdit flag
        const todo = Array.from(tempTodos).find(obj => {
            return obj.no === toDo.no;
        });
        todo.isCompleted = !todo.isCompleted; // Toggle isCompleted
        if (index !== -1) {
            // replace todo with updated flag value
            tempTodos.splice(index, 1, todo);
        }
        onAddNewTodo(tempTodos);
    }

    function getPendingTasksCountText() {

        let text = '';
        const pendingTasksCount = todos.length - todos.filter(obj => { return obj.isCompleted }).length;

        if (pendingTasksCount === 1) {
            text = `You have ${pendingTasksCount} task to complete.`
        } else if (pendingTasksCount > 1) {
            text = `You have ${pendingTasksCount} tasks to complete.`
        } else {
            if (todos.length) {
                text = 'All Completed !!'
            } else {
                text = 'Nothing Yet !!'
            }
        }

        return text;
    }

    return (
        <React.Fragment>

            <div className="todo-wrapper">

                <div className="header-wrapper">
                    <h3>Welcome Kewin</h3>
                    <h5>{getPendingTasksCountText()}</h5>
                </div>

                <form onSubmit={handleSubmit} className="form-wrapper">
                    <input
                        type="text"
                        value={desc}
                        onChange={e => onDescChange(e.target.value)}
                        className="todo-add-input"
                        autoFocus={true}
                        ref={todoAddInput}
                    />
                    <input type="submit" value="Add" className="todo-add-submit" />
                </form>

                <div className="todo-item-wrapper">
                    {
                        todos.map((value, index) => {
                            return (
                                <div className="todo-item" key={index} >
                                    <TodoListItem
                                        key={index}
                                        todo={value}
                                        onDeleteClickEmit={handelDeleteClick}
                                        onEditClickEmit={handelEditClick}
                                        onSaveClickEmit={handelSaveClick}
                                        onCancelClickEmit={handelCancelClick}
                                        onTodoCompleteToggleEmit={handelCompleteToggle} />
                                </div>
                            )
                        })
                    }
                </div>

            </div>

        </React.Fragment>
    )
}

