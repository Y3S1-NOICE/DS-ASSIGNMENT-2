import { Container, Typography } from '@mui/material';
import {CardForm} from './CardForm';
import React, { useEffect, useState } from 'react'
import {useMatch} from 'react-router-dom'
import jwt_decode from "jwt-decode"
import { addCard, fetchCard } from '../../api/paymentServiceApi';

export default function AddCard() {
    const [cardData, setCardData] = useState();
    const match = useMatch("/cards/:cardId");
    const cardId =  match.params.cardId;
    const userId = "U001"
    // const userId = jwt_decode(localStorage.getItem('authentication')).id;

    useEffect(()=>{
        if(cardId ===":cardId"){
            setCardData({userId:userId})
        }
        function getCard (){
            console.log(cardId)
            fetchCard(userId, cardId)
            .then((res) =>{
                setCardData(res.data);
            }).catch((err) =>{
                console.error(err);
            })
        }
        getCard();
    },[])

    const onSubmit = (data) =>{
        addCard(userId, data)
        .then((res) =>{
            console.log(res);
        }).catch((err) =>{
            console.error(err);
        })
    }

  return cardData ?(
    <div>
        <br/>
        <center>
        <Typography variant='h4'><b>ADD CARD</b></Typography>
        </center><br/>
            <Container maxWidth="90%">
                <CardForm card={cardData} onSubmit={onSubmit}/>
            </Container>
    </div>
  ):(
    <div> 
        Loading.....
    </div>
  )
}
