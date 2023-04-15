import { PermissionList } from '@/types/entities/permission-list';
import { PreEvent } from '@/types/entities/pre-event';
import { Level } from '@/types/entities/role';

export type User = {
  name: string;
  role_id: Level['id'];
  role: Level['name'];
  email: string;
  token: string;
  permissions: PermissionList;

  // Pre Event
  pre_event: PreEvent[];
};

export type LoginRespond = {
  name: string;
  email: string;
  permission: {
    role: Level['name'];
    role_id: Level['id'];
    routes: PermissionList;
  };

  // Pre Event
  pre_event: PreEvent[];
};

// User page
export type UserColumn = {
  id: string;
  name: string;
  email: string;
  no_telp: string;
  role: string;
};
