export interface MemoryItem {
  id: string;
  year: string;
  date: string;
  title: string;
  caption: string;
  location?: string;
  image: string;
  rotation?: string; // e.g. "-rotate-2", "rotate-1"
}

export interface JourneyMilestone {
  year: string;
  dateBadge?: string;
  title: string;
  description: string;
  image?: string;
  tag?: string;
}

export interface BirthdayData {
  recipient: {
    name: string;
    nickname: string;
    birthDate: string;
    zodiac?: string;
  };
  opening: {
    teaser: string;
    title: string;
    subtitle: string;
    ctaButton: string;
  };
  mainGreeting: {
    tagline: string;
    title: string;
    subtitle: string;
    message: string;
    scrollPrompt: string;
  };
  aboutHer: {
    tagline: string;
    title: string;
    paragraphs: string[];
    closingPhrase: string;
    photo: string;
    traits: { label: string; description: string }[];
  };
  memories: {
    tagline: string;
    title: string;
    subtitle: string;
    items: MemoryItem[];
  };
  interactiveFlower: {
    tagline: string;
    title: string;
    teaser: string;
    ctaPrompt: string;
    resetPrompt: string;
  };
  hiddenMessage: {
    sealText: string;
    letterTitle: string;
    letterDate: string;
    letterBody: string[];
    signature: string;
    postscript?: string;
  };
  journey: {
    tagline: string;
    title: string;
    subtitle: string;
    milestones: JourneyMilestone[];
  };
  finalSurprise: {
    tagline: string;
    title: string;
    subtitle: string;
    climaxWish: string;
    candlePrompt: string;
    candleBlownMessage: string;
    ctaHeart: string;
  };
  closing: {
    prelude: string;
    title: string;
    subtitle: string;
    message: string;
    signature: string;
    returnToTop: string;
  };
  audio: {
    src: string;
    title: string;
    artist: string;
    enableSynthesizerFallback: boolean;
  };
}

export const birthdayData: BirthdayData = {
  recipient: {
    name: "Aura",
    nickname: "Sayang",
    birthDate: "22 September",
    zodiac: "Virgo",
  },

  opening: {
    teaser: "Ada sesuatu yang ingin aku berikan untukmu...",
    title: "Happy Birthday",
    subtitle: "to someone very special ♡",
    ctaButton: "Open Your Gift →",
  },

  mainGreeting: {
    tagline: "A Midnight Garden For You",
    title: "Happy Birthday",
    subtitle: "Sayang ♡",
    message:
      "Semoga hari ini menjadi awal dari lebih banyak kebahagiaan, cerita indah, dan hal-hal baik yang datang ke dalam hidupmu. Terima kasih sudah hadir dan mewarnai duniaku dengan caramu yang begitu lembut dan indah.",
    scrollPrompt: "Gulir perlahan untuk membuka kisah ini",
  },

  aboutHer: {
    tagline: "The Warmth in My World",
    title: "A Little About You",
    paragraphs: [
      "Kamu adalah seseorang yang selalu membawa kebahagiaan, bahkan dari hal-hal yang paling sederhana. Senyummu punya caranya sendiri untuk membuat suasana terasa lebih hangat dan tenang.",
      "Ada kelembutan dalam caramu bertutur, ketulusan dalam tatapan matamu, dan keindahan tak terduga dalam setiap tawa yang kau bagi. Di antara riuhnya dunia, kehadiranmu selalu terasa seperti tempat pulang yang teduh.",
    ],
    closingPhrase: "Thank you for simply being you ♡",
    photo: "/images/9.jpeg",
    traits: [
      { label: "Gentle Heart", description: "Hati yang tulus dan selalu memancarkan kehangatan bagi siapa pun di sekitarmu." },
      { label: "Radiant Smile", description: "Senyuman manis yang selalu sanggup mencerahkan hari yang paling mendung." },
      { label: "Endless Grace", description: "Keanggunan alami dan ketenangan yang membuat setiap momen bersamamu berharga." },
    ],
  },

  memories: {
    tagline: "Captured In Time",
    title: "Our Little Moments",
    subtitle: "Some moments are too precious to ever be forgotten.",
    items: [
      {
        id: "mem-1",
        year: "2023",
        date: "School Days",
        title: "Hari Penuh Cerita & Bahagia",
        caption: "Di antara ramainya hari itu, senyumanmu selalu jadi yang paling bersinar dan mencuri perhatian.",
        location: "Our School Yard",
        image: "/images/3.jpeg",
        rotation: "-rotate-2",
      },
      {
        id: "mem-2",
        year: "2023",
        date: "Green Days",
        title: "Langkah Bersama di Hari Teduh",
        caption: "Berdiri di sampingmu selalu membuat hari yang biasa terasa begitu istimewa dan penuh tawa.",
        location: "Campus Garden",
        image: "/images/7.jpeg",
        rotation: "rotate-2",
      },
      {
        id: "mem-3",
        year: "2024",
        date: "Cinema Date",
        title: "Kencan & Tingkah Lucu Kita",
        caption: "Setiap cermin dan setiap tempat selalu punya cara tersendiri untuk mengabadikan keusilan manis kita berdua.",
        location: "Movie Date",
        image: "/images/8.jpeg",
        rotation: "-rotate-1",
      },
      {
        id: "mem-4",
        year: "2024",
        date: "Mirror Magic",
        title: "Gemas & Penuh Kebahagiaan",
        caption: "Gaya pose gemasmu yang selalu berhasil bikin aku tersenyum dan jatuh hati berkali-kali.",
        location: "Weekend Date",
        image: "/images/10.jpeg",
        rotation: "rotate-3",
      },
    ],
  },

  interactiveFlower: {
    tagline: "The Centerpiece",
    title: "A Hidden Secret",
    teaser: "There is something sacred hidden inside this crimson rose...",
    ctaPrompt: "Sentuh mawar ini untuk membukanya",
    resetPrompt: "Tutup kembali mawar",
  },

  hiddenMessage: {
    sealText: "With Love",
    letterTitle: "Untukmu yang Selalu Istimewa,",
    letterDate: "September 2026",
    letterBody: [
      "Terima kasih sudah menjadi salah satu bagian paling indah dalam hidupku.",
      "Kamu itu begitu berharga — jauh lebih berharga daripada apa yang mungkin kamu kira selama ini. Setiap kebaikan kecilmu, kelembutan tutur katamu, dan ketulusanmu adalah anugerah yang tak henti-hentinya kusyukuri.",
      "Di usiamu yang baru ini, semoga kamu selalu menemukan alasan untuk tersenyum lebar setiap hari, tumbuh mekar menjadi versi terbaik dari dirimu, dan selalu dikelilingi oleh cinta, kedamaian, dan hal-hal baik yang melimpah.",
      "Apapun yang ada di depan, ketahuilah bahwa ada seseorang di sini yang selalu bangga padamu, mengagumimu, dan mendoakan kebahagiaanmu dari lubuk hati terdalam.",
    ],
    signature: "Selalu menyayangimu,",
    postscript: "P.S. Mawar ini akan selalu mekar untukmu. ♡",
  },

  journey: {
    tagline: "Chapter By Chapter",
    title: "Our Beautiful Journey",
    subtitle: "Setiap langkah kecil yang membawa kita hingga hari ini.",
    milestones: [
      {
        year: "2023",
        dateBadge: "Awal Cerita",
        title: "Pertama Kali Bersua",
        description: "Hari pertama di mana takdir mempertemukan kita. Awal mula dari sebuah rasa penasaran yang perlahan berubah menjadi kehangatan yang tak tergantikan.",
        tag: "Beginning",
        image: "/images/memory-01.jpg",
      },
      {
        year: "2024",
        dateBadge: "Tumbuh Bersama",
        title: "Lebih Banyak Cerita & Tawa",
        description: "Melewati hari-hari bersama, saling mengenal mimpi dan ketakutan, bertukar rahasia, dan menemukan bahwa setiap obrolan denganmu selalu terasa begitu cepat berlalu.",
        tag: "Closer",
        image: "/images/memory-03.jpg",
      },
      {
        year: "2025",
        dateBadge: "Ikatan yang Menguat",
        title: "Melangkah Berdampingan",
        description: "Menjadi teman bertumbuh, saling menopang di saat lelah, dan merayakan setiap pencapaian kecil bersama dengan penuh syukur.",
        tag: "Harmony",
        image: "/images/memory-02.jpg",
      },
      {
        year: "2026 & Seterusnya",
        dateBadge: "Hari Ini & Masa Depan",
        title: "Perayaan Hari Istimewamu",
        description: "Dan hari ini, di hari ulang tahunmu, aku ingin merayakan betapa indahnya keberadaanmu. Semoga masa depan menghamparkan jalan bertabur bunga untukmu.",
        tag: "Forever",
        image: "/images/journey-01.jpg",
      },
    ],
  },

  finalSurprise: {
    tagline: "The Climax",
    title: "Happy Birthday",
    subtitle: "Sayang ♡",
    climaxWish:
      "Semoga setiap langkahmu dipenuhi cahaya kebaikan, setiap impianmu menemukan jalannya, dan kebahagiaan selalu punya alasan terindah untuk tinggal selamanya di hidupmu.",
    candlePrompt: "Nyalakan lilin & ucapkan permohonanmu...",
    candleBlownMessage: "Semoga semua harapan terindahmu terkabul! ✨🎂🕯️",
    ctaHeart: "Untukmu, selalu. ♡",
  },

  closing: {
    prelude: "Sekali lagi dari lubuk hati...",
    title: "Happy Birthday",
    subtitle: "Sayang ♡",
    message:
      "Semoga kamu selalu bahagia, karena kamu pantas mendapatkan segala hal baik dan terindah di dunia ini. Terima kasih telah lahir ke dunia.",
    signature: "With all my heart, always. ♡",
    returnToTop: "Kembali ke Awal ↑",
  },

  audio: {
    src: "/audio/panjang_umur.mp3",
    title: "Panjang Umur",
    artist: "Special Birthday Song",
    enableSynthesizerFallback: true,
  },
};
