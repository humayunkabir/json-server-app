import { useEffect, useState, MouseEvent } from 'react';
import Joi from 'joi';
import useValidation from './hooks/useValidation';
import ApiService from './service';
import { button } from './utils/classes';

function App() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [editedUser, setEditedUser] = useState<User>(null!);

  function fetchUsers() {
    ApiService.getUsers().then((users) => {
      setUsers(users);
    });
  }

  function deleteUser(e: MouseEvent<HTMLButtonElement>) {
    const isConfirmed = window.confirm('Are you sure?');
    if (isConfirmed) {
      ApiService.deleteUser(e.currentTarget.value as unknown as ID).then(() => {
        fetchUsers();
      });
    }
  }

  function updateUser(e: MouseEvent<HTMLButtonElement>) {
    ApiService.updateUser(
      e.currentTarget.value as unknown as ID,
      editedUser
    ).then(() => {
      setEditedUser(null!);
      fetchUsers();
    });
  }

  const { register, onSubmit, onReset, errors } = useValidation(
    Joi.object({
      name: Joi.string().min(3).required(),
    }),
    (data) => {
      ApiService.createUser(data)
        .then(() => {
          fetchUsers();
        })
        .catch((error) => {
          alert(error.message);
        })
        .finally(() => {
          onReset();
        });
    }
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className='w-11/12 mx-auto my-5 space-y-3'>
      <form onSubmit={onSubmit} className='space-y-3'>
        <div className='flex space-x-3'>
          <input
            className='flex-1 border border-gray-300 rounded focus:ring-0'
            placeholder='Enter a name'
            type='text'
            {...register('name')}
          />
          <button className={button.get('success', 'md')}>Add User</button>
        </div>
        {errors?.name?.message && (
          <small className='text-red-500'>{errors.name.message}</small>
        )}
      </form>
      <hr />
      {users?.length ? (
        <ul className='space-y-3'>
          {users.map((user) => (
            <li
              className='flex items-center justify-between p-3 border rounded shadow-sm border-grey-300'
              key={user.id}
            >
              <h3
                className='font-medium focus:outline-none'
                contentEditable
                suppressContentEditableWarning
                onInput={(e) =>
                  setEditedUser({
                    ...user,
                    name: e.currentTarget.textContent as string,
                  })
                }
              >
                {user.name}
              </h3>
              <div className='space-x-2'>
                <button
                  className={button.get('danger-outline', 'sm')}
                  value={user.id}
                  onClick={deleteUser}
                >
                  Delete
                </button>
                <button
                  className={button.get(
                    editedUser?.id !== user.id ? 'primary-outline' : 'primary',
                    'sm'
                  )}
                  value={user.id}
                  onClick={updateUser}
                  disabled={editedUser?.id !== user.id}
                >
                  Update
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className='flex items-center justify-between p-3 text-red-500 border border-red-300 rounded shadow-sm'>
          No users found!
        </div>
      )}
    </main>
  );
}

export default App;
