import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import {FaShareAlt} from 'react-icons/fa';
import Button from '../Button';
import {validateEmail} from '../../utils/validation';
import {shareLink} from '../../api/Share';

const Container = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  open?: boolean;
};
const InputStyled = styled.input<InputProps>`
  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border: none;
  width: 0px;
  margin: 0px;
  padding: 0px;
  border-radius: 4px;

  :focus {
    outline-color: var(--primary);
  }
  ${(props) =>
    props.open &&
    css`
      display: block;
      width: 200px;
      border: 1px solid lightgray;
      padding: 8px;
    `};
`;

type LabelInputProps = React.InputHTMLAttributes<HTMLSpanElement> & {
  open?: boolean;
};
const LabelInput = styled.span<LabelInputProps>`
  display: none;
  ${(props) =>
    props.open &&
    css`
      display: block;
    `};
`;

const InputContainer = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const StyledButton = styled(Button)`
  width: 30px;
  height: 30px;
  min-width: 0px;
  padding: 0px;
`;

type ShareButtonProps = {
  urlToShare: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  onShared?: () => void;
};
const ShareButton: React.FC<ShareButtonProps> = ({
  urlToShare,
  inputProps,
  onShared,
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const handleShareClick = async () => {
    if (open) {
      const shared = await shareLink(inputValue, urlToShare);

      if (shared && onShared) {
        onShared();
      }
    } else setOpen(true);
  };

  return (
    <Container>
      <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
        <LabelInput open={open}> Share your search</LabelInput>
        <InputContainer>
          <InputStyled
            open={open}
            {...inputProps}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <StyledButton
            onClick={handleShareClick}
            disabled={open && !validateEmail(inputValue)}
          >
            <FaShareAlt />
          </StyledButton>
        </InputContainer>
      </div>
    </Container>
  );
};

export default ShareButton;
