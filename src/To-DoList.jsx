import React, { Component } from 'react';
import ToDoListCSS from "./To-DoList.module.css";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

class ToDolist extends Component {
    render() {
        return (
            <DragDropContext onDragEnd={this.props.handleOnDragEnd}>
                <Droppable droppableId='todos'>
                {(provided) => (
                    <ul className={ToDoListCSS.todos} {...provided.droppableProps} ref={provided.innerRef}>
                        {this.props.todos.map((todo, index) => (
                            <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                                {(provided) => (
                                    <li className={`${ToDoListCSS.todo} ${todo.done && ToDoListCSS.tododone}`} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                    {todo.text} 
                                        <span>
                                            <button className={ToDoListCSS.delet} onClick={() => {this.props.onDelete(todo.id)}}>Delete</button>
                                            {
                                                !todo.done 
                                                    ?
                                                    <button className={`${ToDoListCSS.toggle} ${ToDoListCSS.undone}`} onClick={() => {this.props.onToggle(todo.id)}}>Done</button>
                                                    :
                                                    <button className={`${ToDoListCSS.toggle} ${ToDoListCSS.done}`} onClick={() => {this.props.onToggle(todo.id)}}>Undone</button>
                                            }
                                        </span>
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}

                </Droppable>
            </DragDropContext>
        );
    }
}

export default ToDolist;
