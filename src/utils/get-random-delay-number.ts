export function getRandomDelayInMinutes(a: number, b: number): number {
  // Lấy số ngẫu nhiên từ a đến b phút, chuyển đổi sang mili giây
  const randomMinutes = Math.floor(Math.random() * (b - a + 1)) + a;
  return randomMinutes * 60 * 1000;
}
