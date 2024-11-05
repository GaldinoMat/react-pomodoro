import { produce } from "immer";
import { ActionTypes } from "./actions";

interface CyclesState {
  cycles: ICycle[];
  activeCycleId: string | null;
}

export interface ICycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export function CyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id;
      });
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      const currentInterruptedCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      );

      if (currentInterruptedCycleIndex < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentInterruptedCycleIndex].interruptedDate = new Date();
      });
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      const currentFinishedCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      );

      if (currentFinishedCycleIndex < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentFinishedCycleIndex].finishedDate = new Date();
      });
    default:
      return state;
  }
}
