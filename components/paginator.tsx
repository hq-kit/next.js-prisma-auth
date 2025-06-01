'use client'
import { Pagination } from '@/components/ui'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

interface PaginateProps {
    current: number
    per_page: number
    total: number
}
export function Paginator({ current = 1, per_page, total }: PaginateProps) {
    const last = Math.ceil(total / per_page)

    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createQuery = React.useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )
    return (
        <div className='flex w-full flex-col-reverse items-center justify-center gap-3 py-3 lg:flex-row lg:justify-between'>
            <div className='text-muted-foreground text-sm'>
                Show {(current - 1) * per_page + 1} - {total < current * per_page ? total : current * per_page} of{' '}
                {total}
            </div>
            <div>
                <Pagination aria-label='Pagination'>
                    <Pagination.Item
                        slot='first'
                        isDisabled={current === 1}
                        href={`${pathname}?${createQuery('page', '1')}`}
                    />
                    <Pagination.Item
                        slot='previous'
                        isDisabled={current === 1}
                        href={`${pathname}?${createQuery('page', Number(current - 1).toString())}`}
                    />
                    {current !== 1 && (
                        <>
                            <Pagination.Item href={`${pathname}?${createQuery('page', '1')}`}>1</Pagination.Item>
                            {current !== 2 && (
                                <>
                                    <Pagination.Item slot='ellipsis' />
                                    <Pagination.Item
                                        href={`${pathname}?${createQuery('page', Number(current - 1).toString())}`}
                                    >
                                        {current - 1}
                                    </Pagination.Item>
                                </>
                            )}
                        </>
                    )}
                    <Pagination.Item isCurrent>{current}</Pagination.Item>
                    {current !== last && (
                        <>
                            {current !== last - 1 && (
                                <>
                                    <Pagination.Item
                                        href={`${pathname}?${createQuery('page', Number(current + 1).toString())}`}
                                    >
                                        {current + 1}
                                    </Pagination.Item>
                                    <Pagination.Item slot='ellipsis' />
                                </>
                            )}
                            <Pagination.Item href={`${pathname}?${createQuery('page', last.toString())}`}>
                                {last}
                            </Pagination.Item>
                        </>
                    )}
                    <Pagination.Item
                        slot='next'
                        isDisabled={current === last}
                        href={`${pathname}?${createQuery('page', Number(current + 1).toString())}`}
                    />
                    <Pagination.Item
                        slot='last'
                        isDisabled={current === last}
                        href={`${pathname}?${createQuery('page', last.toString())}`}
                    />
                </Pagination>
            </div>
        </div>
    )
}
