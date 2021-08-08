import React, { useEffect, useState } from 'react';
import { Container, EspacoView, ProjetoArea, ProScroll, InserirColaView, CarText, MensagemView, MensagemText, ProjetoButton, ProjetoText, InserirText, InserirView, CardText, CardView, ProjetoView, DateView } from './styles';
import MenuIcon from '../../components/icon';
import { AuthContext } from '../../services/auth';
import axios from 'axios';
import { Alert } from 'react-native';

export default function InserirCompetencia({ navigation }) {
    const { posicao, setPosicao } = React.useContext(AuthContext);
    const [competencias, setCompetencias] = useState([]);

    useEffect(() => {
        axios.get(`https://api-treinamento-t2m.herokuapp.com/competencias`)
            .then((response) => {
                setCompetencias(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    const handleClick = async (p) => {
        console.log(posicao);
        console.log(p);
        try {
            await axios.put(`https://api-treinamento-t2m.herokuapp.com/posComps/posicao/${posicao.idPosicoes}/competenciaAInserir/${p.idCompetencias}`)
            Alert.alert('Competência inserida com sucesso!')
            const responsePosicao = await axios.get(`https://api-treinamento-t2m.herokuapp.com/posicoes/${posicao.idPosicoes}`);
            setPosicao(responsePosicao.data);
            navigation.reset({
                routes: [{ name: 'Competências por posição' }]
            })
        } catch (error) {
            console.error(error);
        }
    }

    const competenciasMap = competencias.map((p, i) => {
        return (
            <ProjetoArea key={i}>
                <InserirView>
                    <CardView>
                        <CarText>Nome:</CarText>
                        <CardText>{p.nome}</CardText>
                    </CardView>
                    <CardView>
                        <CarText>Descrição:</CarText>
                        <CardText>{p.descricao}</CardText>
                    </CardView>
                    <InserirColaView>
                        <ProjetoButton onPress={() => handleClick(p)}>
                            <ProjetoText>Inserir</ProjetoText>
                        </ProjetoButton>
                    </InserirColaView>
                </InserirView>

            </ProjetoArea>
        )
    })

    return (
        <Container>
            <ProScroll>
                <EspacoView></EspacoView>
                <ProjetoView>
                    <InserirText> Inserir Competencia</InserirText>
                </ProjetoView>
                {competenciasMap}
            </ProScroll>
        </Container>
    )
}
