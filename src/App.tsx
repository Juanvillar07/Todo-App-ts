import React, { useEffect, useState } from "react"
import { Todos } from "./components/Todos"
import { FilterValue, TodoTitle, type TodoId, type Todo as TodoType } from "./types"
import { TODO_FILTERS } from "./consts"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"

// const mockTodos = [
//   { id: '1', 
//     title: 'Aprender React con TS', 
//     completed: true 
//   },
//   { id: '2', 
//     title: 'Aprender GitHub', 
//     completed: false 
//   },
//   { id: '3', 
//     title: 'Practicar Logica de Programacion', 
//     completed: false 
//   },
// ]

type TaskItems = {
  id: string;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {

  const [todos, setTodos] = useState<Array<TaskItems>>([])
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = ({id}: TodoId) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = ({ id, completed}: Pick<TodoType, 'id' | 'completed'>) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id){
        return {
          ...todo,
          completed
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue) => {
    setFilterSelected(filter)
  }

  const handleRemoveAllCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed)
    setTodos(newTodos)
  }

  const activeCount = todos.filter((todo) => !todo.completed).length

  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter((todo) => {
    if(filterSelected === TODO_FILTERS.ACTIVE){
      return !todo.completed
    }
    if(filterSelected === TODO_FILTERS.COMPLETED){
      return todo.completed
    }
    return todo
  })

  const handleAddTodo = ({title}: TodoTitle): void => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false
    }

    const newTodos = [ ...todos, newTodo]
    setTodos(newTodos)
  }

  useEffect(() => {
    const data = localStorage.getItem('tasks');
    if (data){
      setTodos(JSON.parse(data))
    }
    console.log(data)
  }, [])


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(todos))
  }, [todos])

 
  
 
  
  return (
    <>
      <div className="todoapp">
        <Header onAddTodo={handleAddTodo}/>
        <Todos
        onToggleCompletedTodo={handleCompleted}
        onRemoveTodo={handleRemove} 
        todos={filteredTodos} />
      </div>
      <Footer
        activeCount={activeCount} 
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
        />
    </>
  );
}

export default App
