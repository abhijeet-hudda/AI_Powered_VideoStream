import api from "./axios.instance";

async function getAllVideos({
  page = 1,
  limit = 5,
  query,
  sortBy,
  sortType,
  userId,
} = {}) {
  //console.log("api call getAllVideos",limit);
  const response = await api.get("/videos", {
    params: {
      page,
      limit,
      query,
      sortBy,
      sortType,
      userId,
    },
  });
  //console.log("video",response.data.data.docs)
  return response.data;
}
async function getVideosBySemanticSearch({ query }, signal) {
  if (!query || !query.trim()) {
    return { data: { docs: [] } };
  }
  const res = await api.get("/videos/semantic-search", {
    params: { query },
    signal,
  });
  return res.data;
}
async function publishVideo(formData) {
  const response = await api.post("/videos/publish", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
async function getVideoById(videoId) {
  const response = await api.get(`/videos/${videoId}`);
  //console.log("getvideoById",response)
  return response.data;
}
async function updateVideo(videoId, formData) {
  const response = await api.patch(`/videos/updateVideo/${videoId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
async function deleteVideo(videoId){
  const response = await api.delete(`/videos/delete-video/${videoId}`);
  return response.data;
}

export default {
    getAllVideos,
    publishVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    getVideosBySemanticSearch
}
