import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container, Typography } from '@mui/material';
// components
import { useQuery } from 'react-query';
import { MENU_KEY } from 'src/api/key/auth';
import instance from 'src/api/api';
import { MENU } from 'src/api/end-point/auth';
import { useSettingsContext } from '../components/settings';

// ----------------------------------------------------------------------

export default function PageOne() {
  const { themeStretch } = useSettingsContext();

  const menuQuery = useQuery(
    [MENU_KEY],
    async () => await instance.get(MENU),
    {
    refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: async (res) => {
        console.log(res);
        }
    }
  )

  const test = () => {
    menuQuery.refetch();
  }

  return (
    <>
      <Helmet>
        <title> Page One | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Page One
        </Typography>
        <Button size="large" color="success" variant="contained" onClick={()=> test()}>검색</Button>
      </Container>
    </>
  );
}
