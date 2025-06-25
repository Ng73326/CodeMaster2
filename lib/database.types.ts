export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: 'user' | 'admin'
          image?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role?: 'user' | 'admin'
          image?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'user' | 'admin'
          image?: string
          updated_at?: string
        }
      }
      contests: {
        Row: {
          id: string
          title: string
          description: string
          date: string
          start_time: string
          duration: string
          type: string
          status: 'upcoming' | 'active' | 'completed'
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          date: string
          start_time: string
          duration: string
          type: string
          status?: 'upcoming' | 'active' | 'completed'
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          date?: string
          start_time?: string
          duration?: string
          type?: string
          status?: 'upcoming' | 'active' | 'completed'
          created_by?: string
          updated_at?: string
        }
      }
      questions: {
        Row: {
          id: string
          title: string
          description: string
          difficulty: 'easy' | 'medium' | 'hard'
          type: 'coding' | 'mcq'
          marks: number
          expected_output?: string
          mcq_options?: Json
          correct_answer?: string
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          difficulty: 'easy' | 'medium' | 'hard'
          type: 'coding' | 'mcq'
          marks: number
          expected_output?: string
          mcq_options?: Json
          correct_answer?: string
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          difficulty?: 'easy' | 'medium' | 'hard'
          type?: 'coding' | 'mcq'
          marks?: number
          expected_output?: string
          mcq_options?: Json
          correct_answer?: string
          created_by?: string
          updated_at?: string
        }
      }
      contest_questions: {
        Row: {
          id: string
          contest_id: string
          question_id: string
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          contest_id: string
          question_id: string
          order_index: number
          created_at?: string
        }
        Update: {
          id?: string
          contest_id?: string
          question_id?: string
          order_index?: number
        }
      }
      contest_registrations: {
        Row: {
          id: string
          contest_id: string
          user_id: string
          registration_id: string
          registered_at: string
        }
        Insert: {
          id?: string
          contest_id: string
          user_id: string
          registration_id: string
          registered_at?: string
        }
        Update: {
          id?: string
          contest_id?: string
          user_id?: string
          registration_id?: string
        }
      }
      submissions: {
        Row: {
          id: string
          contest_id: string
          question_id: string
          user_id: string
          code: string
          language: string
          status: 'pending' | 'accepted' | 'rejected'
          score: number
          submitted_at: string
        }
        Insert: {
          id?: string
          contest_id: string
          question_id: string
          user_id: string
          code: string
          language: string
          status?: 'pending' | 'accepted' | 'rejected'
          score?: number
          submitted_at?: string
        }
        Update: {
          id?: string
          contest_id?: string
          question_id?: string
          user_id?: string
          code?: string
          language?: string
          status?: 'pending' | 'accepted' | 'rejected'
          score?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}