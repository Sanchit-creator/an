import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getExcel, getPdf, getUser } from '../service/api'
import { Box, Button, Grid, Link, Typography } from '@mui/material'
import styled from '@emotion/styled'
import download from 'downloadjs'

const Home = () => {
    const [detail, setDetail] = useState()
    const {paramstwo} = useParams()
    useEffect(() => {
        const random = () => getUser(paramstwo).then(function(result) {
            setDetail(result.data);
            console.log(result.data);
        })

        random();
    }, [])

    const Content = styled(Box)`
        display: flex;
        min-height: 50vh;
        justify-content: space-around;
        align-items: start;
        flex-direction: column;
        width: 50vw;
`

    const Main = styled(Box)`
        display: flex;
        justify-content: space-around;
        width: 100vw;
    `

    const Img = styled(Box)`
        height: 150px;
        width: 250px;
        margin: 10px
    `

    const GridA = styled(Box)`
        display: flex;
        justify-content: space-around;
        width: 30vw;
    `

    const Btn1 = styled(Link)`
        background-color: red;
        color: white;
        text-decoration:none;
        height: 10vh;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 5px
    `
    const Btn2 = styled(Link)`
        background-color: blue;
        color: white;
        text-decoration:none;
        height: 10vh;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 5px
    `

    if (typeof detail === 'undefined') {
        return (
            <h1>Loading...</h1>
        )
    }

  return (
    <Main component="form" noValidate >
        <Grid item xs={12} sm={6}>
            <Img 
                component="img"
                disabled
                required
                id="outlined-disabled"
                label="Adhaar Photo One"
                src={`http://localhost:3000/${detail.profilePicture}`}
            />
        </Grid>
        <Content>
        <Typography>Name: {detail.firstName + ' ' +detail.lastName}</Typography> 
        <Typography>Email: {detail.email}</Typography>
        <Typography>Date Of Birth: {detail.dob}</Typography>
        <Typography>Hobbies: {detail.hobbies.map((hob, key) => (
            <span key={key}>{hob}</span>
        ))}</Typography>
        <Typography>Projects: {detail.hobbies.map((proj, key) => (
            <span key={key}>{proj}</span>
        ))}</Typography>
        <GridA>
            <Btn1 href={`http://localhost:3000/api/user/pdf/${paramstwo}`}>Get Profile Pdf</Btn1>
            <Btn2 href={`http://localhost:3000/api/user/download/${paramstwo}`}>Get Profile Excel</Btn2>
        </GridA>
    </Content>
</Main>
  )
}

export default Home