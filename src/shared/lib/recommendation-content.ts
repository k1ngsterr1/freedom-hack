interface Vacancy {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary: string;
}

export const vacancies: Vacancy[] = [
  {
    id: "1",
    title: "Frontend-разработчик",
    company: "Tech Solutions",
    location: "Москва, удаленно",
    description:
      "Компания Tech Solutions ищет талантливого frontend-разработчика для работы над масштабными веб-проектами. В команду нужен человек с опытом в React и TypeScript.",
    requirements: [
      "Опыт работы с React и TypeScript от 2 лет",
      "Знание CSS, HTML, адаптивной верстки",
      "Опыт работы с REST API и GraphQL",
    ],
    salary: "от 120 000 до 150 000 руб.",
  },
  {
    id: "2",
    title: "UI/UX дизайнер",
    company: "Creative Studio",
    location: "Санкт-Петербург, офис",
    description:
      "Мы ищем креативного UI/UX дизайнера, который сможет создавать удобные и привлекательные интерфейсы для веб и мобильных приложений.",
    requirements: [
      "Портфолио с успешными проектами",
      "Опыт работы с Figma, Adobe XD",
      "Понимание принципов UX и пользовательского поведения",
    ],
    salary: "от 90 000 руб.",
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "Innovatech",
    location: "Онлайн",
    description:
      "Innovatech ищет опытного Data Scientist для работы над проектами в области машинного обучения и анализа данных.",
    requirements: [
      "Опыт работы с Python и библиотеками для ML (Scikit-Learn, TensorFlow)",
      "Знание SQL и баз данных",
      "Опыт работы с большими данными и построения моделей",
    ],
    salary: "от 150 000 руб.",
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "Innovatech",
    location: "Онлайн",
    description:
      "Innovatech ищет опытного Data Scientist для работы над проектами в области машинного обучения и анализа данных.",
    requirements: [
      "Опыт работы с Python и библиотеками для ML (Scikit-Learn, TensorFlow)",
      "Знание SQL и баз данных",
      "Опыт работы с большими данными и построения моделей",
    ],
    salary: "от 150 000 руб.",
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "Innovatech",
    location: "Онлайн",
    description:
      "Innovatech ищет опытного Data Scientist для работы над проектами в области машинного обучения и анализа данных.",
    requirements: [
      "Опыт работы с Python и библиотеками для ML (Scikit-Learn, TensorFlow)",
      "Знание SQL и баз данных",
      "Опыт работы с большими данными и построения моделей",
    ],
    salary: "от 150 000 руб.",
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "Innovatech",
    location: "Онлайн",
    description:
      "Innovatech ищет опытного Data Scientist для работы над проектами в области машинного обучения и анализа данных.",
    requirements: [
      "Опыт работы с Python и библиотеками для ML (Scikit-Learn, TensorFlow)",
      "Знание SQL и баз данных",
      "Опыт работы с большими данными и построения моделей",
    ],
    salary: "от 150 000 руб.",
  },
];
