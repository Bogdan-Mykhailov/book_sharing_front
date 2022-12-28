import React from 'react';
import { useForm } from 'react-hook-form';
import { LOGIN } from 'utils/constants/routes-path-constants';
import { useSignUpMutation } from 'services/auth/auth-API';
import { Preloader } from 'ui/components/Preloader/Preloader';
import {
  StyledButton,
  StyledContainer,
  StyledErrorSpanConfirmPass,
  StyledErrorSpanEmail,
  StyledErrorSpanPass,
  StyledForm,
  StyledLogo,
  StyledNavLink,
  StyledSpan,
  StyledTitle,
} from 'ui/common-styles/common.styles';
import logo from 'assets/images/logo.png';
import { useNotificationAndNavigate } from 'utils/hooks/use-notification-and-navigate.hook';
import { DO_NOT_MATCH_PASSWORD, REQUIRED_NAME } from 'utils/constants/error-conatants';
import { ControlledInput } from 'ui/components/ControlledInput/ControlledInput';
import { emailRules, passwordRules } from 'utils/use-form/form-constants';

type RegistrationTypes = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export const Registration = () => {
  const [signUp, { error, isLoading, isSuccess, isError }] = useSignUpMutation();

  useNotificationAndNavigate(isSuccess, isError, error, undefined, LOGIN);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationTypes>();

  const onSubmit = (data: RegistrationTypes) => {
    const { name, email, password } = data;
    signUp({ name, email, password });
  };

  return (
    <StyledContainer>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledLogo src={logo} alt="Book Sharing logo" />
        <StyledTitle> Book Sharing </StyledTitle>

        <ControlledInput
          name="name"
          placeholder="User name"
          control={control}
          rules={{
            required: { message: REQUIRED_NAME, value: true },
          }}
        />

        <ControlledInput name="email" control={control} placeholder="Email" rules={emailRules} />

        <ControlledInput name="password" control={control} placeholder="Password" rules={passwordRules} />

        <ControlledInput
          name="confirmPassword"
          control={control}
          placeholder="Confirm password"
          rules={{
            validate: (value: string) => {
              if (watch('password') !== value) {
                return DO_NOT_MATCH_PASSWORD;
              }
            },
          }}
        />

        <StyledButton htmlType="submit">Sign up</StyledButton>
        <div>
          <StyledSpan>Already have an account?</StyledSpan>
          <StyledNavLink to={LOGIN}>Login</StyledNavLink>
        </div>
      </StyledForm>

      {errors.email && <StyledErrorSpanEmail>{errors.email?.message}</StyledErrorSpanEmail>}
      {errors.password && <StyledErrorSpanPass>{errors.password?.message}</StyledErrorSpanPass>}
      {errors.confirmPassword && (
        <StyledErrorSpanConfirmPass>{errors.confirmPassword?.message}</StyledErrorSpanConfirmPass>
      )}
      {isLoading && <Preloader isAbsolute={'absolute'} bottom={'25px'} left={'25px'} />}
    </StyledContainer>
  );
};
