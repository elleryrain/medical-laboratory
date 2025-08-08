export interface IUser {
  id: number;
  name: string;
  surname: string;
  role: 'admin' | 'technician';
  middleName: string;
  hashedPassword: string;
  avatar: string;
}

export interface ICategoryTechnician {
  id: number;
  title: string;
}

export interface IUserCategoryTechnician {
  id: number;
  categoryTechnicianId: number;
  technicianId: number;
}

export interface ITypeWork {
  id: number;
  image: string;
  steps: {
    name: string;
    materialCost: number;
    cost: number;
    material: string;
  };
}

export interface IDoctor {
  id: number;
  name: string;
  surname: string;
  middleName: string;
  clinicName: string;
  address: string;
  avatar: string;
}

export interface ICourierDeliveryTask {
  id: number;
  startPlace: string;
  finishPlace: string;
  finishDate: Date;
  paid: boolean;
}

export interface IService {
  id: number;
  doctorId: number;
  technicianId: number;
  patient: string;
  typeWorkId: number;
  fittingSteps?: {
    name: string;
  }[];
  finishDate: Date;
  isFinished: boolean;
}
