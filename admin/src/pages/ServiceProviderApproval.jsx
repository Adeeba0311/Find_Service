import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import {mobile} from "../responsive";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import MoreDetailsCommentSection from "../components/MoreDetailsCommentSection";
import axios from "axios";
import {useSelector} from "react-redux";

const Container = styled.div ``;

const Main = styled.div `
  display: flex;
  ${mobile({
    flexDirection: "column",
})}
`;

const Contents = styled.div `
  border: ${props => (props.border === "black" ? "3px solid black": "0.01px groove lightgrey")};
  border-radius: 15px;
  margin-bottom: 15px;
  padding: 10px;
  background-color: ${props => (props.background ? props.background : "none")};
`;

const ServiceProviderContainer = styled.div `
  flex: 4;
  height: 100%;
  overflow: hidden;
  margin: 30px;
`;

const TopContainer = styled.div `
`;

const TopContainerText = styled.p `
  margin: 5px 0;
`;

const SubTitle = styled.h3 `
  font-weight: 700;
  margin-right: 10px;
`;

const Hr = styled.hr `
  border: none;
  width: 100%;
  height: 0.05px;
  color: lightgrey;
  background-color: lightgrey;
  margin: 10px 0;
`;

const LeftContainer = styled.div `
  flex: 1;
`;

const RightContainer = styled.div `
  flex: 2;
  margin: 5px;
`;

const RightTopContainer = styled.div `
  top: 0;
`;

const AcceptButton = styled.button `
  color: white;
  background-color: black;
  padding: 10px;
  font-size: 16px;
  border-radius: 15px;
  cursor: pointer;
  ${mobile({
    width: "100%",
  })}
`;

const RejectButton = styled.button `
  color: white;
  background-color: black;
  padding: 10px;
  font-size: 16px;
  border-radius: 15px;
  cursor: pointer;
  ${mobile({
    width: "100%",
  })}
`;


/**
 * @author Adeeba M
 * @returns {JSX.Element} - Page for the customer's service request
 * @constructor
 */
const ServiceProviderApproval = () => {

    const location = useLocation();
    const serviceProviderId = location.pathname.split("/")[2];
    const [serviceProvider, setServiceProvider] = useState({});

    const user = useSelector((state) => state.user.currentUser);
    const adminId = user.id;
    const adminName =  user.name;
    const updateStatus = 'Verified';

    const dataV = { serviceProviderId, updateStatus};
    const dataR = { "serviceProviderId": serviceProviderId,
                    "updateStatus": "Rejected"}

    useEffect(() => {

      const getServiceProvider = async () => {
          try {
              let requestData = '';
              let config = {
                  method: 'get',
                  maxBodyLength: Infinity,
                  url: 'http://localhost:8080/api/serviceProvider/findBySPid?id='+serviceProviderId,
                  headers: { },
                  data : requestData
              };

              const response = await axios.request(config)

              if (response.data.returnCode === "0") {
                  setServiceProvider(response.data)
              } else {
                  console.log(response.data);
              }
          } catch (error) {
              console.log(error);
          }
      }
      getServiceProvider()
  }, [serviceProviderId]);
    const handleAcceptButtonClick = async (event) => {
    event.preventDefault(); // prevents the refresh of the page
    fetch('http://localhost:8080/api/serviceProvider/updateStatus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataV)
    })
    .then(() => {
        window.location.href = '/verifiedSP';
    })
    .catch(error => {
        // handle the error
        console.log(error);
    }); 
  }

  const handleRejectButtonClick = async (event) => {
    event.preventDefault(); // prevents the refresh of the page
    fetch('http://localhost:8080/api/serviceProvider/updateStatus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataR)
    })
    .then(()=> {
        window.location.href = '/rejectedSP';
    })
    .catch(error => {
        // handle the error
        console.log(error);
    }); 
  }

    return (
        <Container>
            <Navbar/>
            <Main>
                <Sidebar/>
                {
                  serviceProvider && (
                    <>
                    <ServiceProviderContainer>
                    <Contents>
                        <RightContainer>
                            <SubTitle>Service Provider</SubTitle>
                            <TopContainerText>Name: {serviceProvider.name}</TopContainerText>
                            <TopContainerText>Status: {serviceProvider.approvalStatus}</TopContainerText>
                            <Hr/>
                        </RightContainer>
                        <TopContainer>
                            <SubTitle>Description</SubTitle>
                            <TopContainerText>{serviceProvider.description}</TopContainerText>
                        </TopContainer>
                    </Contents>
                    <Contents border="black"> 
                        <LeftContainer>
                          <SubTitle>Accept Request: </SubTitle>
                        </LeftContainer>
                        <RightContainer>
                          <RightTopContainer>
                          <AcceptButton onClick={handleAcceptButtonClick}  style={{ marginRight: 14 }}>
                                                Verify</AcceptButton>
                          
                          <RejectButton onClick={handleRejectButtonClick}>
                                                Reject</RejectButton>
                          </RightTopContainer>
                        </RightContainer>
                    </Contents> 
                    
                    <Contents>
                        <SubTitle>More Details</SubTitle>
                        <MoreDetailsCommentSection properties={
                            {
                                adminId: adminId,
                                adminName: adminName,
                                serviceProviderId: serviceProviderId
                            }
                        }/>
                    </Contents>
                    
                </ServiceProviderContainer>  
                    </>
                  )
                }
            </Main>
            <Footer/>
        </Container>
    );
};

export default ServiceProviderApproval;
