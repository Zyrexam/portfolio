type Props = {
  count: number;
  className?: string;
};

export default function LeetCodeBadge({ count, className }: Props) {
  return <span className={className}>{count}+</span>;
}
