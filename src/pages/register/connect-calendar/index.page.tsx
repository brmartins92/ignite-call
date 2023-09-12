import { Heading, MultiStep, Text, TextInput, Button } from "@ignite-ui/react";
import { Container, Header, Form, FormError } from "../styles";
import { ArrowRight } from "phosphor-react";

import { api } from "@/src/lib/axios";
import { ConnectBox, ConnectItem } from "./styles";



export default function Register() {
  /*
  async function HandleRegister(data: RegisterFormData) {
  
  }
  */

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call !</Heading>
        <Text>
          Precisamos de algumas informacões para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={2}></MultiStep>
      </Header>
      <ConnectBox>
        <ConnectItem>
          <Text>
            Google Calendar
          </Text>
          <Button variant="secondary" size="sm">Conectar</Button>
        </ConnectItem>
        <Button type="submit">
          Próximo passo
          <ArrowRight/>
        </Button>
      </ConnectBox>
      
    </Container>
  );
}
