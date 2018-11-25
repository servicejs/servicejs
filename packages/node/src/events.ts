/**
 * NodeJS events, signals & handlers
 */

export interface SignalsEventMap {
  SIGABRT: NodeJS.SignalsListener;
  SIGALRM: NodeJS.SignalsListener;
  SIGBUS: NodeJS.SignalsListener;
  SIGCHLD: NodeJS.SignalsListener;
  SIGCONT: NodeJS.SignalsListener;
  SIGFPE: NodeJS.SignalsListener;
  SIGHUP: NodeJS.SignalsListener;
  SIGILL: NodeJS.SignalsListener;
  SIGINT: NodeJS.SignalsListener;
  SIGIO: NodeJS.SignalsListener;
  SIGIOT: NodeJS.SignalsListener;
  SIGKILL: NodeJS.SignalsListener;
  SIGPIPE: NodeJS.SignalsListener;
  SIGPOLL: NodeJS.SignalsListener;
  SIGPROF: NodeJS.SignalsListener;
  SIGPWR: NodeJS.SignalsListener;
  SIGQUIT: NodeJS.SignalsListener;
  SIGSEGV: NodeJS.SignalsListener;
  SIGSTKFLT: NodeJS.SignalsListener;
  SIGSTOP: NodeJS.SignalsListener;
  SIGSYS: NodeJS.SignalsListener;
  SIGTERM: NodeJS.SignalsListener;
  SIGTRAP: NodeJS.SignalsListener;
  SIGTSTP: NodeJS.SignalsListener;
  SIGTTIN: NodeJS.SignalsListener;
  SIGTTOU: NodeJS.SignalsListener;
  SIGUNUSED: NodeJS.SignalsListener;
  SIGURG: NodeJS.SignalsListener;
  SIGUSR1: NodeJS.SignalsListener;
  SIGUSR2: NodeJS.SignalsListener;
  SIGVTALRM: NodeJS.SignalsListener;
  SIGWINCH: NodeJS.SignalsListener;
  SIGXCPU: NodeJS.SignalsListener;
  SIGXFSZ: NodeJS.SignalsListener;
  SIGBREAK: NodeJS.SignalsListener;
  SIGLOST: NodeJS.SignalsListener;
  SIGINFO: NodeJS.SignalsListener;
}

export const nodeJsSignals = Object.freeze([
  "SIGABRT",
  "SIGALRM",
  "SIGBUS",
  "SIGCHLD",
  "SIGCONT",
  "SIGFPE",
  "SIGHUP",
  "SIGILL",
  "SIGINT",
  "SIGIO",
  "SIGIOT",
  "SIGKILL",
  "SIGPIPE",
  "SIGPOLL",
  "SIGPROF",
  "SIGPWR",
  "SIGQUIT",
  "SIGSEGV",
  "SIGSTKFLT",
  "SIGSTOP",
  "SIGSYS",
  "SIGTERM",
  "SIGTRAP",
  "SIGTSTP",
  "SIGTTIN",
  "SIGTTOU",
  "SIGUNUSED",
  "SIGURG",
  "SIGUSR1",
  "SIGUSR2",
  "SIGVTALRM",
  "SIGWINCH",
  "SIGXCPU",
  "SIGXFSZ",
  "SIGBREAK",
  "SIGLOST",
  "SIGINFO",
] as NodeJS.Signals[]);

export interface NonSignalProcessEventMap {
  beforeExit: NodeJS.BeforeExitListener;
  disconnect: NodeJS.DisconnectListener;
  exit: NodeJS.ExitListener;
  rejectionHandled: NodeJS.RejectionHandledListener;
  uncaughtException: NodeJS.UncaughtExceptionListener;
  unhandledRejection: NodeJS.UnhandledRejectionListener;
  warning: NodeJS.WarningListener;
  message: NodeJS.MessageListener;
  newListener: NodeJS.NewListenerListener;
  removeListener: NodeJS.RemoveListenerListener;
}

export type NonSignalProcessEvents = keyof NonSignalProcessEventMap;

export const nodeJsNonSignalEvents = Object.freeze([
  "beforeExit",
  "disconnect",
  "exit",
  "rejectionHandled",
  "uncaughtException",
  "unhandledRejection",
  "warning",
  "message",
  "newListener",
  "removeListener",
] as NonSignalProcessEvents[]);

export interface ProcessEventMap
  extends NonSignalProcessEventMap,
    SignalsEventMap {}

export type ProcessEvents = keyof ProcessEventMap;

export const nodeJSProcessEvents = Object.freeze([
  ...nodeJsNonSignalEvents,
  ...nodeJsSignals,
] as ProcessEvents[]);
