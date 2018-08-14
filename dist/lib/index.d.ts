/**
 *
 * Simple Fork
 * @desc take in a script path and setup a fork that can call a method
 * once a forked process has been created
 *
 */
export declare class SimpleFork {
    private _path;
    private _fnName;
    private _call;
    private _forkedProcess;
    constructor(processPath: string);
    /**
     *
     * Fork
     * @desc store the function name that we want to execute in a forked process
     * and setup a fork that will be executed by the caller later
     *
     */
    fork(fnName: string, ...args: any[]): Function;
    /**
     *
     * End
     * @desc stop the fork process
     *
     */
    end(): void;
    /**
     *
     * Setup
     * @desc return a function for the caller to call to call a method within
     * the forked process. Start the child process and send the call information
     * needed to run the method when called
     *
     */
    private setup;
    /**
     *
     * Send
     * @desc send the call data to the child forked process
     *
     */
    private send;
    /**
     *
     * Start Child
     * @desc instantiate a forked process via a wrapper around the fork call
     *
     */
    private startChild;
    /**
     *
     * Stop Child
     * @desc send a die command to the forked process and send a kill signal
     * as well if that is not processed
     *
     */
    private stopChild;
    /**
     *
     * Receive
     * @desc receive any data sent from the caller and apply it to the
     * callback function
     *
     */
    private receive;
    private exit;
}
