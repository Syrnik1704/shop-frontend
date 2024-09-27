export interface PostImageResponse {
  createdAt: string;
  uid: string;
}

export interface Image {
  url: string;
}

export interface DeleteImageResponse {
  timestamp: string;
  message: string;
}
