import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'

import { Control, FieldPath } from "react-hook-form"
import { authFormSchema } from '@/lib/utils'
import z from 'zod'

const formSchema = authFormSchema('sign-up');

interface CustomInputProps {
    control: Control<z.infer<typeof formSchema>>
    name: FieldPath<z.infer<typeof formSchema>>
    label: string
    placeholder: string
}

const CustomInput = ({ control, name, label, placeholder }: CustomInputProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='form-item'>
                    <FormLabel className='form-label'>{label}</FormLabel>
                    <div className='flex flex-col w-full gap-2'>
                        <FormControl>
                            <Input
                                placeholder={placeholder}
                                type={name === 'password' ? 'password' : 'text'}
                                {...field}
                                className='input-class'
                            />
                        </FormControl>
                        <FormMessage className='form-message' />
                    </div>
                </div>
            )}
        />
    )
}

export default CustomInput
