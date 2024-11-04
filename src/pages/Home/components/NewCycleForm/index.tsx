import React from "react";
import { FormContainer, MinutesInput, TaskInput } from "./styles";

export default function NewCycleForm() {
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
        step={1}
        min={1}
        max={60}
        {...register("minutesAmount", { valueAsNumber: true })}
        disabled={!!activeCycle}
      />

      <span>minutes</span>
    </FormContainer>
  );
}
