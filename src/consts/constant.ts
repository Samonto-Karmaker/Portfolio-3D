const navLinks = [
    {
        name: "About",
        link: "#about",
    },
    {
        name: "Work",
        link: "#work",
    },
    {
        name: "Experience",
        link: "#experience",
    },
    {
        name: "Skills",
        link: "#skills",
    },
    {
        name: "Testimonials",
        link: "#testimonials",
    },
]

const words = [
    { text: "Backend", imgPath: "/images/ideas.svg" },
    { text: "Scalable", imgPath: "/images/concepts.svg" },
    { text: "Blockchain", imgPath: "/images/designs.svg" },
    { text: "Cryptographic", imgPath: "/images/code.svg" },
]

const counterItems = [
    { value: 1, suffix: "+", label: "Years of Experience" },
    { value: 3, suffix: "+", label: "Production Systems" },
    { value: 2, suffix: "", label: "Research Publications" },
    { value: 32, suffix: "+", label: "Total Citations" },
]

const logoIconsList = [
    "Zero Knowledge Proofs",
    "Applied Cryptography",
    "Ethereum",
    "Solidity",
    "Hardhat",
    "NestJS",
    "Express",
    "TypeScript",
    "JavaScript",
    "Machine Learning",
    "Django",
    "FastAPI",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "React",
    "Next.js",
    "Docker",
    "Web3",
]

const abilities = [
    {
        imgPath: "/images/seo.png",
        title: "Quality Focus",
        desc: "Delivering high-quality results while maintaining attention to every detail.",
    },
    {
        imgPath: "/images/chat.png",
        title: "Reliable Communication",
        desc: "Keeping you updated at every step to ensure transparency and clarity.",
    },
    {
        imgPath: "/images/time.png",
        title: "On-Time Delivery",
        desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
    },
]

const techStackImgs = [
    {
        name: "Frontend",
        imgPath: "/images/logos/react.png",
        tech: ["React", "Next.js", "Tailwind CSS"],
    },
    {
        name: "Backend",
        imgPath: "/images/logos/node.png",
        tech: ["Node.js", "Express", "NestJS"],
    },
    {
        name: "Python",
        imgPath: "/images/logos/python.svg",
        tech: ["Django", "FastAPI", "Machine Learning"],
    },
    {
        name: "Database",
        imgPath: "/images/logos/database.png",
        tech: ["PostgreSQL", "MongoDB"],
    },
    {
        name: "Blockchain",
        imgPath: "/images/logos/ethereum.webp",
        tech: ["Ethereum", "Solidity", "Hardhat"],
    },
]

const techStackIcons = [
    {
        name: "React Developer",
        modelPath: "/models/react_logo-transformed.glb",
        scale: 1,
        rotation: [0, 0, 0],
    },
    {
        name: "Python Developer",
        modelPath: "/models/python-transformed.glb",
        scale: 0.8,
        rotation: [0, 0, 0],
    },
    {
        name: "Backend Developer",
        modelPath: "/models/node-transformed.glb",
        scale: 5,
        rotation: [0, -Math.PI / 2, 0],
    },
    {
        name: "Interactive Developer",
        modelPath: "/models/three.js-transformed.glb",
        scale: 0.05,
        rotation: [0, 0, 0],
    },
    {
        name: "Project Manager",
        modelPath: "/models/git-svg-transformed.glb",
        scale: 0.05,
        rotation: [0, -Math.PI / 4, 0],
    },
]

const expCards = [
    {
        review: "Adrian brought creativity and technical expertise to the team, significantly improving our frontend performance. His work has been invaluable in delivering faster experiences.",
        imgPath: "/images/exp1.png",
        logoPath: "/images/logo1.png",
        title: "Frontend Developer",
        date: "January 2023 - Present",
        responsibilities: [
            "Developed and maintained user-facing features for the Hostinger website.",
            "Collaborated closely with UI/UX designers to ensure seamless user experiences.",
            "Optimized web applications for maximum speed and scalability.",
        ],
    },
    {
        review: "Adrian’s contributions to Docker's web applications have been outstanding. He approaches challenges with a problem-solving mindset.",
        imgPath: "/images/exp2.png",
        logoPath: "/images/logo2.png",
        title: "Full Stack Developer",
        date: "June 2020 - December 2023",
        responsibilities: [
            "Led the development of Docker's web applications, focusing on scalability.",
            "Worked with backend engineers to integrate APIs seamlessly with the frontend.",
            "Contributed to open-source projects that were used with the Docker ecosystem.",
        ],
    },
    {
        review: "Adrian’s work on Appwrite’s mobile app brought a high level of quality and efficiency. He delivered solutions that enhanced our mobile experience & meet our product goals.",
        imgPath: "/images/exp3.png",
        logoPath: "/images/logo3.png",
        title: "React Native Developer",
        date: "March 2019 - May 2020",
        responsibilities: [
            "Built cross-platform mobile apps using React Native, integrating with Appwrite's backend services.",
            "Improved app performance and user experience through code optimization and testing.",
            "Coordinated with the product team to implement features based on feedback.",
        ],
    },
]

const expLogos = [
    {
        name: "logo1",
        imgPath: "/images/logo1.png",
    },
    {
        name: "logo2",
        imgPath: "/images/logo2.png",
    },
    {
        name: "logo3",
        imgPath: "/images/logo3.png",
    },
]

const testimonials = [
    {
        name: "Esther Howard",
        mentions: "@estherhoward",
        review: "I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
        imgPath: "/images/client1.png",
    },
    {
        name: "Wade Warren",
        mentions: "@wadewarren",
        review: "Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
        imgPath: "/images/client3.png",
    },
    {
        name: "Guy Hawkins",
        mentions: "@guyhawkins",
        review: "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
        imgPath: "/images/client2.png",
    },
    {
        name: "Marvin McKinney",
        mentions: "@marvinmckinney",
        review: "Adrian was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that’s both modern and easy to navigate. Fantastic work overall.",
        imgPath: "/images/client5.png",
    },
    {
        name: "Floyd Miles",
        mentions: "@floydmiles",
        review: "Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional!",
        imgPath: "/images/client4.png",
    },
    {
        name: "Albert Flores",
        mentions: "@albertflores",
        review: "Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend and backend dev are top-notch.",
        imgPath: "/images/client6.png",
    },
]

const socialImgs = [
    {
        name: "insta",
        imgPath: "/images/insta.png",
    },
    {
        name: "fb",
        imgPath: "/images/fb.png",
    },
    {
        name: "x",
        imgPath: "/images/x.png",
    },
    {
        name: "linkedin",
        imgPath: "/images/linkedin.png",
    },
]

const showcaseProjects = [
    {
        id: "FinCube",
        title: "FinCube - Web3 Traceability & Governance Tool",
        description:
            "A blockchain-based traceability platform that links on-chain payment records with traditional enterprise systems to create an immutable, auditable collaborative system.",
        imgPath: "/images/fincube-cover.jpg",
        imgAlt: "FinCube",
        imageBackground: "#101218",
        isFeatured: true,
    },
    {
        id: "transferPoC",
        title: "Transfer ZK",
        description:
            "A Zero-Knowledge proof-based stablecoin transfer system for secure and private transactions with a RAG-based crypto fraud detection mechanism.",
        imgPath: "/images/transferPoC-1.png",
        imgAlt: "Transfer ZK",
        imageBackground: "#d0f2f1",
    },
    {
        id: "wms",
        title: "Workforce Management System",
        description:
            "An enterprise workforce management platform tailored for care homes, featuring flexible shift scheduling, attendance and absence tracking, and visitor logging. It includes an intelligent compliance engine with fairness scoring, actionable reporting dashboards, and an external agency portal for end-to-end job posting and candidate management.",
        imgPath: "/images/wms-1.png",
        imgAlt: "Workforce Management System",
        imageBackground: "#FFEFDB",
    },
]

const projectDetails = [
    {
        id: "FinCube",
        title: "FinCube - Web3 Traceability & Governance Tool",
        description:
            "A blockchain-based traceability platform that links on-chain payment records with traditional enterprise systems to create an immutable, auditable collaborative system. It seamlessly integrates with existing ERP and monitoring tools to enhance transparency, compliance, and trust using Stablecoins. It also establishes a unified reconciliation layer between government bodies and business institutions, ensuring data consistency and accountability across stakeholders.",
        images: [
            "/images/fincube-cover.jpg",
            "/images/fincube-1.png",
            "/images/fincube-2.png",
            "/images/fincube-3.png",
            "/images/fincube-4.png",
        ],
        contributions: [
            "Planned and designed system architecture, including Entity Relationship Diagrams (ERDs) for efficient database modeling.",
            "Migrated the User Management Service from NestJS to Django, implementing a robust role management and authentication system.",
            "Enhanced traceability and observability across the platform, enabling comprehensive monitoring of the auditable journey of an asset through the complete on-chain-off-chain cycle.",
            "Led the backend migration for a large-scale ISC architecture upgrade by integrating event-driven communication and standardized exchange-based transaction processing.",
            "Implemented DTO conventions and transaction handling across the platform, enabling consistent cross-service communication and scalable pub-sub-based inter-service data linkage across the platform.",
        ],
        techStack: [
            "TailwindCSS",
            "NextJs",
            "NestJS",
            "Django",
            "PostgreSQL",
            "WebSockets",
            "RabbitMQ",
            "Alchemy SDK",
            "The Graph",
            "OpenTelemetry",
            "Loki",
            "Grafana",
            "Prometheus",
            "Tempo",
            "Docker",
            "Solidity",
            "OpenZeppelin",
            "Ethereum",
        ],
    },
    {
        id: "wms",
        title: "Workforce Management System",
        description:
            "A comprehensive workforce management platform built for care homes to streamline operations across roster scheduling, flexible shift planning, and attendance and absence tracking. The system features an advanced compliance engine with fairness scoring, interactive reporting and notification modules, visitor management, and a dedicated agency portal that connects care homes with external staffing agencies for contract worker placement.",
        images: [
            "/images/wms-1.png",
            "/images/wms-2.png",
            "/images/wms-3.png",
            "/images/wms-4.png",
            "/images/wms-5.png",
            "/images/wms-6.png",
            "/images/wms-7.png",
            "/images/wms-8.png",
            "/images/wms-9.png",
            "/images/wms-10.png",
        ],
        contributions: [
            "Engineered a dynamic shift management module featuring custom recurrence logic for flexible roster scheduling.",
            "Developed comprehensive attendance and absence management systems paired with analytical dashboards.",
            "Built an enterprise visitor management module equipped with interactive tracking and reporting dashboards.",
            "Designed an end-to-end agency portal to streamline job posting workflows and candidate pipeline management.",
            "Architected scalable relational database schemas optimized for performance and complex workforce queries.",
            "Delivered hands-on UAT support, resolving critical post-launch bugs to ensure platform stability."
        ],
        techStack: [
            "NestJS",
            "TypeScript",
            "PostgreSQL",
            "TypeORM",
            "Docker",
            "GitHub Actions",
        ],
    },
    {
        id: "transferPoC",
        title: "Transfer ZK",
        description:
            "A Zero-Knowledge proof-based stablecoin transfer system for secure and private transactions with a RAG-based crypto fraud detection mechanism.",
        images: [
            "/images/transferPoC-1.png",
            "/images/transferPoC-2.png",
            "/images/transferPoC-3.png",
            "/images/transferPoC-4.png",
        ],
        contributions: [
            "Built a server-side rendered Next.js application leveraging React Server Components for near-instant load times.",
            "Integrated Sanity CMS as a headless content backend for startup profiles and editorial articles.",
            "Implemented full-text search with instant filtering by YC batch, sector, and funding stage.",
            "Designed a responsive card-based UI with glassmorphism aesthetics and smooth GSAP page transitions.",
            "Configured Vercel edge deployment with ISR (Incremental Static Regeneration) for fresh data at the edge.",
        ],
        techStack: [
            "Next.js",
            "TypeScript",
            "TailwindCSS",
            "Express",
            "MongoDB",
            "FastAPI",
            "Python",
            "Gemini",
            "Solidity",
            "OpenZeppelin",
            "Ethereum",
            "Zero-Knowledge Proofs"
        ],
    },
]

const intro =
    "Software engineer focused on scalable architectures, blockchain systems, and applied cryptography"

const aboutData = {
    name: "Samanta Karmaker",
    description: `I’m a software engineer with a strong focus on backend systems, where I work on designing architectures that handle real-world complexity and scale efficiently. My experience spans microservices, system design, and blockchain-based solutions. 
    Recently, my work has been moving toward applied cryptography, where I explore problems around efficient verification, data integrity, and zero-knowledge systems. I’m particularly interested in building systems that are not only scalable, but also provably correct and verifiable. 
    I aim to grow toward research-driven engineering, combining practical system design with deeper cryptographic reasoning to build the next generation of reliable and secure infrastructure.`,
    imgPath: "/images/person.jpg",
}

export {
    words,
    abilities,
    logoIconsList,
    counterItems,
    expCards,
    expLogos,
    testimonials,
    socialImgs,
    techStackIcons,
    techStackImgs,
    navLinks,
    intro,
    aboutData,
    showcaseProjects,
    projectDetails,
}
