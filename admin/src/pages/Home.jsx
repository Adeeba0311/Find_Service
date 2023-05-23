import React from 'react';
import styled from "styled-components";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import NonVerifiedSPList from "../components/NonVerifiedSPList";
import {mobile} from "../responsive";
import Navbar from "../components/Navbar";

const Container = styled.div `
`;

const Main = styled.div `
  display: flex;
  ${mobile({
    flexDirection: "column",
  })}
`;

const ViewServiceProviderContainer = styled.div `
  flex: 4;
  height: 100%;
  overflow: hidden;
  margin: 30px;
  ${mobile({
    margin: "15px",
  })}
`;

const TitleContainer = styled.div `
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const Title = styled.h1 `
  font-weight: 800;
  margin-right: 10px ;
`;

const TopDetails = styled.div `
  margin-bottom: 10px;
  display: flex;
`;
/**
 * @author Adeeba M
 * @returns {JSX.Element} - Home Page of the website
 */
const Home = () => {
    return (
        <Container>
          <Navbar/>
            <Main>
              <Sidebar/>
              <ViewServiceProviderContainer>
                    <TopDetails>
                      <TitleContainer>
                        <Title>Service Providers Approval Pending</Title>
                      </TitleContainer>
                    </TopDetails>
                    <NonVerifiedSPList properties={
                        {
                            height: 80,
                            pageSize: 10
                        }
                    }/>
              </ViewServiceProviderContainer>
            </Main>
            <Footer/>
        </Container>
    );
};

export default Home;
