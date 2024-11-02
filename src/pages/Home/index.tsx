import { Play } from "phosphor-react";
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

const cycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Inform the task"),
  minutesAmount: zod
    .number()
    .min(5, "The cycle must have, at least, 5 minutes.")
    .max(60, "The cycle can not exceed 60 minutes."),
});

type NewCycleFormData = zod.infer<typeof cycleFormValidationSchema>;

export default function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(cycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 5,
    },
  });

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data);
    reset();
  }

  const task = watch("task");

  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">I'll be working on</label>
          <TaskInput
            type="text"
            id="task"
            list="taskSuggestion"
            placeholder="Give a name to your project"
            {...register("task")}
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
            defaultValue={5}
            step={5}
            min={5}
            max={60}
            {...register("minutesAmount", { valueAsNumber: true })}
          />

          <span>minutes</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>

          <Separator>:</Separator>

          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
