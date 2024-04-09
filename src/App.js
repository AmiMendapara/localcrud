// App.js
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('employeeData')) || [];
    setData(savedData);
  }, []);

  const handleSave = () => {
    const newData = [...data, { id: Date.now(), firstName, lastName, age }];
    setData(newData);
    localStorage.setItem('employeeData', JSON.stringify(newData));
    clearFields();
  };

  const handleDelete = (id) => {
    const filteredData = data.filter((item) => item.id !== id);
    setData(filteredData);
    localStorage.setItem('employeeData', JSON.stringify(filteredData));
  };

  const handleEdit = (id) => {
    const employeeToEdit = data.find((item) => item.id === id);
    setId(employeeToEdit.id);
    setFirstName(employeeToEdit.firstName);
    setLastName(employeeToEdit.lastName);
    setAge(employeeToEdit.age);
    setIsEditing(true);
  };

  const handleUpdate = () => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { id, firstName, lastName, age };
      }
      return item;
    });
    setData(updatedData);
    localStorage.setItem('employeeData', JSON.stringify(updatedData));
    clearFields();
    setIsEditing(false);
  };

  const clearFields = () => {
    setId('');
    setFirstName('');
    setLastName('');
    setAge('');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>CRUD with LocalStorage</h1>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            First Name:
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Last Name:
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Age:
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
        </div>
        {isEditing ? (
          <button onClick={handleUpdate} style={{ backgroundColor: 'blue', color: 'white', padding: '8px 16px', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Update</button>
        ) : (
          <button onClick={handleSave} style={{ backgroundColor: 'green', color: 'white', padding: '8px 16px', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Save</button>
        )}
        <button onClick={clearFields} style={{ backgroundColor: 'grey', color: 'white', padding: '8px 16px', border: 'none', cursor: 'pointer' }}>Clear</button>
      </div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {data.map((item) => (
          <li key={item.id} style={{ marginBottom: '10px' }}>
            {item.firstName} {item.lastName} - {item.age}
            <button onClick={() => handleEdit(item.id)} style={{ backgroundColor: 'orange', color: 'white', marginLeft: '10px', padding: '4px 8px', border: 'none', cursor: 'pointer' }}>Edit</button>
            <button onClick={() => handleDelete(item.id)} style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px', padding: '4px 8px', border: 'none', cursor: 'pointer' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
