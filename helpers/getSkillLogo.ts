import { Colors } from '../themes';
import { IconType } from 'react-icons';
import {
  SiAndroid,
  SiAngular,
  SiBootstrap,
  SiCss,
  SiDart,
  SiDjango,
  SiDocker,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiFlask,
  SiFlutter,
  SiGit,
  SiGithub,
  SiGitlab,
  SiGo,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiJquery,
  SiKotlin,
  SiKubernetes,
  SiLaravel,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiNuxt,
  SiOpenjdk,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedis,
  SiRedux,
  SiRust,
  SiSass,
  SiSpring,
  SiSqlite,
  SiSupabase,
  SiSvelte,
  SiSwift,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVuedotjs,
} from 'react-icons/si';

interface ISkillLogo {
  Icon: IconType;
  color: string;
  scale: number;
}

type ISkillLogoEntry = Omit<ISkillLogo, 'scale'> &
  Partial<Pick<ISkillLogo, 'scale'>>;

const SKILL_LOGOS: Record<string, ISkillLogoEntry> = {
  html: { Icon: SiHtml5, color: '#E34F26' },
  css: { Icon: SiCss, color: '#1572B6' },
  sass: { Icon: SiSass, color: '#CC6699' },
  javascript: { Icon: SiJavascript, color: '#E8C200' },
  typescript: { Icon: SiTypescript, color: '#3178C6' },
  react: { Icon: SiReact, color: '#00A8D4' },
  nextjs: { Icon: SiNextdotjs, color: Colors.dark },
  vue: { Icon: SiVuedotjs, color: '#42B883' },
  nuxt: { Icon: SiNuxt, color: '#00DC82' },
  angular: { Icon: SiAngular, color: '#DD0031' },
  svelte: { Icon: SiSvelte, color: '#FF3E00' },
  tailwindcss: { Icon: SiTailwindcss, color: '#06B6D4' },
  bootstrap: { Icon: SiBootstrap, color: '#7952B3' },
  redux: { Icon: SiRedux, color: '#764ABC' },
  jquery: { Icon: SiJquery, color: '#0769AD' },
  nodejs: { Icon: SiNodedotjs, color: '#5FA04E' },
  expressjs: { Icon: SiExpress, color: Colors.dark },
  nestjs: { Icon: SiNestjs, color: '#E0234E' },
  php: { Icon: SiPhp, color: '#777BB4' },
  laravel: { Icon: SiLaravel, color: '#FF2D20' },
  python: { Icon: SiPython, color: '#3776AB' },
  django: { Icon: SiDjango, color: '#092E20' },
  flask: { Icon: SiFlask, color: Colors.dark },
  go: { Icon: SiGo, color: '#00ADD8' },
  rust: { Icon: SiRust, color: '#B7410E' },
  java: { Icon: SiOpenjdk, color: Colors.dark },
  spring: { Icon: SiSpring, color: '#6DB33F' },
  mysql: { Icon: SiMysql, color: '#4479A1', scale: 1.4 },
  postgresql: { Icon: SiPostgresql, color: '#4169E1' },
  mongodb: { Icon: SiMongodb, color: '#47A248' },
  redis: { Icon: SiRedis, color: '#FF4438' },
  sqlite: { Icon: SiSqlite, color: '#003B57' },
  prisma: { Icon: SiPrisma, color: Colors.dark },
  graphql: { Icon: SiGraphql, color: '#E10098' },
  docker: { Icon: SiDocker, color: '#2496ED' },
  kubernetes: { Icon: SiKubernetes, color: '#326CE5' },
  git: { Icon: SiGit, color: '#F05032' },
  github: { Icon: SiGithub, color: Colors.dark },
  gitlab: { Icon: SiGitlab, color: '#FC6D26' },
  firebase: { Icon: SiFirebase, color: '#DD2C00' },
  supabase: { Icon: SiSupabase, color: '#3FCF8E' },
  nginx: { Icon: SiNginx, color: '#009639' },
  linux: { Icon: SiLinux, color: Colors.dark },
  flutter: { Icon: SiFlutter, color: '#02569B' },
  dart: { Icon: SiDart, color: '#0175C2' },
  kotlin: { Icon: SiKotlin, color: '#7F52FF' },
  swift: { Icon: SiSwift, color: '#F05138' },
  android: { Icon: SiAndroid, color: '#3DDC84' },
  jest: { Icon: SiJest, color: '#C21325' },
  figma: { Icon: SiFigma, color: '#F24E1E' },
  vite: { Icon: SiVite, color: '#646CFF' },
};

const SKILL_ALIASES: Record<string, string> = {
  html5: 'html',
  css3: 'css',
  scss: 'sass',
  js: 'javascript',
  ts: 'typescript',
  reactjs: 'react',
  reactnative: 'react',
  next: 'nextjs',
  vuejs: 'vue',
  nuxtjs: 'nuxt',
  angularjs: 'angular',
  tailwind: 'tailwindcss',
  reduxtoolkit: 'redux',
  node: 'nodejs',
  express: 'expressjs',
  nest: 'nestjs',
  golang: 'go',
  springboot: 'spring',
  postgres: 'postgresql',
  mongo: 'mongodb',
  k8s: 'kubernetes',
};

const toKey = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '');

export const getSkillLogo = (name: string): ISkillLogo | undefined => {
  const key = toKey(name);
  const logo = SKILL_LOGOS[SKILL_ALIASES[key] ?? key];
  return logo && { scale: 1, ...logo };
};

export const getSkillInitials = (name: string): string =>
  name.trim().slice(0, 2);
