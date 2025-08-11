import { useState } from 'react';
import styled from '@emotion/styled';

const CouriersTabSwitcherStyled = styled.div`
  display: flex;
  background: #292929;
  border-radius: 15px;
  justify-content: space-between;
`;

const CouriersTabSwitcherButton = styled.button<{ $isActive: boolean }>`
  background: ${({ $isActive }) => ($isActive ? '#E8E8E8' : 'transparent')};
  color: ${({ $isActive }) => ($isActive ? 'black' : 'white')};
  border-radius: 12px;
  font-size: 24px;
  font-weight: 500;
  line-height: 29.26px;
  outline: none;
  border: none;
  width: 309px;
  height: 63px;
  text-align: center;
  margin: 4px 0;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export function CouriersTabSwitcher() {
  const [isBring, setIsBring] = useState(true);

  return (
    <CouriersTabSwitcherStyled>
      <CouriersTabSwitcherButton
        $isActive={isBring}
        onClick={() => setIsBring(true)}
      >
        Привез
      </CouriersTabSwitcherButton>
      <CouriersTabSwitcherButton
        $isActive={!isBring}
        onClick={() => setIsBring(false)}
      >
        Отвез
      </CouriersTabSwitcherButton>
    </CouriersTabSwitcherStyled>
  );
}
