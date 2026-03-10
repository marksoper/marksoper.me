export interface Project {
  slug: string;
  company: string;
  parent?: { name: string; icon?: string; url: string };
  role: string;
  years: string;
  current?: boolean;
  icon?: string;
  logo?: string;
  screenshot?: string;
  description: string;
  links: { label: string; url: string }[];
}

export const projects: Project[] = [
  {
    slug: 'schema',
    company: 'Schema',
    role: 'Founder',
    years: '2024–present',
    current: true,
    description: 'Building an AI venture at schema.ai. Originally acquired as the brand name for a project exploring how AI agents can better understand and work with structured data and infrastructure.',
    links: [
      { label: 'schema.ai', url: 'https://schema.ai' },
    ],
  },
  {
    slug: 'cockroach-labs',
    company: 'Cockroach Labs',
    role: 'Product Manager',
    years: '2021–2024',
    icon: '/img/icons/cockroach-labs.png',
    logo: '/img/Cockroach_Labs_Logo.png',
    description: 'Led product for CockroachDB Cloud operational tooling (API, Terraform Provider, CLI) and CockroachDB Cloud Serverless — an autoscaling, multi-tenant distributed SQL database.',
    links: [
      { label: 'CockroachDB Cloud API', url: 'https://www.cockroachlabs.com/docs/api/cloud/v1' },
      { label: 'Terraform Provider', url: 'https://registry.terraform.io/providers/cockroachdb/cockroach/latest/docs' },
      { label: 'Cloud Serverless', url: 'https://www.cockroachlabs.com/lp/serverless/' },
    ],
  },
  {
    slug: 'microsoft-azure-ml',
    company: 'Microsoft Azure Machine Learning',
    parent: { name: 'Microsoft', icon: '/img/icons/microsoft.png', url: 'https://microsoft.com' },
    role: 'Software Engineer',
    years: '2018–2021',
    icon: '/img/icons/microsoft.png',
    logo: '/img/aml.jpeg',
    description: 'Built cloud platform software at Microsoft\'s NERD Center in Cambridge, MA, improving how data scientists develop and operationalize machine learning models.',
    links: [
      { label: 'Azure ML', url: 'https://azure.microsoft.com/en-us/products/machine-learning' },
    ],
  },
  {
    slug: 'rocket-insights-brightcove',
    company: 'Rocket Insights / Brightcove',
    role: 'API Tech Lead (Contract)',
    years: '2017–2018',
    icon: '/img/icons/brightcove.png',
    logo: '/img/rocket.png',
    description: 'Led a team of 5 engineers developing the backend API for a Fortune 500 media company\'s web/mobile application, scaled for millions of users globally.',
    links: [],
  },
  {
    slug: 'gethuman',
    company: 'GetHuman',
    role: 'Contract Engineer & Tech Lead',
    years: '2015–2017',
    icon: '/img/icons/gethuman.png',
    logo: '/img/logo-gethuman.png',
    description: 'Built a workflow scheduling backend and UI for automated customer service problem solving. Node.js, TypeScript, RxJS, Angular, React, Redux, and React Native.',
    links: [],
  },
  {
    slug: 'vmware',
    company: 'VMware',
    role: 'Web UI Developer (Contract)',
    years: '2016',
    icon: '/img/icons/vmware.png',
    logo: '/img/vs.jpg',
    description: 'Built the Angular web application for the vSphere Docker Volume Driver, enabling Docker container administrators to manage vSphere Storage access.',
    links: [
      { label: 'GitHub', url: 'https://github.com/vmware/docker-volume-vsphere' },
    ],
  },
  {
    slug: 'helloshopper',
    company: 'HelloShopper (formerly Scratch)',
    role: 'Full-stack Developer',
    years: '2015',
    icon: '/img/scratchlogo.png',
    logo: '/img/scratchlogo.png',
    screenshot: '/img/scratch.png',
    description: 'Built and launched an expert shopping service funded by Bessemer Venture Partners. iOS, web, Angular, Ionic, Node.js, Firebase, ElasticSearch, PostgreSQL.',
    links: [
      { label: 'Boston Globe: "Local startup Scratch promises to be your personal shopper"', url: 'https://www.bostonglobe.com/business/2015/01/07/need-something-local-startup-scratch-promises-your-personal-shopper/ivCSj4tyn7dy3vplxofuNN/story.html' },
    ],
  },
  {
    slug: 'finmason',
    company: 'FinMason',
    role: 'Web Application UI Development',
    years: '2014–2015',
    icon: '/img/icons/finmason.png',
    screenshot: '/img/fm1.png',
    description: 'Led a team building the initial web UI for this financial services startup — a comprehensive Angular SPA for portfolio risk management and data visualization.',
    links: [],
  },
  {
    slug: 'invite-education',
    company: 'Invite Education',
    role: 'Product Management, Design & Development',
    years: '2013–2014',
    icon: '/img/icons/invite-education.png',
    screenshot: '/img/ie-college.png',
    description: 'Translated the founders\' vision for a better college planning experience into a successful product. Led a team of three to design and build the initial version with Rails, Angular, and D3.',
    links: [],
  },
  {
    slug: 'harvard-catch',
    company: 'Harvard CATCH',
    role: 'Javascript UI Developer',
    years: '2013',
    icon: '/img/icons/harvard.png',
    screenshot: '/img/catch.png',
    description: 'Developed a Javascript Web UI library for exploring W3C Open Annotation Data, working with Harvard\'s CATCH project team for research peer review.',
    links: [],
  },
  {
    slug: 'oxfam-america',
    company: 'Oxfam America',
    role: 'Python & Django Engineer',
    years: '2013',
    icon: '/img/icons/oxfam.png',
    screenshot: '/img/oxfam.png',
    description: 'Built the next-generation web platform for publishing and fundraising using Python, Django, and Mezzanine CMS.',
    links: [],
  },
  {
    slug: 'aquto',
    company: 'Aquto',
    role: 'UI/UX Developer',
    years: '2012',
    screenshot: '/img/aq.jpg',
    description: 'Led front-end development of Kickbit, a mobile app for this startup (funded by North Bridge and Matrix Partners) pioneering mobile data as virtual currency.',
    links: [],
  },
  {
    slug: 'connected-sports',
    company: 'Connected Sports',
    role: 'Co-Founder & Developer',
    years: '2011–2012',
    screenshot: '/img/csv.png',
    description: 'Primary developer for Rumble Football — a real-time social second-screen companion game for NFL viewing. Web Sockets, Socket.io, Backbone, Node.js, MongoDB, Redis. Backed by Avalon Ventures.',
    links: [],
  },
  {
    slug: 'collaborate-kibits',
    company: 'Collaborate.com (Kibits)',
    role: 'UI/UX & Node.js Developer',
    years: '2011',
    screenshot: '/img/kibits.jpg',
    description: 'Built initial prototype of HTML5 mobile web experience and Node.js API for this real-time collaboration startup funded by Google Ventures.',
    links: [],
  },
  {
    slug: 'rally',
    company: 'Rally',
    role: 'Founder, CTO, Designer & Developer',
    years: '2009–2010',
    screenshot: '/img/rally.jpg',
    description: 'Founded and built a service that mined Twitter for local events data using NLP and machine learning to help people make casual plans. Designed and developed all aspects — Python, Django, Twitter Streaming API, MongoDB, Redis, AWS.',
    links: [
      { label: 'Post-mortem', url: '/blog/requiem-for-a-startup/' },
    ],
  },
  {
    slug: 'likematter',
    company: 'Likematter',
    role: 'Founder, CTO, Designer & Developer',
    years: '2008–2009',
    screenshot: '/img/likematter.jpg',
    description: 'Founded and led a team building a personalized news and job discovery engine using NLP and machine learning on the OpenCalais platform.',
    links: [
      { label: 'About Likematter', url: '/blog/find-news-jobs-likematter/' },
    ],
  },
  {
    slug: 'microstrategy',
    company: 'MicroStrategy',
    role: 'Software Engineer',
    years: '1998–2002',
    icon: '/img/icons/microstrategy.svg',
    description: 'Built business intelligence and data analytics platform software at this enterprise BI company in McLean, VA.',
    links: [],
  },
  {
    slug: 'sas-institute',
    company: 'SAS Institute',
    role: 'Software Engineer',
    years: '2002–2007',
    icon: '/img/icons/sas.png',
    description: 'Built data management and machine learning systems at the world\'s largest privately held software company in Cary, NC.',
    links: [],
  },
];
