import { Button, TextInput, Text } from "@ignite-ui/react";
import { Form, FormAnnotation } from "./styles";
import { Airplane } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const ClaimUsernameFormSchema = z.object({
  username: z
  .string().min(3, {message: 'Min 3 Letras'})
  .regex(/^([a-z\\\\-]+)$/i)
  .transform((username) => username.toLowerCase())
  ,
})

type ClaimUsernameFormData = z.infer<typeof ClaimUsernameFormSchema>

export function ClaimUsernameForm() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } ,
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(ClaimUsernameFormSchema),
  })

  async function HandleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data.username);
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(HandleClaimUsername)}> 
        <TextInput size="sm" 
          prefix="ignite.com" 
          placeholder="seu-usuario"
          {...register('username')}
        />
        <Button size="sm" type="submit"> 
          Reservar Usuario 
          <Airplane size={32} />
        </Button>     
      </Form>
      <FormAnnotation>
      <Text size="sm">
        {
          errors.username ? 
          errors.username.message : 
          ' Digite o Nome do usuário' 
        }
      </Text>
      </FormAnnotation>
    </>
  )
}