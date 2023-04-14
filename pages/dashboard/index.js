//import axios from "axios";
import React from "react";
import * as Chakra from "@chakra-ui/react";

import * as Components from "../../components";
//import * as Chakra from "@chakra-ui/react";

function Dashboard() {
  return (
    <div style={{ background: "var(--color5)", paddingBottom: "12px" }}>
      <Chakra.Flex>
        <Components.SidebarAdmin />
      </Chakra.Flex>
    </div>
  );
}

export default Dashboard;

Dashboard.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
