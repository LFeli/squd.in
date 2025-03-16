import 'fastify'

/**
 *  This is a declaration merging, which is a TypeScript feature that allows you to extend the types of an existing module. In this case is merging the FastifyRequest interface with a new methods.
 */
declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUserId(): Promise<string>
  }
}
