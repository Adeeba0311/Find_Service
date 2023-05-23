import React from 'react';
import styled from "styled-components";
import './CarouselStyle.css';

const Container = styled.div `
  width: 100%;
  height: 200px;
  overflow: hidden;
  border: 0.5px solid black;
  margin: 10px;
  border-radius: 10px;
  transition: transform 0.25s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const Image = styled.img `
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

/**
 * @author Adeeba M
 * @param photo - Contains the url for the photo
 * @returns {JSX.Element} Photo component, which is used in the Photo Carousel/Slider in the Service Page.
 */
const Photo = ({photo}) => {
    return (
        <Container>
            <Image src={photo.img} />
        </Container>
    );
};

export default Photo;
