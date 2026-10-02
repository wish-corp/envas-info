const MS_PER_HOUR = 60 * 60 * 1000;
const JST_OFFSET_HOURS = 9;
const JST_OFFSET_MS = JST_OFFSET_HOURS * MS_PER_HOUR;
const JST_OFFSET_SUFFIX = '+09:00';
const TWO_DIGITS = 2;

// ローカル時刻系のメソッドはビルド環境の TZ（CI は UTC）に左右されるので、JST の壁時計を UTC として読む
function toJstParts(date: Date) {
  const jst = new Date(date.getTime() + JST_OFFSET_MS);
  const pad = (value: number) => String(value).padStart(TWO_DIGITS, '0');
  return {
    year: String(jst.getUTCFullYear()),
    month: pad(jst.getUTCMonth() + 1),
    day: pad(jst.getUTCDate()),
    hour: pad(jst.getUTCHours()),
    minute: pad(jst.getUTCMinutes()),
    second: pad(jst.getUTCSeconds()),
  };
}

export function formatDate(date: Date): string {
  const p = toJstParts(date);
  return `${p.year}.${p.month}.${p.day}`;
}

export function formatTime(date: Date): string {
  const p = toJstParts(date);
  return `${p.hour}:${p.minute}`;
}

export function toIsoJst(date: Date): string {
  const p = toJstParts(date);
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}${JST_OFFSET_SUFFIX}`;
}

export function jstYear(date: Date): number {
  return Number(toJstParts(date).year);
}
