export type OpenInNewProps = {
  width?: number,
  height?: number,
  color?: string
};

export default function OpenInNew({
  width,
  height,
  color = "#000"
}: OpenInNewProps) {
  return (
    <svg
      style={{ verticalAlign: "middle" }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="10 10 32 32"
      width={width}
      height={height}
    >
      <defs>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .a, .b {
                fill: none;
              }

              .b{
                stroke: ${color};
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width:2px;
              }
            `
          }}
        />
      </defs>
      <title>open-in-new</title>
      <rect className="a" width="48" height="48" />
      <polyline className="b" points="27 12 36 12 36 21" />
      <polyline className="b" points="32 26 32 34 14 34 14 16 22 16" />
      <line className="b" x1="24" y1="24" x2="35" y2="13" />
    </svg>
  );
}
