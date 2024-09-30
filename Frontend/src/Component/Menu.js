import React from 'react'
import { AppBar, Container, Stack, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
export default function Menu() {
    const MenuValue = [
        {
            title: 'Home',
            path: '/'
        },
        {
            title: 'Create',
            path: '/create'
        },

    ]
    return (
        <div>
            <AppBar>
                <Container>
                    <Toolbar>
                        <Stack direction={'row'}
                            justifyContent={'space-between'}
                            alignItems={"center"}
                            width={'100%'}
                        >
                            <Typography variant='h6'>Logo</Typography>

                            <Stack direction={'row'} gap={3}>
                                {MenuValue.map((obj) => {
                                    return <>
                                        <Link style={{ color: 'white', textDecoration: 'none' }} to={obj.path}>{obj.title}</Link>
                                    </>
                                })}
                            </Stack>
                        </Stack>

                    </Toolbar>
                </Container>


            </AppBar>
        </div>
    )
}
