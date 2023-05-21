import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { DataGrid } from "@material-ui/data-grid";
import {VisibilityOutlined} from "@material-ui/icons";
import {getColorCodeForStatus} from "../utils";
import {Link} from "react-router-dom";
import axios from "axios";
import {mobile} from "../responsive";

const Container = styled.div `
  display: flex;
  height: ${props => props.height}vh;
  width: 100%;
  margin-bottom: 20px;
`;

const DataGridContainer = styled.div `
  width: 100%;
  height: 100%;
  margin: 0 30px;
  ${mobile({
    margin: 0
  })}
`;

const Status = styled.div `
  border: none;
  border-radius: 10px;
  padding: 5px;
  background-color: ${props => props.color};
  color: black;
  cursor: pointer;
  width: 150px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.div `
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const NonVerifiedSPList = ({properties}) => {

    const columns = [
        {
            field: "action", headerName: "Action", width: 125,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/serviceproviderapproval/" + params.row.id}>
                            <Icon>
                                <VisibilityOutlined/>
                            </Icon>
                        </Link>
                    </>
                );
            },
        },
        { field: "name", headerName: "Service Provider", width: 250},
        {
            field: "approvalStatus", headerName: "Status", width: 250,
            renderCell: (params) => {
                return (
                    <Status color={getColorCodeForStatus(params.row.approvalStatus)}>
                        {params.row.approvalStatus}
                    </Status>
                )
            }
        }
    ];

    const [nonVerifiedServiceProviders, setNonVerifiedServiceProviders] = useState([]);
    const status = 'Pending Verification'

    useEffect(() => {
        const getNonVerifiedServiceProviders = async () => {
            try {
                let requestData = '';
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'http://localhost:8080/api/serviceProvider/getServiceProviderList?approvalStatus='+status,
                    headers: {},
                    data : requestData
                };

                const response = await axios.request(config)

                if (response.data.returnCode === "0") {
                    setNonVerifiedServiceProviders(response.data.serviceProviderList)
                    console.log(response.data);
                } else {
                    console.log(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getNonVerifiedServiceProviders()
    });

    return (
        <Container height={properties.height}>
            {   
                nonVerifiedServiceProviders && (
                    <>
                <DataGridContainer>
                    <DataGrid
                        rows={nonVerifiedServiceProviders}
                        columns={columns}
                        pageSize={properties.pageSize}
                        disableSelectionOnClick
                    />
                </DataGridContainer>
                </>
                )
            }

        </Container>
    );
};

export default NonVerifiedSPList;
