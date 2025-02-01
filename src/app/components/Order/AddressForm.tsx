'use client';

import { ChangeEvent, useState } from 'react';

import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { Box, Paper, Typography, Grid, TextField, Button, useMediaQuery, useTheme } from '@mui/material';
import { ShippingInfo, ShippingInfoError } from '@/app/models/order';

const AddressForm = () => {
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: '',
    zipCode: '',
    address1: '',
    address2: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState<ShippingInfoError>({ zipCode: '' });
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error('Function not implemented.');
  }

  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handlePostcode = () => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.onload = () => {
      new window.daum.Postcode({
        oncomplete: function (data) {
          setShippingInfo((prevInfo) => ({
            ...prevInfo,
            zipCode: data.zonecode,
            address1: data.address,
          }));
          setErrors((prevErrors) => ({
            ...prevErrors,
            zipCode: '',
            address1: '',
          }));
        },
      }).open();
    };
    document.body.appendChild(script);
  };

  return (
    <Paper elevation={0} sx={{ height: '100vh', width: '100%', mt: '6rem' }}>
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.third?.main || '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMobile ? 'center' : 'flex-start',
          borderRadius: '5px',
        }}>
        <LocalShippingOutlinedIcon sx={{ fontSize: 40, ml: isMobile ? 0 : 2, mr: isMobile ? 0 : 1, color: theme.palette.primary.main }} />
        {!isMobile && (
          <Typography variant="h5" sx={{ mt: 1.5, mb: 1.5, p: 0, minWidth: '50px', whiteSpace: 'nowrap', color: theme.palette.primary.main }}>
            배송지 정보
          </Typography>
        )}
      </Box>

      <Box mt={2}>
        <Box display="flex" alignItems="center" mb={2}>
          <TextField
            label="이름"
            name="title"
            placeholder="이름"
            variant="outlined"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            sx={{ flex: 1 }}
          />
        </Box>

        <Box display="flex" alignItems="center" mb={2}>
          <TextField
            label="우편번호"
            name="zipCode"
            value={shippingInfo.zipCode}
            onChange={handleShippingInfoChange}
            error={!!errors.zipCode}
            helperText={errors.zipCode}
            sx={{ alignItems: 'center' }}
          />
          <Button variant="contained" color="primary" onClick={handlePostcode} sx={{ height: '56px', ml: 2 }}>
            주소찾기
          </Button>
        </Box>

        <Box display="flex" alignItems="center" mb={2}>
          <TextField
            label="주소"
            name="address1"
            placeholder="주소"
            variant="outlined"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            sx={{ flex: 1 }}
          />
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <TextField
            label="상세 주소"
            name="address2"
            placeholder="상세 주소"
            variant="outlined"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            sx={{ flex: 1 }}
          />
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <TextField
            label="전화번호"
            name="phone"
            placeholder="전화번호"
            variant="outlined"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            sx={{ flex: 1 }}
          />
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <TextField
            label="이메일"
            name="email"
            placeholder="email"
            variant="outlined"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            sx={{ flex: 1 }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default AddressForm;
