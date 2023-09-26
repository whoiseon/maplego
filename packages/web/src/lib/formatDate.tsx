import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import dynamic from 'next/dynamic';

export function formatDate(
  date: Date,
  type: 'small' | 'medium' | 'large' = 'medium',
) {
  const d = new Date(date);
  const now = Date.now();
  const diff = (now - d.getTime()) / 1000; // 현재 시간과의 차이 (초)

  if (type === 'small' && diff < 60) {
    // 1분 미만일 때는 방금 전 출력
    return '방금 전';
  }

  if (type === 'small' && diff < 60 * 60 * 24) {
    // 3일 미만일 때는 시간 차이 출력 ( 몇시간 전, 몇일 전 )
    const days = formatDistanceToNow(d, { addSuffix: true, locale: ko });

    return days.substring(2);
  }

  if (type === 'medium' && diff < 60 * 60 * 12) {
    // 하루 미만 일 때는 시간만 출력
    return format(d, 'p', { locale: ko });
  }

  if (type === 'large') {
    return format(d, 'yyyy-MM-dd HH:mm:ss', { locale: ko });
  }

  return format(d, 'MM-dd', { locale: ko }); // 날짜 포맷
}
