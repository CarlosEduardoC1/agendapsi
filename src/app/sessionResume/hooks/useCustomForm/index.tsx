import { useCallback, useEffect } from "react";
import { UseCustomForm } from "./@types";
import { Controller, useForm } from "react-hook-form";
import { FormControl, Switch } from "native-base";
import { useFetch } from "../useFetch";

export const useCustomForm = ({ sessionData }: any): UseCustomForm => {
    const { onUpdateSession } = useFetch();
    const { control, watch, reset, } = useForm<any>({
        defaultValues: {
            payed: false,
            executed: false
        }
    });

    const data = watch();

    useEffect(() => {
        if (sessionData !== null || sessionData !== undefined) {
            reset({
                payed: Number(sessionData?.payed) !== 0 ? true : false,
                executed: Number(sessionData?.executed) !== 0 ? true : false
            });
        }

    }, [sessionData]);

    const renderForm = useCallback(() => {
        return (
            <>
                <Controller
                    control={control}
                    name="executed"
                    render={({ field }) => (
                        <FormControl
                            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <FormControl.Label>Compareceu?</FormControl.Label>
                            <Switch
                                {...field}
                                onTrackColor={"red.500"}
                                isChecked={Boolean(field.value)}
                                onToggle={ev => { field.onChange(ev); onUpdateSession({ ...data, id: sessionData.id }) }} />
                        </FormControl>
                    )
                    }
                />
                <Controller
                    control={control}
                    name="payed"
                    render={({ field }) => (
                        <FormControl
                            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <FormControl.Label>Pagou?</FormControl.Label>
                            <Switch
                                {...field}
                                onTrackColor={"red.500"}
                                isChecked={Boolean(field.value)}
                                onToggle={ev => { field.onChange(ev); onUpdateSession({ ...data, id: sessionData.id }) }} />
                        </FormControl>
                    )}
                />
            </>
        )
    }, [sessionData]);

    return {
        renderForm
    }
}