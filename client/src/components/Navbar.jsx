import React from "react";
import styled from "styled-components";
import Button from "./Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useLocation, useNavigate } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";

const Container = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.navbar};
  color: ${({ theme }) => theme.text_primary};
  font-weight: bold;
  font-size: 22px;
  padding: 14px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  @media only screen and (max-width: 600px) {
    padding: 10px 12px;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/");

  return (
    <Container>
      Image Creator
      {path[1] === "post" ? (
        <Button
          text="Explore Posts"
          leftIcon={<ExploreIcon style={{ fontSize: "18px" }} />}
          onClick={() => navigate("/")}
          type="secondary"
        ></Button>
      ) : (
        <Button
          text="Create new post"
          leftIcon={<AddCircleOutlineIcon style={{ fontSize: "18px" }} />}
          onClick={() => navigate("/post")}
        ></Button>
      )}
    </Container>
  );
};

export default Navbar;
