import * as Chakra from "@chakra-ui/react";
import * as Components from "../../components";
import { useEffect, useState } from "react";
import * as UserAuth from "../../helpers/supabase_helpers/user_management";
import * as ReactQuery from "@tanstack/react-query";
import * as QueryKeys from "../../helpers/page_helpers/AdminLayout_helpers/query_keys";
import * as QueryFns from "../../helpers/page_helpers/AdminLayout_helpers/query_fns";
import Link from "next/link";

function AdminLayout({ children }) {
  const queryClient = ReactQuery.useQueryClient();

  const userIdQuery = ReactQuery.useQuery(
    [QueryKeys.QK_USER_ID],
    QueryFns.getUserIdQuery,
    {
      onError: (error) => console.log(error),
    }
  );

  const userId = userIdQuery?.data;

  const userRole = ReactQuery.useQuery(
    [QueryKeys.QK_USER_ROLE],
    () => QueryFns.getUserRole(userId),
    {
      onSuccess: (role) => console.log(role),
      onError: (error) => console.log(error),
      enabled: !!userId,
    }
  );

  if (userIdQuery.isLoading || userRole.isLoading) {
    return <Components.Loading />;
  } else if (userIdQuery.isError || userRole.isError) {
    return (
      <Components.Alert
        status={"error"}
        title={"Error: "}
        description={`${userIdQuery.error ?? userRole.error}`}
      />
    );
  }else if (userRole.data !== "admin") {
    return (
      <Chakra.Box>
        <Components.Alert
          status={"error"}
          title={"Error 403: "}
          description={"Forbidden"}
        />
        <Link href={"/"}>
          <Chakra.Button>Go back to home</Chakra.Button>
        </Link>
      </Chakra.Box>
    );
  }

  return (
    <Chakra.Flex style={{ background: "var(--color5)", paddingBottom: "12px" }}>
      <Components.SidebarAdmin />
      {children}
    </Chakra.Flex>
  );
}

export default AdminLayout;
