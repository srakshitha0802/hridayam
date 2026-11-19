// Central media registry — strictly using ONLY the user-provided images,
// official brand logo, and blue theme frame backgrounds.

export const SITE_BACKGROUND_VIDEO =
  '/assets/aistudio/gemini_generated_video_ca7b21a8_6128b8bd.mp4';

export const FRAME_BACKGROUNDS = {
  border: '/frame-bg-border.jpg',
  sparkle: '/frame-bg-sparkle.jpg',
  waves: '/frame-bg-waves.jpg',
  theme: '/hridayam-theme-bg.jpg',
  logo: '/logo.png',
  video: SITE_BACKGROUND_VIDEO,
} as const;

export const PROVIDED_IMAGES = {
  // Authentic Indian student & campus photographs
  indianStudentLaptop: '/assets/aistudio/1760427272068_ff352634.jpeg',
  indianLibraryGroup: '/assets/aistudio/college-Admission-Guidance-1024x653.jpg_88c5e37a.webp',
  indianClassroomTeam: '/assets/aistudio/images-3_93f13b2d.jpeg',
  indianCampusSteps: '/assets/aistudio/Indians-Germany_8d220e87.jpg',

  // Neutral coding, workspace & study photographs (from user-provided set)
  codeScreenLaptop: '/assets/aistudio/altumcode-dC6Pb2JdAqs-unsplash_387db4c0.jpg',
  studyDeskMinimal: '/assets/aistudio/nick-morrison-FHnnjk1Yj7Y-unsplash_59c27ab1.jpg',
  eveningStudyPair: '/assets/aistudio/nizametdinova-TtAHLsnbz3o-unsplash_20ce12bf.jpg',
  loveToLearnSign: '/assets/aistudio/tim-mossholder-WE_Kv_ZB1l0-unsplash_e372553b.jpg',
  collabLaptops: '/assets/aistudio/mimi-thian-vdXMSiX-n6M-unsplash_3f06519f.jpg',
  codingWorkshop: '/assets/aistudio/annie-spratt-QckxruozjRg-unsplash_3c8c1c48.jpg',
} as const;

export const INDIAN_STUDENT_PORTRAITS = [
  PROVIDED_IMAGES.indianStudentLaptop,
  PROVIDED_IMAGES.indianLibraryGroup,
  PROVIDED_IMAGES.indianClassroomTeam,
  PROVIDED_IMAGES.indianCampusSteps,
] as const;

export const COURSE_COVER_IMAGES = [
  PROVIDED_IMAGES.codeScreenLaptop,
  PROVIDED_IMAGES.indianLibraryGroup,
  PROVIDED_IMAGES.indianStudentLaptop,
  PROVIDED_IMAGES.studyDeskMinimal,
  PROVIDED_IMAGES.indianClassroomTeam,
  PROVIDED_IMAGES.eveningStudyPair,
  PROVIDED_IMAGES.indianCampusSteps,
  PROVIDED_IMAGES.loveToLearnSign,
] as const;

export const CAMPUS_GALLERY_IMAGES = [
  PROVIDED_IMAGES.indianCampusSteps,
  PROVIDED_IMAGES.indianLibraryGroup,
  PROVIDED_IMAGES.indianClassroomTeam,
  PROVIDED_IMAGES.indianStudentLaptop,
  PROVIDED_IMAGES.loveToLearnSign,
  PROVIDED_IMAGES.studyDeskMinimal,
] as const;
