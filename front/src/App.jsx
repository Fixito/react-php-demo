import { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from './Alert';

const url = 'http://localhost:8080/demo-fullstack/back/';

const App = () => {
  const [firstName, setFirstName] = useState('');
  const [people, setPeople] = useState([]);
  const [editID, setEditID] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    type: '',
    msg: ''
  });

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios(`${url}read.php`);
      setPeople(data);
    } catch (error) {
      showAlert(true, 'danger', 'Il y a eu une erreur, essayez plus tard...');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName.trim()) {
      showAlert(true, 'danger', 'Veuillez entrer un nom');
    } else if (firstName && isEditing) {
      try {
        const person = { user_id: parseInt(editID), name: firstName };

        await axios.post(`${url}edit.php`, person);
        showAlert(true, 'success', 'Nom modifié');
        fetchUsers();
        setEditID(null);
        setIsEditing(false);
        setFirstName('');
      } catch (error) {
        showAlert(true, 'danger', 'Erreur,essayez encore');
      }
    } else {
      try {
        const person = { name: firstName };

        await axios.post(`${url}create.php`, person);
        showAlert(true, 'success', 'Nom ajouté');
        fetchUsers();
        setFirstName('');
      } catch (error) {
        showAlert(true, 'danger', 'Erreur,essayez encore');
      }
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.post(`${url}delete.php`, { user_id: id });
      fetchUsers();
      setEditID(null);
      setIsEditing(false);
      setFirstName('');
      showAlert(true, 'success', 'Nom supprimé');
    } catch (error) {
      console.log(error);
    }
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
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} people={people} />
          )}
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
