import React, {useState} from 'react';
import styled from "styled-components";
import {AccountCircleRounded} from "@material-ui/icons";
import {CalendarMonthOutlined} from "@mui/icons-material";
import StarRating from "./StarRating";
import {mobile} from "../responsive";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const Container = styled.div`
  margin-top: 5px;
  background-color: black;
  color: white;
  padding: 10px;
  border-radius: 10px;
  width: 95%;
  display: flex;
  flex-direction: column;
  ${mobile({
    width: "95%",
  })}
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  height: 20px;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const DetailsText = styled.p`
  margin-left: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  ${mobile({
    width: "30vw",
  })}
`;

const RatingText = styled.p`
  margin-right: 7px
`;

const ReviewText = styled.div`
  background-color: rgb(251, 251, 255);
  color: black;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  height: -webkit-calc(100% - 80px);
  overflow: hidden;
`;

const DeleteButton = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: red;
  color: white;
  cursor: pointer;
  margin: 10px 0;
  border-radius: 15px;
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.1);
    transform-origin: center
  }
`;

/**
 * @author Adeeba S D
 * @param item - Each review object
 * @returns {JSX.Element} One review card component
 */
const Review = ({item}) => {

    const id = item.id;
    const [deleteButtonDialog, setDeleteButtonDialog] = useState(false)

    const handleDeleteButtonDialogOpen = () => {
        setDeleteButtonDialog(true);
    };

    const handleDeleteButtonYesDialogClose = (event) => {
        event.preventDefault(); // prevents the refresh of the page
        const url = `http://localhost:8080/api/review/delete?reviewId=${id}`;

        fetch(url, {
            method: 'DELETE'
        })
            .then(() => {
                window.location.reload();
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
            <Details>
                <Name>
                    <AccountCircleRounded/>
                    <DetailsText>{item.customerName}</DetailsText>
                </Name>
                <Date>
                    <CalendarMonthOutlined/>
                    <DetailsText>{item.timeStamp}</DetailsText>
                </Date>
            </Details>
            <Details>
                <RatingText>Rating:</RatingText>
                <StarRating properties={
                    {
                        rating: item.rating
                    }
                }/>
            </Details>
            <ReviewText>
                {item.comment}
            </ReviewText>
            <DeleteButton onClick={handleDeleteButtonDialogOpen}>
                Delete
            </DeleteButton>
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
                        {"Are you sure you want to delete this review?"}
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
        </Container>
    );
};

export default Review;
