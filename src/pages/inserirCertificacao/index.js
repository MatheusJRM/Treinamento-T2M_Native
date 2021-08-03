import React, { useState } from 'react';
import axios from 'axios';
import { Container, EspacoView, InputArea, InputCadastro } from './styles';
import { Alert } from 'react-native';

export default function CadastroCertificados({ route }) {
    const { idColaborador } = route.params


    const [certificado, setCertificado] = useState({
        nomeCertificado: '',
        instituicaoCertificado: '',
        tempoValidade: 0
    });

    async function postcertificado() {
        try {

            const responseCertificado = await axios.post('https://api-treinamento-t2m.herokuapp.com/certificados', certificado)
            const idCertificado = responseCertificado.data.idCertificacoes
            //const dataObtencaoCert = responseCertificado.data.dataObtencao


            const response = await axios.put(`https://api-treinamento-t2m.herokuapp.com/colabsCerts​/colaborador​/${idColaborador}​/certificacaoAInserir​/${idCertificado}​/dataObtencao​/${dataObtencaoCert}`)
            console.log(response.data);
            Alert.alert('Colaborador cadastrado com sucesso!')

        } catch (error) {
            Alert.alert('Envio de dados nao permitido, cheque as informações passadas');
        }

    }
    return (
        <Container>
            <EspacoView></EspacoView>
            <InputArea>
                <InputCadastro onChangeText={(text) => setCertificado({ ...certificado, nomeCertificado: text })} placeholder='Nome do Certificado' placeholderTextColor='#181818' />
                <InputCadastro onChangeText={(text) => setCertificado({ ...certificado, instituicaoCertificado: text })} placeholder='Nome da Instuição' placeholderTextColor='#181818' />
                <InputCadastro onChangeText={(text) => setCertificado({ ...certificado, tempoValidade: text })} placeholder='Validade' placeholderTextColor='#181818' />
                
            </InputArea>
        </Container>
    )
}