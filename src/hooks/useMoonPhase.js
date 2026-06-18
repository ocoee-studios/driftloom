export function useMoonPhase() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  
  let c = 0, y = year;
  if (month <= 2) { y -= 1; c = Math.floor(365.25 * y) + Math.floor(30.6001 * (month + 12 + 1)); }
  else { c = Math.floor(365.25 * y) + Math.floor(30.6001 * (month + 1)); }
  const jd = c + day - 694039.09;
  const phase = jd / 29.53058867;
  const age = (phase - Math.floor(phase)) * 29.53;
  
  // Calculate illumination percentage
  const illumination = Math.round(50 * (1 - Math.cos(2 * Math.PI * age / 29.53)));

  const phases = [
    { name: "New Moon", emoji: "🌑", cycle: 0 },
    { name: "Waxing Crescent", emoji: "🌒", cycle: 1 },
    { name: "First Quarter", emoji: "🌓", cycle: 2 },
    { name: "Waxing Gibbous", emoji: "🌔", cycle: 3 },
    { name: "Full Moon", emoji: "🌕", cycle: 4 },
    { name: "Waning Gibbous", emoji: "🌖", cycle: 5 },
    { name: "Last Quarter", emoji: "🌗", cycle: 6 },
    { name: "Waning Crescent", emoji: "🌘", cycle: 7 },
  ];
  
  let idx = 0;
  if (age < 1.85) idx = 0;
  else if (age < 5.53) idx = 1;
  else if (age < 9.22) idx = 2;
  else if (age < 12.91) idx = 3;
  else if (age < 16.61) idx = 4;
  else if (age < 20.30) idx = 5;
  else if (age < 23.99) idx = 6;
  else if (age < 27.68) idx = 7;
  else idx = 0;
  
  return { ...phases[idx], illumination, age: Math.round(age * 10) / 10 };
}
