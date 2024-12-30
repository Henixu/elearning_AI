export interface Course {
    id: number;
    titre: string;
    description: string;
    niveau_difficulte: string;
    date_creation: string;
    image: string;
  }
  
  export interface CourseResponse {
    courses: Course[];
  }