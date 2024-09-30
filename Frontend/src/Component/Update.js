import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GetValueIdApi, UpdateValueApi } from '../Server/WebService'
import { UserGetApi } from '../Server/Api'
import { Box, Container, FormControl, FormGroup, Stack, TextField, Toolbar, Typography, FormLabel, FormHelperText, Button } from '@mui/material'
import Swal from 'sweetalert2'


export default function Update() {
  const navigation = useNavigate()
  const [UserDefault, setUserDefault] = useState('')
  const [UpdateValue, setUpdateValue] = useState(false)
  const location = useLocation()
  const [errorNew, setErrorNew] = useState({
    name: '',
    age: '',
    Email: ''
  })
 var validateEmails = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }

  const validateForm = (name, age, email) => {
    let IsValid = true

    let newError = { name: '', age: '', email: '' }

    if (!name) {
      newError.name = 'Pleace name filed Valid required !'
      IsValid = false
    }
    if (!age || isNaN(age)) {
      newError.age = 'pleace age filed Valid required !'
      IsValid = false

    } if (!email || !validateEmails(email)) {
      newError.email = 'Pleace email filed Vaild required !'
      IsValid = false
    }
    setErrorNew(errorNew)
    return IsValid

  }
  const querypramas = new URLSearchParams(location.search)

  var GetId = querypramas.get('Id')
  var BoxName = useRef()
  var BoxAge = useRef()
  var BoxEmail = useRef()

  var UserDetailDefault = () => {
    GetValueIdApi(UserGetApi, GetId)
      .then((res) => {

        if (res.data.Status) {
          setUserDefault(res.data.Result[0])
          console.log(res.data.Result, 'sfsfsdf')

        }
      }).catch((error) => {
        console.log(error, 'error')
      })
  }

  var UpdateData = (event) => {

    event.preventDefault()
    const uname = BoxName.current.value
    const uage = BoxAge.current.value
    const uemail = BoxEmail.current.value
    const UnewAge = uage ? parseInt(uage) : undefined;
    const UnewName = uname ? uname : undefined;
    const UnewEmail = uemail ? uemail : undefined;

    if (validateForm(UnewAge, UnewName, UnewEmail)) {
      var Obj1 = {
        name: UnewName,
        age: UnewAge,
        email: UnewEmail
      }


      UpdateValueApi(UserGetApi, GetId, Obj1)
        .then((res) => {
          if (res.data.Result) {

            setUpdateValue(true)
            setInterval(() => {
              setUpdateValue(false)
            }, 3000)
            UserDetailDefault()
            navigation('/')
          }

        }).catch((error) => {
          console.log(error)
        })
    }




  }
  var GoBack = () => {
    navigation('/')
  }
  useEffect(() => {
    UserDetailDefault()
    console.log('UserDefault', UserDefault)
  }, [])

  var UpdateValuePost = (event) => {
    Swal.fire({
      title: "Do you want to Update the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Update",
      denyButtonText: `Don't Update`
    }).then((result) => {

      if (result.isConfirmed) {
        Swal.fire("Update !", "", "success");
        UpdateData(event)
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
  return (
    <div  >
      <Box justifyContent={'center'} alignItems={'center'} width={'100%'}>
        <Container>
          <Typography mt={8} variant='h2'>User Update</Typography>
          <Stack justifyContent={'center'}>

            <FormGroup >
              <Stack p={3} bgcolor={'whitesmoke'} direction={'row'} gap={3} justifyContent={'center'} alignItems={'center'} >

                <FormControl error={!!errorNew.name}>

                  <TextField
                    label={UserDefault.name}
                    placeholder='enter name'
                    variant='standard' color='primary'
                    helperText={errorNew.name}

                    inputRef={BoxName}
                  />

                </FormControl>
                <FormControl error={!!errorNew.age}>

                  <TextField label={UserDefault.age} variant='standard' color='primary' placeholder='enter age'
                    helperText={errorNew.age}
                    inputRef={BoxAge}
                  />
                </FormControl>
                <FormControl error={!!errorNew.Email}>

                  <TextField label={UserDefault.email} variant='standard' placeholder='enter email' color='primary'
                    helperText={errorNew.Email}
                    inputRef={BoxEmail}
                  />
                </FormControl>

                <FormControl>
                  <Stack direction={'row'} gap={4} m={3}>
                    <Button variant='contained' color='success' onClick={(e) => UpdateValuePost(e)}>Update</Button>
                    <Button variant='contained' color='secondary' onClick={() => GoBack()}>Go Back</Button>
                  </Stack>

                </FormControl>
              </Stack>
            </FormGroup>

            {UpdateValue ? <Box textAlign={'center'}>
              <Typography mt={8} variant='h5'>User Update Successfully </Typography>
            </Box> : ""}

          </Stack>


        </Container>
      </Box>
    </div>
  )
}
