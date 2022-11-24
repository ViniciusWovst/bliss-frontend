import React, {useState} from 'react';
import SearchInput from '../../../components/SearchInput/SearchInput';
import {debounce} from 'lodash';
import {useFetchQuestionsSearch} from '../../../queries/useQuestionsQuery';
import styled from 'styled-components';
import {FaTimes} from 'react-icons/fa';

import ShareButton from '../../../components/ShareButton';
import {useNavigate} from 'react-router-dom';

const DEBOUNCE_TIME = 1000;

const ResultContainer = styled.div`
  background-color: white;
  top: 100%;
  position: absolute;
  color: black;
  border-radius: 4px;
  padding: 16px;
  border: 1px solid lightgray;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
`;

const QuestionResultItem = styled.div`
  border-bottom: 1px solid #e8e8e8;
  padding: 10px;
  cursor: pointer;
  padding-bottom: 10px;
  :last-child {
    border-bottom: none;
  }
  :hover {
    background-color: #f6f6f6;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const CloseIcon = styled(FaTimes)`
  border-radius: 100px;
  padding: 5px;
  :hover {
    background-color: #c6c6c6;
  }
`;

type QuestionSearchProps = {value?: string; 'data-testid'?: string};
const QuestionSearch: React.FC<QuestionSearchProps> = ({
  value = '',
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [searchValue, setSearchValue] = useState(value);

  const {data: QuestionsData} = useFetchQuestionsSearch(searchValue, {
    enabled: searchValue !== '',
  });

  const updateUrl = (url: string) => {
    const updatedUrl = url === '' ? '' : '?filter=' + url;
    window.history.replaceState(
      null,
      '',
      window.location.pathname + updatedUrl,
    );
  };

  const clearSearch = () => {
    setInputValue('');
    setSearchValue('');
    updateUrl('');
  };

  const debouncedSearch = React.useRef(
    debounce((text) => {
      setSearchValue(text);
      updateUrl(text);
    }, DEBOUNCE_TIME),
  ).current;

  const navigate = useNavigate();

  return (
    <div>
      <SearchInput
        placeholder="Search..."
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
          debouncedSearch(event.target.value);
        }}
        {...props}
      />
      {QuestionsData && searchValue && (
        <ResultContainer data-testid="questionSearchContainer">
          <HeaderContainer>
            Search
            <CloseButtonContainer
              data-testid="questionSearchCloseButton"
              onClick={() => {
                clearSearch();
              }}
            >
              <CloseIcon />
            </CloseButtonContainer>
          </HeaderContainer>
          <ShareButton
            inputProps={{placeholder: 'email@example.com'}}
            urlToShare={window.location.href}
          />

          {QuestionsData?.map((question, index) => {
            return (
              <QuestionResultItem
                key={index}
                onClick={() => {
                  clearSearch();
                  navigate(`/questions/${question.id}`);
                }}
              >
                {question.question}
              </QuestionResultItem>
            );
          })}
        </ResultContainer>
      )}
    </div>
  );
};

export default QuestionSearch;
