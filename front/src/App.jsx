import { useState, useEffect } from 'react';
import axios from 'axios';

const url = 'http://localhost:8080/demo-fullstack/back/';

const App = () => {
  const [firstName, setFirstName] = useState('');
  const [people, setPeople] = useState([]);
  const [editID, setEditID] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchUsers = async () => {
    const { data } = await axios(`${url}read.php`);
    setPeople(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName) {
      console.log('valeur vide');
    } else if (firstName && isEditing) {
      const person = { user_id: parseInt(editID), name: firstName };

      await axios.post(`${url}edit.php`, person);
      fetchUsers();
      setEditID(null);
      setIsEditing(false);
      setFirstName('');
    } else {
      const person = { name: firstName };

      await axios.post(`${url}create.php`, person);
      fetchUsers();
      setFirstName('');
    }
  };

  const deleteUser = async (id) => {
    await axios.post(`${url}delete.php`, { user_id: id });
    fetchUsers();
    setEditID(null);
    setIsEditing(false);
    setFirstName('');
  };

  const editUser = async (id) => {
    setEditID(id);
    const user = people.find((person) => person.user_id === id);
    setFirstName(user.name);
    setIsEditing(true);
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
          <button type='submit'>
            {isEditing ? 'modifier la personne' : 'ajouter une personne'}
          </button>
        </form>
        {people.map((person) => {
          const { user_id, name } = person;
          return (
            <div key={user_id} className='item'>
              <h4>{name}</h4>
              <button onClick={() => editUser(user_id)}>éditer</button>
              <button onClick={() => deleteUser(user_id)}>supprimer</button>
            </div>
          );
        })}
      </article>
    </>
  );
};

export default App;
