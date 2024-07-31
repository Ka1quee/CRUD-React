import GlobalStyle from "./styles/global";
import styled from 'styled-components';
import Form from './components/Form';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Grid from "./components/Grid";
import { useState, useEffect } from 'react';
import axios from 'axios';

// Criando o componente Container

const Container = styled.div`
width: 100%;
max-width: 800px;
margin-top: 20px;
display: flex;
flex-direction: column;
align-items: center;
gap: 10px;
`;

const Title = styled.h2``;

function App() {

  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  // Função responsavel por trazer os usuários da API/BackEnd

  // É assincrona pois é necessario esperar o banco de dados retornar os dados
  const getUsers = async () => {
    try {
      // res = response vai esperar com await o axios realizar um get na porta que adicionamos no backend
      const res = await axios.get("http://localhost:8800");
      // Assim que essa porta for realizada (em caso de sucesso no get) vai trazer os dados do banco, sorteando pelo nome ordenando por ordem alfabetica
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));

      // Caso o código de cima der algum erro ele devolverá a notificação de erro vindo da biblioteca ToastiFy que terá uma notificação passsando o erro que foi recebido no catch
    } catch (error) {
      toast.error(error)
    }
  };

  // useEffect vai receber a função getUsers
  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Container>
        <Title>USUÁRIOS</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}/>
        <Grid users={users} setUsers={setUsers} setOnEdit = {setOnEdit}/>
      </Container>
      {/* Importando a estilização da biblioteca do Toastify e configurando indicando o tempo que ele será exibido e a posição na tela navegador */}
      {/* autoClose={3000} position={toast.POSITION.BOTTOM_LEFT}  */}
      <ToastContainer />
      <GlobalStyle />
    </>
  )
}

export default App
