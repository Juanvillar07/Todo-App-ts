
export const TODO_FILTERS = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed'
} as const


export const FILTERS_BUTTONS = {
    [TODO_FILTERS.ALL]: {
        literal: 'Todos',
        href: `/?{TODO_FILTERS.ALL}`
    },
    [TODO_FILTERS.ACTIVE]: {
        literal: 'Activos',
        href: `/?{TODO_FILTERS.ACTIVE}`
    },
    [TODO_FILTERS.COMPLETED]: {
        literal: 'Completados',
        href: `/?{TODO_FILTERS.COMPLETED}`
    }
} as const


