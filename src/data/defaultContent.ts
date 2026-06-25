import type { SiteContent } from '@/types/content'

/**
 * Default / seed content for the Kazargrad site.
 *
 * On first launch (or after "Сбросить данные к исходным") this object is written
 * to localStorage. The admin panel edits the stored copy; this file is the
 * factory reset baseline and should stay in sync with the brief.
 *
 * IMAGES: the URLs below are PLACEHOLDERS.
 *   - Hero uses the bundled /images/hero.png.
 *   - Everything else uses picsum.photos seeded placeholders so the site always
 *     renders something out of the box.
 *   Replace them with real photos via the admin "Photos / Gallery" + section
 *   editors, or — for production — wire `services/imageService.ts` to S3 /
 *   Cloudinary / a CMS media library.
 */

/** Deterministic placeholder image helper (replace with real photos in admin). */
const img = (seed: string, w = 1200, h = 800): string =>
  `https://picsum.photos/seed/kazargrad-${seed}/${w}/${h}`

export const CURRENT_VERSION = 1

export const defaultContent: SiteContent = {
  version: CURRENT_VERSION,
  lastSaved: '2024-01-01T00:00:00.000Z',

  /* ---------------------------------------------------------------- */
  settings: {
    siteTitle: 'Казарьград — гостевые дома для отдыха рядом с Рязанью',
    metaDescription:
      'Гостевой комплекс Казарьград в Рязанской области: 8 домов для компаний до 12 и 16 гостей, беседки, мангальные зоны, детская анимация, пенные вечеринки и отдых на природе.',
    logoImage: '',
    faviconImage: '/favicon.svg',
    primaryColor: '#3F5A3A',
    accentColor: '#F2B705',
    defaultHeroImage: '/images/hero.png',
    animationsEnabled: true,
    reviewsEnabled: true,
    kidsEnabled: true,
    pricesEnabled: true,
    faqEnabled: true,
    footerLegalEnabled: true,
  },

  /* ---------------------------------------------------------------- */
  hero: {
    headline:
      'Гостевые дома для отдыха, праздников и семейных выходных рядом с Рязанью',
    subtitle:
      '8 домов для компаний до 12 и 16 гостей, приватные участки, беседки, мангальные зоны, детская анимация, пенные вечеринки и развлечения для всей семьи.',
    backgroundImage: '/images/hero.png',
    primaryCtaText: 'Забронировать дом',
    secondaryCtaText: 'Посмотреть дома',
    badges: [
      { id: 'badge-1', visible: true, text: '8 домов' },
      { id: 'badge-2', visible: true, text: 'Для компаний и семей' },
      { id: 'badge-3', visible: true, text: 'Анимация входит в стоимость' },
      { id: 'badge-4', visible: true, text: 'Рядом с Рязанью' },
    ],
  },

  /* ---------------------------------------------------------------- */
  advantages: [
    {
      id: 'adv-1',
      visible: true,
      icon: 'Home',
      title: '8 гостевых домов',
      description: 'Просторные дома для отдыха семьёй или большой компанией.',
    },
    {
      id: 'adv-2',
      visible: true,
      icon: 'Users',
      title: 'Дома для компаний и семей',
      description: 'Двухэтажные и одноэтажные дома под разные форматы отдыха.',
    },
    {
      id: 'adv-3',
      visible: true,
      icon: 'Fence',
      title: 'Приватная территория у каждого дома',
      description: 'Ограждённый участок — личное пространство и ощущение уюта.',
    },
    {
      id: 'adv-4',
      visible: true,
      icon: 'Sparkles',
      title: 'Анимация и пенные вечеринки входят в стоимость',
      description: 'Развлечения для детей уже включены в проживание.',
    },
    {
      id: 'adv-5',
      visible: true,
      icon: 'Flame',
      title: 'Беседки и мангальные зоны',
      description: 'Две беседки и мангальная зона у каждого дома.',
    },
    {
      id: 'adv-6',
      visible: true,
      icon: 'CalendarHeart',
      title: 'Развлечения круглый год',
      description: 'Активный отдых и праздники летом и зимой.',
    },
  ],

  /* ---------------------------------------------------------------- */
  houses: {
    title: 'Гостевые дома',
    intro:
      'В Казарьграде вас ждут просторные гостевые дома для отдыха семьёй, компанией друзей или проведения праздника. Каждый дом полностью ограждён от общей территории, поэтому у гостей есть ощущение собственного пространства: можно спокойно отдыхать, проводить время с близкими и не переживать за приватность.',
    footnote:
      'У каждого дома: две беседки, мангальная зона, садовая мебель, собственная парковка и ограждённый участок. Также доступна большая бесплатная общая парковка.',
    items: [
      {
        id: 'house-2floor',
        visible: true,
        name: 'Двухэтажный дом',
        housesCount: 4,
        maxGuests: 12,
        bathrooms: 2,
        price: 19500,
        priceLabel: 'от 19 500 ₽/сутки',
        description:
          'Просторный дом с двумя этажами — больше личного пространства для семьи или компании.',
        suitableFor: 'Для семей и компаний, которым нужно больше личного пространства',
        image: img('house-two', 1200, 800),
        gallery: [img('house-two-1', 800, 600), img('house-two-2', 800, 600)],
        features: [
          '2 санузла',
          'Две беседки и мангальная зона',
          'Ограждённый участок',
          'Собственная парковка',
        ],
        ctaText: 'Выбрать двухэтажный дом',
      },
      {
        id: 'house-1floor',
        visible: true,
        name: 'Одноэтажный дом',
        housesCount: 4,
        maxGuests: 16,
        bathrooms: 1,
        price: 21500,
        priceLabel: 'от 21 500 ₽/сутки',
        description:
          'Вместительный одноэтажный дом — идеально для больших компаний и праздников.',
        suitableFor: 'Для больших компаний, торжеств и дней рождения',
        image: img('house-one', 1200, 800),
        gallery: [img('house-one-1', 800, 600), img('house-one-2', 800, 600)],
        features: [
          '1 санузел',
          'Две беседки и мангальная зона',
          'Ограждённый участок',
          'Собственная парковка',
        ],
        ctaText: 'Выбрать одноэтажный дом',
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  territory: {
    title: 'Территория для отдыха',
    description:
      'Казарьград — это не просто дом на сутки, а полноценная территория для отдыха: сосновый бор, прогулочные зоны, беседки, мангальные зоны, детские площадки, активные развлечения и пространство для праздников.',
    cards: [
      {
        id: 'terr-1',
        visible: true,
        icon: 'Trees',
        title: 'Сосновый бор и экотропа',
        description: 'Чистый воздух и спокойные прогулки среди сосен.',
        image: img('forest', 800, 600),
      },
      {
        id: 'terr-2',
        visible: true,
        icon: 'Footprints',
        title: 'Пешие прогулки',
        description: 'Прогулочные маршруты по территории комплекса.',
        image: img('walk', 800, 600),
      },
      {
        id: 'terr-3',
        visible: true,
        icon: 'Waves',
        title: 'Оборудованный пляж',
        description: 'Место для отдыха у воды в тёплый сезон.',
        image: img('beach', 800, 600),
      },
      {
        id: 'terr-4',
        visible: true,
        icon: 'Flame',
        title: 'Беседки и мангальные зоны',
        description: 'Уютные беседки и зоны для барбекю у каждого дома.',
        image: img('gazebo', 800, 600),
      },
      {
        id: 'terr-5',
        visible: true,
        icon: 'Flame',
        title: 'Костровая чаша',
        description: 'Вечера у живого огня в кругу близких.',
        image: img('fire', 800, 600),
      },
      {
        id: 'terr-6',
        visible: true,
        icon: 'PartyPopper',
        title: 'Банкетные залы по договорённости',
        description: 'Пространство для торжеств и мероприятий.',
        image: img('banquet', 800, 600),
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  kids: {
    title: 'Детям здесь не скучно',
    description:
      'В Казарьграде есть детские площадки, батуты, игрушки, книги, пенные вечеринки и детская анимация, которая входит в стоимость проживания.',
    highlight: 'Анимация и пенные вечеринки входят в стоимость проживания',
    items: [
      { id: 'kid-1', visible: true, text: 'Детские площадки' },
      { id: 'kid-2', visible: true, text: 'Батуты' },
      { id: 'kid-3', visible: true, text: 'Игрушки' },
      { id: 'kid-4', visible: true, text: 'Книги' },
      { id: 'kid-5', visible: true, text: 'Детские кроватки' },
      { id: 'kid-6', visible: true, text: 'Манежи' },
      { id: 'kid-7', visible: true, text: 'Высокие стульчики' },
      { id: 'kid-8', visible: true, text: 'Детские горшки' },
      { id: 'kid-9', visible: true, text: 'Анимация' },
      { id: 'kid-10', visible: true, text: 'Пенные вечеринки в тёплый сезон' },
    ],
    images: [img('kids-1', 900, 700), img('kids-foam', 900, 700)],
  },

  /* ---------------------------------------------------------------- */
  activities: {
    title: 'Развлечения по сезонам',
    description:
      'Активный отдых для детей и взрослых в любое время года — от пляжа и SUP-бордов летом до катка и тюбинга зимой.',
    summerLabel: 'Лето',
    winterLabel: 'Зима',
    items: [
      // Summer
      { id: 'act-s1', visible: true, season: 'summer', icon: 'Volleyball', title: 'Волейбольная площадка', price: '', description: '' },
      { id: 'act-s2', visible: true, season: 'summer', icon: 'Dribbble', title: 'Баскетбольная площадка', price: '', description: '' },
      { id: 'act-s3', visible: true, season: 'summer', icon: 'Goal', title: 'Футбольное поле', price: '', description: '' },
      { id: 'act-s4', visible: true, season: 'summer', icon: 'Table2', title: 'Настольный теннис', price: '', description: '' },
      { id: 'act-s5', visible: true, season: 'summer', icon: 'Feather', title: 'Бадминтон', price: '', description: '' },
      { id: 'act-s6', visible: true, season: 'summer', icon: 'Circle', title: 'Бильярдный зал', price: '', description: '' },
      { id: 'act-s7', visible: true, season: 'summer', icon: 'Dumbbell', title: 'Тренажёрный уголок', price: '', description: '' },
      { id: 'act-s8', visible: true, season: 'summer', icon: 'Gamepad2', title: 'Игровая зона', price: '', description: '' },
      { id: 'act-s9', visible: true, season: 'summer', icon: 'Baby', title: 'Детские площадки', price: '', description: '' },
      { id: 'act-s10', visible: true, season: 'summer', icon: 'Bike', title: 'Прокат велосипедов', price: '', description: '' },
      { id: 'act-s11', visible: true, season: 'summer', icon: 'Car', title: 'Квадроцикл', price: '', description: '' },
      { id: 'act-s12', visible: true, season: 'summer', icon: 'Sparkles', title: 'Батуты', price: '', description: '' },
      { id: 'act-s13', visible: true, season: 'summer', icon: 'Armchair', title: 'Шезлонги и гамаки', price: '', description: '' },
      { id: 'act-s14', visible: true, season: 'summer', icon: 'Dice5', title: 'Настольные игры', price: '', description: '' },
      { id: 'act-s15', visible: true, season: 'summer', icon: 'Trees', title: 'Сосновый бор и экотропа', price: '', description: '' },
      { id: 'act-s16', visible: true, season: 'summer', icon: 'Footprints', title: 'Пешие прогулки', price: '', description: '' },
      { id: 'act-s17', visible: true, season: 'summer', icon: 'Waves', title: 'Оборудованный пляж', price: '', description: '' },
      { id: 'act-s18', visible: true, season: 'summer', icon: 'Sailboat', title: 'Лодки и катамараны', price: '', description: '' },
      { id: 'act-s19', visible: true, season: 'summer', icon: 'Waves', title: 'SUP-борды', price: '', description: '' },
      // Winter
      { id: 'act-w1', visible: true, season: 'winter', icon: 'Snowflake', title: 'Горки для тюбинга', price: '', description: '' },
      { id: 'act-w2', visible: true, season: 'winter', icon: 'Snowflake', title: 'Зимний каток', price: '', description: '' },
      { id: 'act-w3', visible: true, season: 'winter', icon: 'Snowflake', title: 'Прокат коньков', price: '', description: '' },
    ],
  },

  /* ---------------------------------------------------------------- */
  amenities: {
    title: 'Удобства в каждом доме',
    description:
      'Всё необходимое для комфортного отдыха уже есть в каждом доме комплекса.',
    items: [
      { id: 'am-1', visible: true, icon: 'Wind', title: 'Кондиционеры в каждой комнате', description: '' },
      { id: 'am-2', visible: true, icon: 'Droplet', title: 'Куллер с питьевой водой', description: '' },
      { id: 'am-3', visible: true, icon: 'WashingMachine', title: 'Стиральная и посудомоечная машины', description: '' },
      { id: 'am-4', visible: true, icon: 'Refrigerator', title: 'Холодильник, СВЧ и посуда в ассортименте', description: '' },
      { id: 'am-5', visible: true, icon: 'BedDouble', title: 'Качественный текстиль', description: '' },
      { id: 'am-6', visible: true, icon: 'Wifi', title: 'Wi-Fi', description: '' },
      { id: 'am-7', visible: true, icon: 'Disc3', title: 'Светомузыка', description: '' },
      { id: 'am-8', visible: true, icon: 'Thermometer', title: 'Индивидуальное отопление', description: '' },
      { id: 'am-9', visible: true, icon: 'ChefHat', title: 'Возможность самостоятельного приготовления пищи', description: '' },
      { id: 'am-10', visible: true, icon: 'Clock', title: 'Ранний заезд и поздний выезд по согласованию', description: '' },
      { id: 'am-11', visible: true, icon: 'Dog', title: 'Размещение с домашними животными обсуждается индивидуально', description: '' },
      { id: 'am-12', visible: true, icon: 'Sparkles', title: 'Идеальная чистота', description: '' },
      { id: 'am-13', visible: true, icon: 'CalendarRange', title: 'Возможность длительной аренды в формате загородной дачи', description: '' },
    ],
  },

  /* ---------------------------------------------------------------- */
  services: {
    title: 'Дополнительные услуги и цены',
    description:
      'Детская анимация и пенные вечеринки входят в стоимость проживания. Остальные услуги вы можете добавить по желанию.',
    items: [
      {
        id: 'srv-1',
        visible: true,
        name: 'Бильярд и караоке',
        description: '1-й час — 1500 ₽, 2-й час — 1200 ₽, 3-й час и последующие — 1000 ₽/час',
        price: 'от 1000 ₽/час',
        priceLabel: '1-й час — 1500 ₽',
        pricingType: 'per_hour',
        includedInStay: false,
        icon: 'Mic2',
      },
      {
        id: 'srv-2',
        visible: true,
        name: 'Лодки и SUP-доски',
        description: 'Минимальное время аренды — 2 часа',
        price: 'от 1000 ₽',
        priceLabel: 'от 1000 ₽',
        pricingType: 'from',
        includedInStay: false,
        icon: 'Sailboat',
      },
      {
        id: 'srv-3',
        visible: true,
        name: 'Велосипеды',
        description: 'Детский — 250 ₽/час, взрослый — 500 ₽/час',
        price: '250–500 ₽/час',
        priceLabel: 'детский — 250 ₽/час',
        pricingType: 'per_hour',
        includedInStay: false,
        icon: 'Bike',
      },
      {
        id: 'srv-4',
        visible: true,
        name: 'Банкетные залы',
        description: 'Аренда зала для торжеств',
        price: 'по договорённости',
        priceLabel: 'по договорённости',
        pricingType: 'negotiable',
        includedInStay: false,
        icon: 'PartyPopper',
      },
      {
        id: 'srv-5',
        visible: true,
        name: 'Детская анимация и пенные вечеринки',
        description: 'Программа для детей в тёплый сезон',
        price: 'входят в стоимость',
        priceLabel: 'входят в стоимость проживания',
        pricingType: 'included',
        includedInStay: true,
        icon: 'Sparkles',
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  events: {
    title: 'Праздники и мероприятия',
    description:
      'В Казарьграде можно отметить день рождения, семейный праздник, корпоратив или провести мероприятие на природе. Для гостей доступны гостевые дома, банкетные залы по договорённости, шатры на озере в тёплый период, беседки, мангальные зоны и развлечения для детей и взрослых.',
    ctaText: 'Обсудить мероприятие',
    scenarios: [
      { id: 'ev-1', visible: true, icon: 'Cake', title: 'День рождения' },
      { id: 'ev-2', visible: true, icon: 'Heart', title: 'Семейный праздник' },
      { id: 'ev-3', visible: true, icon: 'Briefcase', title: 'Корпоратив' },
      { id: 'ev-4', visible: true, icon: 'Users', title: 'Отдых большой компанией' },
      { id: 'ev-5', visible: true, icon: 'Baby', title: 'Детский праздник' },
      { id: 'ev-6', visible: true, icon: 'Trees', title: 'Мероприятие на природе' },
    ],
    images: [img('event-1', 900, 700), img('event-2', 900, 700)],
  },

  /* ---------------------------------------------------------------- */
  booking: {
    title: 'Как забронировать',
    description: 'Бронирование занимает всего несколько простых шагов.',
    steps: [
      {
        id: 'step-1',
        visible: true,
        icon: 'MessageSquare',
        title: 'Вы оставляете заявку',
        description:
          'Напишите нам в удобный мессенджер или позвоните. Мы уточним дату, количество гостей и формат вашего отдыха. Заселение происходит с 14:00.',
      },
      {
        id: 'step-2',
        visible: true,
        icon: 'Home',
        title: 'Подбираем дом',
        description:
          'Мы согласуем свободные даты, подходящий дом и все важные детали: количество гостей, пожелания по отдыху, дополнительные услуги и индивидуальные вопросы.',
      },
      {
        id: 'step-3',
        visible: true,
        icon: 'CreditCard',
        title: 'Вы вносите предоплату',
        description:
          'После согласования даты и дома вы вносите предоплату — так дом закрепляется за вами.',
      },
      {
        id: 'step-4',
        visible: true,
        icon: 'RotateCcw',
        title: 'Условия возврата предоплаты',
        description:
          'Если вы предупреждаете нас об отмене бронирования не позднее чем за 7 дней до даты заезда, предоплата возвращается.',
      },
      {
        id: 'step-5',
        visible: true,
        icon: 'KeyRound',
        title: 'День заселения',
        description:
          'В день приезда мы встречаем вас на территории комплекса, проводим оставшуюся оплату и заселяем в ваш дом.',
      },
      {
        id: 'step-6',
        visible: true,
        icon: 'Clock',
        title: 'Выезд до 12:00',
        description:
          'В день выезда необходимо освободить дом до 12:00, чтобы мы успели провести генеральную уборку и подготовить его для следующих гостей.',
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  reviews: {
    title: 'Отзывы гостей из Яндекса',
    // NOTE: real reviews should be pasted by the admin from Yandex.Maps.
    // Do not invent reviews — these are placeholders only.
    yandexUrl: 'https://yandex.ru/maps/',
    buttonText: 'Посмотреть отзывы на Яндексе',
    items: [
      { id: 'rev-1', visible: true, source: 'Яндекс.Карты', author: 'Гость', rating: 5, text: 'Здесь будет отзыв гостя из Яндекс.Карт.', date: '', link: '' },
      { id: 'rev-2', visible: true, source: 'Яндекс.Карты', author: 'Гость', rating: 5, text: 'Здесь будет отзыв гостя из Яндекс.Карт.', date: '', link: '' },
      { id: 'rev-3', visible: true, source: 'Яндекс.Карты', author: 'Гость', rating: 5, text: 'Здесь будет отзыв гостя из Яндекс.Карт.', date: '', link: '' },
    ],
  },

  /* ---------------------------------------------------------------- */
  faq: {
    title: 'Частые вопросы',
    items: [
      {
        id: 'faq-1',
        visible: true,
        category: 'Правила',
        question: 'До которого часа можно шуметь?',
        answer:
          'На территории дома можно шуметь до 22:30. Внутри дома ограничений по шуму нет, если это не мешает другим гостям комплекса.',
      },
      {
        id: 'faq-2',
        visible: true,
        category: 'Удобства',
        question: 'Есть ли баня или бассейн?',
        answer:
          'Баня сейчас находится на этапе строительства. Бассейна на территории нет.',
      },
      {
        id: 'faq-3',
        visible: true,
        category: 'Правила',
        question: 'Можно ли приехать с животными?',
        answer:
          'Да, размещение с питомцами возможно. Единоразовая оплата за питомца составляет 2000 ₽. Размещение доступно для собак до средних пород включительно и обсуждается индивидуально.',
      },
      {
        id: 'faq-4',
        visible: true,
        category: 'Питание',
        question: 'Есть ли ресторан, столовая или кафе на территории?',
        answer:
          'Ресторана, столовой и кафе на территории нет. При этом для мероприятий можно заранее оформить предзаказ.',
      },
      {
        id: 'faq-5',
        visible: true,
        category: 'Развлечения',
        question: 'Есть ли караоке и бильярд?',
        answer:
          'Да, на территории есть караоке и бильярд. Стоимость: 1-й час — 1500 ₽, 2-й час — 1200 ₽, 3-й час и последующие — 1000 ₽/час.',
      },
      {
        id: 'faq-6',
        visible: true,
        category: 'Бронирование',
        question: 'Можно ли арендовать дом на длительный срок?',
        answer:
          'Да, возможна длительная аренда. Такой формат подойдёт тем, кто хочет использовать дом как загородную дачу для отдыха на природе.',
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  contacts: {
    title: 'Готовы выбрать дом для отдыха?',
    description:
      'Напишите нам — подберём свободную дату, подходящий дом и ответим на вопросы по вашему формату отдыха.',
    // Replace the placeholder phone / links below with real contacts.
    phone: '+7 (___) ___-__-__',
    whatsapp: 'https://wa.me/70000000000',
    telegram: 'https://t.me/kazargrad',
    vk: 'https://vk.com/kazargrad',
    instagram: 'https://instagram.com/kazargrad',
    email: 'kazargrad@mail.ru',
    address: 'Рязанская область, с. Казарь, ул. Луговая, 42',
    mapLink: 'https://yandex.ru/maps/',
    workingHours: 'Ежедневно, 9:00–21:00',
    whatsappCtaText: 'Написать в WhatsApp',
    callCtaText: 'Позвонить',
    routeCtaText: 'Построить маршрут',
  },

  /* ---------------------------------------------------------------- */
  footer: {
    complexName: 'Гостевой комплекс «Казарьград»',
    address: 'Рязанская область, с. Казарь, ул. Луговая, 42',
    email: 'kazargrad@mail.ru',
    legalEntity: 'Гостевой комплекс «Kazargrad»',
    entrepreneur: 'ИП Шафоростов Виталий Юрьевич',
    inn: '622900215308',
    ogrnip: '304622928600175',
    copyright: '© Казарьград. Все права защищены.',
    socialLinks: [
      { id: 'soc-1', visible: true, icon: 'MessageCircle', label: 'WhatsApp', url: 'https://wa.me/70000000000' },
      { id: 'soc-2', visible: true, icon: 'Send', label: 'Telegram', url: 'https://t.me/kazargrad' },
      { id: 'soc-3', visible: true, icon: 'Share2', label: 'ВКонтакте', url: 'https://vk.com/kazargrad' },
      { id: 'soc-4', visible: true, icon: 'Instagram', label: 'Instagram', url: 'https://instagram.com/kazargrad' },
    ],
    legalLinks: [
      { id: 'leg-1', visible: true, label: 'Политика конфиденциальности', url: '/privacy' },
      { id: 'leg-2', visible: true, label: 'Пользовательское соглашение', url: '#' },
    ],
  },

  /* ---------------------------------------------------------------- */
  privacy: {
    title: 'Политика конфиденциальности',
    updatedAt: '25 июня 2026 г.',
    sections: [
      {
        id: 'prv-1',
        visible: true,
        title: '1. Общие положения',
        text: 'Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки информации на сайте kazargrad.ru (далее — «Сайт»), принадлежащем ИП Шафоростов Виталий Юрьевич (ИНН: 622900215308, ОГРНИП: 304622928600175), действующему под брендом Гостевой комплекс «Kazargrad» (далее — «Оператор»).\n\nПолитика составлена в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных».',
      },
      {
        id: 'prv-2',
        visible: true,
        title: '2. Мы не собираем личные данные',
        text: 'Сайт является информационным. Мы не размещаем на нём форм регистрации, форм заказа или обратной связи, требующих ввода персональных данных. Посещение Сайта не влечёт передачи нам вашего имени, номера телефона, адреса электронной почты или иных персональных данных.',
      },
      {
        id: 'prv-3',
        visible: true,
        title: '3. Технические данные',
        text: 'Веб-сервер автоматически сохраняет стандартные технические данные, передаваемые вашим браузером: IP-адрес, тип браузера, дату и время запроса. Эти данные не идентифицируют вас как физическое лицо и используются исключительно для обеспечения технического функционирования Сайта и предотвращения неправомерного использования.',
      },
      {
        id: 'prv-4',
        visible: true,
        title: '4. Файлы cookie',
        text: 'Сайт может использовать технические файлы cookie — небольшие текстовые файлы, необходимые для корректной работы браузера. Мы не используем аналитические, рекламные или отслеживающие cookie. Вы можете отключить cookie в настройках своего браузера, однако это может повлиять на работу некоторых функций Сайта.',
      },
      {
        id: 'prv-5',
        visible: true,
        title: '5. Ссылки на сторонние ресурсы',
        text: 'Сайт содержит ссылки на социальные сети и мессенджеры (ВКонтакте, WhatsApp, Telegram и др.). Переходя по этим ссылкам, вы покидаете наш Сайт и оказываетесь под действием политики конфиденциальности соответствующих сервисов. Мы не несём ответственности за их практики в отношении персональных данных.',
      },
      {
        id: 'prv-6',
        visible: true,
        title: '6. Изменения в Политике',
        text: 'Мы оставляем за собой право вносить изменения в настоящую Политику. Актуальная версия всегда доступна по адресу kazargrad.ru/privacy. Дата последнего обновления указана в заголовке документа.',
      },
      {
        id: 'prv-7',
        visible: true,
        title: '7. Контакты',
        text: 'По вопросам, связанным с настоящей Политикой конфиденциальности, обращайтесь:\n\nГостевой комплекс «Kazargrad»\nИП Шафоростов Виталий Юрьевич\nИНН: 622900215308, ОГРНИП: 304622928600175\nEmail: kazargrad@mail.ru',
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  gallery: [
    { id: 'gal-1', visible: true, src: img('gallery-1', 800, 600), name: 'Двухэтажный дом', alt: 'Двухэтажный гостевой дом Казарьград', category: 'Two-floor house' },
    { id: 'gal-2', visible: true, src: img('gallery-2', 800, 600), name: 'Одноэтажный дом', alt: 'Одноэтажный гостевой дом Казарьград', category: 'One-floor house' },
    { id: 'gal-3', visible: true, src: img('gallery-3', 800, 600), name: 'Сосновый бор', alt: 'Сосновый бор на территории комплекса', category: 'Territory' },
    { id: 'gal-4', visible: true, src: img('gallery-4', 800, 600), name: 'Детская площадка', alt: 'Детская площадка', category: 'Kids' },
    { id: 'gal-5', visible: true, src: img('gallery-5', 800, 600), name: 'Беседка', alt: 'Беседка с мангальной зоной', category: 'Territory' },
    { id: 'gal-6', visible: true, src: img('gallery-6', 800, 600), name: 'Интерьер', alt: 'Интерьер гостевого дома', category: 'Interior' },
  ],
}
