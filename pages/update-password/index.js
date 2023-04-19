import * as Components from "../../components";
import * as Chakra from "@chakra-ui/react";
import * as ReactQuery from "@tanstack/react-query";
import * as UserManagement from "../../helpers/supabase_helpers/user_management";
import { useRouter } from "next/router";
import { useState } from "react";

function UpdatePassword() {
  const queryClient = ReactQuery.useQueryClient();
  const router = useRouter();

  const [pushed, setPushed] = useState(false);

  const changePasswordMutation = ReactQuery.useMutation(
    UserManagement.updateUserCredentials
  );

  if (changePasswordMutation.isLoading) {
    return <Components.Loading />;
  } else if (changePasswordMutation.isError) {
    return (
      <Components.Alert
        status={"error"}
        title={"Error: "}
        description={changePasswordMutation.error.message}
      />
    );
  } else if (changePasswordMutation.isSuccess) {
    router.push('/')
    return (
      <Components.Alert
        status={"success"}
        title={"Éxito: "}
        description={"Contraseña cambiada con exito"}
      />
    );
  }

  return (
    <Components.ChangePasswordForm onSubmit={changePasswordMutation.mutate} />
  );
}

export async function getServerSideProps() {
  const queryClient = new ReactQuery.QueryClient();

  return { props: { dehydratedState: ReactQuery.dehydrate(queryClient) } };
}

export default UpdatePassword;
