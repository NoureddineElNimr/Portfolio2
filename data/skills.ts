// FIX #12: skills array moved outside the component into its own data file
// so it is not recreated on every render

export interface Skill {
  id: string;
  name: string;
  icon: string;
  color: string;
  categories: string[];
  bubble: {
    left: string;
    top: string;
    duration: number;
    delay: number;
  };
}

export const skills: Skill[] = [
  { id: 'dotnet',      name: '.NET',            icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/dotnet.svg',      color: '#6C2DA8', categories: ['Programming'],            bubble: { left: '15%', top: '20%', duration: 9,    delay: 0   } },
  { id: 'csharp',      name: 'C#',              icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/csharp.svg',      color: '#C2C9E4', categories: ['Programming'],            bubble: { left: '34%', top: '43%', duration: 10,   delay: 0.8 } },
  { id: 'python',      name: 'Python',          icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/python.svg',      color: '#3776AB', categories: ['Programming'],            bubble: { left: '53%', top: '66%', duration: 11,   delay: 1.6 } },
  { id: 'react',       name: 'React',           icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/react.svg',       color: '#61DAFB', categories: ['Programming', 'Tools'],  bubble: { left: '72%', top: '29%', duration: 9.5,  delay: 0.4 } },
  { id: 'html5',       name: 'HTML5',           icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/html5.svg',       color: '#E34F26', categories: ['Programming'],            bubble: { left: '84%', top: '33%', duration: 12,   delay: 1.2 } },
  { id: 'php',         name: 'PHP',             icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/php.svg',         color: '#777BB4', categories: ['Programming'],            bubble: { left: '78%', top: '61%', duration: 11.5, delay: 0.6 } },
  { id: 'java',        name: 'Java',            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',        color: '#007396', categories: ['Programming'],            bubble: { left: '21%', top: '52%', duration: 10.5, delay: 0.9 } },
  { id: 'mysql',       name: 'MySQL',           icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/mysql.svg',       color: '#00758F', categories: ['Tools', 'Programming'],  bubble: { left: '33%', top: '56%', duration: 12.5, delay: 0.2 } },
  { id: 'git',         name: 'Git',             icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/git.svg',         color: '#F05032', categories: ['Tools'],                 bubble: { left: '46%', top: '47%', duration: 9.8,  delay: 1.9 } },
  { id: 'flutter',     name: 'Flutter',         icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/flutter.svg',     color: '#02569B', categories: ['Tools'],                 bubble: { left: '40%', top: '75%', duration: 11.8, delay: 2.4 } },
  { id: 'soft-social', name: 'Social',          icon: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f465.png', color: '#2D6A8F', categories: ['Social'], bubble: { left: '20%', top: '18%', duration: 10,   delay: 0.2 } },
  { id: 'soft-team',   name: 'Team-driven',     icon: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f91d.png', color: '#2B7A6B', categories: ['Social'], bubble: { left: '50%', top: '12%', duration: 11,   delay: 0.8 } },
  { id: 'soft-stress', name: 'Good under stress', icon: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4aa.png', color: '#6A3D9A', categories: ['Social'], bubble: { left: '80%', top: '20%', duration: 10.5, delay: 0.4 } },
];