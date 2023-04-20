import React from "react";
import * as Layouts from "../../../layouts";
import * as Components from "../../../components";
import { AdminLayout } from "../../../layouts";
import * as Chakra from "@chakra-ui/react";
function users() {
  return (
    <Chakra.Box w={"80%"}>
      <Components.UsersAdmin baseHref={"/dashboard/users"} />
    </Chakra.Box>
  );
}

users.getLayout = function PageLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default users;
