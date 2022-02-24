import React, { Component } from 'react';
import ToDolist from './To-DoList';
import { saveToLocalStorage, getFromLocalStorage } from './WorkingWithLocalStorage';
import ToDoAppCSS from "./To-DoApp.module.css"

class ToDoapp extends Component {
    constructor(props){
        super(props);
        this.state = { items: getFromLocalStorage('todo') || [], text: "", done: false };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
        this.handleEnterPress = this.handleEnterPress.bind(this);
    }
    render() {
        return (
            <div className='Wrapper'>
            <div className={ToDoAppCSS.inp}>
                <h1>To-Do App</h1>
                    <form onSubmit={this.handleSubmit}>
                        <textarea
                            onChange={this.handleChange}
                            value={this.state.text}
                            onKeyDown={this.handleEnterPress}
                        />
                        <br/>
                        <input className={ToDoAppCSS.add} type="submit" value="Add"></input>
                    </form>
                </div>
                <ToDolist todos={this.state.items} onDelete={this.handleDelete} onToggle={this.handleToggle} handleOnDragEnd={this.handleOnDragEnd}></ToDolist>
            </div>
        );
    }

    handleChange(e) {
        this.setState({ text: e.target.value })
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.text.trim().length === 0) return;

        const NewItem = {
            text: this.state.text,
            id: Date.now()
        }
        this.setState(state => ({
            items: [NewItem, ...this.state.items],
            text: ''
        }))
        setTimeout(() => saveToLocalStorage('todo', this.state.items), 100)
    }

    handleDelete(id) {
        const list=[...this.state.items];
        const updatedList=list.filter(item => item.id !== id)
        this.setState({items: updatedList})
        setTimeout(() => saveToLocalStorage('todo', this.state.items), 100)
    } 

    handleToggle(id) {
        const list = [...this.state.items];
        const todo = list.find(x => x.id === id);
        todo.done = !todo.done
        this.setState({items: list})
        setTimeout(() => saveToLocalStorage('todo', this.state.items), 100)
    }

    handleEnterPress(e) {
        if(e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault()
            this.handleSubmit(e)
        }
    }
    handleOnDragEnd(result) {
        if (!result.destination) return;
        const todos = Array.from(this.state.items)
        const [reorderItem] = todos.splice(result.source.index, 1)
        todos.splice(result.destination.index, 0, reorderItem)

        this.setState({items: todos})
        setTimeout(() => saveToLocalStorage('todo', this.state.items), 100)
    }
}

export default ToDoapp;
