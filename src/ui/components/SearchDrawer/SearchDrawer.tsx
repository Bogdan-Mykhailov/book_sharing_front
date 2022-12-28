import React from 'react';
import { Drawer, Radio, Space } from 'antd';
import {
  Block,
  Container,
  StyledInput,
  StyledInputNumber,
  StyledLabel,
  StyledRadioButton,
  SubmitButton,
} from 'ui/components/SearchDrawer/SearchDrawer.styles';
import { useSearchFilterHook } from 'utils/hooks/use-search-filter.hook';
import { useAllGenreQuery } from 'services/book/book-API';
import { SKIN_COLOR } from 'utils/constants/color-constants';

interface ISearchDrawer {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const style: React.CSSProperties = {
  backgroundColor: `${SKIN_COLOR}`,
  display: 'flex',
  flexDirection: 'column',
};

export const SearchDrawer: React.FC<ISearchDrawer> = ({ isOpen, onClose, onSubmit }) => {
  const { title, author, year, genre, setGenreHandler, setAuthorHandler, setTitleHandler, setYearHandler } =
    useSearchFilterHook();

  const { data: genres } = useAllGenreQuery();

  return (
    <Drawer
      placement="left"
      title="Search for books"
      open={isOpen}
      onClose={onClose}
      drawerStyle={style}
      width="30vw"
      extra={
        <Space>
          <SubmitButton onClick={onSubmit} type={'primary'}>
            Submit
          </SubmitButton>
        </Space>
      }
    >
      <Container>
        <Block>
          <StyledLabel>Title</StyledLabel>
          <StyledInput type="text" onChange={setTitleHandler} value={title?.trim()} />
        </Block>
        <Block maxWidth={'400px'}>
          <StyledLabel>Genre</StyledLabel>
          <Radio.Group onChange={setGenreHandler} value={genre}>
            {genres &&
              genres.map((item) => (
                <StyledRadioButton key={item.id} value={item.id}>
                  {item.name}
                </StyledRadioButton>
              ))}
          </Radio.Group>
        </Block>
        <Block>
          <StyledLabel>Year</StyledLabel>
          <StyledInputNumber onChange={setYearHandler} value={year} />
        </Block>
        <Block>
          <StyledLabel>Author</StyledLabel>
          <StyledInput type="text" onChange={setAuthorHandler} value={author?.trim()} />
        </Block>
      </Container>
    </Drawer>
  );
};
