import { useState, useEffect } from 'react';
import Persons from "./Components/Persons";
import AddNumber from "./Components/AddNumber";
import Filter from "./Components/Filter";
import Notification from "./Components/Notification";
import personService from "./services/persons";


const App = () => {
  const [persons, setPersons] = useState([])
  const [personsFiltered, setPersonsFiltered] = useState(persons)
  const [newFilter, setNewFilter] = useState("")
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [alert, setAlert] = useState(null)

  useEffect(() => {
      console.log("efect")
      personService.getAll()
        .then(persons => {
          setPersons(persons)
          setPersonsFiltered(persons)
        })
        
  }, [])

  console.log('render', persons.length, 'persons')

  const handleFilterInputChange = (event) => {
    var newPersonsFiltered = persons;
    if(event.target.value != "") {
      newPersonsFiltered = persons.filter(person => person.name.includes(event.target.value))
    }
    setNewFilter(event.target.value);
    setPersonsFiltered(newPersonsFiltered);
  }

  const handleNameInputChange = (event) => {
  
    setNewName(event.target.value);
  }

  const handleNumberInputChange = (event) => {
    
    setNewNumber(event.target.value);
  }


  const onAddPerson = (event) => {
    console.log("Button clicked", event.target);
    event.preventDefault();

    var findPerson = persons.find(person=>person.name === newName);

    if(findPerson != undefined) {
      if (window.confirm(`${findPerson.name} is already added to phonebook, replace old number with new one?`)){
        
        console.log(`Updating ${findPerson.name}`);
        findPerson.number = newNumber;

        personService
          .update(findPerson.id, findPerson)
          .then(returnedPerson => {
            
            let personsArray = persons.map(p => p.id !== findPerson.id ? p : returnedPerson)

            setPersons(personsArray);
            setPersonsFiltered(personsArray);

            setAlert(
              {messege: `Updated ${findPerson.name}`, type: 1}
            );
            setTimeout(() => {
              setAlert(null)
            }, 5000);
          })
          .catch((error) => {
            setAlert(
              {messege: error.response.data.error, type: 0}
            );
            setTimeout(() => {
              setAlert(null)
            }, 5000);
          })
      }
    }
    else{

      console.log(`Creating person ${newName}`);
      const person = {name: newName, number: newNumber};

      personService
        .create(person)
        .then(createdPerson => {
          console.log("Person created: ", createdPerson);

          let personsArray = persons.concat(createdPerson);
          setPersons(personsArray);
          setPersonsFiltered(personsArray);
          
          setNewName("");
          setNewNumber("");

          setAlert(
            {messege: `Added ${createdPerson.name}`, type: 1}
          );
          setTimeout(() => {
            setAlert(null)
          }, 5000);
        })
        .catch((error) => {
          setAlert(
            {messege: error.response.data.error, type: 0}
          );
          setTimeout(() => {
            setAlert(null)
          }, 5000);
        })
    }
  }

  
  const onDelete = (id, name) => {
    console.log(`Deleting person ${name} id: ${id}`);
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deleteById(id)
        .then( () => {
          let updatedPersons = persons.filter(p => p.id != id);
          setPersons(updatedPersons);
          setPersonsFiltered(updatedPersons);

          setAlert(
            {messege: `Deleted ${name}`, type: 1}
          );
          setTimeout(() => {
            setAlert(null)
          }, 5000);
        })
        .catch(error => {
          setAlert(
            {messege: `The person '${name}' was already deleted from server`, type: 0}
          );
          setTimeout(() => {
            setAlert(null)
          }, 5000);

          let personsArray = persons.filter(p => p.id !== id)
          setPersons(personsArray);
          setPersonsFiltered(personsArray);
        })
    }
  }

  return (
    <div>
      <h2>Phonebook v2</h2>

      {alert && <Notification message={alert.messege} type={alert.type} />}

      <Filter handleFilterChange={handleFilterInputChange} newFilter={newFilter}/>

      <h2>add a new</h2>
      <AddNumber 
        addPerson={onAddPerson} 
        newName={newName} 
        handleNameChange={handleNameInputChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberInputChange}
      />

      <h2>Numbers</h2>
      <Persons persons={personsFiltered} handleDelete={onDelete} />
    </div>
  )
}


export default App