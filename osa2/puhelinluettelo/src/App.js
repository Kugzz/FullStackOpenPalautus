import { useState, useEffect } from 'react'
import phoneService from './services/phoneService'

const Notificationwindow = ({message, windowstyle}) => {
  if (message == null) return null;
  const notificationStyle = {
    color: windowstyle === "green" ? "green" : "red",
    background: "lightgray",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const Personfilter = ({value, onChange}) => (
  <div>
    <div>filter shown <input value={value} onChange={onChange}/></div>
  </div>
)

const Personform = ({handleSumbit, handleNameChange, handleNumChange, namevalue, numvalue}) => (
  <div>
    <h2>Add a new</h2>
    <form onSubmit={handleSumbit}>
      <div> name: <input value={namevalue} onChange={handleNameChange}/></div>
      <div> number: <input value={numvalue} onChange={handleNumChange}/></div>
      <div> <button type="submit">add</button> </div>
    </form>
  </div>
)

const DeleteButton = ({id, handleDelete}) => (
  <>
    <button onClick={() => {handleDelete(id)}}>Delete</button>
  </>
)

const Person = ({person, handleDelete}) => (
  <div>
    <div>{person.name} {person.number} <DeleteButton id={person.id} handleDelete={handleDelete}/> </div>
  </div>
)

const Numbersdisplay = ({persons, handleDelete}) => (
  <div>
    <h2>Numbers</h2>
    {persons.map(person =>
        <Person key={person.name} person={person} handleDelete={handleDelete}/> 
      )}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null);
  const [err, setErr] = useState(null)

  useEffect(() => {
    phoneService.getAll().then(data => {
      setPersons(data);
    })
  }, [])

  const handleDelete = (id) => {
    if (!window.confirm(`delete ${id}?`)){
      return;
    }
    const personToDelete = persons.find(person => person.id === id);
    const request = phoneService.remove(id);
    request
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setNotification(`${personToDelete.name} was deleted`);
        setTimeout(() => {setNotification(null)}, 5000);
      })
      .catch(error => {
        setErr(`${personToDelete.name} has already been removed`)
        setTimeout(() => {setErr(null)}, 5000);
      })
  }

  const handleFilterChange = (e) =>{
    setFilter(e.target.value);
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumChange = (e) =>{
    setNewNumber(e.target.value);
  }

  const handleSumbit = (e) => {
    e.preventDefault()
    if(persons.map(person => person.name).includes(newName)){
      if(!window.confirm(`${newName} is already added to phonebook. Do you want to replace the old number?`)) return;
      //update existing number

      const personToUpdate = persons.find(person => person.name === newName);
      const id = personToUpdate.id;
      phoneService.update({...personToUpdate, number: newNumber})
        .then(response => {
          setPersons(persons.map(person => person.id === id ? response.data : person))
          setNotification(`${newName} was updated`);
          setTimeout(() => {setNotification(null)}, 5000);
        })
        .catch(error => {
          setErr(`${newName} has already been removed`)
          setTimeout(() => {setErr(null)}, 5000);
        })
    }
    else{
      //add new number

      phoneService
      .create({name: newName, number: newNumber})
      .then(data => {
        setPersons(persons.concat(data))
      })

      setNotification(`${newName} was added`);
      setTimeout(() => {setNotification(null)}, 5000);
    }

    setNewName("");
    setNewNumber("");
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notificationwindow message={notification} windowstyle="green"/>
      <Notificationwindow message={err} windowstyle="red"/>
      <Personfilter onChange={handleFilterChange}/>
      <Personform handleSumbit={handleSumbit} handleNameChange={handleNameChange} handleNumChange={handleNumChange} namevalue={newName} numvalue={newNumber}/>
      <Numbersdisplay value={filter} handleDelete={handleDelete} persons={persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLowerCase()))}/>
    </div>
  )

}

export default App