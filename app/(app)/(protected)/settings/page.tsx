'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import type z from 'zod'

import { Button, Card, Container, Form, TextField, toast } from '@/components/ui'
import { updatePassword } from '@/lib/actions'
import { UpdatePasswordSchema } from '@/lib/schema'

export default function PasswordForm() {
    const {
        handleSubmit,
        control,
        reset,
        formState: { isSubmitting }
    } = useForm<z.infer<typeof UpdatePasswordSchema>>({
        resolver: zodResolver(UpdatePasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            newPasswordConfirm: ''
        }
    })

    const onSubmit = async (data: z.infer<typeof UpdatePasswordSchema>) => {
        const result = await updatePassword(data)
        if (result?.errors) {
            control.setError('currentPassword', {
                type: 'manual',
                message: result.errors.password
            })
        }
        if (result?.success) {
            toast.success(result.message)
            reset()
        }
    }

    return (
        <Container className='py-6'>
            <Card>
                <Card.Header title='Password' description='Secure your account' />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Card.Content className='space-y-4'>
                        <Controller
                            name='currentPassword'
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    label='Current Password'
                                    type='password'
                                    isInvalid={!!fieldState.error}
                                    errorMessage={fieldState.error?.message}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name='newPassword'
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    label='New Password'
                                    type='password'
                                    isInvalid={!!fieldState.error}
                                    errorMessage={fieldState.error?.message}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name='newPasswordConfirm'
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    label='Confirm New Password'
                                    type='password'
                                    isInvalid={!!fieldState.error}
                                    errorMessage={fieldState.error?.message}
                                    {...field}
                                />
                            )}
                        />
                    </Card.Content>
                    <Card.Footer>
                        <Button type='submit' isPending={isSubmitting}>
                            Save
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        </Container>
    )
}
