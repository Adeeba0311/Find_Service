import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import StarRating from '../components/StarRating';

const Container = styled.div `
  display: flex;
  height: 100%;
  border: 0.01px groove black;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.5s ease;
  margin-bottom: 15px;
  box-shadow: 0 10px 15px rgba(0,0,0,.1);
`;

const Main = styled.div `
  margin: 15px;
`;

const Title = styled.h2 `
  margin-bottom: 5px;
  width: 75vw;
`;

const ContainerText = styled.p `
  margin: 2px 0;
`;

const SubTitle = styled.h2 `
  margin-bottom: 3px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 75vw;
  font-size: 20px;
`;

const ReviewSummary = styled.div `
  display: flex;
`;

/**
 * @author Adeeba M
 * @param item - Each service details
 * @returns {JSX.Element} - Service details card for the service list
 */
const ServiceProviderItem = ({item}) => {
    console.log(item)
    return (
        <Link to={`/service/${item.id}`} style={{ textDecoration: 'none',color: "black" }}>
            <Container>
                <Main>
                    <Title>
                        Service Name: {item.name}
                    </Title>
                    <SubTitle>Description</SubTitle>
                    <ContainerText>{item.description}</ContainerText>
                    <SubTitle> Review Summary</SubTitle>
                    <ReviewSummary>
                        <ContainerText>Rating: </ContainerText>
                        <StarRating properties= {
                            {rating : item.totalRating}
                        }/>
                        <ContainerText>({item.numberOfRatings})</ContainerText>
                    </ReviewSummary>
                </Main>
            </Container>
        </Link>
    );
};

export default ServiceProviderItem;
