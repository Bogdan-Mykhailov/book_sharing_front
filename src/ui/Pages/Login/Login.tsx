import React, { FC, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FORGOT_PASSWORD, HOME, REGISTRATION } from 'utils/constants/RoutesPathConstants';
import { Controller, useForm } from 'react-hook-form';
import { Button, Form, Input, notification } from 'antd';
import { emailRegExp } from 'utils/constants/regExp';
import { useSignInMutation } from 'dal/auth/authAPI';
import Preloader from '../../components/Preloader/Preloader';
import { signInUser } from '../../../bll/user-slice';
import { useAppDispatch } from '../../../hooks/hooks';

const StyledLoginContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLoginForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  border: 1px solid gray;
  border-radius: 2px;
  width: 250px;
  height: 300px;
`;

const StyledInput = styled(Input)`
  max-width: 200px;
  margin-bottom: 8px;
`;

const StyledInputPassword = styled(Input.Password)`
  width: 200px;
`;

const StyledButton = styled(Button)`
  width: 200px;
  margin: 8px 0;
  color: gray;
`;

const StyledLinksWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledErrorSpanEmail = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 50px;
  font-family: Arial, 'sans-serif';
  color: #ff5f5d;
  font-size: 20px;
`;

const StyledErrorSpanPass = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 25px;
  font-family: Arial, 'sans-serif';
  color: #ff5f5d;
  font-size: 20px;
`;

type LoginFormTypes = {
  email: string;
  password: string;
};

type NotificationType = 'success' | 'error';

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signIn, { error, isLoading, isSuccess, isError, data: response }] = useSignInMutation();

  useEffect(() => {
    if (isError) {
      openLoginNotification('error', error);
    }
    if (isSuccess && response) {
      dispatch(signInUser(response));
      openLoginNotification('success');
      navigate(HOME);
    }
  }, [isError, isSuccess]);

  const openLoginNotification = (type: NotificationType, error?: any) => {
    notification[type]({
      message: `${type === 'success' ? 'Success' : 'Error'}`,
      description: `${type === 'success' ? '' : error.data?.message}`,
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormTypes>();
  const onSubmit = (data: LoginFormTypes) => {
    const { email, password } = data;
    signIn({ email, password });
  };

  return (
    <StyledLoginContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledLoginForm>
          <Controller
            render={({ field }) => <StyledInput {...field} placeholder="Email" />}
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: { message: 'Email is required', value: true },
              pattern: { message: 'Email is not correct', value: emailRegExp },
            }}
          />
          <Controller
            render={({ field }) => <StyledInputPassword {...field} placeholder="Password" />}
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: { message: 'Password is required', value: true },
              minLength: { message: 'Password should be more then 8 char', value: 8 },
            }}
          />

          <Form.Item>
            <StyledButton htmlType="submit">Sign in</StyledButton>
          </Form.Item>
          <StyledLinksWrapper>
            <div>
              <span>New user?</span>
              <NavLink to={REGISTRATION}>Sign up</NavLink>
            </div>
            <NavLink to={FORGOT_PASSWORD}> Forgot password</NavLink>
          </StyledLinksWrapper>
        </StyledLoginForm>
      </form>

      {errors.email && <StyledErrorSpanEmail>{errors.email?.message}</StyledErrorSpanEmail>}
      {errors.password && <StyledErrorSpanPass>{errors.password?.message}</StyledErrorSpanPass>}
      {isLoading && <Preloader />}
    </StyledLoginContainer>
  );
};

export default Login;