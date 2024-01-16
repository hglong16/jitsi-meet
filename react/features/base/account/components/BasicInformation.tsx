import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  SvgIcon,
  TextField,
  Typography
} from '@mui/material';
import * as z from 'zod';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import { useSelector } from 'react-redux';
import { IReduxState } from '../../../app/types';
import { IJwtState } from '../../jwt/reducer';

type Props = {
};

type InputForm = {
  name: string;
  email: string;
};

const schema = z.object({
  name: z.string().min(4, { message: 'Tên phải có từ 4 ký tự trở lên' }),
  email: z.string().email({ message: 'Email không đúng định dạng' }),
});

const BasicInformation = (props: Props) => {
  const jwtState = useSelector<IReduxState, IJwtState>((state) => state['features/base/jwt']);
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: jwtState.user?.name ?? '',
      email: jwtState.user?.email ?? '',
    },
  });

  const onSubmit: SubmitHandler<InputForm> = (data) => {
    console.log('Submit change information', data);
  }

  return (
    <Box mt={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <List>
          <ListItem sx={{ paddingLeft: 0 }}>
            <Grid container spacing={4}>
              <Grid item lg={8} md={8} sm={12} xs={12}>
                <Box display={'flex'} flexDirection={'column'}>
                  <Typography variant='h6' sx={{ color: '#101828' }}>
                    Hồ sơ cá nhân
                  </Typography>
                  <Typography variant='caption' sx={{ color: '#667085', marginTop: '8px' }}>
                    Cập nhật thông tin của bạn
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Box>
                  <Button
                    variant='contained'
                    color='error'
                    sx={[
                      {
                        backgroundColor: '#fff',
                        color: '#000',
                        marginRight: '12px'
                      },
                      {
                        '&:hover': {
                          color: '#fff',
                        },
                      },
                    ]}
                    type='reset'
                  >
                    Hủy thay đổi
                  </Button>
                  <Button variant='contained' color='primary' type='submit'>Lưu thay đổi</Button>
                </Box>
              </Grid>
            </Grid>
          </ListItem>
          <Divider variant="middle" component="li" className='mt-2 mb-2' />
          <ListItem sx={{ paddingLeft: 0 }}>
            <Grid container spacing={4} display={'flex'}>
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <Box display={'flex'} flexDirection={'column'}>
                  <Typography variant='subtitle2' sx={{ color: '#101828' }}>
                    Tên hiển thị
                  </Typography>
                  <Typography variant='caption' sx={{ color: '#667085', marginTop: '8px' }}>
                    Tên của người dùng hiển thị trong các cuộc họp
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={8} md={12} sm={12} xs={12}>
                <Controller
                  name="name"
                  control={control}
                  render={
                    ({ field }) => (
                      <TextField
                        label="Tên hiển thị"
                        sx={{ width: '400px' }}
                        error={errors?.name?.message}
                        helperText={errors?.name?.message ?? ''}
                        type='string'
                        {...field}
                      />
                    )
                  }
                />
              </Grid>
            </Grid>
          </ListItem>
          <Divider variant="middle" component="li" className='mt-2 mb-2' />
          <ListItem sx={{ paddingLeft: 0 }}>
            <Grid container spacing={4} display='flex' alignItems='center'>
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <Box display={'flex'} flexDirection={'column'}>
                  <Typography variant='subtitle2' sx={{ color: '#101828' }}>
                    Hòm thư điện tử
                  </Typography>
                  <Typography variant='caption' sx={{ color: '#667085', marginTop: '8px' }}>
                    Địa chỉ hòm thư điện tử của người dùng, dùng làm tài khoản đăng nhập và nhận thông báo
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={8} md={12} sm={12} xs={12}>
                <Box display='flex' flexDirection='column' justifyContent='center'>
                  <Box>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          label="Email"
                          sx={{ width: '400px' }}
                          type='string'
                          error={errors?.email?.message}
                          helperText={errors?.email?.message ?? ''}
                          {...field}
                        />
                      )}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </form>
    </Box>
  );
};

export default BasicInformation;