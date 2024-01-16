import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  OutlinedInput,
  SvgIcon,
  TextField,
  Typography
} from '@mui/material';
import * as z from 'zod';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';

type Props = {
};

type InputForm = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

const schema = z.object({
  oldPassword: z.string().min(6, { message: 'Mật khẩu cũ phải có 6 ký tự trở lên' }),
  password: z.string().min(6, { message: 'Nhập lại mật khẩu phải có 6 ký tự trở lên' }),
  confirmPassword: z.string().min(6, { message: 'Mật khẩu phải có 6 ký tự trở lên' }),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      path: ['mismatch'],
      code: "custom",
      message: "Xác nhận lại mật khẩu không đúng"
    });
  }
});;

const ChangePassword = (props: Props) => {
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
  });
  const [hiddenFormValue, setHiddenFormValue] = useState({
    showOldPassword: false,
    showPassword: false,
    showConfirmPassword: false
  });

  const onSubmit: SubmitHandler<InputForm> = (data) => {
    console.log('Submit change password', data);
  }

  return (
    <Box mt={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <List>
          <ListItem sx={{ paddingLeft: 0 }}>
            <Grid container spacing={8}>
              <Grid item lg={8} md={8} sm={12} xs={12}>
                <Box display={'flex'} flexDirection={'column'}>
                  <Typography variant='h6' sx={{ color: '#101828' }}>
                    Mật khẩu người dùng
                  </Typography>
                  <Typography variant='caption' sx={{ color: '#667085', marginTop: '8px' }}>
                    Cập nhật mật khẩu người dùng
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Box>
                  <Button
                    variant='contained'
                    color='error'
                    sx={{
                      backgroundColor: '#fff',
                      color: '#000',
                      marginRight: '12px'
                    }}
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
            <Grid container spacing={8} display={'flex'}>
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <Box display={'flex'} flexDirection={'column'}>
                  <Typography variant='subtitle2' sx={{ color: '#101828' }}>
                    Mật khẩu hiện tại
                  </Typography>
                  <Typography variant='caption' sx={{ color: '#667085', marginTop: '8px' }}>
                    Nhập mật khẩu hiện tại của bạn
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={8} md={12} sm={12} xs={12}>
                <Controller
                  name="oldPassword"
                  control={control}
                  render={
                    ({ field }) => (
                      <TextField
                        label="Mật khẩu cũ"
                        sx={{ width: '400px' }}
                        error={errors?.oldPassword?.message}
                        helperText={errors?.oldPassword?.message ?? ''}
                        type={hiddenFormValue.showOldPassword ? 'string' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setHiddenFormValue({ ...hiddenFormValue, showOldPassword: !hiddenFormValue.showOldPassword })}
                                edge="end"
                              >
                                {hiddenFormValue.showOldPassword
                                  ? (
                                    <SvgIcon fontSize="small">
                                      <EyeSlashIcon />
                                    </SvgIcon>
                                  )
                                  : (
                                    <SvgIcon fontSize="small">
                                      <EyeIcon />
                                    </SvgIcon>
                                  )
                                }
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
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
            <Grid container spacing={8} display='flex' alignItems='center'>
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <Box display={'flex'} flexDirection={'column'}>
                  <Typography variant='subtitle2' sx={{ color: '#101828' }}>
                    Mật khẩu mới
                  </Typography>
                  <Typography variant='caption' sx={{ color: '#667085', marginTop: '8px' }}>
                    Cung cấp mật khẩu mới, nên bao gồm các ký tự in hoa, số và các ký tự đặc biệt
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={8} md={12} sm={12} xs={12}>
                <Box display='flex' flexDirection='column' justifyContent='center'>
                  <Box>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          label="Mật khẩu"
                          sx={{ width: '400px' }}
                          type={hiddenFormValue.showPassword ? 'string' : 'password'}
                          error={errors?.password?.message}
                          helperText={errors?.password?.message ?? ''}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() => setHiddenFormValue({ ...hiddenFormValue, showPassword: !hiddenFormValue.showPassword })}
                                  edge="end"
                                >
                                  {hiddenFormValue.showPassword
                                    ? (
                                      <SvgIcon fontSize="small">
                                        <EyeSlashIcon />
                                      </SvgIcon>
                                    )
                                    : (
                                      <SvgIcon fontSize="small">
                                        <EyeIcon />
                                      </SvgIcon>
                                    )
                                  }
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          {...field}
                        />
                      )}
                    />
                  </Box>
                  <Box className="mt-4">
                    <Controller
                      name="confirmPassword"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          label="Nhập lại mật khẩu"
                          sx={{ width: '400px' }}
                          type={hiddenFormValue.showConfirmPassword ? 'string' : 'password'}
                          error={errors?.confirmPassword?.message ?? (errors as any)?.mismatch?.message}
                          helperText={errors?.confirmPassword?.message ?? (errors as any)?.mismatch?.message ?? ''}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() => setHiddenFormValue({ ...hiddenFormValue, showConfirmPassword: !hiddenFormValue.showConfirmPassword })}
                                  edge="end"
                                >
                                  {hiddenFormValue.showConfirmPassword
                                    ? (
                                      <SvgIcon fontSize="small">
                                        <EyeSlashIcon />
                                      </SvgIcon>
                                    )
                                    : (
                                      <SvgIcon fontSize="small">
                                        <EyeIcon />
                                      </SvgIcon>
                                    )
                                  }
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
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

export default ChangePassword;