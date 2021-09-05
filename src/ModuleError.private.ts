export class ModuleError extends Error {

    public readonly code?: string;

    public readonly data?: unknown;

    public constructor(
        {code, message = code, data}: {
            code: string,
            message?: string,
            data?: unknown,
        },
    ) {
        super(message);
        this.code = code;
        this.data = data;
    }
}
