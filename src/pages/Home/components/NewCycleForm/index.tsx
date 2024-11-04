import { FormContainer, MinutesInput, TaskInput } from "./styles";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CycleContexts";

export default function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);

  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">I'll be working on</label>
      <TaskInput
        type="text"
        id="task"
        list="taskSuggestion"
        placeholder="Give a name to your project"
        {...register("task")}
        disabled={!!activeCycle}
      />

      <datalist id="taskSuggestion">
        <option value="project 1" />
        <option value="project 2" />
        <option value="project 3" />
      </datalist>

      <label htmlFor="minutesAmount">for</label>
      <MinutesInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={0}
        max={60}
        {...register("minutesAmount", { valueAsNumber: true })}
        disabled={!!activeCycle}
      />

      <span>minutes</span>
    </FormContainer>
  );
}
