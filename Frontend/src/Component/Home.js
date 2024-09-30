import React, { useEffect, useState } from 'react'
import { DeleteValueApi, GetValueApi } from '../Server/WebService'
import { UserGetApi } from '../Server/Api'
import { Box, Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Home() {
  const Navigation = useNavigate()
  const [userDetails, setUserDetails] = useState([])

  var GetDetails = () => {
    GetValueApi(UserGetApi)
      .then((responce) => {
        if (responce.data.Status) {
          setUserDetails(responce.data.Result)
          console.log('Result', responce.data.Result)
        }

      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }

  var deleteValueUser = (Id) => {
    DeleteValueApi(UserGetApi, Id)
      .then((response) => {
        if (response.data.Result) {
          GetDetails()
        }
      }).catch((error) => {
        console.error('Error fetching data:', error);
      })

  }

  var deleteValueUserAlart = (Id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        deleteValueUser(Id)
      }
    });

  }

  var UpdateValue = (Id) => {
    console.log('Id', Id)
    Navigation(`/update?Id=${Id}`)
  }
  useEffect(() => {
    GetDetails()
  }, [])



  return (
    <div>

      <Box position={'absolute'} width={'100%'} mt={8} mb={8}>
        <Container>
          <Typography variant='h2'>User List</Typography>
          <Table mb={8}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>email</TableCell>
                <TableCell>age</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {userDetails.map((obj) => {

                return <>  <TableRow width={'100%'}>

                  <TableCell>{obj.name}</TableCell>
                  <TableCell>{obj.email}</TableCell>
                  <TableCell>{obj.age}</TableCell>
                  <TableCell><Button onClick={() => { deleteValueUserAlart(obj.id) }}>Delete</Button> <Button onClick={() => { UpdateValue(obj.id) }}>Update</Button></TableCell>
                </TableRow>
                </>
              })}



            </TableBody>
          </Table>
        </Container>
      </Box>



    </div>
  )
}
