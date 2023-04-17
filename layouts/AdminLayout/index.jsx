import * as Chakra from "@chakra-ui/react";
import * as Components from "../../components";

function AdminLayout({ children }) {
  return (
    <Chakra.Flex style={{ background: "var(--color5)", paddingBottom: "12px" }}>
      <Components.SidebarAdmin />
      {children}
    </Chakra.Flex>
  );
}

export default AdminLayout;
