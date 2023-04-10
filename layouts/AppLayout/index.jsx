import * as Components from "../../components";

function AppLayout({ children }) {
  return (
    <>
      <Components.NavBar />
      <main>{children}</main>
      <Components.Footer />
    </>
  );
}

export default AppLayout;
