import React, { useState, useEffect, useRef } from "react";
function ToDoList() {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : ["Eat breakfast"];
    });
    const [newTask, setNewTask] = useState((""));
    const inputRef = useRef(null);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks]);

    function handleInputChange(event) {
        const elem = event.target.value;
        const task = elem.charAt(0).toUpperCase() + elem.slice(1);
        setNewTask(task);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask]);
            setNewTask("");
            inputRef.current.focus();
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => index !== i);
        setTasks(updatedTasks);
    }

    function moveUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
                [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
                [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }
    return (<>
        <div className="to-do-list">
            <h1>To-Do-List</h1>
            <div>
                <input ref={inputRef}
                    type="text"
                    placeholder="entrer une tache..."
                    value={newTask}
                    onChange={handleInputChange} />
                <button className="add-button" onClick={addTask}>Ajouter</button>
            </div>
            <ol>
                {tasks.map((task, index) => <li key={index}>
                    <span className="text">{task}</span>
                    <button className="delete-button"
                        onClick={() => deleteTask(index)}>
                        Supprimer
                    </button>
                    <button className="move-button"
                        onClick={() => moveUp(index)}>
                        👆
                    </button>
                    <button className="move-button"
                        onClick={() => moveDown(index)}>
                        👇
                    </button>
                </li>)}
            </ol>
        </div></>);
}
export default ToDoList;