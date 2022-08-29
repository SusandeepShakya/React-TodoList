import React, { useEffect, useState } from 'react';
import { Todos } from './Todos';

export const AddTodo = ({ addTodo }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    let initTodo;
    if (localStorage.getItem("todos") === null) {
        initTodo = [];
    }
    else {
        initTodo = JSON.parse(localStorage.getItem("todos"));
    }

    const onDelete = (todo) => {
        console.log("I am ondelete of todo", todo);
        // Deleting this way in react does not work
        // let index = todos.indexOf(todo);
        // todos.splice(index, 1);

        setTodos(todos.filter((e) => {
            return e !== todo;
        }));
        console.log("deleted", todos)
        localStorage.setItem("todos", JSON.stringify(todos));
    }



    const [todos, setTodos] = useState(initTodo);
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])



    const submit = (e) => {
        e.preventDefault();
        if (!title || !desc) {
            alert("Title or Description cannot be blank");
        }
        else {
            addTodo(title, desc);
            setTitle("");
            setDesc("");
        }
    }
    return (
        <>
            <div className="container my-3">
                <h3>Add a Todo</h3>
                <form onSubmit={submit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Todo Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="title" aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label">Todo Description</label>
                        <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="form-control" id="desc" />
                    </div>
                    <button type="submit" className="btn btn-sm btn-success">Add Todo</button>
                </form>
            </div>
            <Todos todos={todos} onDelete={onDelete} />

        </>
    )
}
