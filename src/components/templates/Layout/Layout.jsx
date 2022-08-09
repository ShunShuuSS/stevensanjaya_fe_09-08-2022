import Container from "../../organism/Container/Container";
import Header from "../../organism/Header/Header";

const Layout = ({ children }) => {
  return (
    <>
      <main>
        <Header />
        <Container>{children}</Container>
      </main>
    </>
  );
};

export default Layout;
