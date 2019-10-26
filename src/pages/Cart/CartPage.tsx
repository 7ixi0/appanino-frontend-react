import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { PageContainer } from '../../components/PageContainer';

export const CartPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer maxWidth="xl">
      <Box my={4}>
        <Typography variant="h4" component="h1">
          {t('page.cart.header')}
        </Typography>
      </Box>
    </PageContainer>
  );
};
