interface PostConstructServiceLifecycle {
  postConstruct(): Promise<void>;
}

interface PreDestroyServiceLifecycle {
  preDestroy(): Promise<void>;
}

interface Cleanup {}
