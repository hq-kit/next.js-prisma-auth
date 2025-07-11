'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import type { z } from 'zod'

import { Button, Card, Form, Link, Separator, TextField } from '@/components/ui'
import { login } from '@/lib/actions'
import { LoginSchema } from '@/lib/schema'
import { IconBrandGithub, IconBrandGoogle } from 'hq-icons'

export function LoginForm() {
    const {
        handleSubmit,
        control,
        formState: { isSubmitting }
    } = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
        const result = await login(data)
        if (result?.errors) {
            control.setError('email', {
                type: 'manual',
                message: result.errors.email
            })
        }
    }
    return (
        <Card>
            <Card.Header title='Login' description='Sign in to your account' />
            <Card.Content>
                <div className='flex gap-2'>
                    <Button variant='outline' className='w-full'>
                        <IconBrandGithub />
                        Login with Github
                    </Button>
                    <Button variant='outline' className='w-full'>
                        <IconBrandGoogle />
                        Login with Google
                    </Button>
                </div>
                <Separator className='my-6'>Or</Separator>
                <Form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
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
                                isInvalid={!!fieldState.error}
                                errorMessage={fieldState.error?.message}
                                {...field}
                            />
                        )}
                    />
                    <Button className='w-full' type='submit' isPending={isSubmitting}>
                        Login
                    </Button>
                </Form>
            </Card.Content>
            <Card.Footer className='flex-col justify-center lg:flex-col'>
                <Link href='/register'>Don't have an account? Register</Link>
            </Card.Footer>
        </Card>
    )
}
