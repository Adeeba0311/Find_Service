import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import PreviousComment from "./PreviousComment";
import {useSelector} from "react-redux";
import {addMoreDetailsComment, getMoreDetailsComments} from "../api/MoreDetailsComments";

const Container = styled.div ``;

const Main = styled.div `
  display: flex;
  flex-direction: column;
`;

const PreviousCommentsContainer = styled.div `
  display: flex;
  flex-direction: column;
`;

const Hr = styled.hr `
  border: none;
  width: 100%;
  height: 0.05px;
  color: lightgrey;
  background-color: lightgrey;
`;

const AddCommentContainer = styled.div `
  margin: 10px;
`;

const AddCommentForm = styled.div `
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea `
  width: 100%;
  height: 10vh;
`;

const Button = styled.button `
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: black;
  color: white;
  cursor: pointer;
  margin: 10px 0;
  border-radius: 15px;
  transition: all 0.5s ease;
  
`;

/**
 * @author Adeeba M
 * @param {properties} - The customer ID, name and the list of communications happened
 * @returns {JSX.Element} - The comment section type more details section
 */
const MoreDetailsCommentSection = ({properties}) => {

    const serviceProviderId = properties.serviceProviderId
    const [moreDetailsComments, setMoreDetailsComments] = useState([]);
    const user = useSelector((state) => state.user.currentUser);
    const [addComment, setAddComment] = useState(false);
    const [commentText, setCommentText] = useState("");

    const textAreaRef = useRef(null);

      useEffect( () => {

        async function fetchData() {
            const apiResponse = await getMoreDetailsComments(serviceProviderId)
            if (apiResponse != null) {
                setMoreDetailsComments(apiResponse)
                setCommentText("")
                textAreaRef.current.value = ''; // clear textarea field
            } else {
                console.log("Error while getting more details")
            }
        }
        fetchData().then(() => setCommentText(""))
      }, [serviceProviderId, addComment]);

    const handleSubmitButtonClick = async (event) => {
        event.preventDefault(); // prevents the refresh of the page

        async function fetchData() {
            const apiResponse = await addMoreDetailsComment({
                "serviceProviderId": serviceProviderId,
                "name": user.username,
                "text": commentText
            })
            if (apiResponse != null) {
                setAddComment(apiResponse);
            } else {
                console.log("Error while getting more details")
            }
        }
        fetchData().then(() => setCommentText(""))
    }

    return (
        <Container>
            <Main>
                <PreviousCommentsContainer>
                    {moreDetailsComments.map(item => (
                        <>
                            <PreviousComment key={item.id} item={item}/>
                            <Hr/>
                        </>
                    ))}
                </PreviousCommentsContainer>
                <AddCommentContainer>
                    <AddCommentForm>
                        <TextArea
                            id="comment" cols={40} rows={10}
                            name="commentText"
                            placeholder="Please provide your comment..."
                            onChange={(e)=> setCommentText(e.target.value)}
                            ref={textAreaRef}/>
                        <Button onClick={handleSubmitButtonClick}>SUBMIT COMMENT</Button>
                    </AddCommentForm>
                </AddCommentContainer>
            </Main>
        </Container>
    );
};

export default MoreDetailsCommentSection;
