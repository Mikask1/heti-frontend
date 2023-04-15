export interface Permission {
  id: string;
  name: string;
}

export interface PermissionResponse {
  id: string;
  routes: string;
}

export type PermissionColumn = {
  id: string;
  routes: string;
};
