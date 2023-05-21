import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Carousel from "react-elastic-carousel";
import Photo from "./Photo";

const Container = styled.div `
  
`;

/**
 * @author Adeeba S D
 * @param photos - List of photos to be displayed in the carousel/slider
 * @returns {JSX.Element} - Carousel component for the photos array which is used in the Service Page
 */
const PhotoSlider = ({photos}) => {

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2, itemsToScroll: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 }
    ];

    const [photoList, setPhotoList] = useState([]);

    useEffect(() => {
        let tempList = [];
        for (let i = 0; i < photos.length; i++) {
            tempList.push({
                id: i,
                img: photos[i]
            })
        }
        setPhotoList(tempList)
    }, [photos])

    return (
        <Container>
            <Carousel breakPoints={breakPoints}>
                {photoList.map((photo) => (
                    <Photo photo={photo} key={photo.id}/>
                ))}
            </Carousel>
        </Container>
    );
};

export default PhotoSlider;
