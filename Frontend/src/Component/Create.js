import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateValueApi } from '../Server/WebService';
import { UserGetApi } from '../Server/Api';
import { Box, Container, FormControl, FormGroup, Stack, TextField, Typography, Button } from '@mui/material';
import Swal from 'sweetalert2';

export default function Create() {
  const navigation = useNavigate();
  const [CreateValue, setCreateValue] = useState(false);

  // For validation errors
  const [errors, setErrors] = useState({
    name: '',
    age: '',
    email: ''
  });

  const BoxName = useRef();
  const BoxAge = useRef();
  const BoxEmail = useRef();

  // Simple email regex for validation
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Function to validate form data
  const validateForm = (name, age, email) => {
    var isValid = true;
    let newErrors = { name: '', age: '', email: '' };

    if (!name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!age || isNaN(age)) {
      newErrors.age = 'Valid age is required';
      isValid = false;
    }
    if (!email || !validateEmail(email)) {
      newErrors.email = 'Valid email is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


  const CreateDataNew = (event) => {
    event.preventDefault();
    const uname = BoxName.current.value;
    const uage = BoxAge.current.value;
    const uemail = BoxEmail.current.value;
    const UnewAge = uage ? parseInt(uage) : undefined;
    const UnewName = uname ? uname : undefined;
    const UnewEmail = uemail ? uemail : undefined;

    // Validate before making API request
    if (validateForm(UnewName, UnewAge, UnewEmail)) {
      const Obj1 = {
        name: UnewName,
        age: UnewAge,
        email: UnewEmail
      };

      CreateValueApi(UserGetApi, Obj1)
        .then((res) => {
          if (res.data.Result) {
            Swal.fire({
              icon: "success",
              title: "Create Post",
              text: "Create Post Successfully Done !",
            });
            setTimeout(() => {
              navigation('/');
            }, 4000);
          }
        }).catch((error) => {
          console.log(error);
        });
    } else {
      setCreateValue(true);
      setTimeout(() => {
        setCreateValue(false);
      }, 8000);
    }
  };

  const GoBack = () => {
    navigation('/');
  };

  return (
    <div>
      <Box justifyContent={'center'} alignItems={'center'} width={'100%'}>
        <Container>
          <Typography mt={8} variant='h2'>User Create</Typography>
          <Stack justifyContent={'center'}>
            <FormGroup>
              <Stack p={3} bgcolor={'whitesmoke'} direction={'row'} gap={3} justifyContent={'center'} alignItems={'center'}>

                <FormControl error={!!errors.name}>
                  <TextField
                    label='Name'
                    placeholder='Enter name'
                    variant='standard'
                    color='primary'
                    required
                    inputRef={BoxName}
                    helperText={errors.name}
                  
                  />
                </FormControl>

                <FormControl error={!!errors.age}>
                  <TextField
                    label='Age'
                    variant='standard'
                    color='primary'
                    placeholder='Enter age'
                    required
                    inputRef={BoxAge}
                    helperText={errors.age}
                  />
                </FormControl>

                <FormControl error={!!errors.email}>
                  <TextField
                    label='Email'
                    variant='standard'
                    placeholder='Enter email'
                    color='primary'
                    required
                    inputRef={BoxEmail}
                    helperText={errors.email}
                  />
                </FormControl>

                <FormControl>
                  <Stack direction={'row'} gap={4} m={3}>
                    <Button
                      variant='contained'
                      disabled={CreateValue}
                      color='success'
                      onClick={(e) => CreateDataNew(e)}
                    >
                      Create
                    </Button>
                    <Button variant='contained' color='secondary' onClick={() => GoBack()}>Go Back</Button>
                  </Stack>
                </FormControl>

              </Stack>
            </FormGroup>
          </Stack>

          <Stack>
            {CreateValue ? <Box><Typography>Please fill all required fields! <Button onClick={() => { setCreateValue(false) }}>Reset Now</Button></Typography></Box> : ''}
          </Stack>

        </Container>
      </Box>
    </div>
  );
}
