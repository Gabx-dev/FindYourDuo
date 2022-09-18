export function convertTimeStringToMinutes(timeString: string): number {
  const [hours, minutes] = timeString.split(':').map((v) => parseInt(v));

  return hours * 60 + minutes;
}

export function convertMinutesToTimeString(minutesAmmount:number): string {
  const minutes = minutesAmmount % 60;
  const hours = (minutesAmmount - minutes) / 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}