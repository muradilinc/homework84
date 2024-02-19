import React, { ChangeEvent, FormEvent, useState } from 'react';
import { AuthFields } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../../store/auth/authThunk';

interface Props {
  type: boolean;
}

const FormFields: React.FC<Props> = ({ type }) => {
  const [user, setUser] = useState<AuthFields>({
    username: '',
    password: '',
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeUser = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendUser = async (event: FormEvent) => {
    event.preventDefault();
    if (type) {
      await dispatch(login(user));
    } else {
      await dispatch(register(user));
    }
    setUser({
      username: '',
      password: '',
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <h2 className="text-[24px]">{type ? 'Login' : 'Register'}</h2>
      <form
        onSubmit={sendUser}
        className="flex w-[35%] flex-col gap-y-3 my-[25px]"
      >
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={changeUser}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={changeUser}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          className="text-white capitalize bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="submit"
        >
          {!type ? 'register' : 'login'}
        </button>
        {
          type ?
            <button
              type="button"
              className="focus:outline-none capitalize text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={() => navigate('/register')}
            >
              register
            </button>
            :
            null
        }
      </form>
    </div>
  );
};

export default FormFields;