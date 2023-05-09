export interface HelpHandlerInterface {
    handleHelp: () => Promise<string|null>
}
