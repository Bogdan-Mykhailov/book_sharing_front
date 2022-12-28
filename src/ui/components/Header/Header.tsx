import React from 'react';
import { useSignOutMutation } from 'services/auth/auth-API';
import { HOME, LOGIN } from 'utils/constants/routes-path-constants';
import { ModalWindow } from 'ui/components/ModalWindow/ModalWindow';
import { useAppSelector } from 'services/hooks/hooks';
import {
  HeaderTitle,
  LogoWrapper,
  StyledHeader,
  StyledIcon,
  StyledLogoImage,
  StyledParagraph,
  UserInfoWrapper,
} from 'ui/components/Header/Header.styles';
import { useNotificationAndNavigate } from 'utils/hooks/use-notification-and-navigate.hook';
import { useToggleDrawer } from 'utils/hooks/use-toggle-drawer.hook';
import { useSearchFilterHook } from 'utils/hooks/use-search-filter.hook';
import { useNavigate } from 'react-router-dom';
import { StyledInput } from 'ui/common-styles/common.styles';
import outIcon from 'assets/icons/out.svg';
import logo from 'assets/images/logo.png';
import filter from 'assets/icons/filter.svg';

export const Header = () => {
  const navigate = useNavigate();
  const userName = useAppSelector((state) => state.user);
  const isAuthorised = useAppSelector((state) => state.user.isAuthorised);
  const [signOut, { isSuccess, isError, error }] = useSignOutMutation();
  const { toggleDrawer } = useToggleDrawer();
  useNotificationAndNavigate(isSuccess, isError, error, undefined, LOGIN);
  const { title, setTitleHandler } = useSearchFilterHook();

  const logOutHandler = () => {
    signOut();
  };

  const openFiltrationHandler = () => {
    toggleDrawer();
    navigate(HOME);
  };

  const clickLogoHandler = () => {
    navigate(HOME);
  };

  if (!isAuthorised) {
    return (
      <StyledHeader>
        <LogoWrapper onClick={clickLogoHandler}>
          <StyledLogoImage src={logo} alt="books" />
          <HeaderTitle>Book Sharing</HeaderTitle>
        </LogoWrapper>
      </StyledHeader>
    );
  }

  return (
    <StyledHeader>
      <LogoWrapper onClick={clickLogoHandler}>
        <StyledLogoImage src={logo} alt="books" />
        <HeaderTitle>Book Sharing</HeaderTitle>
      </LogoWrapper>
      <StyledInput
        style={{ maxWidth: '400px' }}
        placeholder="Book name"
        type="text"
        onChange={setTitleHandler}
        value={title}
      />
      <StyledIcon src={filter} alt="Book filtration" onClick={openFiltrationHandler} />
      <ModalWindow />

      <UserInfoWrapper>
        <StyledParagraph>{userName.name}</StyledParagraph>
      </UserInfoWrapper>
      <StyledIcon src={outIcon} alt="Log out icon" onClick={logOutHandler} />
    </StyledHeader>
  );
};
