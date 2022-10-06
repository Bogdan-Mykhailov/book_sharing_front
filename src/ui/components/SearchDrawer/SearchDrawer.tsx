import React from 'react';
import { Button, Drawer, Input, Space, Radio, InputNumber } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  gap: 20px;
  font-size: 18px;
`;
const Block = styled.div<{ maxWidth?: string }>`
  text-align: center;
  max-width: ${(props) => props.maxWidth};
`;

interface ISearchDrawer {
  isOpen: boolean;
  onClose: () => void;
}

const style: React.CSSProperties = {
  backgroundColor: '#e9eeef',
  display: 'flex',
  flexDirection: 'column',
};

export const SearchDrawer: React.FC<ISearchDrawer> = ({ isOpen, onClose }) => {
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
          <Button type={'primary'}>Submit</Button>
        </Space>
      }
    >
      <Container>
        <Block>
          <label>Title</label>
          <Input type="text" />
        </Block>
        <Block maxWidth={'400px'}>
          <label>Genre</label>
          <Radio.Group defaultValue={'a'}>
            <Radio.Button value={'a'}>Some</Radio.Button>
            <Radio.Button value={'b'}>Some</Radio.Button>
            <Radio.Button value={'c'}>Some</Radio.Button>
            <Radio.Button value={'c'}>Some</Radio.Button>
            <Radio.Button value={'c'}>Some</Radio.Button>
            <Radio.Button value={'c'}>Some</Radio.Button>
            <Radio.Button value={'c'}>Some</Radio.Button>
            <Radio.Button value={'c'}>Some</Radio.Button>
            <Radio.Button value={'c'}>Some</Radio.Button>
            <Radio.Button value={'c'}>Some</Radio.Button>
            <Radio.Button value={'c'}>Some</Radio.Button>
            <Radio.Button value={'c'}>Some</Radio.Button>
            <Radio.Button value={'c'}>Some</Radio.Button>
            <Radio.Button value={'c'}>Some</Radio.Button>
          </Radio.Group>
        </Block>
        <Block>
          <label>Year</label>
          <InputNumber type="number" />
        </Block>
        <Block>
          <label>Author</label>
          <Input type="text" />
        </Block>
      </Container>
    </Drawer>
  );
};