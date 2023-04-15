import { Permission } from '@/types/entities/permission';

export type Role = {
  id: number;
  name: string;
  permissions: Permission[];
  level: Level;
};

export type RoleDetail = {
  permission: {
    id: string;
    routes: string;
  }[];
};

export type Level =
  | {
      id: '1';
      name: 'USER';
    }
  | {
      id: '2';
      name: 'ADMIN';
    }
  | {
      id: '3';
      name: 'SMP/Sederajat';
    }
  | {
      id: '4';
      name: 'SMA/Sederajat';
    }
  | {
      id: '5';
      name: 'Mahasiswa';
    }
  | {
      id: '6';
      name: 'Umum';
    }
  | {
      id: '7';
      name: 'BPH';
    }
  | {
      id: '8';
      name: 'Event';
    }
  | {
      id: '9';
      name: 'Marketing';
    }
  | {
      id: '10';
      name: 'Branding';
    }
  | {
      id: '11';
      name: 'Damen';
    };

export type RoleColumn = {
  id: string;
  role: string;
};
export interface RoleResponse {
  id: string;
  role: string;
  name: string;
}

export type AssignRolePermission = {
  id: string[];
  role_permission: DetailRolePermission[];
};

export type DetailRolePermission = {
  role_id: string;
  permission_id: string;
};
