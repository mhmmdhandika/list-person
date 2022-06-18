import React, { useState, useReducer } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import './App.css';

const reducer = (state, action) => {
  if (action.type === 'ADD_PERSON') {
    return [...state, action.payload];
  } else if (action.type === 'DELETE_PERSON') {
    const peopleFilter = state.filter(person => person.id !== action.payload);
    return peopleFilter;
  }
};

const defaultState = [];

function App() {
  const [input, setInput] = useState({
    id: null,
    name: '',
    age: 0,
  });
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(input);
    dispatch({ type: 'ADD_PERSON', payload: { ...input, id: new Date().getTime().toString() } });
    console.log(input);
    setInput({ id: null, name: '', age: 0 });
  };

  return (
    <main>
      <section className='input-field'>
        <form onSubmit={e => handleSubmit(e)}>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' id='name' value={input.name} onChange={e => setInput({ ...input, name: e.target.value })} required />
          <label htmlFor='age'>Age</label>
          <input type='number' name='age' id='age' value={input.age == 0 ? '' : input.age} onChange={e => setInput({ ...input, age: e.target.value })} required />
          <button type='submit'>Submit</button>
        </form>
      </section>
      <section className='result-field'>
        {state.length !== 0
          ? state.map(person => {
              return (
                <div className='people' key={person.id}>
                  <span>{`${person.name}, ${person.age} years`}</span>
                  <button onClick={() => dispatch({ type: 'DELETE_PERSON', payload: person.id })}>
                    <MdOutlineCancel />
                  </button>
                </div>
              );
            })
          : 'No person yet'}
      </section>
    </main>
  );
}

export default App;
