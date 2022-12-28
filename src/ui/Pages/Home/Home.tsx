import React from 'react';
import BookItem from 'ui/components/BookItem/BookItem';
import { useNavigate } from 'react-router-dom';
import { SearchDrawer } from 'ui/components/SearchDrawer/SearchDrawer';
import { useToggleDrawer } from 'utils/hooks/use-toggle-drawer.hook';
import { useQueryString } from 'utils/hooks/use-query-string.hook';
import { StyledContainer } from 'ui/common-styles/common.styles';
import { Container } from 'ui/Pages/Home/Home.styles';
import { BOOK } from 'utils/constants/routes-path-constants';

export const Home = () => {
  const { data, refetch } = useQueryString();
  const { drawer, toggleDrawer } = useToggleDrawer();
  const navigate = useNavigate();

  const onClickHandler = (id: number) => {
    navigate(`${BOOK}/${id}`);
  };

  return (
    <StyledContainer>
      <Container>
        <SearchDrawer
          isOpen={drawer}
          onClose={toggleDrawer}
          onSubmit={() => {
            refetch();
          }}
        />
        {data?.length
          ? data.map((book) => {
              return <BookItem onClick={onClickHandler} {...book} key={book.poster.id} posterUrl={book.poster.url} />;
            })
          : ''}
      </Container>
    </StyledContainer>
  );
};
