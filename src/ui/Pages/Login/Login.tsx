import { FORGOT_PASSWORD, REGISTRATION } from 'utils/constants/routes-path-constants';
import { useForm } from 'react-hook-form';
import { useSignInMutation } from 'services/auth/auth-API';
import { Preloader } from 'ui/components/Preloader/Preloader';
import { NewUserWrapper, StyledDiv, StyledLinksWrapper } from 'ui/Pages/Login/Login.styles';
import logo from 'assets/images/logo.png';
import {
  StyledContainer,
  StyledErrorSpanEmail,
  StyledErrorSpanPass,
  StyledForm,
  StyledLogo,
  StyledNavLink,
  StyledSpan,
  StyledTitle,
} from 'ui/common-styles/common.styles';
import { Button } from 'ui/components/Button/Button';
import { ShiftedElement } from 'ui/components/ShiftedElement/ShiftedElement';
import { ControlledInput } from 'ui/components/ControlledInput/ControlledInput';
import { emailRules, passwordRules } from 'utils/use-form/form-constants';

export type LoginFormTypes = {
  email: string;
  password: string;
};

const Login = () => {
  const [signIn, { isLoading }] = useSignInMutation();

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
    <StyledContainer>
      <StyledForm onSubmit={handleSubmit(onSubmit)} style={{ position: 'relative' }}>
        <StyledLogo src={logo} alt="Book Sharing logo" />
        <StyledTitle> Book Sharing </StyledTitle>
        <ControlledInput name="email" control={control} placeholder="Email" rules={emailRules} />
        <ControlledInput name="password" control={control} placeholder="Password" rules={passwordRules} />
        <StyledDiv></StyledDiv>
        <StyledLinksWrapper>
          <NewUserWrapper>
            <StyledSpan>New user?</StyledSpan>
            <StyledNavLink to={REGISTRATION}>Sign up</StyledNavLink>
          </NewUserWrapper>
          <StyledNavLink to={FORGOT_PASSWORD}> Forgot password</StyledNavLink>
        </StyledLinksWrapper>
        <ShiftedElement isShifted={!!errors.email || !!errors.password} initialTop={'65%'} initialLeft={'50px'}>
          <Button disabled={!!errors.email || !!errors.password}>Sign in</Button>
        </ShiftedElement>
      </StyledForm>

      {errors.email && <StyledErrorSpanEmail>{errors.email?.message}</StyledErrorSpanEmail>}
      {errors.password && <StyledErrorSpanPass>{errors.password?.message}</StyledErrorSpanPass>}
      {isLoading && <Preloader left={'25px'} bottom={'25px'} isAbsolute={'absolute'} />}
    </StyledContainer>
  );
};

export default Login;
