import React from 'react';
import styled from "styled-components";
import {Facebook, Instagram, MailOutlined, Phone, Room, Twitter} from "@mui/icons-material";
import {mobile} from "../responsive";

const Container = styled.div `
  display: flex;
  background-color: black;
  justify-content: space-between;
  ${mobile({
    flexDirection: "column",
  })}
`;

const Left = styled.h1 `
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: white;
`;

const Logo = styled.h1 `
  font-size: 40px;  
`;

const Description = styled.p `
  margin: 20px 0;
  font-size: 14px;
  font-weight: 300;
`;

const SocialContainer = styled.div `
  display: flex;
`;

const SocialIcon = styled.div `
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Title = styled.h3 `
  margin-bottom: 30px;
`;

const Right = styled.div `
  flex: 1;
  padding: 20px;
  color: white;
`;

const ContactItem = styled.div `
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

/**
 * @author Adeeba S D
 * @returns {JSX.Element} Footer component, which is displayed at the bottom of all the pages
 */
const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>FIND A SERVICE</Logo>
                <Description>
                    FIND A SERVICE is your one-stop destination for expert local services.
                    Get dozens of trusted professionals near you to take care of all your home activities
                </Description>
                <SocialContainer>
                    <SocialIcon color="3B5999">
                        <Facebook/>
                    </SocialIcon>
                    <SocialIcon color="E4405F">
                        <Instagram/>
                    </SocialIcon>
                    <SocialIcon color="55ACEE">
                        <Twitter/>
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Right>
                <Title>About</Title>
                <ContactItem>
                    <Room style={{marginRight:"10px"}}/>University Road, Southampton SO17 1BJ
                </ContactItem>
                <ContactItem>
                    <Phone style={{marginRight:"10px"}}/>+44 123 456 789
                </ContactItem>
                <ContactItem>
                    <MailOutlined style={{marginRight:"10px"}}/>contact@findaservice.com
                </ContactItem>
            </Right>
        </Container>
    );
};

export default Footer;