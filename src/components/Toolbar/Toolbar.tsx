import React from 'react';
import styled from 'styled-components';

const Container = styled.header`
  background-color: var(--primary);
  min-height: 64px;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  color: white;
  align-items: center;
  display: flex;
  font-size: 1.25rem;
  font-weight: 500;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px -1px,
    rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px;
`;

const Content = styled.div`
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  align-items: center;
`;

type ToolbarProps = {
  children?: React.ReactNode;
};
const Toolbar: React.FC<ToolbarProps> = ({children}) => {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
};

export default Toolbar;
