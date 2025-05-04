import { useEffect, useState, useRef } from 'react'
import './styles.css'
import Trash from '../../assets/icons8-lixeira.svg'
import api from '../services/api'

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputPhone = useRef()
  const inputEmail = useRef()

  // Buscar usuários da API
  async function getUsers() {
    try {
      const response = await api.get('/usuarios')
      setUsers(response.data)
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
    }
  }

  // Criar novo usuário
  async function createUsers() {
    try {
      await api.post('/usuarios', {
        name: inputName.current.value,
        phone: inputPhone.current.value, // Corrigido: usaremos phone aqui
        email: inputEmail.current.value
      })

      // Limpar campos
      inputName.current.value = ''
      inputPhone.current.value = ''
      inputEmail.current.value = ''

      // Atualizar lista
      getUsers()
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
    }
  }

  // Excluir usuário
  async function deleteUser(id) {
    try {
      await api.delete(`/usuarios/${id}`)
      getUsers()
    } catch (error) {
      console.error('Erro ao deletar usuário:', error)
    }
  }

  // Carregar usuários ao montar o componente
  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Nome' name='nome' type='text' ref={inputName} />
        <input placeholder='Telefone' name='phone' type='text' ref={inputPhone} />
        <input placeholder='Email' name='email' type='email' ref={inputEmail} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Telefone: <span>{user.phone}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUser(user.id)}>
            <img src={Trash} alt="Excluir" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home