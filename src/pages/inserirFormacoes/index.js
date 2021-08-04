import React, { useState } from 'react';
import axios from 'axios';
import { Container, EspacoView, InputArea, InputCadastro, MensagemArea, MensagemView, MensagemText } from './styles';
import { Alert } from 'react-native';
import MenuIcon from '../../components/icon';

export default function CadastroFormacoes({ route }) {
    if (route.params) {


    const { idColaborador } = route.params
    

    const [formacao, setFormacao] = useState({
        nome: '',
        nivel: '',
        instituicao: '',
        //dataEntradaForm: ''
    });

    async function postFormacao() {
        try {

            const responseFormacao = await axios.post('https://api-Formacao-t2m.herokuapp.com/formacoes', formacao)
            const idFormacao = responseFormacao.data.idFormacoes


            const response = await axios.put(`https://api-Formacao-t2m.herokuapp.com/colabsForms/colaborador/${idColaborador}/formacao/${idFormacao}/dataEntrada/${dataEntradaForm}`)
            console.log(response.data);

        } catch (error) {
            Alert.alert('Envio de dados nao permitido, cheque as informações passadas');
        }

    }
    return (
        <Container>
            <MenuIcon />
            <EspacoView></EspacoView>
            <InputArea>
                <InputCadastro onChangeText={(text) => setFormacao({ ...formacao, nome: text })} placeholder='Nome da Formacao' placeholderTextColor='#181818' />
                <InputCadastro onChangeText={(text) => setFormacao({ ...formacao, nivel: text })} placeholder='Nível' placeholderTextColor='#181818' />
                <InputCadastro onChangeText={(text) => setFormacao({ ...formacao, instituicao: text })} placeholder='Nome da Instuição' placeholderTextColor='#181818' />
            </InputArea>
        </Container>
    )
    }else{
        return (
            <Container>
              <MenuIcon />
              <MensagemArea>
                <MensagemView>
                  <MensagemText>Não foi possivel ir para o cadastro,</MensagemText>
                  <MensagemText>escolha um colaborador para cadastrar uma formacao a ele.</MensagemText>
                </MensagemView>
              </MensagemArea>
            </Container>
          )
    }
}