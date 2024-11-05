import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import { CyclesReducer, ICycle } from "../reducers/cycles/reducer";
import {
  addNewCycleAction,
  completeCurrentCycleAction,
  interruptCurrentCycleAction,
} from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface IContextFormData {
  task: string;
  minutesAmount: number;
}

interface ICyclesContext {
  cycles: ICycle[];
  activeCycle: ICycle | undefined;
  secondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSeconds: (seconds: number) => void;
  interruptCurrentCycle: () => void;
  createNewCycle: (data: IContextFormData) => void;
}

interface IProvider {
  children: ReactNode;
}

export const CyclesContext = createContext({} as ICyclesContext);

export default function CycleContextProvider({ children }: IProvider) {
  const [cyclesState, dispatch] = useReducer(
    CyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedJson = localStorage.getItem("@react-pomodoro:cycles-state");

      if (storedJson) {
        return JSON.parse(storedJson);
      }

      return initialState;
    }
  );

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [secondsPassed, setSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }

    return 0;
  });

  function setSeconds(seconds: number) {
    setSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch(completeCurrentCycleAction());
  }

  function createNewCycle(data: IContextFormData) {
    const newCycle: ICycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));
    setSecondsPassed(0);
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction());
  }

  useEffect(() => {
    const stateJson = JSON.stringify(cyclesState);

    localStorage.setItem("@react-pomodoro:cycles-state", stateJson);
  }, [cyclesState]);

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        markCurrentCycleAsFinished,
        secondsPassed,
        setSeconds,
        createNewCycle,
        interruptCurrentCycle,
        cycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
