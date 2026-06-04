'use client';

interface Props {
  onClick: () => void;
  className?: string;
  visible?: boolean;
}

const DOT_VALUES = [2, 1, 0, 1, 2];

export default function ScrollArrow({ onClick, className, visible }: Props) {
  const visClass = visible === false ? '' : visible === true ? ' scroll-arrow--visible' : '';
  return (
    <button className={`scroll-arrow${visClass}${className ? ` ${className}` : ''}`} onClick={onClick} aria-label="Scroll to content">
      {[3, 2, 1, 0].map((parentIdx) => (
        <span
          key={parentIdx}
          className="scroll-arrow-icon"
          style={{ '--sa-parent': parentIdx } as React.CSSProperties}
        >
          {DOT_VALUES.map((val, i) => (
            <span
              key={i}
              className="scroll-arrow-dot"
              style={{ '--sa-idx': val } as React.CSSProperties}
            />
          ))}
        </span>
      ))}
    </button>
  );
}
