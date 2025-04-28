import * as yup from "yup";
import { api } from "./api";
import config from "../config";

// TypeScript interfaces
export interface Patient {
 
  id: number;
  name: string;
  gender: string;
  dob: string;
  blood_group: string;
  blood_group_label: string;
  created_at: string;
  updated_at: string | null;
  last_activity: string;
  profile_picture: string;
}
export interface SinglePatientResponse {
  status: string;
  type: string;
  status_code: number;
  message: string;
  data: Patient;
}
export interface PatientListResponse {
  status: string;
  type: string;
  status_code: number;
  message: string;
  data: {
    patient_list: Patient[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface PatientFormData {
  name: string;
  gender: string;
  blood_group: string;
  dob: string;
  profile_picture?: File | string | null; 
}

export interface FormErrors {
  name?: string;
  gender?: string;
  blood_group?: string;
  dob?: string;
  profile_picture?: string;
}

export interface ApiResponse {
  status: string;
  type: string;
  status_code: number;
  message: string;
  data: {
    status: string;
    id: number;
    name: string;
    gender: string;
    dob: string;
    blood_group: string;
    blood_group_label: string;
    created_at: string;
    updated_at: string | null;
    last_activity: string;
    profile_picture: File;
  };
}


export const patientValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(["Male", "Female", "Other"], "Required gender"),
  blood_group: yup
    .string()
    .required("Blood group is required")
    .oneOf(config.BLOOD_GROUPS, "Invalid blood group"),
  dob: yup.string().required("Date of birth is required"),
});

export const patientService = {
 

  async getPatients(): Promise<PatientListResponse> {
    return api.get<PatientListResponse>(config.API_ENDPOINTS.ADD_PATIENT, {
      requiresAuth: true,
    });
  },

  
  async getPatientById(patientId: number): Promise<SinglePatientResponse> {
    return api.get<SinglePatientResponse>(`${config.API_ENDPOINTS.ADD_PATIENT}/${patientId}/`, {
      requiresAuth: true,
    });
  },
  async addPatient(
    formData: PatientFormData,
    photoFile: File | null
  ): Promise<ApiResponse> {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("dob", formData.dob);
    formDataToSend.append("blood_group", formData.blood_group);
    if (photoFile) {
      formDataToSend.append("profile_picture", photoFile);
    }

    return api.post<ApiResponse>(
      config.API_ENDPOINTS.ADD_PATIENT,
      formDataToSend,
      {
        requiresAuth: true,
      }
    );
  },

  async updatePatient(
    patientId: number,
    formData: PatientFormData,
    photoFile: File | null
  ): Promise<ApiResponse> {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("dob", formData.dob);
    formDataToSend.append("blood_group", formData.blood_group);
    if (photoFile) {
      formDataToSend.append("profile_picture", photoFile);
    }

    return api.put<ApiResponse>(
      `${config.API_ENDPOINTS.ADD_PATIENT}/${patientId}`,
      formDataToSend,
      {
        requiresAuth: true,
      }
    );
  },

  async deletePatient(patientId: number): Promise<ApiResponse> {
    const formData = new URLSearchParams();
    formData.append("patient_ids", patientId.toString());

    return api.delete<ApiResponse>(config.API_ENDPOINTS.ADD_PATIENT, formData, {
      requiresAuth: true,
    });
  },
};
