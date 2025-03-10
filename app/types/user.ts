export interface User {
    id?: number;
    name: string;
    email: string;
    phone?: string;
    professional_summary?: string;
    work_experience: Array<{
      company: string;
      position: string;
      start_date: string;
      end_date: string;
      description: string;
    }>;
    education: Array<{
      institution: string;
      degree: string;
      field_of_study: string;
      start_date: string;
      end_date: string;
    }>;
    skills: string[];
  }