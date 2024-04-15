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
  const handleSelectTab = (event: React.SyntheticEvent, tabIdx: number) => {
    setActiveTab(tabIdx);
  };

  return (
    <Layout>
      <div className='account-setting-container ml-8'>
        <div className='mb-2'>
          <Typography
            variant="h3"
          >
            Tùy chọn người dùng
          </Typography>
        </div>
        <Tabs value={activeTab} onChange={handleSelectTab} >
          <Tab sx={{ "&": { minHeight: '56px' } }} icon={<PersonIcon style={{ height: 20 }} />} iconPosition="start" label="Hồ sơ" />
          <Tab sx={{ "&": { minHeight: '56px' } }} icon={<KeyIcon style={{ height: 20 }} />} iconPosition="start" label="Mật khẩu" />
        </Tabs>
        {
          activeTab === ACTIVE_TAB.PERSONAL_INFO
            ? (
              <BasicInformation />
            )
            : null
        }
        {
          activeTab === ACTIVE_TAB.PASSWORD
            ? (
              <ChangePassword />
            )
            : null
        }
      </div>
    </Layout>
  );
};

export default AccountSetting;