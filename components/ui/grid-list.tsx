'use client'

import type { ReactNode } from 'react'

import { IconGripVertical } from 'hq-icons'
import type { GridListItemProps, GridListProps as RACGridListProps } from 'react-aria-components'
import {
    Button,
    GridList as RACGridList,
    GridListItem as RACGridListItem,
    composeRenderProps
} from 'react-aria-components'

import { cn } from '@/lib/utils'
import { Checkbox } from './checkbox'

interface GridListProps<T extends object> extends RACGridListProps<T> {
    columns?: 1 | 2 | 3 | 4 | 5 | 6 | 'auto'
    gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

const GridList = <T extends object>({
    children,
    layout,
    className,
    columns = 1,
    gap = 0,
    ...props
}: GridListProps<T>) => (
    <RACGridList
        aria-label={props['aria-label'] ?? 'Grid list'}
        layout={columns === 1 && gap === 0 ? 'stack' : 'grid'}
        className={composeRenderProps(className, (className) =>
            cn(
                'group layout-stack:flex layout-stack:flex-col layout-stack:gap-0 layout-stack:divide-y layout-stack:rounded-lg layout-stack:border-y',
                {
                    'flex grow flex-wrap': columns === 'auto',
                    'grid grid-cols-1': columns === 1,
                    'grid grid-cols-2': columns === 2,
                    'grid grid-cols-3': columns === 3,
                    'grid grid-cols-4': columns === 4,
                    'grid grid-cols-5': columns === 5,
                    'grid grid-cols-6': columns === 6
                },
                {
                    'gap-0': gap === 0,
                    'gap-1': gap === 1,
                    'gap-2': gap === 2,
                    'gap-3': gap === 3,
                    'gap-4': gap === 4,
                    'gap-5': gap === 5,
                    'gap-6': gap === 6
                },
                className
            )
        )}
        {...props}
    >
        {children}
    </RACGridList>
)

const GridListItem = ({ className, children, ...props }: GridListItemProps) => {
    const textValue = typeof children === 'string' ? children : undefined
    return (
        <RACGridListItem
            textValue={textValue}
            {...props}
            className={composeRenderProps(
                className,
                (className, { isHovered, isSelected, isFocusVisible, isDisabled }) =>
                    cn(
                        'flex select-none items-center gap-2 px-3 py-2 text-fg outline-hidden sm:text-sm',
                        'group-layout-grid:rounded-lg group-layout-grid:border',
                        'group-layout-stack:border-x group-layout-stack:last:rounded-b-lg group-layout-stack:first:rounded-t-lg',
                        isHovered && 'bg-primary/10',
                        {
                            'bg-primary/10 text-primary group-layout-grid:border-primary/70 group-layout-stack:border-x-primary/70':
                                isSelected || isFocusVisible
                        },
                        isDisabled && 'text-muted-fg',
                        className
                    )
            )}
        >
            {({ selectionMode, selectionBehavior, allowsDragging, isDragging }) => (
                <>
                    {allowsDragging && (
                        <Button
                            slot='drag'
                            className={cn('cursor-grab text-muted-fg', isDragging && 'cursor-grabbing')}
                        >
                            <IconGripVertical />
                        </Button>
                    )}
                    {selectionMode === 'multiple' && selectionBehavior === 'toggle' && <Checkbox slot='selection' />}
                    {children as ReactNode}
                </>
            )}
        </RACGridListItem>
    )
}

GridList.Item = GridListItem

export { GridList }
