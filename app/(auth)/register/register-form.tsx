'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import type { z } from 'zod'

import { Button, Card, Form, Link, Separator, TextField } from '@/components/ui'
import { register } from '@/lib/actions'
import { RegisterSchema } from '@/lib/schema'
import { IconBrandGithub, IconBrandGoogle } from 'hq-icons'

export function RegisterForm() {
    const {
        handleSubmit,
        control,
        formState: { isSubmitting }
    } = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
        const result = await register(data)
        if (result?.errors) {
            control.setError('email', {
                type: 'manual',
                message: result.errors.email
            })
        }
    }
    return (
        <Card>
            <Card.Header title='Register' description='Sign up to your account' />
            <Card.Content>
                <div className='flex gap-2'>
                    <Button variant='outline' className='w-full'>
                        <IconBrandGithub />
                        Register with Github
                    </Button>
                    <Button variant='outline' className='w-full'>
                        <IconBrandGoogle />
                        Register with Google
                    </Button>
                </div>
                <Separator className='my-6'>Or</Separator>
                <Form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                    <Controller
                        name='name'
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                label='Name'
                                {...field}
                                isInvalid={!!fieldState.error}
                                errorMessage={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        name='email'
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                label='Email'
                                {...field}
                                isInvalid={!!fieldState.error}
                                errorMessage={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        name='password'
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                label='Password'
                                type='password'
                                {...field}
                                isInvalid={!!fieldState.error}
                                errorMessage={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        name='confirmPassword'
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                label='Confirm Password'
                                type='password'
                                {...field}
                                isInvalid={!!fieldState.error}
                                errorMessage={fieldState.error?.message}
                            />
                        )}
                    />
                    <Button className='w-full' type='submit' isPending={isSubmitting}>
                        Register
                    </Button>
                </Form>
            </Card.Content>
            <Card.Footer className='justify-center'>
                <Link href='/login'>Already have an account? Login</Link>
            </Card.Footer>
        </Card>
    )
}
