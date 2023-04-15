export type PendaftaranStaffResponse<T, K> = {
  name: string;
  nrp: string;
  departemen: number;
  fakultas: number;
  no_telp: string;
  id_line: string;
  pengetahuan: string;
  motivasi: string;
  inovasi: string;
  divisi_1: number;
  divisi_2: number;
  alasan_divisi_1: string;
  alasan_divisi_2: string;
  link_portofolio: string;
  bukti_instagram: T;
  bukti_twitter: T;
  bukti_tiktok: T;
  bukti_youtube: T;
  bukti_feeds: T;
  bukti_twibbon: T;
  pertanyaan: K[];
};

export type PertanyaanResponse = {
  id: number;
  pertanyaan: string;
  jawaban: string;
  divisi_id: number;
};

export type PertanyaanForm = {
  pertanyaan_id: number;
  jawaban: string;
};
