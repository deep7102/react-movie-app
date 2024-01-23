export default function debounce<T extends (...args: unknown[]) => unknown>(
    callback: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null;
  
    return function debounced(this: any, ...args: Parameters<T>) {
      const context = this;
  
      const callLater = () => {
        timeoutId = null;
        callback.apply(context, args);
      };
  
      clearTimeout(timeoutId as unknown as number);
      timeoutId = setTimeout(callLater, wait);
    };
  }
  