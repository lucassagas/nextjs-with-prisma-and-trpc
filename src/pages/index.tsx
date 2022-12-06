import {
  Button,
  Card,
  Container,
  FormElement,
  Input,
  Row,
  Spacer,
} from "@nextui-org/react";
import { ChangeEvent, useCallback, useState } from "react";
import { trpc } from "../utils/trpc";

type FormProps = {
  name?: string;
  lastName?: string;
};

export default function Home() {
  const { users } = trpc;
  const [formData, setFormData] = useState<FormProps>();
  const { mutateAsync: createPerson } = trpc.createPerson.useMutation();
  const { data } = trpc.countPerson.useQuery();

  const { mutateAsync: createUser } = users.create.useMutation();

  const handleChange = useCallback((event: ChangeEvent<FormElement>): void => {
    const { name, value } = event.currentTarget;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (): Promise<void> => {
    await createPerson({
      name: formData?.name!,
      lastName: formData?.lastName!,
    });
    await createUser({ name: formData?.name! });
  }, [formData]);

  return (
    <Container
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: " center",
        height: "100vh",
      }}
    >
      <Card css={{ mw: "400px" }}>
        <Card.Body>
          <form onSubmit={handleSubmit}>
            <Row justify="center">
              <Input
                name="name"
                placeholder="Nome"
                css={{ width: "100%" }}
                onChange={handleChange}
              />
            </Row>
            <Spacer />
            <Row justify="center" align="center">
              <Input
                name="lastName"
                placeholder="Sobrenome"
                css={{ width: "100%" }}
                onChange={handleChange}
              />
            </Row>
            <Spacer />
            <Row justify="center" align="center">
              <Button type="submit" size="md" css={{ width: "100%" }}>
                Submit
              </Button>
            </Row>
          </form>
          <h1>Pessoas: {data?.count}</h1>
        </Card.Body>
      </Card>
    </Container>
  );
}
