declare module '@prisma/nextjs-monorepo-workaround-plugin' {
    import type { Plugin } from 'webpack'

    export class PrismaPlugin implements Plugin {
        apply(compiler: any): void
    }
}
