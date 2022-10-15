type LoadScriptOptions = Readonly<
  {
    src: string,
    id?: string
  } & (
    {
      type: 'external'
    } | {
      type: 'inline'
    }
  )
>;

const loadScript = ({ type, src, id }: LoadScriptOptions) => new Promise<void>((resolve, reject) => {
  const script = document.createElement('script');
  const handle = (ev: ErrorEvent | Event) => {
    script.removeEventListener('load', handle);
    script.removeEventListener('error', handle);

    if (ev.type === 'error') {
      reject(ev);
    } else {
      resolve();
    }
  };

  script.addEventListener('load', handle);
  script.addEventListener('error', handle);
  script.async = true;

  if (typeof id !== 'undefined') {
    script.id = id;
  }

  if (type === 'external') {
    script.src = src;
  } else {
    script.innerHTML = src;
  }

  document.head.append(script);
});

export {
  type LoadScriptOptions,
  loadScript
};
