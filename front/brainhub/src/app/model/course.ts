export interface Course {
    id: number;
    titre: string;
    description: string;
    niveau_difficulte: string;
    date_creation: string;
    image: string;
    video: string;  // Add the new video field
  }
  
  export interface CourseResponse {
    courses: Course[];
    course: Course;
  }
  