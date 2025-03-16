import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logout from "../Components/UserAuth/Logout";
import DarkMode from "../Components/UI/DarkMode";
import { useSelector } from "react-redux";
const Mainnav = () => {
  const premium = useSelector((state) => state.expenses.premium);
  const theme = useSelector((state) => state.theme.theme);
  const textColor = theme === "dark" ? "text-light" : "text-dark";
  const customStyle = theme === "dark" ? { color: "#fff" } : { color: "#ff5a00" };
  return (
    <Navbar className="shadow" collapseOnSelect expand="lg">
      <Container className="">
        <Navbar.Brand className={`fw-bold`} style={customStyle}>
          Expensify <span className="text-danger">X</span>{" "}
        </Navbar.Brand>
        <Navbar.Toggle
          className="bg-light"
          aria-controls="responsive-navbar-nav"
        />
        <Navbar.Collapse  id="responsive-navbar-nav">
          <Nav className="fw-bold ms-auto">
            <Nav.Link as={Link} className={`pe-4 ${textColor}`} to="/welcome">
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              className={`pe-4 ${textColor}`}
              to="/profileupdate"
            >
              Profile
            </Nav.Link>
            {premium && <DarkMode />} 
            <div>
              <Logout />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Mainnav;
