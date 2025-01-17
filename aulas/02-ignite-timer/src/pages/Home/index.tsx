import {
    useContext,
} from "react";
import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';

import {
    HomeContainer,
    StartCountDownButton,
    StopCountDownButton
} from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { CyclesContext } from "../../contexts/CyclesContext";

export function Home() {
    const { createNewCycle, interruptCurrentCycle, activeCycle } = useContext(CyclesContext);

    const newCycleFormValidationSchema = zod.object({
        task: zod.string().min(1, 'Informe a tarefa'),
        minutesAmount: zod
            .number()
            .min(1, 'O cliclo precisa ser no mínimo de 5 minutos')
            .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
    })

    type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    const { handleSubmit, watch, reset } = newCycleForm;

    function handleCreateNewCycle(data: NewCycleFormData){
        createNewCycle(data);
        reset();
    }

    const isTaskFieldEmpty = !watch('task');

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />

                {
                    activeCycle ? (
                        <StopCountDownButton onClick={interruptCurrentCycle} type="button">
                            <HandPalm size={24} />
                            Interromper
                        </StopCountDownButton>
                    ) : (
                        <StartCountDownButton disabled={isTaskFieldEmpty} type="submit">
                            <Play size={24} />
                            Comerçar
                        </StartCountDownButton>
                    )
                }
            </form>
        </HomeContainer>
    );
}