import React, {useEffect, useState} from "react";

function App() {
    const [inputText, setInputText] = useState("");
    const [taskArray, setTaskArray] = useState([]);

    useEffect(function () {
        loadTask();
    }, []);

    function loadTask() {
        fetch('http://localhost:5000/api/tasks')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setTaskArray(data);
            })
            .catch(function (error) {
                console.log("Error loading tasks:", error);
            });
    }

    function handleChange(event) {
        setInputText(event.target.value);
    }

    function handleAdd() {
        if (inputText.trim() === "") {
            return;
        }

        const newTasksArray = taskArray.concat(inputText);

        setTaskArray(newTasksArray);

        setInputText("");
    }

    return (
        <div className="App">
            <h1>To Do App</h1>

            <input
                type="text"
                placeholder="What is your new task"
                value={inputText}
                onChange={handleChange}
            />

            <button onClick={handleAdd}>Add Task</button>

            <ul>
                {taskArray.map(function (task, index) {
                    return (
                        <li key={index}>{task}</li>
                    );
                })}
            </ul>
        </div>
    );
}

export default App;
