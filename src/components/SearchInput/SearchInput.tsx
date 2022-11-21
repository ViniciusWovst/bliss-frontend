import React from 'react';
import styled, {css} from 'styled-components';
import {FaSearch} from 'react-icons/fa';

type InputStyledProps = React.InputHTMLAttributes<HTMLInputElement> & {
  fullWidth?: boolean;
};
const InputStyled = styled.input<InputStyledProps>`
  padding: 6px 7px;
  background-color: transparent;
  border: none;
  width: 200px;
  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  :focus {
    outline: none;
    width: 300px;
  }
  color: currentColor;
  font-weight: bold;
  ::placeholder {
    color: currentColor;
    opacity: 0.42;
  }
  ${(props) =>
    props.fullWidth &&
    css`
      width: 300px;
    `};
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

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement>;
const SearchInput: React.FC<SearchInputProps> = (props) => {
  return (
    <Container>
      <SearchIcon />
      <InputStyled
        type="search"
        {...props}
        fullWidth={props.value !== undefined && props.value !== ''}
      />
    </Container>
  );
};

export default SearchInput;
