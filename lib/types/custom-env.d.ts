declare module 'custom-env' {

    type environmentType = 'dev' | 'development' | 'prod' | 'production'

    interface env {
        (
            /** Specifies the development name, defaults to dev or development */
            environment: environmentType | (string & {}),
            /** (optional) Specifies the directory to find configuration files defaults to current working directory */
            path?: string,
            /** (optional) Specifies whether to fallback to .env configuration if the specified envname is not found defaults to true */
            defaultEnvFallback?: boolean
        )
    }

    export const env: env
}