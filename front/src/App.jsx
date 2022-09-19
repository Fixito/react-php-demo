import { useState, useEffect } from 'react';
import axios from 'axios';

const url = 'http://localhost:8080/demo-fullstack/back/';
// const url = 'http://localhost:5000/';

const App = () => {
  const [firstName, setFirstName] = useState('');
  const [people, setPeople] = useState([]);

  const fetchUsers = async () => {
    const { data } = await axios(url);
    console.log(data);
    setPeople(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (firstName) {
      const person = { name: firstName };
      // setPeople((people) => {
      //   return [...people, person];
      // });
      fetchUsers();
      setFirstName('');

      await axios.post(`${url}create.php`, person);
    } else {
      console.log('valeur vide');
    }
  };

  const deleteUser = async (id) => {
    const newPeople = people.filter((person) => person.user_id !== id);
    setPeople(newPeople);

    await axios.delete(`${url}delete.php?id=${id}`);
  };

  return (
    <>
      <article>
        <form className='form' onSubmit={handleSubmit}>
          <div className='form-control'>
            <label htmlFor='firstname'>Name :</label>
            <input
              type='text'
              id='firstname'
              name='firstname'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <button type='submit'>add person</button>
        </form>
        {people.map((person) => {
          const { user_id, name } = person;
          return (
            <div key={user_id} className='item'>
              <h4>{name}</h4>
              <button onClick={() => deleteUser(user_id)}>delete</button>
            </div>
          );
        })}
      </article>
    </>
  );
};

export default App;
