import styled from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 3.5rem;
  }
`;

export const BaseCountdownButton = styled.button`
  width: 100%;

  border: none;
  border-radius: 8px;

  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;

  font-weight: bold;

  cursor: pointer;

  transition: all 0.25s;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  color: ${(props) => props.theme["gray-100"]};
`;

export const StopCountdownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme["red-500"]};

  &:not(:disabled):hover {
    background: ${(props) => props.theme["red-700"]};
    transition: all 0.25s;
  }
`;
export const StartCountdownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme["green-500"]};

  &:not(:disabled):hover {
    background: ${(props) => props.theme["green-700"]};
    transition: all 0.25s;
  }
`;
