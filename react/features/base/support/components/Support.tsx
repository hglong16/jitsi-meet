import React, { useState } from 'react';
import {
  Typography
} from '@mui/material';
import { Layout } from '../../layouts/dashboard/Layout';

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
            Hotline: 0972787616 (Long)
          </Typography>
        </div>
      </div>
    </Layout>
  );
};

export default AccountSetting;