import React from 'react';
import styled from 'styled-components';
import {FaSearch} from 'react-icons/fa';

const InputStyled = styled.input`
  padding: 6px 0 7px;
  background-color: transparent;
  border: none;
  width: 200px;
  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  :focus {
    outline: none;
  }
  color: currentColor;
  font-weight: bold;
  ::placeholder {
    color: currentColor;
    opacity: 0.42;
  }
  :focus {
    width: 300px;
  }
`;

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  color: white;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled(FaSearch)`
  padding: 10px;
`;

type InputSearchProps = React.InputHTMLAttributes<HTMLInputElement>;
const InputSearch: React.FC<InputSearchProps> = (props) => {
  return (
    <Container>
      <SearchIcon />
      <InputStyled type="search" {...props} />
    </Container>
  );
};

export default InputSearch;
