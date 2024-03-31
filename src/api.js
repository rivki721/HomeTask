import axios from "axios";

export const getUnvaccinatedMembers = async () => {
  return axios({
    method: "GET",
    url: "http://localhost:5000/members/unvaccinated",
  });
};

export const getMembers = async () => {
  return axios({
    method: "GET",
    url: "http://localhost:5000/members",
  });
};

export const getMemberById = async (id) => {
  return axios({
    method: "GET",
    url: `http://localhost:5000/members/${id}`,
  });
};

export const createMember = async (body) => {
  return axios({
    method: "POST",
    url: "http://localhost:5000/members",
    data: body,
  });
};

export const updateMember = async (id, body) => {
  return axios({
    method: "PUT",
    url: `http://localhost:5000/members/${id}`,
    data: body,
  });
};

export const deleteMember = async (id) => {
  return axios({
    method: "DELETE",
    url: `http://localhost:5000/members/${id}`,
  });
};
