export abstract class CreateSpecificEndpointWithBase {
    abstract readonly baseEndpoint: string
    protected createSpecificEndpoint(specificEndpointPart: string) : string {
        return `${this.baseEndpoint}${specificEndpointPart}`
    }
}