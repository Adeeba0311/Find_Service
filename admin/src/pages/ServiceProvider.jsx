import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import {mobile} from "../responsive";
import ServiceProviderItem from "../components/ServiceProviderItem";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const Container = styled.div`
`;

const Main = styled.div`
  display: flex;
  ${mobile({
    flexDirection: "column",
  })}
`;

const ServiceProviderContainer = styled.div`
  flex: 4;
  margin: 30px;
  ${mobile({
    margin: "15px"
  })}
`;

const Title = styled.h1`
  font-weight: 800;
`;

const ServiceList = styled.div`
`;

const DeleteButton = styled.button`
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

const RightTopContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
  ${mobile({
    alignItems: "flex-start",
  })}
`;

const LeftTopContainer = styled.div`
  flex: 3;
`;

const TopDetails = styled.div`
  margin-bottom: 10px;
  display: flex;
  ${mobile({
    flexDirection: "column",
  })}
`;

const Contents = styled.div`
  border: 0.01px groove lightgrey;
  border-radius: 15px;
  margin-bottom: 15px;
  padding: 10px;
  ${mobile({
    border: "none",
    borderRadius: "0",
    marginBottom: "0",
    padding: "0"
  })}
`;


/**
 * @author Adeeba S D
 * @returns {JSX.Element} - returns the service list page
 */
const ServiceProvider = () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const [services, setServices] = useState([]);
    const [serviceProvider, setServiceProviderName] = useState([]);
    const [deleteButtonDialog, setDeleteButtonDialog] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {

        const getServices = async () => {
            try {
                let requestData = '';
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'http://localhost:8080/api/service/getServiceListByServiceProvider?serviceProviderId=' + id,
                    headers: {},
                    data: requestData
                };

                const response = await axios.request(config)

                if (response.data.returnCode === "0") {
                    setServices(response.data.serviceList)
                    setServiceProviderName(response.data.serviceProviderName)
                } else {
                    console.log(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getServices()
    }, [id]);

    const handleDeleteButtonDialogOpen = () => {
        setDeleteButtonDialog(true);
    };

    const handleDeleteButtonYesDialogClose = () => {
        const url = `http://localhost:8080/api/serviceProvider/delete?id=${id}`;

        fetch(url, {
            method: 'DELETE'
        }).then(() => {
                navigate("/", {replace: true})
            })
            .catch(error => {
                // handle the error
                console.log(error);
            });
    };

    const handleDeleteButtonDialogClose = () => {
        setDeleteButtonDialog(false);
    };

    return (
        <Container>
            <Navbar/>
            <Main>
                <Sidebar/>
                <ServiceProviderContainer>
                    {
                        services && services.length > 0 && (
                            <>
                                <Contents>
                                    <TopDetails>
                                        <LeftTopContainer>
                                            <Title>Service Provider - {serviceProvider}</Title>
                                        </LeftTopContainer>
                                        <RightTopContainer>
                                            <DeleteButton onClick={handleDeleteButtonDialogOpen}>
                                                DELETE
                                            </DeleteButton>
                                        </RightTopContainer>
                                    </TopDetails>
                                    <ServiceList>
                                        {
                                            services.length === 0 && (
                                                <Title>There are no services for Service
                                                    Provider {services.serviceProviderId}</Title>
                                            )
                                        }
                                        {services.map(item => (
                                            <ServiceProviderItem item={item} key={item.id}/>
                                        ))}
                                    </ServiceList>
                                </Contents>
                                {
                                    deleteButtonDialog &&
                                    <Dialog
                                        open={deleteButtonDialog}
                                        onClose={handleDeleteButtonDialogClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                            {"Are you sure??"}
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                {"Are you sure you want to delete this service provider?"}
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleDeleteButtonYesDialogClose} autoFocus>
                                                YES
                                            </Button>
                                            <Button onClick={handleDeleteButtonDialogClose} autoFocus>
                                                NO
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                }
                            </>
                        )
                    }
                </ServiceProviderContainer>
            </Main>
            <Footer/>
        </Container>
    );
};

export default ServiceProvider;
