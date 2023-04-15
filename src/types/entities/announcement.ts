export type AnnouncementColumns = {
  id: string;
  title: string;
  description: string;
  list_event_id: string;
  created_at: string;
};

export type CreateAnnouncement = {
  title: string;
  event_id: string;
  description: string;
};
