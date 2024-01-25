import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  OutlinedInput,
  SvgIcon,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import { Layout } from '../../layouts/dashboard/Layout';

import PersonIcon from '../../../../../images/skymeet/person.svg';
import KeyIcon from '../../../../../images/skymeet/key.svg';
import BasicInformation from './BasicInformation';
import ChangePassword from './ChangePassword';

type Props = {

};

enum ACTIVE_TAB {
  PERSONAL_INFO,
  PASSWORD,
}

const AccountSetting = (props: Props) => {
  const [activeTab, setActiveTab] = useState(ACTIVE_TAB.PERSONAL_INFO);
  const [showPassword, setShowPassword] = useState(false);
  const handleSelectTab = (event: React.SyntheticEvent, tabIdx: number) => {
    setActiveTab(tabIdx);
  };

  const renderPasswordTab = () => {

  };

  return (
    <Layout>
      <div className='account-setting-container ml-8'>
        <div className='mb-2'>
          <Typography variant="h3">
            Hỗ trợ sự cố
          </Typography>
          <Typography variant='h6' sx={{ color: '#101828' }} className='mt-4'>
            Hotline: 0918839888 (Hoàng)
          </Typography>
        </div>
      </div>
    </Layout>
  );
};

export default AccountSetting;