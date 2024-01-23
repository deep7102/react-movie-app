export default function formatDuration(inputSeconds: string): string {
  const seconds = Number(inputSeconds);
  if (Number.isNaN(seconds)) {
    throw new Error('Invalid input: Please provide a valid number of seconds.');
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.ceil((seconds % 3600) / 60);
  return `${hours}hr ${minutes}min`;
}
