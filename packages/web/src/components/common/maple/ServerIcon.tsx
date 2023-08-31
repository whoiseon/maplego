import Image from 'next/image';

interface Props {
  code: number;
  size?: number;
}

function ServerIcon({ code, size = 14 }: Props) {
  return (
    <Image
      src={`/images/server/${code}.png`}
      width={size}
      height={size}
      alt={`server-icon-${code}`}
    />
  );
}

export default ServerIcon;
