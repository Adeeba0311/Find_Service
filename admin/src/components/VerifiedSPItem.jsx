import React from 'react';
import styled from "styled-components";
import {DescriptionOutlined, LocationOn} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {mobile} from "../responsive";

const Container = styled.div `
  display: flex;
  height: 100%;
  border: 0.01px groove black;
  border-radius: 15px;
  transition: all 0.5s ease;
  margin-bottom: 15px;
  box-shadow: 0 10px 15px rgba(0,0,0,.1);

  ${mobile({
    width: "98%"
  })}
`;
const RightContainer = styled.div `
  flex: 1;
  margin: 10px;
`;

const Title = styled.h2 `
  margin-bottom: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 75vw;
`;

const Content = styled.div `
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  width: 100%;
`;

const ContentText = styled.div `
  margin-left: 8px;
  font-size: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 75vw;
`;

/**
 * @author Adeeba S D
 * @param item - Each service details
 * @returns {JSX.Element} - Service details card for the service list
 */
const VerifiedSPItem = ({item}) => {
    return (
        <Link to={`/serviceprovider/${item.id}`} style={{ textDecoration: 'none',color: "black" }}>
            <Container>
                <RightContainer>
                    <Content>
                        <Title>
                            {item.name}
                        </Title>
                    </Content>
                    <Content>
                        <LocationOn/>
                        <ContentText>{item.address}</ContentText>
                    </Content>
                    <Content>
                        <DescriptionOutlined/>
                        <ContentText>{item.description}</ContentText>
                    </Content>
                </RightContainer>
            </Container>
        </Link>
    );
};

export default VerifiedSPItem;
