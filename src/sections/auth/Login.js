// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material';
// auth
// layouts
import LoginLayout from '../../layouts/login';
//
import AuthLoginForm from './AuthLoginForm';
import AuthWithSocial from './AuthWithSocial';

// ----------------------------------------------------------------------

export default function Login() {

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Sign in</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography>

          <Link variant="subtitle2">Create an account</Link>
        </Stack>
      </Stack>

      <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
      </Alert>

      <AuthLoginForm />

      <AuthWithSocial />
    </LoginLayout>
  );
}
