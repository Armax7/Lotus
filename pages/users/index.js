import React from "react";
import * as Layouts from "../../layouts";
import * as Components from "../../components";
import { UsersAdminLayout } from "../../layouts";
import * as Chakra from "@chakra-ui/react";
function users() {
  return (
    <Chakra.Box w={"80%"}>
      <Components.UsersAdmin baseHref={"/dashboard/users"} />
    </Chakra.Box>
  );
}

users.getLayout = function PageLayout(page) {
  return <UsersAdminLayout>{page}</UsersAdminLayout>;
};

export default users;
