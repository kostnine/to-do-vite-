import React, { useState, useEffect } from "react";
import "./App.css"; // importas CSSo

// TaskForm komponentas(TaskForm – Užduoties pridėjimas)
const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState("");//saugo ivesties laukelio teksta

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);
      setTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Įrašykite užduotį"
      />
      <button type="submit" className="add-btn">Pridėti</button>
    </form>
  );
};

// TaskItem komponentas(Užduoties rodymas)
//Jiegu padarem(task.completed) pridedam klase completed
// "Pažymėti kaip atliktą" keicia busena
const TaskItem = ({ task, toggleComplete, deleteTask }) => {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>  
      <span>{task.text}</span> 
      <div>
        <button onClick={() => toggleComplete(task.id)} className="complete-btn">
          {task.completed ? "Atlikta" : "Pažymėti kaip atliktą"} 
        </button>
        <button onClick={() => deleteTask(task.id)} className="delete-btn">
          Ištrinti
        </button>
      </div>
    </div>
  );
};

// TaskList komponentas su localStorage palaikymu
const TaskList = () => {
  const [tasks, setTasks] = useState([]); // Užduotys saugomos useState([])

  // Kai perkraunom atstatom is localstorgae
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks)); // Užtikriname, kad nenuskaitys `null`; Konvertuoja JSON į objektą
    }
  }, []);

  // Užduočių išsaugojimas į localStorage
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);
//Naujos užduoties pridėjimas
  const addTask = (text) => {
    const newTasks = [...tasks, { id: Date.now(), text, completed: false }];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks)); // Nedelsiant išsaugome
  };
//Nauja užduotis pridedama į masyvą
//Ji turi unikalų id, tekstą ir pradinę completed: false būseną
//Naujas užduočių sąrašas išsaugomas localStorage

//---------------//


// Užduoties atlikimo pažymėjimas
//Surandama užduotis pagal id
//Jos completed reikšmė apverčiama (true->false)
//Rezultatas įrašomas į localStorage
  const toggleComplete = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  //Užduoties ištrynimas
  //Išfiltruojamos visos užduotys, išskyrus tą, kurios ID atitinka paspaustą mygtuką
  //Atliktas pakeitimas išsaugomas į localStorage
  const deleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  };


  //Visų užduočių išvalymas
  //Išvalomas užduočių sąrašas
 //localStorage.removeItem("tasks") – visam laikui ištrina užduotis iš naršyklės atminties
  const clearTasks = () => {
    setTasks([]);
    localStorage.removeItem("tasks"); // Visiškai pašaliname duomenis iš localStorage
  };

  //Musu JSX struktura

  //Jei užduočių yra, jos išdėliojamos map() pagalba

  //Rodomas "Išvalyti visas užduotis" mygtukas, jei yra bent viena užduotis; jei ju nera rodoamas "Nera uzd"
  return (
    <div className="task-container">
      <h2>Užduočių sąrašas</h2>
      <TaskForm addTask={addTask} />
      <div>
        {tasks.length === 0 ? (
          <p>Nėra užduočių</p>
        ) : (
          tasks.map(task => (
            <TaskItem key={task.id} task={task} toggleComplete={toggleComplete} deleteTask={deleteTask} />
          ))
        )}
      </div>
      {tasks.length > 0 && <button className="clear-btn" onClick={clearTasks}>Išvalyti visas užduotis</button>}
    </div>
  );
};

export default TaskList;
