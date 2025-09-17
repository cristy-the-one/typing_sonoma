
export const createParticles = (
  container: HTMLElement, 
  x: number, 
  y: number, 
  type: 'correct' | 'wrong' = 'correct'
) => {
  const colors = type === 'correct' 
    ? ['#ffd700', '#ff6b6b', '#4ecdc4', '#a55eea', '#ffeaa7']
    : ['#ff9a9e', '#fab1a0', '#f0932b'];

  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    const angle = (Math.PI * 2 * i) / 8;
    const velocity = 100 + Math.random() * 100;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    particle.animate(
      [
        { transform: `translate(0, 0) scale(1)`, opacity: 1 },
        { 
          transform: `translate(${vx}px, ${vy}px) scale(0)`, 
          opacity: 0 
        }
      ],
      {
        duration: 800 + Math.random() * 400,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }
    ).onfinish = () => particle.remove();

    container.appendChild(particle);
  }
};
