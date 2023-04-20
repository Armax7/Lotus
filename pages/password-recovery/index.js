import * as Components from "../../components";
import * as Chakra from "@chakra-ui/react";
import * as ReactQuery from "@tanstack/react-query";
import * as UserManagement from "../../helpers/supabase_helpers/user_management";

function PasswordRecovery() {
  const queryClient = ReactQuery.useQueryClient();

  const sendRecoveryMutation = ReactQuery.useMutation(
    UserManagement.sendPasswordReset
  );

  if (sendRecoveryMutation.isLoading) {
    return <Components.Loading />;
  } else if (sendRecoveryMutation.isError) {
    return (
      <Components.Alert
        status={"error"}
        title={"Error: "}
        description={sendRecoveryMutation.error.message}
      />
    );
  } else if (sendRecoveryMutation.isSuccess) {
    return (
      <Components.Alert
        status={"success"}
        title={"Éxito: "}
        description={"Correo enviado con exito, revise su bandeja de entrada"}
      />
    );
  }

  return (
    <Chakra.Box>
      <Components.RecoveryForm onSubmit={sendRecoveryMutation.mutate} />
    </Chakra.Box>
  );
}

export async function getServerSideProps() {
  const queryClient = new ReactQuery.QueryClient();

  return { props: { dehydratedState: ReactQuery.dehydrate(queryClient) } };
}

export default PasswordRecovery;
