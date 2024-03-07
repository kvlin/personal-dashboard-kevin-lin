import React, { useState, useEffect } from 'react';
import { Container, Form, Button, ListGroup, Row, Col, Alert } from 'react-bootstrap';
import "./index.css"

const TasksCard = () => {
    // variable states
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [inputValue, setInputValue] = useState('');
    const [editTask, setEditTask] = useState(null);


    // Save tasks to local storage whenever tasks state changes
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Function to update the tasks state with user input
    const addTask = () => {
        if (inputValue.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false }]);
            setInputValue('');
        }
    };

    // Function to toggle the completed status of a task
    const toggleTaskCompleted = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    // Filter out completed tasks when the component mounts
    useEffect(() => {
        const updatedTasks = tasks.filter((task) => !task.completed);
        setTasks(updatedTasks);
    }, []);

    // Function to handle editing a task
    const handleEdit = (id, newText) => {
        setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)));
        setEditTask(null);
    };

    return (
        <Container id="tasksCard" className="widgetCard">
            <div className='widgetHeader'>Task manager</div>
            {/* Input field for new task */}
            <Row id='taskInput'>
                <Col sm={10}>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Enter a task"
                        />
                    </Form.Group>
                </Col>
                <Col sm={1}>
                    <Button id="AddTaskBtn" onClick={addTask}> +  </Button>
                </Col>
            </Row>

            {/* List of all tasks in localstorage */}
            <ListGroup >
                {tasks.map((task) => (
                    <ListGroup.Item key={task.id}>
                        <Row>
                            <Col sm={10} style={{ textAlign: 'left' }}>
                                {editTask && editTask.id === task.id ? (
                                    <Form.Control
                                        type="text"
                                        value={editTask.text}
                                        onChange={(e) => setEditTask({ ...editTask, text: e.target.value })}
                                    />
                                ) : (
                                    <Form.Check
                                        className='taskItem'
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTaskCompleted(task.id)}
                                        label={<span
                                            style={{
                                                textDecoration: task.completed ? 'line-through' : 'none',
                                                opacity: task.completed ? 0.5 : 1,
                                            }}>{task.text}</span>}
                                    />
                                )}
                            </Col>
                            <Col sm={1}>
                                {editTask && editTask.id === task.id ? (
                                    <Button variant="primary" onClick={() => handleEdit(task.id, editTask.text)}>Save</Button>
                                ) : (
                                    <Button variant="info" onClick={() => setEditTask({ id: task.id, text: task.text })}>Edit</Button>
                                )}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default TasksCard;
