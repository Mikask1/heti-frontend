export type PreEventDetail = {
  status: boolean;
  start_date: Date;
  close_date: Date;
};

export type PreEvent = {
  Jurnalistik: PreEventDetail;
  KaryaTulisIlmiah: PreEventDetail;
  RobotInAction: PreEventDetail;
  Talkshow: PreEventDetail;
};
