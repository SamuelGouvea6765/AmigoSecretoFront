import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {useState} from 'react';

export default function App() {
  const [formFields, setFormFields] = useState([
    { Nome: '', Email: '' },
  ])

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  }

  const submit = async (e) => {
    e.preventDefault();
    let members = [];

    for (let i = 0; i < formFields.length; i++) {
      members[i] = {
        "Nome": formFields[i].Nome,
        "Email": formFields[i].Email
      }
    }

    try {
      console.log(formFields)
      let res = await fetch('http://localhost:3001/sortear', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({members})
      });
      let resJson = await res.json();
      console.log(res.status);
    } catch (err) {
      console.log(err);
    }
  }

  const addFields = () => {
    let object = {
      Nome: '',
      Email: ''
    }

    setFormFields([...formFields, object])
  }

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }

  return (
    <div className="App">
      <form onSubmit={submit}>
        {formFields.map((form, index) => {
          return (
            <div key={index}>
              <input
                name='Nome'
                placeholder='Nome'
                onChange={event => handleFormChange(event, index)}
                value={form.Nome}
              />
              <input
                name='Email'
                type='email'
                placeholder='Email'
                onChange={event => handleFormChange(event, index)}
                value={form.Email}
              />
              <button onClick={() => removeFields(index)}>Remover participante</button>
            </div>
          )
        })}
      </form>
      <button onClick={addFields}>Adicionar participante</button>
      <br />
      <button onClick={submit}>Sortear</button>
    </div>
  );
}