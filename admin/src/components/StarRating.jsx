import React from 'react';
import styled from "styled-components";

const Container = styled.div``;

const Star = styled.div `
  text-align:left;
  font-style:normal;
  display:inline-block;
  position: relative;
  unicode-bidi: bidi-override;
  
  &:before {
    display:block;
    content: '★★★★★';
    color: #eee;
  }
  
  &:after {
    white-space:nowrap;
    position:absolute;
    top:0;
    left:0;
    content: '★★★★★';
    width: ${props => props.width};
    color: #ff8c00;
    overflow:hidden;
    height:100%;
  }
`;

/**
 * @author Adeeba S D
 * @param properties - Contains the rating of the review or the service
 * @returns {JSX.Element} - Star rating component
 */
const StarRating = ({properties}) => {

    const getWidth = (rating) => {
        return (rating * 20) + '%';
    }

    return (
        <Container>
            <Star width={getWidth(properties.rating)}/>
        </Container>
    );
};

export default StarRating;
