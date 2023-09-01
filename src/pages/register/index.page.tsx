import { Heading, MultiStep, Text, TextInput, Button } from "@ignite-ui/react";
import { Container, Header, Form, FormError } from "./styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "@/src/lib/axios";
import { AxiosError } from "axios";

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username Min 3 Letras" })
    .regex(/^([a-z\\\\-]+)$/i)
    .transform((username) => username.toLowerCase()),
  name: z.string().min(3, { message: "Nome Min 3 Letras" }),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    
  });
  
  const router = useRouter()
  
  useEffect(() => {
    if (router.query.username) {
      const name = String(router.query.username);
      setValue('username', name )
    }
  }, [router.query?.username, setValue])

  async function HandleRegister(data: RegisterFormData) {
  
    try {
      await api.post('/users',{
        name: data.name,
        username: data.username,
      })
    } catch (error) {
      console.log(error);
      if(error instanceof AxiosError && error?.response?.data?.message){
        alert(error.response.data.message);
      }
    }
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call !</Heading>
        <Text>
          Precisamos de algumas informacões para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1}></MultiStep>
      </Header>
      <Form as="form" onSubmit={handleSubmit(HandleRegister)}>
        <label>
          <Text size="sm">Nome de usuário</Text>
          <TextInput
            size="sm"
            prefix="ignite.com"
            placeholder="Seu Usuário"
            {...register("username")}
          />
          {errors.username && (
            <FormError size="sm">{errors.username.message}</FormError>
          )}
        </label>
        <label>
          <Text size="sm">Nome Completo</Text>
          <TextInput size="sm" placeholder="Seu Nome" {...register("name")} />
					{errors.name && (
            <FormError>{errors.name.message}</FormError>
          )}
        </label>
        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  );
}
