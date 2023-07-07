import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCircleCheck,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      addTask(newTask);
      setNewTask("");
      taskInput.current?.focus();
    }
  };

  const addTask = (name: string) => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };

  const removeTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {/* Título del proyecto */}
          <h1 className="d-flex justify-content-center align-items-center">Tareas</h1>
          {/* Tarjeta para agregar tareas */}
          <div className="card border-primary mb-3">
            <div className="card-body">
              {/* Formulario para agregar tareas */}
              <form onSubmit={handleSubmit}>
                <div className="d-grid">
                  {/* Campo de entrada de texto */}
                  <input
                    className="form-control mb-2"
                    type="text"
                    onChange={(e) => setNewTask(e.target.value)}
                    value={newTask}
                    ref={taskInput}
                    autoFocus
                  />
                  {/* Botón para agregar tarea */}
                  <button className="btn btn-primary" type="submit">
                    Agregar
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Lista de tareas */}
          {tasks.map((t: ITask, i: number) => (
            <div className="card card-body mt-2" key={i}>
              {/* Nombre de la tarea */}
              <h3 style={{ textDecoration: t.done ? "line-through" : "" }}>
                {t.name}
              </h3>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                {/* Botón para marcar/desmarcar como completada */}
                <button
                  className={`btn ${t.done ? "btn-warning" : "btn-success"}`}
                  onClick={() => toggleDoneTask(i)}
                >
                  {t.done ? (
                    <FontAwesomeIcon icon={faBan} />
                  ) : (
                    <FontAwesomeIcon icon={faCircleCheck} />
                  )}
                </button>
                {/* Botón para eliminar tarea */}
                <button
                  className="btn btn-danger"
                  onClick={() => removeTask(i)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
